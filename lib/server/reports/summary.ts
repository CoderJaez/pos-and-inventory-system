import { fn, col, literal, Op } from "sequelize";
import { models } from "@/lib/server/models";

export async function getDailySummary(date: string) {
  const start = new Date(`${date}T00:00:00.000Z`);
  const end = new Date(`${date}T23:59:59.999Z`);

  const sales = await models.Sale.findAll({ where: { saleDatetime: { [Op.between]: [start, end] } }, attributes: ["id", "totalAmount"] });
  const totalSales = sales.reduce((sum: number, s: { totalAmount: string }) => sum + Number(s.totalAmount), 0);

  const paymentRows = await models.Payment.findAll({
    include: [{ model: models.Sale, as: "sale", attributes: [], where: { saleDatetime: { [Op.between]: [start, end] } } }],
    attributes: ["method", [fn("SUM", col("amount")), "total"]],
    group: ["method"],
    raw: true,
  });

  const topItems = await models.SaleItem.findAll({
    include: [
      { model: models.Sale, as: "sale", attributes: [], where: { saleDatetime: { [Op.between]: [start, end] } } },
      { model: models.Product, as: "product", attributes: ["name"] },
    ],
    attributes: ["productId", [fn("SUM", col("quantity")), "quantitySold"], [fn("SUM", literal("line_total")), "amountSold"]],
    group: ["productId", "product.id", "product.name"],
    order: [[literal("quantitySold"), "DESC"]],
    limit: 5,
  });

  const inventory = await models.Product.findAll({ attributes: ["id", "name", "stockQuantity", "lowStockThreshold", "costPrice", "sellingPrice"] });
  const lowStock = inventory.filter((p: { stockQuantity: string; lowStockThreshold: string }) => Number(p.stockQuantity) <= Number(p.lowStockThreshold));

  const estimatedProfit = sales.length > 0
    ? await models.SaleItem.findAll({
        include: [{ model: models.Sale, as: "sale", attributes: [], where: { saleDatetime: { [Op.between]: [start, end] } } }, { model: models.Product, as: "product", attributes: [] }],
        attributes: [[fn("SUM", literal("(line_total - (quantity * product.cost_price))")), "profit"]],
        raw: true,
      })
    : [{ profit: 0 }];

  return {
    date,
    salesCount: sales.length,
    totalSales,
    paymentBreakdown: paymentRows,
    topItems,
    inventoryCount: inventory.length,
    lowStockCount: lowStock.length,
    lowStockItems: lowStock,
    estimatedProfit: Number((estimatedProfit[0] as { profit: string | number }).profit || 0),
  };
}
