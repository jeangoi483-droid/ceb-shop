// src/components/Navbar.tsx

'use client'; 

import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from '../lib/store';

const navLinks = [
  { name: 'Boutique', href: '/shop' },
  { name: 'Nouveautés', href: '/new' },
  { name: 'À Propos', href: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const items = useCart((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    // La navigation est sticky, en haut et avec une ombre
    <nav className="bg-white shadow-md sticky top-0 z-50">
      
      {/* Ce div limite la largeur du contenu (max-w-7xl) et le centre (mx-auto) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 italic">
              CEBA-SHOP
            </Link>
          </div>

          {/* Liens Desktop */}
          <div className="hidden md:flex md:space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-700 hover:text-indigo-600 font-medium">
                {link.name}
              </Link>
            ))}
          </div>

          {/* SECTION ICÔNES */}
          <div className="flex items-center space-x-5">
            
            {/* BOUTON PANIER AVEC COMPTEUR */}
            <Link href="/cart" className="relative group p-2 text-gray-700 hover:text-indigo-600 transition-colors">
              <span className="text-2xl">🛒</span>
              
              {/* AFFICHAGE CONDITIONNEL DU COMPTEUR ROUGE */}
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce-short">
                  {itemCount}
                </span>
              )}
            </Link>

            <button className="text-gray-700 hover:text-indigo-600 text-2xl">👤</button>
            
            {/* Menu Mobile */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 text-2xl">
                {isOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile Déroulant */}
      {isOpen && (
        <div className="md:hidden bg-white border-t py-2 shadow-inner">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="block px-6 py-3 text-gray-700 hover:bg-gray-50">
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}