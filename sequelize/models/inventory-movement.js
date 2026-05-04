"use strict";
module.exports = (sequelize, DataTypes) => {
  const InventoryMovement = sequelize.define("InventoryMovement", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    movementType: { type: DataTypes.ENUM("stock_in", "stock_out", "adjustment", "sale_deduction", "return"), allowNull: false },
    quantity: { type: DataTypes.DECIMAL(12, 3), allowNull: false },
    unitCost: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
    reason: { type: DataTypes.STRING(255), allowNull: true },
    referenceType: { type: DataTypes.STRING(40), allowNull: true },
    referenceId: { type: DataTypes.UUID, allowNull: true },
    occurredAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    productId: { type: DataTypes.UUID, allowNull: false },
    supplierId: { type: DataTypes.UUID, allowNull: true },
  }, { tableName: "inventory_movements", paranoid: true, underscored: true });

  InventoryMovement.associate = (models) => {
    InventoryMovement.belongsTo(models.Product, { foreignKey: "productId", as: "product" });
    InventoryMovement.belongsTo(models.Supplier, { foreignKey: "supplierId", as: "supplier" });
  };
  return InventoryMovement;
};
