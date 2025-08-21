/**
 * @fileoverview Funções para interagir com a API do Spotify.
 */
'use server';

import { Buffer } from 'buffer';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

/**
 * Obtém um token de acesso da API do Spotify.
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
  });

  return response.json();
};

export const searchTracks = async (accessToken: string, query: string) => {
    const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search`;
    const response = await fetch(`${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&type=track&limit=1`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('Falha ao buscar música no Spotify:', error);
        return null;
    }

    const data = await response.json();
    return data.tracks.items[0];
}
