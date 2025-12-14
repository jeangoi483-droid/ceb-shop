'use client';

import React from 'react';
import Image from 'next/image'; // Import pour des images optimisées
import { useCart } from '../../lib/store';
import { mockProducts } from '../../data/products';

// Fonction pour formater le prix en CFA (souvent utilisé avec Paystack au Cameroun/CI) 
// ou gardez EUR selon votre besoin
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XAF', // Modifié en XAF pour l'exemple, remettez 'EUR' si besoin
    }).format(price);
};

export default function ShopPage() {
    const addToCart = useCart((state) => state.addToCart);

    const handleAddToCart = (product: typeof mockProducts[0]) => {
        addToCart(product);
        // Une petite notification discrète serait mieux qu'une alert, 
        // mais gardons l'alert pour l'instant pour rester simple
        alert(`"${product.name}" a été ajouté au panier !`);
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">
                🛍️ Notre Boutique
            </h1>

            {/* Grille d'affichage des produits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {mockProducts.map((product) => (
                    <div 
                        key={product.id} 
                        className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105"
                    >
                        {/* Conteneur Image avec Next/Image */}
                        <div className="relative w-full h-48 bg-gray-100">
                            <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                priority={product.id <= 4} // Charge plus vite les 4 premiers produits
                            />
                        </div>
                        
                        {/* Détails du produit */}
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