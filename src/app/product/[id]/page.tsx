'use client';

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { mockProducts } from "../../../data/products";
import { mockProduct } from "../../../data/product";
import { useCart } from "../../../lib/store";

export default function ProductDetail() {
  const { id } = useParams();
  const allItems = [...mockProducts, ...mockProduct];
  const product = allItems.find((p) => p.id === id);

  if (!product) return <p>Produit introuvable</p>;

  const addToCart = useCart((state) => state.addToCart);

  return (
    <div className="max-w-4xl mx-auto p-8 pt-24">
      <div className="relative w-full h-96">
        <Image src={product.image} alt={product.name} fill className="object-cover rounded-xl" />
      </div>
      <h1 className="text-4xl font-bold mt-6">{product.name}</h1>
      <p className="text-indigo-600 text-xl font-bold">{product.price} XOF</p>
      <p className="mt-4 text-gray-700">{product.description}</p>
      <button
        onClick={() => addToCart({...product, quantity: 1})}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold"
      >
        🛒 Ajouter au panier
      </button>
    </div>
  );
}
