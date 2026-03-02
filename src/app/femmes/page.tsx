// src/app/shop/page.tsx ou src/app/femmes/page.tsx

'use client';
import React from "react";
import { mockProduct } from "../../data/product"; // ou mockProduct pour femmes
import Link from "next/link";
import Image from "next/image";

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 pt-24">
      {/* ENTÊTE AVEC DESIGN */}
      <header className="mb-16 text-center relative">
        <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">
          Collection Luxe
        </span>
        <h1 className="text-5xl font-black mb-4 text-gray-900 uppercase italic drop-shadow-md">
          Nos Produits
        </h1>
        <p className="text-gray-600 text-lg">
          Découvrez notre sélection exclusive de montres et accessoires.
        </p>

        {/* Séparateur décoratif */}
        <div className="mt-4 w-24 h-1 bg-indigo-600 mx-auto rounded-full shadow-lg"></div>
      </header>

      {/* GRILLE PRODUITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {mockProducts.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <Link href={`/product/${item.id}`}>
              <div className="relative w-full h-64">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/product/${item.id}`} className="font-bold text-lg hover:text-indigo-600">
                {item.name}
              </Link>
              <p className="text-indigo-600 font-semibold mt-1">{item.price} XOF</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
