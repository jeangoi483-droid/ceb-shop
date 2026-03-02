'use client';

import React from 'react';
import { mockProducts } from '../../data/products';
import ProductCard from '../../components/ProductCard';

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 pt-24">
      <header className="mb-16 text-center">
        <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Collection Montres</span>
        <h1 className="text-5xl font-black mb-4 text-gray-900 uppercase italic">Nos Montres</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
