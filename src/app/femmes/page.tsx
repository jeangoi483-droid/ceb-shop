'use client';

import React from 'react';
import { mockProduct } from '../../data/product';
import ProductCard from '../../components/ProductCard';

export default function FemmesPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 pt-24">
      <header className="mb-16 text-center">
        <span className="text-pink-600 font-bold tracking-widest uppercase text-sm">Collection Femme</span>
        <h1 className="text-5xl font-black mb-4 text-gray-900 uppercase italic">Nos Chaussures</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProduct.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
