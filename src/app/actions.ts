"use server";

import { generateMoodPlaylist } from '@/ai/flows/generate-mood-playlist';

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

    return { success: true, playlist: result.playlist };
  } catch (error: any) {
    console.error('Erro ao gerar playlist na ação do servidor:', error);
    // Verifica se a mensagem de erro específica de credenciais está presente
    if (error.message && (error.message.includes('API key') || error.message.includes('quota'))) {
      return { success: false, error: 'O serviço de IA não está configurado corretamente. Verifique sua chave de API e cota.' };
    }
    return { success: false, error: 'Não foi possível gerar uma playlist para este humor. Por favor, tente outro.' };
  }
}
