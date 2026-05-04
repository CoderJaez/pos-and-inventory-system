"use strict";
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define("Supplier", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    contactPerson: DataTypes.STRING(120),
    phone: DataTypes.STRING(30),
    address: DataTypes.STRING(255),
  }, { tableName: "suppliers", paranoid: true, underscored: true });

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Product, { foreignKey: "supplierId", as: "products" });
    Supplier.hasMany(models.InventoryMovement, { foreignKey: "supplierId", as: "movements" });
  };
  return Supplier;
};
