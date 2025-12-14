// src/lib/format.ts

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0, // Le FCFA n'utilise pas de centimes en général
  }).format(price);
};