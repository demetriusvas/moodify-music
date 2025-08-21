/**
 * @fileoverview Funções para interagir com a API do Spotify.
 */

import { Buffer } from 'buffer';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search`;
const AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';

/**
 * Gera a URL para o usuário autorizar o aplicativo a acessar seus dados do Spotify.
 */
export const getAuthorizationUrl = () => {
    const scopes = [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
    ];
    
    const params = new URLSearchParams({
        client_id: client_id!,
        response_type: 'code',
        redirect_uri: redirect_uri!,
        scope: scopes.join(' '),
    });

    return `${AUTHORIZE_ENDPOINT}?${params.toString()}`;
}

/**
 * Obtém um token de acesso da API do Spotify usando o fluxo de credenciais do cliente.
 * Este token não está associado a um usuário específico.
 */
export const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
    // Aumenta o cache para evitar buscar um novo token a cada requisição
    next: { revalidate: 3600 } 
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Falha ao obter token de acesso do Spotify:', error);
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
