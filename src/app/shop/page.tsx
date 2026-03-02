'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '../../data/products';
import { useCart } from '../../lib/store';

export default function WatchesPage() {
    const addToCart = useCart((state) => state.addToCart);

    // On filtre juste les montres
    const watches = mockProducts.filter((p) => p.category === 'Montre');

    const handleAddToCart = (product: any) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
        alert(`${product.name} ajouté au panier`);
    };

    return (
        <div className="max-w-7xl mx-auto p-8 pt-24">
            <h1 className="text-4xl font-bold text-center mb-12">Nos Montres</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {watches.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow p-4 group">
                        <Link href={`/product/${product.id}`}>
                            <div className="relative w-full h-72 mb-4 overflow-hidden rounded-lg group-hover:scale-105 transition-transform">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </Link>
                        <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                        <p className="font-bold text-indigo-600 mb-4">{product.price.toLocaleString()} XOF</p>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Ajouter au panier
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
