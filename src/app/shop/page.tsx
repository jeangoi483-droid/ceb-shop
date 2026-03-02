'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '../../data/products';
import { useCart } from '../../lib/store';

export default function MontresPage() {
    const addToCart = useCart((state) => state.addToCart);

    // On filtre uniquement les montres
    const montres = mockProducts.filter((p) => p.category === 'montre');

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
            {/* ENTÊTE PAGE MONTRES */}
            <header className="mb-16 text-center">
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Collection Montres</span>
                <h1 className="text-5xl font-black mb-4 text-gray-900 uppercase italic">
                    Nos <span className="text-indigo-400">Montres</span>
                </h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Découvrez notre sélection de montres de luxe, design et précision à chaque instant.
                </p>
            </header>

            {/* GRILLE PRODUITS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {montres.map((product) => (
                    <div key={product.id} className="group relative bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl transition-all duration-500">
                        <div className="relative h-80 w-full mb-6 overflow-hidden rounded-2xl bg-gray-50">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Logo panier */}
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="absolute top-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-black transition-all active:scale-90"
                                title="Ajouter au panier"
                            >
                                🛒
                            </button>
                        </div>
                        <div className="px-2 pb-2">
                            <Link
                                href={`/product/${product.id}`}
                                className="font-bold text-xl text-gray-900 hover:text-indigo-600 transition-colors"
                            >
                                {product.name}
                            </Link>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-indigo-600 font-black text-xl">
                                    {product.price.toLocaleString()} <span className="text-sm">XOF</span>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
