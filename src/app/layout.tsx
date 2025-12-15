import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// LES IMPORTS DOIVENT ÊTRE ICI
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import WhatsAppFloating from '../components/WhatsAppFloating'; // <-- BIEN VÉRIFIER LE CHEMIN

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
        
        {/* On garde notre marge pour mobile ici */}
        <main className="min-h-screen pt-16 md:pt-24">
          {children}
        </main>
        
        <Footer />
        
        {/* LE BOUTON FLOTTANT DOIT ÊTRE À L'INTÉRIEUR DU BODY */}
        <WhatsAppFloating />
      </body>
    </html>
  );
}
