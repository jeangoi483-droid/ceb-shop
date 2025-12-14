// src/app/page.tsx  <-- C'est ce fichier là !

import Hero from "../components/Hero";
import Features from "../components/Features";
import ProductCard from "../components/ProductCard";
import { prisma } from "../lib/prisma"; 

export default async function Home() {
  // On récupère les données de la base de données
  const products = await prisma.product.findMany();

  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Features />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Nos Vedettes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
  <ProductCard 
    key={product.id} 
    id={product.id}
    name={product.name}
    price={product.price}
    image={product.image}
    category={product.category}
  />
))}
        </div>
      </section>
    </main>
  );
}