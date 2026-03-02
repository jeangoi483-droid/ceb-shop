'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '../../data/products';
import { useCart } from '../../lib/store';

export default function WatchesPage() {
    const addToCart = useCart((state) => state.addToCart);

    const watches = mockProducts.filter((product) => product.category === 'montre');

    const handleAddToCart = (product: any) => {
        addToCart({
            id: String(product.id),
            name: product.name,
            price: Number(product.price),
            image: product.image,
        });
        alert(`✨ ${product.name} ajouté au panier !`);
    };

    return (
        <div className="max-w-7xl mx-auto p-8 pt-24">
            <header className="mb-16 text-center">
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Collection Montres</span>
                <h1 className="text-5xl font-black mb-4 text-gray-900 uppercase italic">
                    Montres de Prestige
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Découvrez nos montres sélectionnées avec soin, alliant design audacieux et précision inégalée.
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {watches.map((product) => (
                    <div key={product.id} className="group relative bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl transition-all duration-500">
                        <div className="relative h-80 w-full mb-6 overflow-hidden rounded-2xl bg-gray-50">
                            <Link href={`/product/${product.id}`}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* LOGO PANIER sur l'image */}
                                <button
                                    onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                                    className="absolute bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-black transition-all"
                                >
                                    🛒
                                </button>
                            </Link>
                        </div>

                        <h3 className="font-bold text-xl text-gray-900 mb-1">
                            <Link href={`/product/${product.id}`} className="hover:text-indigo-600 transition-colors">
                                {product.name}
                            </Link>
                        </h3>
                        <div className="flex items-center justify-between">
                            <span className="text-indigo-600 font-black text-xl">
                                {product.price.toLocaleString()} <span className="text-sm">XOF</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
