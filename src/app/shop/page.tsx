'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '../../lib/store';
import { mockProducts } from '../../data/products';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XAF',
    }).format(price);
};

export default function ShopPage() {
    const addToCart = useCart((state) => state.addToCart);

    const handleAddToCart = (product: any) => {
        addToCart({
            id: String(product.id),
            name: product.name,
            price: Number(product.price),
            image: product.image,
        });
        alert(`"${product.name}" a été ajouté au panier !`);
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">
                🛍️ Notre Boutique
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {mockProducts.map((product) => (
                    <div 
                        key={product.id} 
                        className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105"
                    >
                        <div className="relative w-full h-48 bg-gray-100">
                            <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 25vw"
                                priority
                            />
                        </div>
                        
                        <div className="p-5 flex flex-col flex-grow">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
                            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                                {product.description}
                            </p>
                            
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-2xl font-extrabold text-indigo-600">
                                    {formatPrice(product.price)}
                                </span>
                                
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full text-sm transition-colors duration-200"
                                >
                                    + Panier
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}