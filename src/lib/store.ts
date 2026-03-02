'use client';
import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  addToCart: (product: Product) =>
    set((state) => {
      const exists = state.items.find((p) => p.id === product.id);
      if (exists) {
        return {
          items: state.items.map((p) =>
            p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
          ),
        };
      } else {
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }
    }),
  removeFromCart: (id: string) =>
    set((state) => ({
      items: state.items.filter((p) => p.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}));
