import { NextResponse } from "next/server";
import { z } from "zod";
import { models } from "@/lib/server/models";

const payloadSchema = z.object({
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
    const payload = payloadSchema.parse(await request.json());
    const subtotal = payload.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);

    const sale = await models.Sale.create({
      receiptNumber: `R-${Date.now()}`,
      subtotalAmount: subtotal,
      totalAmount: subtotal,
      syncStatus: "pending",
    }, { transaction: tx });

    for (const item of payload.items) {
      await models.SaleItem.create({
        saleId: sale.id,
        productId: item.productId,
        quantity: item.quantity,
        unit: item.unit,
        unitPrice: item.unitPrice,
        lineTotal: item.quantity * item.unitPrice,
        isManualPrice: Boolean(item.manualPrice),
      }, { transaction: tx });

      const product = await models.Product.findByPk(item.productId, { transaction: tx, lock: tx.LOCK.UPDATE });
      if (!product) throw new Error("Product not found");
      const nextQty = Number(product.stockQuantity) - item.quantity;
      if (nextQty < 0) throw new Error(`Insufficient stock for ${product.name}`);
      await product.update({ stockQuantity: nextQty }, { transaction: tx });
      await models.InventoryMovement.create({ productId: item.productId, movementType: "sale_deduction", quantity: item.quantity, reason: "POS Sale", referenceType: "sale", referenceId: sale.id }, { transaction: tx });
    }

    const cashReceived = payload.paymentMethod === "cash" ? payload.cashReceived ?? subtotal : subtotal;
    await models.Payment.create({ saleId: sale.id, method: payload.paymentMethod, amount: subtotal, cashReceived, changeAmount: Math.max(0, cashReceived - subtotal) }, { transaction: tx });

    await tx.commit();
    return NextResponse.json({ saleId: sale.id, total: subtotal, change: Math.max(0, cashReceived - subtotal) }, { status: 201 });
  } catch (error) {
    await tx.rollback();
    return NextResponse.json({ message: "Unable to save sale", error }, { status: 400 });
  }
}
