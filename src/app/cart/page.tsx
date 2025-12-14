'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../lib/store';

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false);
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const currentCart = cart || [];
    const total = currentCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // CONFIGURATION PERSONNELLE
    const WHATSAPP_NUMBER = "2250768582180"; 
    const MOMO_ORANGE_WAVE = "07 48 41 52 86"; 
    const MOMO_MTN = "05 55 59 40 62"; 
    const PAYSTACK_KEY = 'pk_live_890e26ed3ba8620e398983553f60ba5c889b7c5c';

    const initializePaystack = () => {
        if (typeof window !== 'undefined' && (window as any).PaystackPop) {
            const handler = (window as any).PaystackPop.setup({
                key: PAYSTACK_KEY,
                email: 'client@email.com',
                amount: total * 100,
                currency: 'XOF',
                ref: 'CEB-' + Math.floor((Math.random() * 1000000000) + 1),
                callback: function(response: any) {
                    alert('Paiement réussi !');
                    clearCart();
                    window.location.href = '/success';
                },
                onClose: function() {
                    alert('Fenêtre de paiement fermée.');
                }
            });
            handler.openIframe();
        } else {
            alert("Le module de paiement n'est pas encore chargé. Réessayez dans une seconde.");
        }
    };

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

    if (!isMounted) {
        return <div className="p-20 text-center text-gray-500 font-bold">Chargement de votre panier...</div>;
    }

    if (currentCart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-6xl mb-6">🛒</div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Votre panier est vide</h2>
                <Link href="/shop" className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg">
                    Découvrir la collection
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8 pt-24">
            <h1 className="text-3xl font-black text-gray-900 mb-8 border-b pb-4 uppercase italic">Mon Panier ({currentCart.length})</h1>
            
            <div className="space-y-6 mb-10">
                {currentCart.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b pb-6 gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="relative w-20 h-20 flex-shrink-0">
                                <Image src={item.image} alt={item.name} fill className="rounded-xl object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{item.name}</h3>
                                <p className="text-indigo-600 font-bold">{item.price.toLocaleString()} XOF</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                            <div className="flex items-center border rounded-lg bg-gray-50">
                                <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-3 py-1 font-bold hover:bg-gray-200">-</button>
                                <span className="px-3 py-1 font-medium border-x">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 font-bold hover:bg-gray-200">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors">
                                Retirer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-8">
                <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-3 text-lg">📲 Paiement Mobile Money Direct</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 flex flex-col">
                        <span className="text-gray-400 font-normal text-xs uppercase mb-1 font-sans">Orange / Wave</span>
                        <span className="text-orange-600 font-mono tracking-wider">{MOMO_ORANGE_WAVE}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 flex flex-col">
                        <span className="text-gray-400 font-normal text-xs uppercase mb-1 font-sans">MTN MoMo</span>
                        <span className="text-yellow-600 font-mono tracking-wider">{MOMO_MTN}</span>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-gray-900 text-white rounded-3xl shadow-2xl">
                <div className="flex justify-between text-2xl font-bold mb-8">
                    <span className="text-gray-400">Total :</span>
                    <span className="text-indigo-400">{total.toLocaleString()} XOF</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <button 
                        onClick={initializePaystack}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg transform active:scale-95"
                    >
                        <span>💳</span> Payer par Carte / Mobile Money
                    </button>

                    <button 
                        onClick={handleWhatsAppOrder} 
                        className="w-full bg-green-500 hover:bg-green-600 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg transform active:scale-95"
                    >
                        <span>💬</span> Commander via WhatsApp
                    </button>
                </div>

                <button onClick={clearCart} className="w-full text-gray-500 text-xs mt-6 hover:text-red-400 transition-colors uppercase tracking-widest font-bold">
                    Vider entièrement mon panier
                </button>
            </div>
            
            {/* Chargement sécurisé du script Paystack */}
            <script src="https://js.paystack.co/v1/inline.js" async></script>
        </div>
    );
}
