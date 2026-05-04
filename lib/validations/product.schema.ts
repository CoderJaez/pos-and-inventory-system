import { z } from "zod";

export const unitEnum = z.enum(["piece", "pack", "kilo", "sachet"]);

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  sku: z.string().min(2, "SKU is required"),
  categoryId: z.string().uuid().optional(),
  supplierId: z.string().uuid().optional(),
  sellingPrice: z.coerce.number().positive(),
  costPrice: z.coerce.number().nonnegative(),
  stock: z.coerce.number().nonnegative(),
  unit: unitEnum,
  lowStockThreshold: z.coerce.number().int().nonnegative().default(5),
});

export type ProductInput = z.infer<typeof productSchema>;
