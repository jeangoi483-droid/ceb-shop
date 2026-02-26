'use client';

import ShopLayout from '@/components/ShopLayout';
import { mockProducts } from '../../data/products';

export default function FemmesPage() {

  // On filtre uniquement les produits femmes
  const produitsFemmes = mockProducts.filter(
    (product) => product.category === 'femme'
  );

  return (
    <ShopLayout
      title="Collection Femmes"
      subtitle="Élégance & Exclusivité"
      products={produitsFemmes}
    />
  );
}
