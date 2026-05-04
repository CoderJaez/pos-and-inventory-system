import { Op } from "sequelize";
import { models } from "@/lib/server/models";

type ProductPayload = {
  name: string;
  sku: string;
  unit: "piece" | "pack" | "kilo" | "sachet";
  sellingPrice: number;
  costPrice: number;
  stock: number;
  lowStockThreshold: number;
  categoryId?: string;
  supplierId?: string;
};

export async function listProducts(search?: string) {
  return models.Product.findAll({
    where: search
      ? { [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { sku: { [Op.like]: `%${search}%` } }] }
      : undefined,
    include: [
      { model: models.Category, as: "category", attributes: ["id", "name"] },
      { model: models.Supplier, as: "supplier", attributes: ["id", "name"] },
    ],
    order: [["name", "ASC"]],
  });
}

export async function createProduct(payload: ProductPayload) {
  return models.Product.create({
    name: payload.name,
    sku: payload.sku,
    unit: payload.unit,
    sellingPrice: payload.sellingPrice,
    costPrice: payload.costPrice,
    stockQuantity: payload.stock,
    lowStockThreshold: payload.lowStockThreshold,
    categoryId: payload.categoryId || null,
    supplierId: payload.supplierId || null,
  });
}

export async function adjustInventory(productId: string, quantity: number, reason: string) {
  const product = await models.Product.findByPk(productId);
  if (!product) throw new Error("Product not found");

  const nextQty = Number(product.stockQuantity) + quantity;
  if (nextQty < 0) throw new Error("Stock cannot be negative");

  await product.update({ stockQuantity: nextQty });
  await models.InventoryMovement.create({ productId, quantity: Math.abs(quantity), movementType: quantity >= 0 ? "stock_in" : "stock_out", reason });

  return product;
}
