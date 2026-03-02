'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../../lib/store';
import Image from 'next/image';

export default function CartPage() {
    const [mounted, setMounted] = useState(false);
    const { items = [], removeFromCart, clearCart } = useCart();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setTotal(items.reduce((acc, i) => acc + (i.price * (i.quantity || 1)), 0));
    }, [items]);

    if (!mounted) return null;

    if (items.length === 0) return <p>Panier vide</p>;

    return (
        <div>
            {items.map(i => (
                <div key={i.id}>
                    <Image src={i.image} alt={i.name} width={100} height={100} />
                    <p>{i.name} x {i.quantity}</p>
                    <button onClick={() => removeFromCart(i.id)}>Supprimer</button>
                </div>
            ))}
            <p>Total: {total}</p>
            <button onClick={() => clearCart()}>Vider panier</button>
        </div>
    );
}
