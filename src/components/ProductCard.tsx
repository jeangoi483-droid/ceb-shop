'use client';

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCart } from "../lib/store";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col gap-4">
      <div className="relative w-full h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Nom cliquable */}
      <Link href={`/product/${product.id}`} className="font-bold text-lg hover:text-indigo-600">
        {product.name}
      </Link>

      <p className="text-indigo-600 font-bold">{product.price} XOF</p>
      <p className="text-gray-500 text-sm line-clamp-3">{product.description}</p>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => addToCart({ ...product, quantity: 1 })}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold"
        >
          🛒 Ajouter au panier
        </button>

        <Link
          href={`/product/${product.id}`}
          className="px-4 py-2 border rounded-xl hover:bg-gray-100"
        >
          Détails
        </Link>
      </div>
    </div>
  );
}
