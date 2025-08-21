/**
 * @fileoverview Funções para interagir com a API do Spotify.
 */

import { Buffer } from 'buffer';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search`;
const AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';

/**
 * Gera a URL para o usuário autorizar o aplicativo a acessar seus dados do Spotify.
 */
export const getAuthorizationUrl = () => {
    if (!process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || !process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI) {
        throw new Error('As variáveis de ambiente do Spotify (NEXT_PUBLIC_SPOTIFY_CLIENT_ID, NEXT_PUBLIC_SPOTIFY_REDIRECT_URI) não estão configuradas.');
    }

    const scopes = [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
    ];
    
    const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
        scope: scopes.join(' '),
    });

    return `${AUTHORIZE_ENDPOINT}?${params.toString()}`;
}

/**
 * Troca um código de autorização por tokens de acesso e de atualização.
 */
export const getTokens = async (code: string) => {
  if (!client_id || !client_secret || !redirect_uri) {
    throw new Error('As credenciais do Spotify não estão configuradas no ambiente.');
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
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
 * Obtém um token de acesso da API do Spotify usando o fluxo de credenciais do cliente.
 * Este token não está associado a um usuário específico.
 */
export const getAccessToken = async () => {
  if (!client_id || !client_secret) {
    throw new Error('As credenciais do Spotify (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET) não estão configuradas no ambiente.');
  }
    
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
