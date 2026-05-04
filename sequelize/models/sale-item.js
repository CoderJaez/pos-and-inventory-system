"use strict";
module.exports = (sequelize, DataTypes) => {
  const SaleItem = sequelize.define("SaleItem", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    quantity: { type: DataTypes.DECIMAL(12, 3), allowNull: false },
    unit: { type: DataTypes.ENUM("piece", "pack", "kilo", "sachet", "tingi"), allowNull: false },
    unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    lineTotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    isManualPrice: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    saleId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
  }, { tableName: "sale_items", paranoid: true, underscored: true });

  SaleItem.associate = (models) => {
    SaleItem.belongsTo(models.Sale, { foreignKey: "saleId", as: "sale" });
    SaleItem.belongsTo(models.Product, { foreignKey: "productId", as: "product" });
  };
  return SaleItem;
};
