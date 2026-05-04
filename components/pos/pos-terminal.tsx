"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { usePosStore } from "@/lib/store/pos-store";

type Product = { id: string; name: string; unit: string; sellingPrice: number; stockQuantity: number };

export function PosTerminal({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [cashReceived, setCashReceived] = useState(0);
  const { items, addItem, setQuantity, setUnitPrice, removeItem, paymentMethod, setPaymentMethod, clear } = usePosStore();

  const filtered = useMemo(() => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())), [products, search]);
  const total = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const change = paymentMethod === "cash" ? Math.max(0, cashReceived - total) : 0;

  const checkout = async () => {
    const res = await fetch("/api/sales", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items, paymentMethod, cashReceived }) });
    if (!res.ok) return void Swal.fire("Error", "Checkout failed", "error");
    void Swal.fire("Sale Complete", `Total ₱${total.toFixed(2)} | Change ₱${change.toFixed(2)}`, "success");
    clear();
    setCashReceived(0);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-xl border bg-white p-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search product" className="mb-3 w-full rounded-lg border p-3" />
        <div className="grid grid-cols-2 gap-2">
          {filtered.map((p) => (
            <button key={p.id} onClick={() => addItem({ productId: p.id, name: p.name, unit: p.unit, unitPrice: Number(p.sellingPrice) })} className="rounded-lg border p-3 text-left active:scale-[0.99]">
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-zinc-500">₱{Number(p.sellingPrice).toFixed(2)} · {p.unit}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-3">
        <h2 className="mb-2 text-lg font-bold">Cart</h2>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.productId} className="rounded border p-2">
              <p className="font-medium">{item.name}</p>
              <div className="mt-1 flex gap-2">
                <input type="number" step="0.001" value={item.quantity} onChange={(e) => setQuantity(item.productId, Number(e.target.value))} className="w-20 rounded border p-1" />
                <input type="number" step="0.01" value={item.unitPrice} onChange={(e) => setUnitPrice(item.productId, Number(e.target.value))} className="w-24 rounded border p-1" />
                <button onClick={() => removeItem(item.productId)} className="rounded bg-red-100 px-2 text-red-700">x</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-2 border-t pt-3">
          <div className="flex gap-2">
            <button onClick={() => setPaymentMethod("cash")} className={`rounded px-3 py-2 ${paymentMethod === "cash" ? "bg-green-600 text-white" : "bg-zinc-100"}`}>Cash</button>
            <button onClick={() => setPaymentMethod("gcash")} className={`rounded px-3 py-2 ${paymentMethod === "gcash" ? "bg-green-600 text-white" : "bg-zinc-100"}`}>GCash</button>
          </div>
          {paymentMethod === "cash" && <input type="number" value={cashReceived} onChange={(e) => setCashReceived(Number(e.target.value))} placeholder="Cash received" className="w-full rounded border p-2" />}
          <p className="text-lg font-bold">Total: ₱{total.toFixed(2)}</p>
          {paymentMethod === "cash" && <p>Change: ₱{change.toFixed(2)}</p>}
          <button onClick={checkout} disabled={items.length === 0} className="w-full rounded-lg bg-green-600 p-3 font-semibold text-white disabled:bg-zinc-300">Complete Sale</button>
        </div>
      </section>
    </div>
  );
}
