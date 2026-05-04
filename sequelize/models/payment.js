"use strict";
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    method: { type: DataTypes.ENUM("cash", "gcash", "ewallet"), allowNull: false },
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    cashReceived: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
    changeAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    referenceNumber: { type: DataTypes.STRING(100), allowNull: true },
    paidAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    saleId: { type: DataTypes.UUID, allowNull: false },
  }, { tableName: "payments", paranoid: true, underscored: true });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Sale, { foreignKey: "saleId", as: "sale" });
  };
  return Payment;
};
