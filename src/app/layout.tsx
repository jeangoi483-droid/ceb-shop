import '../app/globals.css'; // Changement ici : on précise bien le chemin interne
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// On utilise des chemins relatifs sécurisés
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CEBA SHOP | Horlogerie de Luxe en Côte d\'Ivoire',
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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
