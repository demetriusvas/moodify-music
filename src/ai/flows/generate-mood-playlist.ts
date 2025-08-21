'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a mood-based playlist.
 *
 * It includes the flow definition, input and output schemas, and a wrapper function.
 *
 * @exports generateMoodPlaylist - An async function that takes a mood and returns a playlist of songs.
 * @exports GenerateMoodPlaylistInput - The input type for the generateMoodPlaylist function.
 * @exports GenerateMoodPlaylistOutput - The output type for the generateMoodPlaylist function.
 */

import {ai} from '@/ai/config';
import {z} from 'genkit';

const GenerateMoodPlaylistInputSchema = z.object({
  mood: z.string().describe('The mood for which to generate a playlist.'),
});
export type GenerateMoodPlaylistInput = z.infer<typeof GenerateMoodPlaylistInputSchema>;

const GenerateMoodPlaylistOutputSchema = z.object({
  playlist: z.array(z.string()).describe('An array of song titles for the given mood.'),
});
export type GenerateMoodPlaylistOutput = z.infer<typeof GenerateMoodPlaylistOutputSchema>;

export async function generateMoodPlaylist(input: GenerateMoodPlaylistInput): Promise<GenerateMoodPlaylistOutput> {
  return generateMoodPlaylistFlow(input);
}

const generateMoodPlaylistPrompt = ai.definePrompt({
  name: 'generateMoodPlaylistPrompt',
  input: {schema: GenerateMoodPlaylistInputSchema},
  output: {schema: GenerateMoodPlaylistOutputSchema},
  prompt: `You are a playlist curator. Generate a playlist of 20 songs that matches the following mood: {{{mood}}}. The playlist should only contain song titles, with each song title on a new line.`,
});

const generateMoodPlaylistFlow = ai.defineFlow(
  {
    name: 'generateMoodPlaylistFlow',
    inputSchema: GenerateMoodPlaylistInputSchema,
    outputSchema: GenerateMoodPlaylistOutputSchema,
  },
  async input => {
    const {output} = await generateMoodPlaylistPrompt(input);
    return output!;
  }
);
