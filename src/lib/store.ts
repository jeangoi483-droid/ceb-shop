import { create } from "zustand";

export const useStore = create((set) => ({
  cart: [],

  addToCart: (product: any) =>
    set((state: any) => {
      const existing = state.cart.find(
        (item: any) => item.id === product.id
      );

      if (existing) {
        return {
          cart: state.cart.map((item: any) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),
}));
