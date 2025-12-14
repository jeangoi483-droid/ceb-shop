'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../lib/store';

export default function CartPage() {
    // On ajoute un état pour vérifier si le composant est monté (chargé côté client)
    const [isMounted, setIsMounted] = useState(false);
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Sécurité pour éviter l'erreur "reduce" pendant le build Vercel
    const currentCart = cart || [];
    const total = currentCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const WHATSAPP_NUMBER = "2250768582180"; 
    const MOMO_ORANGE_WAVE = "07 48 41 52 86"; 
    const MOMO_MTN = "05 55 59 40 62"; 

    const handleWhatsAppOrder = () => {
        if (currentCart.length === 0) return;

        let message = "Bonjour CEBA SHOP, je souhaite commander :%0A%0A";
        currentCart.forEach(item => {
            message += `• ${item.name} (x${item.quantity}) - ${item.price * item.quantity} XAF%0A`;
        });
        
        message += `%0A*Total à payer : ${total} XAF*%0A%0A`;
        message += "--- MODE DE PAIEMENT SOUHAITÉ ---%0A";
        message += "Je souhaite payer par :%0A";
        message += `👉 Orange/Wave (${MOMO_ORANGE_WAVE})%0A`;
        message += `👉 MTN (${MOMO_MTN})%0A%0A`;
        message += "Je vous enverrai la capture d'écran du reçu dès le transfert effectué. ✅";

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    // Si on est en train de construire la page (côté serveur), on affiche un chargement simple
    if (!isMounted) {
        return <div className="p-20 text-center">Chargement du panier...</div>;
    }

    if (currentCart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-20 text-center">
                <h2 className="text-3xl font-bold mb-6">Votre panier est vide 🛒</h2>
                <Link href="/shop" className="bg-indigo-600 text-white px-8 py-3 rounded-full">Retourner à la boutique</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-8 pt-24">
            <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>
            
            <div className="space-y-6 mb-10">
                {currentCart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                            <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
                            <div>
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-indigo-600 font-bold">{item.price} XAF</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} className="w-16 border rounded p-1 text-center" />
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm">Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-8">
                <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-2">📲 Paiement Mobile Money Direct</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold mt-2">
                    <div className="bg-white p-3 rounded shadow-sm">🟠 Orange/Wave: {MOMO_ORANGE_WAVE}</div>
                    <div className="bg-white p-3 rounded shadow-sm">🟡 MTN: {MOMO_MTN}</div>
                </div>
            </div>

            <div className="p-8 bg-gray-900 text-white rounded-3xl shadow-xl">
                <div className="flex justify-between text-2xl font-bold mb-8">
                    <span>Total :</span>
                    <span>{total.toLocaleString()} XAF</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <button onClick={handleWhatsAppOrder} className="w-full bg-green-500 hover:bg-green-600 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all">
                        <span>💬</span> Commander & Payer via WhatsApp
                    </button>
                </div>

                <button onClick={clearCart} className="w-full text-gray-400 text-xs mt-6 hover:underline">Vider le panier</button>
            </div>
        </div>
    );
}
