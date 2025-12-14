'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '../../data/products';
import { useCart } from '../../lib/store';

export default function ShopPage() {
    // On récupère la fonction addToCart depuis notre store
    const addToCart = useCart((state) => state.addToCart);

    // LA FONCTION CORRECTE ET DÉFINITIVE
    const handleAddToCart = (product: any) => {
        addToCart({
            id: String(product.id), // Sécurité : on force l'ID en texte
            name: String(product.name),
            price: Number(product.price),
            image: String(product.image),
        });
        
        // Petit feedback visuel pour l'utilisateur
        alert(`✅ ${product.name} ajouté au panier !`);
    };

    return (
        <div className="max-w-7xl mx-auto p-8 pt-24">
            <h1 className="text-4xl font-black mb-12 text-center text-gray-900 uppercase italic tracking-tiler">
                Notre Boutique
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {mockProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                        
                        {/* Image cliquable vers le détail */}
                        <Link href={`/product/${product.id}`} className="relative h-64 w-full overflow-hidden">
                            <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </Link>

                        <div className="p-6 flex flex-col flex-grow">
                            <Link href={`/product/${product.id}`}>
                                <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-indigo-600 transition-colors">
                                    {product.name}
                                </h2>
                            </Link>
                            
                            <p className="text-gray-500 text-sm mb-6 line-clamp-2 italic">
                                {product.description}
                            </p>
                            
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-2xl font-black text-indigo-600">
                                    {product.price.toLocaleString()} <span className="text-sm">XAF</span>
                                </span>
                                
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-gray-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all shadow-lg active:scale-90"
                                    title="Ajouter au panier"
                                >
                                    <span className="text-xl">🛒</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
