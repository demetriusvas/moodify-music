"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Mood } from '@/app/page';

const moods: Mood[] = [
  { name: 'Feliz', icon: '😊', color: 'bg-yellow-400/80 hover:bg-yellow-400/90 dark:bg-yellow-700/80 dark:hover:bg-yellow-700/90', activeColor: 'bg-yellow-400 dark:bg-yellow-700' },
  { name: 'Triste', icon: '😢', color: 'bg-blue-400/80 hover:bg-blue-400/90 dark:bg-blue-700/80 dark:hover:bg-blue-700/90', activeColor: 'bg-blue-400 dark:bg-blue-700' },
  { name: 'Energético', icon: '⚡️', color: 'bg-orange-400/80 hover:bg-orange-400/90 dark:bg-orange-700/80 dark:hover:bg-orange-700/90', activeColor: 'bg-orange-400 dark:bg-orange-700' },
  { name: 'Calmo', icon: '😌', color: 'bg-green-400/80 hover:bg-green-400/90 dark:bg-green-700/80 dark:hover:bg-green-700/90', activeColor: 'bg-green-400 dark:bg-green-700' },
  { name: 'Romântico', icon: '🥰', color: 'bg-red-400/80 hover:bg-red-400/90 dark:bg-red-700/80 dark:hover:bg-red-700/90', activeColor: 'bg-red-400 dark:bg-red-700' },
  { name: 'Focado', icon: '🎯', color: 'bg-purple-400/80 hover:bg-purple-400/90 dark:bg-purple-700/80 dark:hover:bg-purple-700/90', activeColor: 'bg-purple-400 dark:bg-purple-700' },
  { name: 'Festa', icon: '🎉', color: 'bg-pink-400/80 hover:bg-pink-400/90 dark:bg-pink-700/80 dark:hover:bg-pink-700/90', activeColor: 'bg-pink-400 dark:bg-pink-700' },
  { name: 'Melancólico', icon: '😔', color: 'bg-gray-400/80 hover:bg-gray-400/90 dark:bg-gray-600/80 dark:hover:bg-gray-600/90', activeColor: 'bg-gray-400 dark:bg-gray-600' },
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
              aria-label={`Gerar playlist para o humor ${mood.name}`}
            >
              <span className="text-4xl md:text-5xl">{mood.icon}</span>
              <span>{mood.name}</span>
            </Button>
        )
        })}
    </div>
  );
}
