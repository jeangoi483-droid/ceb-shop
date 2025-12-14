// src/app/layout.tsx

import "../styles/globals.css";
import Navbar from "../components/Navbar"; // <-- 1. Importez le composant

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar /> {/* <-- 2. Placez la Navbar ici */}
        
        <main>{children}</main> {/* Optionnel : enveloppez 'children' dans une balise 'main' */}
        
      </body>
    </html>
  );
}