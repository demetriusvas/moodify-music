"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Mood } from '@/app/page';

const moods: Mood[] = [
  { name: 'Happy', icon: '😊', color: 'bg-yellow-400/20 hover:bg-yellow-400/30 dark:bg-yellow-700/20 dark:hover:bg-yellow-700/30', activeColor: 'bg-yellow-400/40 dark:bg-yellow-700/40' },
  { name: 'Sad', icon: '😢', color: 'bg-blue-400/20 hover:bg-blue-400/30 dark:bg-blue-700/20 dark:hover:bg-blue-700/30', activeColor: 'bg-blue-400/40 dark:bg-blue-700/40' },
  { name: 'Energetic', icon: '⚡️', color: 'bg-orange-400/20 hover:bg-orange-400/30 dark:bg-orange-700/20 dark:hover:bg-orange-700/30', activeColor: 'bg-orange-400/40 dark:bg-orange-700/40' },
  { name: 'Calm', icon: '😌', color: 'bg-green-400/20 hover:bg-green-400/30 dark:bg-green-700/20 dark:hover:bg-green-700/30', activeColor: 'bg-green-400/40 dark:bg-green-700/40' },
  { name: 'Romantic', icon: '🥰', color: 'bg-red-400/20 hover:bg-red-400/30 dark:bg-red-700/20 dark:hover:bg-red-700/30', activeColor: 'bg-red-400/40 dark:bg-red-700/40' },
  { name: 'Focused', icon: '🎯', color: 'bg-purple-400/20 hover:bg-purple-400/30 dark:bg-purple-700/20 dark:hover:bg-purple-700/30', activeColor: 'bg-purple-400/40 dark:bg-purple-700/40' },
  { name: 'Party', icon: '🎉', color: 'bg-pink-400/20 hover:bg-pink-400/30 dark:bg-pink-700/20 dark:hover:bg-pink-700/30', activeColor: 'bg-pink-400/40 dark:bg-pink-700/40' },
  { name: 'Melancholic', icon: '😔', color: 'bg-gray-400/20 hover:bg-gray-400/30 dark:bg-gray-600/20 dark:hover:bg-gray-600/30', activeColor: 'bg-gray-400/40 dark:bg-gray-600/40' },
];

type MoodSelectorProps = {
  onMoodSelect: (mood: Mood) => void;
  isLoading: boolean;
  selectedMood: Mood | null;
};

export function MoodSelector({ onMoodSelect, isLoading, selectedMood }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
      {moods.map((mood) => {
        const isActive = selectedMood?.name === mood.name;
        return (
            <Button
              key={mood.name}
              variant="outline"
              className={cn(
                "h-24 md:h-32 text-lg flex-col gap-2 transition-all duration-300 ease-in-out transform focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                isActive ? mood.activeColor : mood.color,
                !isActive && "hover:scale-105"
                )}
              onClick={() => onMoodSelect(mood)}
              disabled={isLoading}
              aria-label={`Generate playlist for ${mood.name} mood`}
            >
              <span className="text-4xl md:text-5xl">{mood.icon}</span>
              <span>{mood.name}</span>
            </Button>
        )
        })}
    </div>
  );
}
