import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const exist = state.cart.find((i) => i.id === item.id);
      if (exist) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          )
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === id
          ? { ...i, quantity: quantity < 1 ? 1 : quantity }
          : i
      )
    })),
  clearCart: () => set({ cart: [] })
}));
