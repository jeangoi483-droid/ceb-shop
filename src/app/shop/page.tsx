// src/app/products/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { mockProduct } from "../../data/products";
import { useCart } from "../../store/store";

const ProductsPage = () => {
  const { addToCart } = useCart();

  // Filtrer uniquement les montres (category = "Luxe")
  const watches = mockProduct.filter(
    (p) => p.category && p.category.toLowerCase() === "luxe"
  );

  return (
    <div className="max-w-7xl mx-auto p-8 pt-24">
      <header className="mb-16 text-center">
        <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">
          Collection Montres
        </span>
        <h1 className="text-5xl font-black mb-4 text-gray-900 uppercase italic">
          Nos Montres Luxe
        </h1>
        <p className="text-gray-600 text-lg">
          Découvrez notre sélection de montres haut de gamme pour hommes et femmes.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watches.map((product) => (
          <div
            key={product.id}
            className="relative border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <Link href={`/product/${product.id}`}>
              <a>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover mb-4 rounded"
                />
              </a>
            </Link>

            {/* Logo panier */}
            <button
              onClick={() => addToCart(product)}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-pink-600 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h14l-1.5 8H6L7 13zm0 0L5.4 5M7 13l-1.5-8M7 13h14"
                />
              </svg>
            </button>

            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/product/${product.id}`}>
                <a className="hover:text-pink-600">{product.name}</a>
              </Link>
            </h2>
            <p className="text-gray-700 mb-2">
              {product.description.substring(0, 60)}...
            </p>
            <span className="text-lg font-bold">{product.price} FCFA</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
