'use client';

import React from 'react';
import { useCart } from '../../lib/store';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();

  const total = items.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 pt-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Votre panier est vide 😢</h2>
        <Link href="/shop" className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-black transition">
          Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 pt-24">
      <h2 className="text-3xl font-bold mb-8">Votre Panier</h2>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p>{item.price.toLocaleString()} XOF</p>
                <p>Quantité: {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-bold">Total: {total.toLocaleString()} XOF</p>
        <div className="flex gap-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-black transition">
            Payer avec Paystack
          </button>
          <a
            href={`https://wa.me/225?text=Bonjour,+je+souhaite+commander+mon+panier+de+produits.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
          >
            Commander via WhatsApp
          </a>
        </div>
      </div>
      <button onClick={clearCart} className="mt-4 text-red-500 underline">
        Vider le panier
      </button>
    </div>
  );
}
