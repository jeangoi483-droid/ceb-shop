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
            const existing = state.items.find((p) => p.id === product.id);
            if (existing) {
                // si le produit existe déjà, on augmente la quantité
                return {
                    items: state.items.map((p) =>
                        p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                    ),
                };
            } else {
                // sinon on ajoute le produit avec quantité = 1
                return { items: [...state.items, { ...product, quantity: 1 }] };
            }
        }),
    removeFromCart: (id: string) =>
        set((state) => ({
            items: state.items.filter((p) => p.id !== id),
        })),
    clearCart: () => set({ items: [] }),
}));
