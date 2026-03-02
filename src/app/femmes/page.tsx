'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '../../data/products';
import { useCart } from '../../lib/store';

export default function FemmesPage() {
  const addToCart = useCart((state) => state.addToCart);
  const produitsFemme = mockProducts.filter((p) => p.category === 'femme');

  return (
    <div className="max-w-7xl mx-auto p-8 pt-24">
      <header className="mb-16 text-center">
        <span className="text-pink-600 font-bold tracking-widest uppercase text-sm">Collection Femme</span>
        <h1 className="text-5xl font-black mb-4 text-gray-900 uppercase italic">
          Nos <span className="text-pink-400">Produits Femme</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Sélection de produits pour femme, élégance et style au quotidien.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {produitsFemme.map((product) => (
          <div key={product.id} className="group relative bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl transition-all duration-500">
            <button
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className="absolute top-6 right-6 z-30 bg-pink-600 text-white p-3 rounded-full hover:bg-black shadow-lg transition"
            >
              🛒
            </button>

            <div className="relative h-80 w-full mb-6 overflow-hidden rounded-2xl bg-gray-50">
              <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>

            <div className="px-2 pb-2">
              <h3 className="font-bold text-xl text-gray-900 mb-1">{product.name}</h3>
              <span className="text-pink-600 font-black text-xl">{product.price.toLocaleString()} <span className="text-sm">XOF</span></span>
              <Link href={`/product/${product.id}`} className="block mt-4 text-center bg-gray-100 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                Détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
