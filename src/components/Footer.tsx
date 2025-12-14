'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                
                {/* LOGO & SLOGAN */}
                <div className="space-y-4">
                    <Link href="/" className="text-2xl font-black italic text-white tracking-tighter uppercase">
                        CEBA SHOP
                    </Link>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Votre destination luxe pour l'horlogerie d'exception en Côte d'Ivoire. Élégance et prestige à votre poignet.
                    </p>
                </div>

                {/* LIENS RAPIDES */}
                <div>
                    <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Navigation</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/shop" className="hover:text-indigo-400 transition-colors">La Boutique</Link></li>
                        <li><Link href="/new" className="hover:text-indigo-400 transition-colors">Nouveautés</Link></li>
                        <li><Link href="/about" className="hover:text-indigo-400 transition-colors">À Propos</Link></li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">📍 Abidjan, Côte d'Ivoire</li>
                        <li className="flex items-center gap-2">📞 +225 07 68 58 21 80</li>
                        <li className="flex items-center gap-2">✉️ contact@ceba-shop.com</li>
                    </ul>
                </div>

                {/* PAIEMENT */}
                <div>
                    <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Paiements</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-800 px-3 py-1 rounded text-[10px] font-bold text-orange-500">ORANGE / WAVE</span>
                        <span className="bg-gray-800 px-3 py-1 rounded text-[10px] font-bold text-yellow-500">MTN MOMO</span>
                        <span className="bg-gray-800 px-3 py-1 rounded text-[10px] font-bold text-indigo-400">PAYSTACK</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-center">
                <p className="text-xs text-gray-500">
                    © {currentYear} <span className="text-white font-bold">CEBA SHOP</span>. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
}
