"use server";

import { generateMoodPlaylist } from '@/ai/flows/generate-mood-playlist';

export type Song = {
  song: string;
  artist: string;
}

export async function getPlaylistForMood(mood: string) {
  try {
    const result = await generateMoodPlaylist({ mood });
    if (!result || !result.playlist) {
      throw new Error('A IA não conseguiu gerar uma playlist válida.');
    }
    return { success: true, playlist: result.playlist };
  } catch (error) {
    console.error('Erro ao gerar playlist na ação do servidor:', error);
    return { success: false, error: 'Não foi possível gerar uma playlist para este humor. Por favor, tente outro.' };
  }
}
