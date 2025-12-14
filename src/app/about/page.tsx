import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-indigo-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4 italic">À PROPOS DE CEBA SHOP</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          L'élégance intemporelle et l'innovation technologique réunies en un seul endroit.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Fondée avec la volonté de rendre l'horlogerie de prestige accessible, 
              <strong> CEBA SHOP</strong> s'est imposée comme une destination de choix pour les amateurs de belles pièces.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Que vous recherchiez l'élégance classique d'une montre à quartz ou la performance 
              d'une montre connectée de dernière génération, nous sélectionnons des produits 
              qui allient durabilité et style.
            </p>
          </div>
          <div className="bg-gray-100 h-80 rounded-3xl flex items-center justify-center text-5xl shadow-inner">
            ⌚✨
          </div>
        </div>

        {/* Values */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-indigo-50 rounded-2xl">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="font-bold text-xl mb-2">Qualité Premium</h3>
            <p className="text-sm text-gray-600">Des matériaux sélectionnés pour durer dans le temps.</p>
          </div>
          <div className="text-center p-8 bg-indigo-50 rounded-2xl">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-bold text-xl mb-2">Livraison Rapide</h3>
            <p className="text-sm text-gray-600">Expédition sécurisée partout en Côte d'Ivoire et au-delà.</p>
          </div>
          <div className="text-center p-8 bg-indigo-50 rounded-2xl">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="font-bold text-xl mb-2">Service Client</h3>
            <p className="text-sm text-gray-600">Nous vous accompagnons par WhatsApp pour chaque commande.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center border-t pt-16">
          <h3 className="text-2xl font-bold mb-6">Prêt à choisir votre prochaine montre ?</h3>
          <Link 
            href="/shop" 
            className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg"
          >
            Voir la Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
