// src/components/Features.tsx

import React from 'react';

const features = [
  {
    icon: "🚚",
    title: "Livraison Gratuite",
    description: "À partir de 50€ d'achat"
  },
  {
    icon: "🔒",
    title: "Paiement Sécurisé",
    description: "SSL 100% sécurisé"
  },
  {
    icon: "🔄",
    title: "Retours Faciles",
    description: "Sous 30 jours"
  },
  {
    icon: "🎧",
    title: "Service Client",
    description: "À votre écoute 7j/7"
  }
];

export default function Features() {
  return (
    <section className="bg-gray-50 py-10 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <span className="text-4xl mb-3">{feature.icon}</span>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}