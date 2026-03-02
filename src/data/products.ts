export interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'montre' | 'femme';
}

export const mockProducts: ProductData[] = [
  // Montres
  { id: 'm1', name: 'Montre Classique', price: 35000, image: '/images/montres/montre1.jpg', category: 'montre' },
  { id: 'm2', name: 'Montre Luxe', price: 65000, image: '/images/montres/montre2.jpg', category: 'montre' },
  { id: 'm3', name: 'Montre Sport', price: 25000, image: '/images/montres/montre3.jpg', category: 'montre' },
  { id: 'm4', name: 'Montre Élégante', price: 45000, image: '/images/montres/montre4.jpg', category: 'montre' },

  // Femme
  { id: 'f1', name: 'Robe Chic', price: 40000, image: '/images/femmes/femme1.jpg', category: 'femme' },
  { id: 'f2', name: 'Sac à Main', price: 30000, image: '/images/femmes/femme2.jpg', category: 'femme' },
  { id: 'f3', name: 'Chaussures Élégantes', price: 35000, image: '/images/femmes/femme3.jpg', category: 'femme' },
  { id: 'f4', name: 'Accessoire Luxe', price: 15000, image: '/images/femmes/femme4.jpg', category: 'femme' },
];
