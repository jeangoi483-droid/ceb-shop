// src/components/Hero.tsx

import Link from 'next/link';
import React from 'react';

export default function Hero() {
  return (
    // Utilisez un grand conteneur pour la hauteur et l'image de fond
    <div className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-white" 
         style={{ 
           // Remplacez 'chemin-vers-votre-image.jpg' par l'URL de votre image marketing forte
           backgroundImage: 'url("/images/hero-bg.jpg")' // Assurez-vous d'avoir ce fichier dans public/images/
         }}
    >
      {/* Overlay sombre pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Contenu de la Bannière Héro */}
      <div className="relative z-10 text-center px-4">
        
        {/* Titre Principal (H1) - Accrocheur */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg">
           CEBA-SHOP.
        </h1>
        
        {/* Sous-Titre */}
        <p className="text-lg sm:text-xl mb-8 font-light max-w-2xl mx-auto drop-shadow-md">
          Des pièces uniques pour rehausser votre style. Qualité et durabilité garanties.
        </p>
        
        {/* CTA Primaire - Bouton qui attire l'attention */}
        <Link 
          href="/shop" 
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 px-10 rounded-full transition duration-300 transform hover:scale-105 shadow-xl"
        >
          Voir la Collection
        </Link>
        
      </div>
    </div>
  );
}