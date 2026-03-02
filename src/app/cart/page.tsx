'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../lib/store";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center p-40">
        🛒 Votre panier est vide
        <br/>
        <Link href="/shop" className="text-indigo-600 font-bold">Retour à la boutique</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 pt-24 space-y-6">
      {cart.map(item => (
        <div key={item.id} className="flex items-center gap-4 border-b pb-4">
          <div className="relative w-24 h-24">
            <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg" />
          </div>
          <div>
            <h2 className="font-bold">{item.name}</h2>
            <p>{item.price} XOF</p>
            <div className="flex gap-2 items-center mt-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500 mt-2">
              Supprimer
            </button>
          </div>
        </div>
      ))}
      <div className="text-right font-bold text-xl">
        Total: {subtotal} XOF
      </div>
    </div>
  );
}
