import { ProductForm } from "@/components/inventory/product-form";

export default function NewProductPage() {
  return (
    <main className="mx-auto w-full max-w-xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Add Product</h1>
      <ProductForm />
    </main>
  );
}
