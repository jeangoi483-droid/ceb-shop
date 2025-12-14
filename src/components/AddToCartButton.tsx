'use client';

import { useCart } from '../lib/store';
import { formatPrice } from '../lib/format';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-10 w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
    >
      Ajouter au panier — {formatPrice(product.price)}
    </button>
  );
}