import Link from 'next/link';
// Importation des composants avec des chemins relatifs simples pour éviter les erreurs Vercel
import Hero from '../components/Hero'; 
import Features from '../components/Features';

export default function Home() {
  return (
    <main>
      {/* On réaffiche le Hero et les Features ici */}
      <Hero />
      <Features />
      
      <div className="flex justify-center pb-20 bg-white">
        <Link 
          href="/shop" 
          className="bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-2xl hover:bg-indigo-700 transition-all shadow-xl transform hover:scale-105"
        >
          Accéder à la Boutique ⌚
        </Link>
      </div>
    </main>
  );
}
