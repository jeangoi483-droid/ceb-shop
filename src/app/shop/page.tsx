'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '../../data/products';
import { useCart } from '../../lib/store';

export default function WatchesPage() {
    const addToCart = useCart((state) => state.addToCart);

    // On récupère uniquement les montres
    const watches = mockProducts.filter((product) => product.category === 'Montre');

    const handleAddToCart = (product: any) => {
        addToCart({
            id: String(product.id),
            name: product.name,
            price: Number(product.price),
            image: product.image,
        });
        alert(`✨ ${product.name} ajouté au panier.`);
    };

    return (
        <div className="max-w-7xl mx-auto p-8 pt-24">
            {/* HERO SECTION MONTRES */}
            <div className="relative bg-gray-100 rounded-[40px] overflow-hidden mb-16 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-transparent z-10"></div>
                <div className="relative z-20 p-12 md:p-20 flex flex-col items-center text-center">
                    <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
                        Collection Montres
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 italic uppercase tracking-tighter">
                        Nos <span className="text-indigo-600">Montres</span>
                    </h1>
                    <p className="text-gray-700 max-w-xl text-lg font-light leading-relaxed">
                        Explorez notre sélection de montres élégantes et de précision, adaptées à tous les styles.
                    </p>
                </div>
            </div>

            {/* GRILLE DES PRODUITS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {watches.map((product) => (
                    <div key={product.id} className="group relative bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl transition-all duration-500">
                        <div className="relative h-80 w-full mb-6 overflow-hidden rounded-2xl bg-gray-50">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>

                        <div className="px-2 pb-2">
                            <h3 className="font-bold text-xl text-gray-900 mb-1">{product.name}</h3>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-indigo-600 font-black text-xl">
                                    {product.price.toLocaleString()} <span className="text-sm">XOF</span>
                                </span>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-indigo-600 text-white rounded-xl px-4 py-2 hover:bg-black transition-all shadow-lg active:scale-90"
                                >
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
