import { PosTerminal } from "@/components/pos/pos-terminal";
import { listProducts } from "@/lib/server/product-actions";

export default async function PosPage() {
  const products = await listProducts();
  const mapped = products.map((p) => ({
    id: p.id,
    name: p.name,
    unit: p.unit,
    sellingPrice: Number(p.sellingPrice),
    stockQuantity: Number(p.stockQuantity),
  }));

  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">POS Checkout</h1>
      <PosTerminal products={mapped} />
    </main>
  );
}
