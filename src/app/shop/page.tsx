'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '../../data/products';
import { useCart } from '../../lib/store';

export default function ShopPage() {
    // Récupération de la fonction d'ajout depuis le store (Zustand)
    const addToCart = useCart((state) => state.addToCart);

    const handleAddToCart = (product: any) => {
        addToCart({
            id: String(product.id),
            name: product.name,
            price: Number(product.price),
            image: product.image,
        });
        
        // Feedback visuel rapide
        alert(`✅ ${product.name} ajouté au panier !`);
    };

    return (
        <div className="max-w-7xl mx-auto p-8 pt-24">
            <header className="mb-16 text-center">
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Collection Luxe</span>
                <h1 className="text-5xl font-black mb-4 text-gray-900 uppercase italic">
                    Boutique Officielle
                </h1>
                <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {mockProducts.map((product) => (
                    <div key={product.id} className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col">
                        
                        {/* Zone Image avec lien vers le détail */}
                        <Link href={`/product/${product.id}`} className="relative h-72 w-full overflow-hidden">
                            <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Badge Nouveau (Optionnel) */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                                <span className="text-[10px] font-black text-indigo-600 uppercase">Premium</span>
                            </div>
                        </Link>

                        <div className="p-6 flex flex-col flex-grow">
                            <Link href={`/product/${product.id}`}>
                                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                                    {product.name}
                                </h2>
                            </Link>
                            
                            <p className="text-gray-400 text-sm mb-6 line-clamp-2 italic font-serif">
                                {product.description}
                            </p>
                            
                            <div className="mt-auto flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Prix CEB</span>
                                    <span className="text-2xl font-black text-gray-900">
                                        {product.price.toLocaleString()} <span className="text-sm text-indigo-600">XOF</span>
                                    </span>
                                </div>
                                
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-indigo-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-gray-900 transition-all shadow-lg active:scale-90 transform"
                                    title="Ajouter au panier"
                                >
                                    <span className="text-2xl">🛒</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Section Assurance Qualité */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-12">
                <div className="text-center p-4">
                    <div className="text-3xl mb-2">🚚</div>
                    <h4 className="font-bold uppercase text-xs mb-1">Livraison Rapide</h4>
                    <p className="text-gray-500 text-[10px]">Partout en Côte d'Ivoire</p>
                </div>
                <div className="text-center p-4">
                    <div className="text-3xl mb-2">🛡️</div>
                    <h4 className="font-bold uppercase text-xs mb-1">Garantie 12 Mois</h4>
                    <p className="text-gray-500 text-[10px]">Sur tous nos modèles</p>
                </div>
                <div className="text-center p-4">
                    <div className="text-3xl mb-2">💳</div>
                    <h4 className="font-bold uppercase text-xs mb-1">Paiement Sécurisé</h4>
                    <p className="text-gray-500 text-[10px]">Mobile Money & Paystack</p>
                </div>
            </div>
        </div>
    );
}
