'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../lib/store';
import { formatPrice } from '../../lib/format';

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();

  // 1. Calculs des montants
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 25000 ? 0 : 3000; 
  const total = subtotal + shipping;

  // 2. Fonction pour le paiement Mobile Money (Paystack)
  const handleMobileMoneyPayment = async () => {
    const email = window.prompt("Entrez votre email pour recevoir le reçu de paiement :");
    if (!email) return;

    try {
      const res = await fetch('/api/paystack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          amount: total,
        }),
      });

      const data = await res.json();

      if (data.status === true && data.data.authorization_url) {
        // Redirection vers la page sécurisée de Paystack (Orange, MTN, Moov, Carte)
        window.location.href = data.data.authorization_url;
      } else {
        alert("Erreur lors de l'initialisation du paiement Paystack.");
      }
    } catch (error) {
      console.error("Erreur paiement:", error);
      alert("Une erreur est survenue lors de la connexion au service de paiement.");
    }
  };

  // 3. Fonction pour la commande WhatsApp
  const handleWhatsAppOrder = () => {
    const phoneNumber = "2250768582180"; // Mettez votre vrai numéro ici

    const messageItems = items
      .map((item) => `%0A- ${item.quantity}x ${item.name} (${formatPrice(item.price * item.quantity)})`)
      .join("");

    const message = `Bonjour CEBA-SHOP ! 👋%0A%0AJe souhaite commander :${messageItems}%0A%0A*Total à payer : ${formatPrice(total)}*%0A%0APouvez-vous confirmer ma commande ?`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Votre panier est vide</h2>
        <p className="text-gray-500 mb-8">On dirait que vous n'avez pas encore trouvé votre bonheur.</p>
        <Link href="/" className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium">
          Retourner à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-10 text-gray-900">Mon Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LISTE DES ARTICLES (Gauche) */}
        <div className="lg:col-span-8">
          <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{item.name}</h3>
                    <p className="ml-4 font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Quantité: {item.quantity}</p>

                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="font-medium text-red-600 hover:text-red-500 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={clearCart}
            className="mt-6 text-sm text-gray-500 underline hover:text-red-600"
          >
            Vider le panier
          </button>
        </div>

        {/* RÉSUMÉ DE LA COMMANDE (Droite) */}
        <div className="lg:col-span-4 bg-gray-50 rounded-2xl p-6 h-fit sticky top-10">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Résumé de la commande</h2>
          
          <div className="flow-root">
            <div className="divide-y divide-gray-200 text-sm">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Livraison</span>
                <span className="font-medium text-green-600">
                  {shipping === 0 ? "Gratuite" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex items-center justify-between py-4 text-xl font-extrabold text-gray-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* BOUTON MOBILE MONEY (PAYSTACK) */}
          <button
            onClick={handleMobileMoneyPayment}
            className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95"
          >
            <span>Payer par Mobile Money</span>
            <span className="text-xl">💳</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300"></span></div>
            <div className="relative flex justify-center text-sm"><span className="bg-gray-50 px-2 text-gray-500">OU</span></div>
          </div>

          {/* BOUTON WHATSAPP */}
          <button
            onClick={handleWhatsAppOrder}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95"
          >
            <span>Commander via WhatsApp</span>
            <span className="text-2xl">💬</span>
          </button>
          
          <p className="text-center text-xs text-gray-400 mt-4 italic">
            Paiement sécurisé par Paystack ou validation directe via WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}
