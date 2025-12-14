'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '../../data/products';
import { useCart } from '../../lib/store';

export default function NewArrivalsPage() {
    const addToCart = useCart((state) => state.addToCart);

    // On prend par exemple les 4 derniers produits ajoutés
    const newProducts = mockProducts.slice(-4); 

    return (
        <div className="max-w-7xl mx-auto p-8 pt-24">
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-12 mb-12 text-white text-center">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Exclusivité</span>
                <h1 className="text-4xl md:text-6xl font-black mt-4 mb-4 italic">NOUVELLES ARRIVÉES</h1>
                <p className="text-indigo-200 text-lg">Découvrez les dernières tendances de l'horlogerie mondiale.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {newProducts.map((product) => (
                    <div key={product.id} className="group relative bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl transition-all">
                        <div className="relative h-72 w-full mb-4 overflow-hidden rounded-2xl">
                            <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                            <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-black text-indigo-600 shadow-sm">
                                NOUVEAU
                            </div>
                        </div>
                        <h3 className="font-bold text-xl mb-1">{product.name}</h3>
                        <p className="text-indigo-600 font-black text-lg mb-4">{product.price.toLocaleString()} XAF</p>
                        <Link href={`/product/${product.id}`} className="block text-center bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors">
                            Voir le modèle
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
