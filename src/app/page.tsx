import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-6">
        CEB SHOP
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl">
        Découvrez notre collection exclusive de montres de luxe et connectées. 
        Qualité et élégance au meilleur prix.
      </p>
      
      <div className="flex justify-center">
        <Link 
          href="/shop" 
          className="bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-2xl hover:bg-indigo-700 transition-all shadow-xl transform hover:scale-105"
        >
          Entrer dans la Boutique ⌚
        </Link>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl">
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="font-bold text-lg mb-2">Livraison Rapide</h3>
          <p className="text-gray-500">Expédition sécurisée pour toutes vos commandes.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="font-bold text-lg mb-2">Paiement Sécurisé</h3>
          <p className="text-gray-500">Paiements par carte et Mobile Money via Paystack.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="font-bold text-lg mb-2">Support 24/7</h3>
          <p className="text-gray-500">Une équipe à votre écoute pour toutes vos questions.</p>
        </div>
      </div>
    </main>
  );
}
