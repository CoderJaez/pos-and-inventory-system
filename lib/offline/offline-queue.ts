"use client";

export type OfflineSalePayload = {
  offlineReference: string;
  items: { productId: string; quantity: number; unitPrice: number; unit: string; manualPrice?: boolean }[];
  paymentMethod: "cash" | "gcash";
  cashReceived?: number;
  createdAt: string;
};

const KEY = "sari_pos_offline_sales_queue_v1";

export function getOfflineQueue(): OfflineSalePayload[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as OfflineSalePayload[]; } catch { return []; }
}

export function pushOfflineSale(payload: OfflineSalePayload) {
  const list = getOfflineQueue();
  const exists = list.find((x) => x.offlineReference === payload.offlineReference);
  if (exists) return;
  localStorage.setItem(KEY, JSON.stringify([...list, payload]));
}

export function removeOfflineSale(reference: string) {
  const list = getOfflineQueue().filter((x) => x.offlineReference !== reference);
  localStorage.setItem(KEY, JSON.stringify(list));
}
