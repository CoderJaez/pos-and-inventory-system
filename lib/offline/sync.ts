"use client";

import { getOfflineQueue, removeOfflineSale } from "@/lib/offline/offline-queue";

export async function syncOfflineSales() {
  const queue = getOfflineQueue();
  if (!navigator.onLine || queue.length === 0) return { synced: 0, failed: 0 };

  let synced = 0;
  let failed = 0;

  for (const sale of queue) {
    try {
      const res = await fetch("/api/sync/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sale),
      });
      if (!res.ok) throw new Error("sync failed");
      removeOfflineSale(sale.offlineReference);
      synced += 1;
    } catch {
      failed += 1;
    }
  }

  return { synced, failed };
}
