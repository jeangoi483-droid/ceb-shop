'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../lib/store";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center p-40">
        <p className="text-2xl mb-4">🛒 Votre panier est vide</p>
        <Link href="/shop" className="text-indigo-600 font-bold hover:underline">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  // Message WhatsApp
  const waMessage = encodeURIComponent(
    cart
      .map((i) => `${i.name} x ${i.quantity} = ${i.price * i.quantity} XOF`)
      .join("\n") + `\nTotal: ${subtotal} XOF`
  );
  const waLink = `https://wa.me/225XXXXXXXXX?text=${waMessage}`; // Remplace le numéro

  return (
    <div className="max-w-5xl mx-auto p-8 pt-24 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Votre Panier</h1>

      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border rounded-xl p-4 shadow-sm hover:shadow-lg transition bg-white"
          >
            <div className="relative w-28 h-28 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between h-full">
              <div>
                <Link
                  href={`/product/${item.id}`}
                  className="font-bold text-lg hover:text-indigo-600"
                >
                  {item.name}
                </Link>
                <p className="text-indigo-600 font-semibold mt-1">{item.price} XOF</p>
              </div>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition font-semibold"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total et commandes */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded-xl shadow-md mt-8">
        <div className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Total: {subtotal} XOF
        </div>

        <div className="flex gap-4">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition"
          >
            Commander via WhatsApp
          </a>

          <button
            onClick={() => alert("Paiement Paystack à intégrer")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Payer maintenant
          </button>
        </div>
      </div>

      <button
        onClick={clearCart}
        className="mt-4 text-red-500 hover:underline font-semibold"
      >
        Vider le panier
      </button>
    </div>
  );
}
