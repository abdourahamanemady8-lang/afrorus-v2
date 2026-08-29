import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, email, message } = body;

    if (!nom || !email || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
    }

    console.log('Message reçu de', nom, email, message);
    return NextResponse.json({ success: true, message: 'Message envoyé avec succès.' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
