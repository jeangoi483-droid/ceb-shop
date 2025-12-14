'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../lib/store';

export default function CartPage() {
    // État pour forcer le rendu côté client et voir les produits
    const [isMounted, setIsMounted] = useState(false);
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    // On attend que le composant soit chargé pour lire le localStorage (via Zustand)
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Calcul du total avec sécurité pour le build
    const currentCart = cart || [];
    const total = currentCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // CONFIGURATION (N'oubliez pas de mettre vos vrais numéros)
    const WHATSAPP_NUMBER = "2250768582180"; 
    const MOMO_ORANGE_WAVE = "07 48 41 52 86"; 
    const MOMO_MTN = "05 55 59 40 62"; 

    // ... juste après les numéros MOMO_MTN ...

    const initializePaystack = () => {
        // @ts-ignore
        const handler = (window as any).PaystackPop.setup({
            key: 'pk_live_890e26ed3ba8620e398983553f60ba5c889b7c5c', 
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
    };

    // Votre ancienne fonction WhatsApp reste ici
    const handleWhatsAppOrder = () => { 
        // ...
    
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

    // Important : On ne retourne rien tant que le client n'est pas prêt 
    // pour que Zustand puisse synchroniser le panier sauvegardé
    if (!isMounted) {
        return <div className="p-20 text-center">Chargement de votre panier...</div>;
    }

    if (currentCart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-6xl mb-6">🛒</div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Votre panier est vide</h2>
                <p className="text-gray-500 mb-8">Il semble que vous n'ayez pas encore choisi de montre.</p>
                <Link href="/shop" className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg">
                    Découvrir la collection
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8 pt-24">
            <h1 className="text-3xl font-black text-gray-900 mb-8 border-b pb-4">Mon Panier ({currentCart.length})</h1>
            
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
                                <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-3 py-1 font-bold">-</button>
                                <span className="px-3 py-1 font-medium border-x">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 font-bold">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">
                                Retirer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* BLOC INFOS PAIEMENT */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-8">
                <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-3 text-lg">📲 Paiement Mobile Money Direct</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 flex flex-col">
                        <span className="text-gray-400 font-normal text-xs uppercase mb-1">Orange / Wave</span>
                        <span className="text-orange-600">{MOMO_ORANGE_WAVE}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 flex flex-col">
                        <span className="text-gray-400 font-normal text-xs uppercase mb-1">MTN MoMo</span>
                        <span className="text-yellow-600">{MOMO_MTN}</span>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-gray-900 text-white rounded-3xl shadow-2xl sticky bottom-4 md:relative">
                <div className="flex justify-between text-2xl font-bold mb-8">
                    <span className="text-gray-400">Total :</span>
                    <span className="text-indigo-400">{total.toLocaleString()} XOF</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {/* BOUTON PAYSTACK */}
                    <button 
                        onClick={initializePaystack}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg"
                    >
                        <span>💳</span> Payer par Carte / Mobile Money
                    </button>

                    {/* BOUTON WHATSAPP */}
                    <button 
                        onClick={handleWhatsAppOrder} 
                        className="w-full bg-green-500 hover:bg-green-600 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg"
                    >
                        <span>💬</span> Commander via WhatsApp
                    </button>
                </div>

                <button onClick={clearCart} className="w-full text-gray-500 text-xs mt-6 hover:text-red-400 transition-colors">
                    Vider entièrement mon panier
                </button>
            </div>
        </div>

        return (
        <div className="max-w-4xl mx-auto p-6 md:p-8 pt-24">
            {/* ... tout le code HTML ... */}
            
            {/* AJOUTEZ LA LIGNE ICI JUSTE AVANT LA FIN DU RETURN */}
            <script src="https://js.paystack.co/v1/inline.js" async></script>
        </div>
    );
}
    );
}
