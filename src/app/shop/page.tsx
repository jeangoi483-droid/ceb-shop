'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '../../data/products';
import { useCart } from '../../lib/store';

export default function ShopPage() {
    const addToCart = useCart((state) => state.addToCart);

    const handleAddToCart = (product: any) => {
        addToCart({
            id: String(product.id),
            name: product.name,
            price: product.price,
            image: product.image,
        });
        alert(`"${product.name}" ajouté au panier !`);
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-10 text-center">Notre Collection de Montres</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {mockProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                        {/* LIEN SUR L'IMAGE */}
                        <Link href={`/product/${product.id}`}>
                            <div className="relative w-full h-64 bg-gray-100 cursor-pointer">
                                <Image 
                                    src={product.image} 
                                    alt={product.name} 
                                    fill 
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </Link>

                        <div className="p-6">
                            {/* LIEN SUR LE TITRE */}
                            <Link href={`/product/${product.id}`}>
                                <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 cursor-pointer">
                                    {product.name}
                                </h2>
                            </Link>
                            
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                {product.description}
                            </p>
                            
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-lg font-extrabold text-indigo-600">
                                    {product.price.toLocaleString()} XAF
                                </span>
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
                                    title="Ajouter au panier"
                                >
                                    🛒
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
