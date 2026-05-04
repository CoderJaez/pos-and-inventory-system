"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(80), allowNull: false, unique: true },
    description: { type: DataTypes.STRING(255), allowNull: true },
  }, { tableName: "categories", paranoid: true, underscored: true });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: "categoryId", as: "products" });
  };
  return Category;
};
