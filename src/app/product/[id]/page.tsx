// src/app/product/[id]/page.tsx
import AddToCartButton from "../../../components/AddToCartButton";
import { prisma } from "../../../lib/prisma"; // On remonte de 3 niveaux
import { formatPrice } from "../../../lib/format";
import { notFound } from "next/navigation";
import ProductCard from "../../../components/ProductCard";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // 1. Chercher le produit dans la base de données
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  // 2. Si l'ID n'existe pas, on renvoie une erreur 404
  if (!product) {
    notFound();
  }

  // 3. Chercher 4 autres produits pour la suggestion
  const similarProducts = await prisma.product.findMany({
    take: 4,
    where: { NOT: { id: product.id } }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* IMAGE DU PRODUIT */}
        <div className="rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* INFOS DU PRODUIT */}
        <div className="flex flex-col justify-center">
          <span className="text-indigo-600 font-bold uppercase text-sm tracking-widest">
            {product.category}
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>
          <div className="text-3xl font-bold text-gray-900 mb-10">
            {formatPrice(product.price)}
          </div>

          {/* Bouton pour l'instant simple (on le rendra fonctionnel après) */}
          <AddToCartButton 
  product={{
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  }} 
/>
        </div>
      </div>

      {/* SUGGESTIONS */}
      <div className="mt-32">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Vous aimerez aussi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {similarProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}