"use client";

import {
  Smile,
  Frown,
  Zap,
  Coffee,
  Heart,
  BrainCircuit,
  PartyPopper,
  CloudRain,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Mood } from '@/app/page';

const moods: Mood[] = [
  { name: 'Happy', icon: Smile, color: 'hover:bg-yellow-400/50 dark:hover:bg-yellow-700/40', activeColor: 'bg-yellow-400/50 dark:bg-yellow-700/40' },
  { name: 'Sad', icon: Frown, color: 'hover:bg-blue-400/50 dark:hover:bg-blue-700/40', activeColor: 'bg-blue-400/50 dark:bg-blue-700/40' },
  { name: 'Energetic', icon: Zap, color: 'hover:bg-orange-400/50 dark:hover:bg-orange-700/40', activeColor: 'bg-orange-400/50 dark:bg-orange-700/40' },
  { name: 'Calm', icon: Coffee, color: 'hover:bg-green-400/50 dark:hover:bg-green-700/40', activeColor: 'bg-green-400/50 dark:bg-green-700/40' },
  { name: 'Romantic', icon: Heart, color: 'hover:bg-red-400/50 dark:hover:bg-red-700/40', activeColor: 'bg-red-400/50 dark:bg-red-700/40' },
  { name: 'Focused', icon: BrainCircuit, color: 'hover:bg-purple-400/50 dark:hover:bg-purple-700/40', activeColor: 'bg-purple-400/50 dark:bg-purple-700/40' },
  { name: 'Party', icon: PartyPopper, color: 'hover:bg-pink-400/50 dark:hover:bg-pink-700/40', activeColor: 'bg-pink-400/50 dark:bg-pink-700/40' },
  { name: 'Melancholic', icon: CloudRain, color: 'hover:bg-gray-400/50 dark:hover:bg-gray-600/40', activeColor: 'bg-gray-400/50 dark:bg-gray-600/40' },
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
                !isActive && "hover:scale-105",
                isActive ? mood.activeColor : mood.color
                )}
              onClick={() => onMoodSelect(mood)}
              disabled={isLoading}
              aria-label={`Generate playlist for ${mood.name} mood`}
            >
              <mood.icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              <span>{mood.name}</span>
            </Button>
        )
        })}
    </div>
  );
}
