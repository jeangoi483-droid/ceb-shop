import Link from 'next/link';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <div className="flex justify-center pb-20 bg-white">
        <Link 
          href="/shop" 
          className="bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-2xl hover:bg-indigo-700 transition-all shadow-xl transform hover:scale-105"
        >
          Découvrir nos montres ⌚
        </Link>
      </div>
    </main>
  );
}
