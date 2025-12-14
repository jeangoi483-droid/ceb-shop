'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockProducts } from '../../../data/products';
import { useCart } from '../../../lib/store';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const addToCart = useCart((state) => state.addToCart);

    // On cherche le produit dans notre fichier de données au lieu de la base de données
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
        <div className="max-w-6xl mx-auto p-8 pt-20">
            <Link href="/shop" className="text-indigo-600 hover:underline mb-8 inline-block">
                ← Retour à la boutique
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
                {/* Image */}
                <div className="relative h-[400px] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                    <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover"
                    />
                </div>

                {/* Infos */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-3xl font-extrabold text-indigo-600 mb-6">{product.price} XAF</p>
                    
                    <div className="bg-gray-50 p-6 rounded-xl mb-8">
                        <h3 className="font-bold mb-2 text-gray-700">Description :</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        className="bg-indigo-600 text-white py-4 rounded-full font-bold text-xl hover:bg-indigo-700 transition-all shadow-lg"
                    >
                        Ajouter au panier 🛒
                    </button>
                </div>
            </div>
        </div>
    );
}
