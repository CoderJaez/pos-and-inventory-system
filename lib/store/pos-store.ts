"use client";

import { create } from "zustand";

type CartItem = {
  productId: string;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  manualPrice: boolean;
};

type PosState = {
  items: CartItem[];
  paymentMethod: "cash" | "gcash";
  setPaymentMethod: (method: "cash" | "gcash") => void;
  addItem: (item: Omit<CartItem, "quantity" | "manualPrice">) => void;
  setQuantity: (productId: string, quantity: number) => void;
  setUnitPrice: (productId: string, price: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

export const usePosStore = create<PosState>((set) => ({
  items: [],
  paymentMethod: "cash",
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  addItem: (item) => set((state) => {
    const existing = state.items.find((x) => x.productId === item.productId);
    if (existing) return { items: state.items.map((x) => x.productId === item.productId ? { ...x, quantity: x.quantity + 1 } : x) };
    return { items: [...state.items, { ...item, quantity: 1, manualPrice: false }] };
  }),
  setQuantity: (productId, quantity) => set((state) => ({ items: state.items.map((x) => x.productId === productId ? { ...x, quantity } : x) })),
  setUnitPrice: (productId, unitPrice) => set((state) => ({ items: state.items.map((x) => x.productId === productId ? { ...x, unitPrice, manualPrice: true } : x) })),
  removeItem: (productId) => set((state) => ({ items: state.items.filter((x) => x.productId !== productId) })),
  clear: () => set({ items: [] }),
}));
