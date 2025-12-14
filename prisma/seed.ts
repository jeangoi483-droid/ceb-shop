// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // On nettoie la base avant de commencer
  await prisma.product.deleteMany();

  // On insère nos produits de test
  const products = [
    {
      name: 'Sneakers Rouge Performance',
      description: 'Confort et style pour vos séances de sport ou vos sorties quotidiennes.',
      price: 45000,
      category: 'Chaussures',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800'
    },
    {
      name: 'Casque Audio Sans Fil',
      description: 'Un son pur et une réduction de bruit active pour une immersion totale.',
      price: 75000,
      category: 'Électronique',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800'
    },
    {
      name: 'Veste en Jean Classique',
      description: 'La veste indémodable qui s\'adapte à toutes vos tenues.',
      price: 15000,
      category: 'Vêtements',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800'
    },
    {
      name: 'Lampe de Bureau Design',
      description: 'Éclairez votre espace de travail avec élégance et modernité.',
      price: 12500,
      category: 'Maison',
      image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800'
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Base de données remplie avec succès ! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });