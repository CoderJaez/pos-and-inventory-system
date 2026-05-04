"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export function StockAdjustForm({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState("Restock");

  const submitAdjust = async () => {
    const response = await fetch("/api/inventory/adjust", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity, reason }),
    });

    if (!response.ok) {
      void Swal.fire("Error", "Failed to update stock", "error");
      return;
    }

    void Swal.fire("Updated", "Stock adjusted", "success");
  };

  return (
    <div className="mt-2 flex gap-2">
      <input value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} type="number" step="0.001" className="w-24 rounded border p-2" />
      <input value={reason} onChange={(e) => setReason(e.target.value)} className="flex-1 rounded border p-2" />
      <button onClick={submitAdjust} className="rounded bg-zinc-800 px-3 py-2 text-white">Adjust</button>
    </div>
  );
}
