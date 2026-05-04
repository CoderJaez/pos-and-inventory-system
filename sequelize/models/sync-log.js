"use strict";
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("SyncLog", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    entityType: { type: DataTypes.STRING(60), allowNull: false },
    entityId: { type: DataTypes.UUID, allowNull: false },
    action: { type: DataTypes.ENUM("create", "update", "delete"), allowNull: false },
    checksum: { type: DataTypes.STRING(120), allowNull: true },
    status: { type: DataTypes.ENUM("queued", "processing", "synced", "conflict", "failed"), allowNull: false, defaultValue: "queued" },
    lastError: { type: DataTypes.STRING(255), allowNull: true },
    retryCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    syncedAt: { type: DataTypes.DATE, allowNull: true },
  }, { tableName: "sync_logs", paranoid: true, underscored: true });
};
