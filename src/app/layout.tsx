import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CEB SHOP | Horlogerie de Luxe en Côte d\'Ivoire',
  description: 'Achetez vos montres de luxe avec paiement Mobile Money',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* Barre de navigation en haut */}
        <Navbar />
        
        {/* Contenu principal de chaque page */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Pied de page en bas */}
        <Footer />
      </body>
    </html>
  );
}
