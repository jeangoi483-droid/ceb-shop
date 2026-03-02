import { create } from 'zustand';

export interface CartItem {
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

export const useCart = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (item: CartItem) => {
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        // Si l'item existe déjà, on incrémente la quantité
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      } else {
        // Sinon, on l'ajoute
        return { cart: [...state.cart, { ...item }] };
      }
    });
  },

  removeFromCart: (id: string) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id: string, quantity: number) => {
    if (quantity < 1) quantity = 1;
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ cart: [] });
  },
}));
