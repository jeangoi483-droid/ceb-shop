'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '../../data/products';
import { useCart } from '../../lib/store';

export default function NewArrivalsPage() {
    const addToCart = useCart((state) => state.addToCart);

    // On récupère les 4 derniers produits de votre liste
    const newProducts = [...mockProducts].reverse().slice(0, 4);

    const handleAddToCart = (product: any) => {
        addToCart({
            id: String(product.id),
            name: product.name,
            price: Number(product.price),
            image: product.image,
        });
        alert(`✨ Nouvelle acquisition ! ${product.name} ajouté au panier.`);
    };

    return (
        <div className="max-w-7xl mx-auto p-8 pt-24">
            {/* HERO SECTION NOUVEAUTÉS */}
            <div className="relative bg-gray-900 rounded-[40px] overflow-hidden mb-16 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-transparent z-10"></div>
                <div className="relative z-20 p-12 md:p-20 flex flex-col items-center text-center">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
                        Arrivage de la semaine
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-6 italic uppercase tracking-tighter">
                        Nouvelles <br /> <span className="text-indigo-400">Pépites</span>
                    </h1>
                    <p className="text-gray-300 max-w-xl text-lg font-light leading-relaxed">
                        Découvrez les derniers modèles sélectionnés par nos experts. 
                        Design audacieux et précision inégalée.
                    </p>
                </div>
            </div>

            {/* GRILLE DES PRODUITS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {newProducts.map((product) => (
                    <div key={product.id} className="group relative bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl transition-all duration-500">
                        {/* Tag Nouveau */}
                        <div className="absolute top-8 left-8 z-30 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                            NOUVEAU
                        </div>

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
                            </div>

                            <div className="grid grid-cols-5 gap-2">
                                <Link 
                                    href={`/product/${product.id}`} 
                                    className="col-span-4 text-center bg-gray-100 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Détails
                                </Link>
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    className="col-span-1 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-black transition-all shadow-lg active:scale-90"
                                >
                                    🛒
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* BANNIÈRE APPEL À L'ACTION */}
            <div className="mt-24 bg-indigo-50 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-indigo-900 mb-2 font-sans">Ne manquez aucun arrivage !</h2>
                    <p className="text-indigo-600/70">Ces modèles sont en édition limitée et partent très vite.</p>
                </div>
                <Link href="/shop" className="mt-6 md:mt-0 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all">
                    Voir toute la collection
                </Link>
            </div>
        </div>
    );
}
