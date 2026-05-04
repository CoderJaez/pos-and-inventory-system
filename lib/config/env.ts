import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive(),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string(),
  DB_DIALECT: z.literal("mysql").default("mysql"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Sari-Sari POS"),
  NEXT_PUBLIC_SYNC_INTERVAL_MS: z.coerce.number().int().positive().default(30_000),
});

export const env = envSchema.parse(process.env);
