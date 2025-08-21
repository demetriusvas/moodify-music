"use client";

import { useState } from 'react';
import { Header } from '@/components/header';
import { MoodSelector } from '@/components/mood-selector';
import { PlaylistDisplay } from '@/components/playlist-display';
import { getPlaylistForMood } from './actions';
import { useToast } from '@/hooks/use-toast';

export type Mood = {
  name: string;
  icon: React.ElementType;
};

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [playlist, setPlaylist] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleMoodSelect = async (mood: Mood) => {
    if (isLoading) return;

    setSelectedMood(mood);
    setIsLoading(true);
    setPlaylist(null);

    const result = await getPlaylistForMood(mood.name);

    if (result.success && result.playlist) {
      setPlaylist(result.playlist);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to generate playlist.',
      });
      setPlaylist(null);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 md:gap-12">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary">
              What's your mood today?
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Select a mood to generate a personalized playlist just for you.
            </p>
          </div>

          <MoodSelector onMoodSelect={handleMoodSelect} isLoading={isLoading} />

          <PlaylistDisplay
            playlist={playlist}
            isLoading={isLoading}
            mood={selectedMood}
          />
        </div>
      </main>
      <footer className="py-6 w-full flex items-center justify-center">
        <p className="text-xs text-muted-foreground">
          Powered by Moodify Music
        </p>
      </footer>
    </div>
  );
}
