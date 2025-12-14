import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, amount } = await req.json();

    // On vérifie si la clé est bien présente
    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Clé API manquante dans le .env" }, { status: 500 });
    }

    // On contacte Paystack pour créer la transaction
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        amount: Math.round(amount * 100), // Conversion en centimes (Paystack l'exige)
        currency: "XOF",
        callback_url: `${req.headers.get('origin')}/success`,
      }),
    });

    const data = await response.json();
    
    // On renvoie la réponse de Paystack à notre page Panier
    return NextResponse.json(data);

  } catch (error) {
    console.error("Erreur Paystack API:", error);
    return NextResponse.json({ error: "Erreur interne au serveur" }, { status: 500 });
  }
}