import Link from "next/link";
import { listProducts } from "@/lib/server/product-actions";
import { StockAdjustForm } from "@/components/inventory/stock-adjust-form";

export default async function InventoryPage() {
  const products = await listProducts();

  return (
    <main className="mx-auto w-full max-w-4xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Link href="/inventory/new" className="rounded-lg bg-green-600 px-4 py-2 text-white">+ Add Product</Link>
      </div>

      <div className="space-y-3">
        {products.map((product) => {
          const low = Number(product.stockQuantity) <= Number(product.lowStockThreshold);
          return (
            <article key={product.id} className="rounded-xl border bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-sm text-zinc-500">{product.sku} · {product.unit}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${low ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                  Stock: {product.stockQuantity}
                </span>
              </div>
              <StockAdjustForm productId={product.id} />
            </article>
          );
        })}
        {products.length === 0 && <p className="rounded-xl border bg-white p-4 text-sm text-zinc-500">No products yet. Tap “Add Product”.</p>}
      </div>
    </main>
  );
}
