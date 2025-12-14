'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../lib/store'; // Vérifiez que le chemin vers store.ts est correct

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  // On récupère le panier
  const cart = useCart((state) => state.cart);

  // Sécurité pour le build : on attend que le client soit prêt
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calcul du nombre d'articles (0 si pas encore chargé)
  const cartCount = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black italic text-indigo-900">
          CEB SHOP
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/shop" className="font-medium hover:text-indigo-600 transition-colors">Boutique</Link>
          <Link href="/about" className="font-medium hover:text-indigo-600 transition-colors">À Propos</Link>
          
          <Link href="/cart" className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
