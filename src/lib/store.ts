// src/lib/store.ts
import { create } from 'zustand';

// Définition d'un article dans le panier
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Définition de l'état du panier
interface CartState {
  items: CartItem[];
  // Omit permet de s'assurer que 'quantity' n'est pas passée lors de l'appel à addToCart
  addToCart: (product: Omit<CartItem, 'quantity'>) => void; 
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  
  // NOUVEAU: Déclaration de la fonction pour obtenir le prix total
  getTotalPrice: () => number; 
}

// NOTE: Ajout de 'get' dans create<CartState>((set, get) => ...) pour accéder à l'état actuel (items)
export const useCart = create<CartState>((set, get) => ({
  items: [],
  
  // Fonction pour ajouter au panier
  addToCart: (product) => set((state) => {
    const existingItem = state.items.find((item) => item.id === product.id);
    
    if (existingItem) {
      // Si l'objet existe déjà, on augmente la quantité
      return {
        items: state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    
    // Sinon, on ajoute le nouveau produit avec quantité = 1
    return { items: [...state.items, { ...product, quantity: 1 }] as CartItem[] }; 
  }),

  removeFromCart: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  clearCart: () => set({ items: [] }),
  
  // NOUVELLE IMPLÉMENTATION : Calcule la somme des prix * quantités
  getTotalPrice: () => {
    // get().items permet d'accéder au tableau des articles pour le calcul
    const items = get().items;
    // Utilise reduce() pour sommer (prix * quantité) de chaque article
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));