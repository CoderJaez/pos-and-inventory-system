import { NextResponse } from "next/server";
import { z } from "zod";
import { models } from "@/lib/server/models";

const schema = z.object({
  offlineReference: z.string().min(6),
  createdAt: z.string(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().positive(),
    unitPrice: z.number().nonnegative(),
    unit: z.string(),
    manualPrice: z.boolean().optional(),
  })).min(1),
  paymentMethod: z.enum(["cash", "gcash"]),
  cashReceived: z.number().nonnegative().optional(),
});

export async function POST(request: Request) {
  const tx = await models.sequelize.transaction();
  try {
    const payload = schema.parse(await request.json());

    const existing = await models.Sale.findOne({ where: { offlineReference: payload.offlineReference }, transaction: tx });
    if (existing) {
      await tx.commit();
      return NextResponse.json({ deduplicated: true, saleId: existing.id });
    }

    const subtotal = payload.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const sale = await models.Sale.create({ receiptNumber: `O-${Date.now()}`, saleDatetime: payload.createdAt, subtotalAmount: subtotal, totalAmount: subtotal, syncStatus: "synced", offlineReference: payload.offlineReference }, { transaction: tx });

    for (const item of payload.items) {
      await models.SaleItem.create({ saleId: sale.id, productId: item.productId, quantity: item.quantity, unit: item.unit, unitPrice: item.unitPrice, lineTotal: item.quantity * item.unitPrice, isManualPrice: Boolean(item.manualPrice) }, { transaction: tx });
      const product = await models.Product.findByPk(item.productId, { transaction: tx, lock: tx.LOCK.UPDATE });
      if (!product) throw new Error("Product not found");
      await product.update({ stockQuantity: Number(product.stockQuantity) - item.quantity }, { transaction: tx });
    }

    const cashReceived = payload.paymentMethod === "cash" ? payload.cashReceived ?? subtotal : subtotal;
    await models.Payment.create({ saleId: sale.id, method: payload.paymentMethod, amount: subtotal, cashReceived, changeAmount: Math.max(0, cashReceived - subtotal) }, { transaction: tx });
    await tx.commit();
    return NextResponse.json({ synced: true, saleId: sale.id }, { status: 201 });
  } catch (error) {
    await tx.rollback();
    return NextResponse.json({ message: "Sync failed", error }, { status: 400 });
  }
}
