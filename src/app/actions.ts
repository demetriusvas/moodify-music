"use server";

import { generateMoodPlaylist } from '@/ai/flows/generate-mood-playlist';

export async function getPlaylistForMood(mood: string) {
  try {
    const result = await generateMoodPlaylist({ mood });
    if (!result || !result.playlist) {
      throw new Error('AI failed to generate a valid playlist.');
    }
    return { success: true, playlist: result.playlist };
  } catch (error) {
    console.error('Error generating playlist in server action:', error);
    return { success: false, error: 'Could not generate a playlist for this mood. Please try another one.' };
  }
}
