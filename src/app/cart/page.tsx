'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../lib/store';
import Link from 'next/link';

export default function CartPage() {
    const { items, removeFromCart, clearCart } = useCart();
    const [total, setTotal] = useState(0);

    // Calcul du total côté client pour éviter les erreurs côté serveur
    useEffect(() => {
        const t = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
        setTotal(t);
    }, [items]);

    if (items.length === 0) {
        return (
            <div className="max-w-5xl mx-auto p-8 pt-24 text-center">
                <h1 className="text-4xl font-bold mb-4">Votre panier est vide</h1>
                <p className="text-gray-600 mb-6">Ajoutez des articles pour les voir ici.</p>
                <Link href="/shop" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors">
                    Voir les produits
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8 pt-24">
            <h1 className="text-4xl font-black mb-8">Votre Panier</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {items.map((item) => (
                    <div key={item.id} className="flex border rounded-2xl overflow-hidden shadow-sm">
                        <div className="relative w-40 h-40">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4 flex flex-col justify-between flex-1">
                            <div>
                                <h2 className="text-xl font-bold">{item.name}</h2>
                                <p className="text-gray-600">
                                    {item.price.toLocaleString()} XOF x {item.quantity || 1}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-gray-100 p-6 rounded-2xl shadow-md">
                <div className="text-2xl font-bold">
                    Total : {total.toLocaleString()} XOF
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <button
                        onClick={() => clearCart()}
                        className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors"
                    >
                        Vider le panier
                    </button>
                    <button
                        onClick={() => alert('✅ Commande effectuée !')}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-black transition-colors"
                    >
                        Passer commande
                    </button>
                </div>
            </div>
        </div>
    );
}
