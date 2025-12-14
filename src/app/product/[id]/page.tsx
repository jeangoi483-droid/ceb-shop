'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockProducts } from '../../../data/products';
import { useCart } from '../../../lib/store';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const addToCart = useCart((state) => state.addToCart);

    // Recherche du produit par ID dans le fichier mock
    const product = mockProducts.find((p) => String(p.id) === params.id);

    if (!product) {
        notFound();
    }

    const handleAddToCart = () => {
        addToCart({
            id: String(product.id),
            name: product.name,
            price: product.price,
            image: product.image,
        });
        alert(`"${product.name}" ajouté au panier !`);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-12 pt-24">
            <Link href="/shop" className="text-indigo-600 hover:text-indigo-800 font-medium mb-8 inline-flex items-center gap-2">
                ← Retour à la collection
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
                {/* Section Image */}
                <div className="relative h-[400px] md:h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Section Informations */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        {product.name}
                    </h1>
                    
                    <div className="inline-block bg-indigo-50 text-indigo-700 font-bold text-2xl px-4 py-2 rounded-lg mb-8">
                        {product.price.toLocaleString()} XAF
                    </div>
                    
                    <div className="border-t border-b border-gray-100 py-8 mb-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-3">Description du produit</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-200 active:scale-95 flex items-center justify-center gap-3"
                    >
                        <span>Ajouter au panier</span>
                        <span className="text-2xl">🛒</span>
                    </button>
                    
                    <p className="text-center text-gray-400 text-sm mt-6 flex items-center justify-center gap-2">
                        🛡️ Paiement sécurisé • 🚚 Livraison rapide
                    </p>
                </div>
            </div>
        </div>
    );
}
