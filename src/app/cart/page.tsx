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

  if (!isMounted) return <div className="p-32 text-center font-bold">Chargement...</div>;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 25000 ? 0 : 1000;
  const total = subtotal + shippingFee;

  const WHATSAPP_NUMBER = "2250768582180"; 
  const PAYSTACK_KEY = 'pk_live_890e26ed3ba8620e398983553f60ba5c889b7c5c';

  const initializePaystack = () => {
    if (typeof window !== 'undefined' && (window as any).PaystackPop) {
      const handler = (window as any).PaystackPop.setup({
        key: PAYSTACK_KEY,
        email: 'client@email.com',
        amount: total * 100,
        currency: 'XOF',
        ref: 'CEB-' + Math.floor(Math.random() * 1000000000),
        callback: () => {
          alert('Paiement réussi !');
          clearCart();
          window.location.href = '/success';
        },
        onClose: () => alert('Fenêtre de paiement fermée.')
      });
      handler.openIframe();
    }
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    let message = "Bonjour CEBA SHOP, je souhaite commander :%0A%0A";
    cart.forEach(item => {
      message += `• ${item.name} (x${item.quantity}) - ${item.price * item.quantity} XOF%0A`;
    });
    message += `%0A*Sous-total : ${subtotal.toLocaleString()} XOF*`;
    message += `%0A*Livraison : ${shippingFee === 0 ? "GRATUITE" : shippingFee + " XOF"}*`;
    message += `%0A*TOTAL À PAYER : ${total.toLocaleString()} XOF*%0A%0A`;
    message += "Je souhaite payer par Mobile Money. ✅";

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-7xl mb-6 animate-bounce">🛒</div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Votre panier est vide</h2>
        <Link href="/shop" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 pt-32">
      <h1 className="text-3xl font-black text-gray-900 mb-8 border-b pb-4 italic uppercase">
        Mon Panier ({cart.length})
      </h1>

      <div className="space-y-6 mb-10">
        {cart.map(item => (
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
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-medium text-sm">Retirer</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100">
        <div className="flex justify-between py-2 text-gray-600">
          <span>Sous-total</span>
          <span>{subtotal.toLocaleString()} XOF</span>
        </div>
        <div className="flex justify-between py-2 text-gray-600 border-b pb-4">
          <span>Frais de livraison</span>
          <span className={shippingFee === 0 ? "text-green-600 font-bold" : ""}>
            {shippingFee === 0 ? "Gratuit" : `${shippingFee.toLocaleString()} XOF`}
          </span>
        </div>
      </div>

      <div className="p-8 bg-gray-900 text-white rounded-3xl shadow-2xl">
        <div className="flex justify-between text-2xl font-bold mb-8">
          <span className="text-gray-400">Total Final :</span>
          <span className="text-indigo-400">{total.toLocaleString()} XOF</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button onClick={initializePaystack} className="w-full bg-indigo-600 hover:bg-indigo-700 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all">
            💳 Payer {total.toLocaleString()} XOF
          </button>
          <button onClick={handleWhatsAppOrder} className="w-full bg-green-500 hover:bg-green-600 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all">
            💬 Commander via WhatsApp
          </button>
        </div>
      </div>

      <script src="https://js.paystack.co/v1/inline.js" async></script>
    </div>
  );
}
