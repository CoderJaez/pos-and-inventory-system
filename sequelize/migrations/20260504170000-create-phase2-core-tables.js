"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { UUID, UUIDV4, STRING, DATE, DECIMAL, BOOLEAN, ENUM, INTEGER } = Sequelize;

    await queryInterface.createTable("users", {
      id: { type: UUID, defaultValue: UUIDV4, allowNull: false, primaryKey: true },
      full_name: { type: STRING(120), allowNull: false },
      username: { type: STRING(60), allowNull: false, unique: true },
      role: { type: ENUM("owner", "cashier", "staff"), allowNull: false, defaultValue: "cashier" },
      is_active: { type: BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      deleted_at: { type: DATE, allowNull: true },
    });

    await queryInterface.createTable("categories", {
      id: { type: UUID, defaultValue: UUIDV4, allowNull: false, primaryKey: true },
      name: { type: STRING(80), allowNull: false, unique: true },
      description: { type: STRING(255), allowNull: true },
      created_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      deleted_at: { type: DATE, allowNull: true },
    });

    await queryInterface.createTable("suppliers", {
      id: { type: UUID, defaultValue: UUIDV4, allowNull: false, primaryKey: true },
      name: { type: STRING(120), allowNull: false },
      contact_person: { type: STRING(120), allowNull: true },
      phone: { type: STRING(30), allowNull: true },
      address: { type: STRING(255), allowNull: true },
      created_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      deleted_at: { type: DATE, allowNull: true },
    });

    await queryInterface.createTable("products", {
      id: { type: UUID, defaultValue: UUIDV4, allowNull: false, primaryKey: true },
      name: { type: STRING(120), allowNull: false },
      sku: { type: STRING(80), allowNull: false, unique: true },
      barcode: { type: STRING(80), allowNull: true },
      unit: { type: ENUM("piece", "pack", "kilo", "sachet"), allowNull: false },
      stock_quantity: { type: DECIMAL(12, 3), allowNull: false, defaultValue: 0 },
      cost_price: { type: DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
      selling_price: { type: DECIMAL(12, 2), allowNull: false },
      low_stock_threshold: { type: DECIMAL(12, 3), allowNull: false, defaultValue: 5 },
      is_active: { type: BOOLEAN, allowNull: false, defaultValue: true },
      category_id: {
        type: UUID,
        allowNull: true,
        references: { model: "categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      supplier_id: {
        type: UUID,
        allowNull: true,
        references: { model: "suppliers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      deleted_at: { type: DATE, allowNull: true },
    });

    await queryInterface.createTable("sales", {
      id: { type: UUID, defaultValue: UUIDV4, allowNull: false, primaryKey: true },
      receipt_number: { type: STRING(40), allowNull: false, unique: true },
      sale_datetime: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      subtotal_amount: { type: DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
      discount_amount: { type: DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
      total_amount: { type: DECIMAL(12, 2), allowNull: false },
      notes: { type: STRING(255), allowNull: true },
      sync_status: { type: ENUM("pending", "synced", "failed"), allowNull: false, defaultValue: "pending" },
      offline_reference: { type: STRING(80), unique: true, allowNull: true },
      user_id: {
        type: UUID,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      deleted_at: { type: DATE, allowNull: true },
    });

    await queryInterface.createTable("sale_items", {
      id: { type: UUID, defaultValue: UUIDV4, allowNull: false, primaryKey: true },
      quantity: { type: DECIMAL(12, 3), allowNull: false },
      unit: { type: ENUM("piece", "pack", "kilo", "sachet", "tingi"), allowNull: false },
      unit_price: { type: DECIMAL(12, 2), allowNull: false },
      line_total: { type: DECIMAL(12, 2), allowNull: false },
      is_manual_price: { type: BOOLEAN, allowNull: false, defaultValue: false },
      sale_id: {
        type: UUID,
        allowNull: false,
        references: { model: "sales", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      product_id: {
        type: UUID,
        allowNull: false,
        references: { model: "products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      created_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      deleted_at: { type: DATE, allowNull: true },
    });

    await queryInterface.createTable("payments", {
      id: { type: UUID, defaultValue: UUIDV4, allowNull: false, primaryKey: true },
      method: { type: ENUM("cash", "gcash", "ewallet"), allowNull: false },
      amount: { type: DECIMAL(12, 2), allowNull: false },
      cash_received: { type: DECIMAL(12, 2), allowNull: true },
      change_amount: { type: DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
      reference_number: { type: STRING(100), allowNull: true },
      paid_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      sale_id: {
        type: UUID,
        allowNull: false,
        references: { model: "sales", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      deleted_at: { type: DATE, allowNull: true },
    });

    await queryInterface.createTable("inventory_movements", {
      id: { type: UUID, defaultValue: UUIDV4, allowNull: false, primaryKey: true },
      movement_type: { type: ENUM("stock_in", "stock_out", "adjustment", "sale_deduction", "return"), allowNull: false },
      quantity: { type: DECIMAL(12, 3), allowNull: false },
      unit_cost: { type: DECIMAL(12, 2), allowNull: true },
      reason: { type: STRING(255), allowNull: true },
      reference_type: { type: STRING(40), allowNull: true },
      reference_id: { type: UUID, allowNull: true },
      occurred_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      product_id: {
        type: UUID,
        allowNull: false,
        references: { model: "products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      supplier_id: {
        type: UUID,
        allowNull: true,
        references: { model: "suppliers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      deleted_at: { type: DATE, allowNull: true },
    });

    await queryInterface.createTable("sync_logs", {
      id: { type: UUID, defaultValue: UUIDV4, allowNull: false, primaryKey: true },
      entity_type: { type: STRING(60), allowNull: false },
      entity_id: { type: UUID, allowNull: false },
      action: { type: ENUM("create", "update", "delete"), allowNull: false },
      checksum: { type: STRING(120), allowNull: true },
      status: { type: ENUM("queued", "processing", "synced", "conflict", "failed"), allowNull: false, defaultValue: "queued" },
      last_error: { type: STRING(255), allowNull: true },
      retry_count: { type: INTEGER, allowNull: false, defaultValue: 0 },
      synced_at: { type: DATE, allowNull: true },
      created_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      deleted_at: { type: DATE, allowNull: true },
    });

    await queryInterface.addIndex("products", ["name"]);
    await queryInterface.addIndex("products", ["category_id"]);
    await queryInterface.addIndex("products", ["supplier_id"]);
    await queryInterface.addIndex("products", ["is_active"]);

    await queryInterface.addIndex("sales", ["sale_datetime"]);
    await queryInterface.addIndex("sales", ["sync_status"]);
    await queryInterface.addIndex("sales", ["user_id"]);

    await queryInterface.addIndex("sale_items", ["sale_id"]);
    await queryInterface.addIndex("sale_items", ["product_id"]);

    await queryInterface.addIndex("payments", ["sale_id"]);
    await queryInterface.addIndex("payments", ["method"]);

    await queryInterface.addIndex("inventory_movements", ["product_id"]);
    await queryInterface.addIndex("inventory_movements", ["supplier_id"]);
    await queryInterface.addIndex("inventory_movements", ["occurred_at"]);

    await queryInterface.addIndex("sync_logs", ["entity_type", "entity_id"]);
    await queryInterface.addIndex("sync_logs", ["status"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("sync_logs");
    await queryInterface.dropTable("inventory_movements");
    await queryInterface.dropTable("payments");
    await queryInterface.dropTable("sale_items");
    await queryInterface.dropTable("sales");
    await queryInterface.dropTable("products");
    await queryInterface.dropTable("suppliers");
    await queryInterface.dropTable("categories");
    await queryInterface.dropTable("users");
  },
};
