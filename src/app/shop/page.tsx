'use client';

import React from "react";
import ProductCard from "../../components/ProductCard";
import { mockProducts } from "../../data/products";

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 pt-24">
      <h1 className="text-4xl font-black mb-8">Montres</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
