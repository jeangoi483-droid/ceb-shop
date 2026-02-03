// src/app/success/page.tsx
'use client'; 

import Link from 'next/link';
import { useCart } from '../../lib/store';
import { useEffect } from 'react';

export default function SuccessPage() {
  const clearCart = useCart((state) => state.clearCart);
  
  // Vider le panier dès que la page s'affiche (pour ne pas garder les articles payés)
  useEffect(() => {
    // On met un petit délai par sécurité, mais ça vide le panier au chargement de la page.
    setTimeout(() => {
        clearCart();
    }, 500); 
  }, [clearCart]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center min-h-screen flex flex-col justify-center items-center">
      <div className="text-6xl mb-6 animate-bounce">🎉</div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Paiement Réussi !</h1>
      <p className="text-gray-600 mb-8 text-lg max-w-lg">
        Merci infiniment pour votre commande chez CEBA-SHOP. Votre paiement a été confirmé. 
        Nous vous contacterons sur WhatsApp dans les prochaines minutes pour organiser la livraison.
      </p>
      <Link href="/" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors">
        Retourner à la boutique
      </Link>
    </div>
  );
}
