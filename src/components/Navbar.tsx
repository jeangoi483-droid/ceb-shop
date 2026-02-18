'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../lib/store';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const cart = useCart((state) => state.cart);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl md:text-2xl font-black italic text-indigo-900 flex-shrink-0">
          CEBA SHOP
        </Link>

        {/* MENU CENTRAL (Caché sur petit mobile, ou scrollable) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
          <Link href="/shop" className="hover:text-indigo-600 transition-colors">Boutique</Link>
           <Link href="/shop" className="hover:text-indigo-600 transition-colors">Femmes</Link>
          <Link href="/new" className="hover:text-indigo-600 transition-colors text-orange-600">Nouveautés ✨</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">À Propos</Link>
        </div>

        {/* SECTION DROITE: PAIEMENT + PANIER */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Petits logos de paiement (Rassure le client immédiatement) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400">PAIEMENT:</span>
            <div className="flex gap-1">
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold" title="Orange Money">O</div>
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] text-black font-bold" title="MTN MoMo">M</div>
              <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center text-[8px] text-white font-bold" title="Wave">W</div>
            </div>
          </div>

          {/* PANIER */}
          <Link href="/cart" className="relative p-3 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-all group">
            <span className="text-xl group-hover:scale-110 block transition-transform">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* MENU MOBILE (Visible seulement sur petit écran pour Boutique/Nouveautés) */}
      <div className="md:hidden flex justify-center gap-6 py-2 bg-gray-50 border-t border-gray-100 text-[10px] font-bold uppercase">
          <Link href="/shop">Boutique</Link>
          <Link href="/new" className="text-orange-600">Nouveautés</Link>
          <Link href="/about">À Propos</Link>
      </div>
    </nav>
  );
}
