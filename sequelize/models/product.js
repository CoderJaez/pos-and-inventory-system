"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    sku: { type: DataTypes.STRING(80), allowNull: false, unique: true },
    barcode: { type: DataTypes.STRING(80), allowNull: true },
    unit: { type: DataTypes.ENUM("piece", "pack", "kilo", "sachet"), allowNull: false },
    stockQuantity: { type: DataTypes.DECIMAL(12, 3), allowNull: false, defaultValue: 0 },
    costPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    sellingPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    lowStockThreshold: { type: DataTypes.DECIMAL(12, 3), allowNull: false, defaultValue: 5 },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    categoryId: { type: DataTypes.UUID, allowNull: true },
    supplierId: { type: DataTypes.UUID, allowNull: true },
  }, { tableName: "products", paranoid: true, underscored: true });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: "categoryId", as: "category" });
    Product.belongsTo(models.Supplier, { foreignKey: "supplierId", as: "supplier" });
    Product.hasMany(models.SaleItem, { foreignKey: "productId", as: "saleItems" });
    Product.hasMany(models.InventoryMovement, { foreignKey: "productId", as: "movements" });
  };
  return Product;
};
