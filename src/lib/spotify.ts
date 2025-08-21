/**
 * @fileoverview Funções para interagir com a API do Spotify.
 */

import { Buffer } from 'buffer';

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search`;
const AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';

/**
 * Gera a URL para o usuário autorizar o aplicativo a acessar seus dados do Spotify.
 * Usa as variáveis de ambiente públicas, pois é chamada no lado do cliente.
 */
export const getAuthorizationUrl = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

    if (!clientId || !redirectUri) {
        throw new Error('As variáveis de ambiente do Spotify para o cliente (NEXT_PUBLIC_SPOTIFY_CLIENT_ID, NEXT_PUBLIC_SPOTIFY_REDIRECT_URI) não estão configuradas.');
    }

    const scopes = [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
    ];
    
    const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        scope: scopes.join(' '),
    });

    return `${AUTHORIZE_ENDPOINT}?${params.toString()}`;
}

/**
 * Troca um código de autorização por tokens de acesso e de atualização.
 * Usa as variáveis de ambiente do servidor, pois é chamada no lado do servidor.
 */
export const getTokens = async (code: string) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('As credenciais do servidor Spotify não estão configuradas no ambiente.');
  }
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Falha ao obter tokens do Spotify:', error);
    throw new Error('Falha ao autenticar com o Spotify.');
  }

  return response.json();
};

/**
 * Busca uma faixa no Spotify com base em uma consulta.
 * Retorna o primeiro resultado encontrado.
 */
export const searchTracks = async (accessToken: string, query: string) => {
    const response = await fetch(`${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&type=track&limit=1`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if (!response.ok) {
        // Se a busca falhar, não é um erro crítico, apenas logamos e retornamos null
        const error = await response.json();
        console.error(`Falha ao buscar música no Spotify para a query "${query}":`, error);
        return null;
    }

    const data = await response.json();
    return data.tracks.items[0] || null; // Retorna a primeira faixa ou null se não houver resultados
}
