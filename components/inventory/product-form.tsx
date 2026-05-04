"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { productSchema, type ProductInput } from "@/lib/validations/product.schema";

export function ProductForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: { unit: "piece", stock: 0, lowStockThreshold: 5, costPrice: 0 },
  });

  const onSubmit = async (values: ProductInput) => {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      void Swal.fire("Error", "Failed to save product", "error");
      return;
    }

    void Swal.fire("Saved", "Product added successfully", "success");
    router.push("/inventory");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-xl border bg-white p-4">
      <input {...register("name")} placeholder="Product name" className="w-full rounded-lg border p-3" />
      <p className="text-xs text-red-600">{errors.name?.message}</p>
      <input {...register("sku")} placeholder="SKU" className="w-full rounded-lg border p-3" />
      <input type="number" step="0.01" {...register("sellingPrice")} placeholder="Selling price" className="w-full rounded-lg border p-3" />
      <input type="number" step="0.01" {...register("costPrice")} placeholder="Cost price" className="w-full rounded-lg border p-3" />
      <input type="number" step="0.001" {...register("stock")} placeholder="Starting stock" className="w-full rounded-lg border p-3" />
      <select {...register("unit")} className="w-full rounded-lg border p-3">
        <option value="piece">Piece</option><option value="pack">Pack</option><option value="kilo">Kilo</option><option value="sachet">Sachet</option>
      </select>
      <button disabled={isSubmitting} className="w-full rounded-lg bg-green-600 p-3 font-semibold text-white">{isSubmitting ? "Saving..." : "Save Product"}</button>
    </form>
  );
}
