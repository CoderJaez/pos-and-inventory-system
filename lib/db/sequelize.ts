import { Sequelize } from "sequelize";
import { env } from "@/lib/config/env";

export const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: "mysql",
  logging: env.NODE_ENV === "development" ? console.log : false,
  timezone: "+08:00",
});

export async function assertDatabaseConnection() {
  await sequelize.authenticate();
}
