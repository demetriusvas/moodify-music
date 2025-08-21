import { getTokens } from '@/lib/spotify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const homeUrl = new URL('/', req.url);

  if (error) {
    console.error('Erro de autorização do Spotify:', error);
    homeUrl.searchParams.set('error', 'A autorização do Spotify foi negada.');
    return NextResponse.redirect(homeUrl);
  }

  if (!code) {
    console.error('Código de autorização do Spotify não encontrado.');
     homeUrl.searchParams.set('error', 'Código de autorização inválido.');
    return NextResponse.redirect(homeUrl);
  }

  try {
    const tokens = await getTokens(code);
    
    const response = NextResponse.redirect(homeUrl);
    
    // Salva os tokens em cookies httpOnly seguros
    response.cookies.set('spotify_access_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: tokens.expires_in,
    });

     response.cookies.set('spotify_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        // O refresh token geralmente dura muito mais
        maxAge: 60 * 60 * 24 * 30, 
    });


    return response;

  } catch (err) {
    console.error('Falha ao trocar o código por tokens:', err);
    homeUrl.searchParams.set('error', 'Falha ao autenticar com o Spotify.');
    return NextResponse.redirect(homeUrl);
  }
}
