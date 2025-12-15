import '../styles/globals.css'; // Chemin exact vers votre dossier styles
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Chemins relatifs pour vos composants
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
        <main className="min-h-screen pt-16 md:pt-24">
  {children}
</main>
        <Footer />
        import WhatsAppFloating from '../components/WhatsAppFloating';
      </body>
    </html>
  );
}
