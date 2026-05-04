"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      fullName: { type: DataTypes.STRING(120), allowNull: false },
      username: { type: DataTypes.STRING(60), allowNull: false, unique: true },
      role: { type: DataTypes.ENUM("owner", "cashier", "staff"), allowNull: false, defaultValue: "cashier" },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    { tableName: "users", paranoid: true, underscored: true }
  );

  User.associate = (models) => {
    User.hasMany(models.Sale, { foreignKey: "userId", as: "sales" });
  };

  return User;
};
