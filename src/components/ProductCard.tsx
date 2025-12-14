'use client'; // <-- TRÈS IMPORTANT : Doit être la toute première ligne

import React from 'react';
import Link from 'next/link';
import { formatPrice } from '../lib/format';
import { useCart } from '../lib/store'; // <-- On importe notre magasin de données

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductProps) {
  // On récupère la fonction "addToCart" depuis notre store Zustand
  const addToCart = useCart((state) => state.addToCart);

  return (
    <div className="group relative bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:h-80">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{category}</p>
        <h3 className="text-sm font-semibold text-gray-700">
          {/* Note : On retire la span absolute inset-0 si on veut que le bouton soit cliquable séparément */}
          <Link href={`/product/${id}`}>
            {name}
          </Link>
        </h3>
        <p className="mt-1 text-lg font-bold text-gray-900">{formatPrice(price)}</p>
      </div>

      <div className="px-4 pb-4">
        <button
          /* AU CLIC : On envoie les infos du produit au panier */
          onClick={() => addToCart({ id, name, price, image })}
          className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors active:scale-95"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}