"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function Navbar() {
  const { cart } = useCart((state) => state.cart) || [];

  const totalItems = cart.length
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <div className="flex gap-6">
        <Link href="/">Accueil</Link>
        <Link href="/montres">Montres</Link>
        <Link href="/femmes">Femmes</Link>
      </div>

      <div>
        🛒 {totalItems}
      </div>
    </nav>
  );
}
