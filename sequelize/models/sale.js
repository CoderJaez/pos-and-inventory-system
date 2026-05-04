"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    receiptNumber: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    saleDatetime: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    subtotalAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    discountAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    totalAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    notes: DataTypes.STRING(255),
    syncStatus: { type: DataTypes.ENUM("pending", "synced", "failed"), allowNull: false, defaultValue: "pending" },
    offlineReference: { type: DataTypes.STRING(80), unique: true },
    userId: { type: DataTypes.UUID, allowNull: true },
  }, { tableName: "sales", paranoid: true, underscored: true });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: "userId", as: "cashier" });
    Sale.hasMany(models.SaleItem, { foreignKey: "saleId", as: "items" });
    Sale.hasMany(models.Payment, { foreignKey: "saleId", as: "payments" });
  };
  return Sale;
};
