import Link from 'next/link';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <div className="flex justify-center pb-20">
        <Link 
          href="/shop" 
          className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Voir la collection de montres ⌚
        </Link>
      </div>
    </main>
  );
}