'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../lib/store';
import { PaystackButton } from 'react-paystack';

export default function CartPage() {
    const cartItems = useCart((state) => state.cart);
    const removeFromCart = useCart((state) => state.removeFromCart);
    const updateQuantity = useCart((state) => state.updateQuantity);

    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    // WhatsApp checkout link
    const whatsappMessage = cartItems.map(
        (item) => `${item.name} x${item.quantity} = ${item.price * item.quantity} XOF`
    ).join('%0A');

    const whatsappLink = `https://wa.me/225XXXXXXXX?text=Bonjour,%20je%20souhaite%20commander:%0A${whatsappMessage}%0ATotal:%20${totalAmount} XOF`;

    // Paystack config
    const paystackConfig = {
        reference: new Date().getTime().toString(),
        email: 'client@example.com',
        amount: totalAmount * 100, // montant en kobo
        publicKey: 'YOUR_PAYSTACK_PUBLIC_KEY',
    };

    const onSuccess = (ref: any) => {
        alert('✅ Paiement réussi! Merci pour votre commande.');
    };

    const onClose = () => {
        alert('⚠ Paiement annulé.');
    };

    return (
        <div className="max-w-7xl mx-auto p-8 pt-24">
            <h1 className="text-4xl font-black mb-8">Votre Panier</h1>
            
            {cartItems.length === 0 ? (
                <p>Votre panier est vide. <Link href="/shop" className="text-indigo-600 font-bold">Voir les produits</Link></p>
            ) : (
                <>
                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow-sm border">
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg" />
                                </div>
                                <div className="ml-6 flex flex-col flex-grow">
                                    <h2 className="text-lg font-bold">{item.name}</h2>
                                    <p className="text-gray-500">{item.price.toLocaleString()} XOF</p>
                                    <div className="mt-2 flex items-center space-x-2">
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="ml-4 text-red-600 font-bold"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right font-bold">{(item.price * item.quantity).toLocaleString()} XOF</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end space-x-4 items-center">
                        <span className="text-xl font-bold">Total: {totalAmount.toLocaleString()} XOF</span>
                        
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all"
                        >
                            Commander sur WhatsApp
                        </a>

                        <PaystackButton
                            {...paystackConfig}
                            text="Payer avec Paystack"
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                            onSuccess={onSuccess}
                            onClose={onClose}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
