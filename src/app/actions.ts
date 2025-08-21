"use server";

import { generateMoodPlaylist } from '@/ai/flows/generate-mood-playlist';
import { getAccessToken, searchTracks } from '@/lib/spotify';

export type Song = {
  song: string;
  artist: string;
}

export async function getPlaylistForMood(mood: string) {
  try {
    // 1. Generate playlist from AI
    const result = await generateMoodPlaylist({ mood });
    if (!result || !result.playlist) {
      throw new Error('A IA não conseguiu gerar uma playlist válida.');
    }

    // 2. Get Spotify access token
    const { access_token } = await getAccessToken();
    if (!access_token) {
        throw new Error('Não foi possível obter o token de acesso do Spotify.');
    }

    // 3. Search for each track on Spotify
    for (const song of result.playlist) {
        const query = `${song.song} ${song.artist}`;
        const track = await searchTracks(access_token, query);
        if (track) {
            console.log(`Encontrado: ${track.name} por ${track.artists.map((a:any) => a.name).join(', ')} - ID: ${track.id}`);
        } else {
            console.log(`Não foi possível encontrar a faixa: ${query}`);
        }
    }


    return { success: true, playlist: result.playlist };
  } catch (error: any) {
    console.error('Erro ao gerar playlist na ação do servidor:', error);
    if (error.message.includes('variáveis de ambiente')) {
      return { success: false, error: 'A integração com o Spotify não está configurada corretamente.' };
    }
    return { success: false, error: 'Não foi possível gerar uma playlist para este humor. Por favor, tente outro.' };
  }
}
