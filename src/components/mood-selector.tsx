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
  { name: 'Happy', icon: Smile, color: 'hover:bg-yellow-200/50 dark:hover:bg-yellow-900/30', activeColor: 'bg-yellow-200/50 dark:bg-yellow-900/30' },
  { name: 'Sad', icon: Frown, color: 'hover:bg-blue-200/50 dark:hover:bg-blue-900/30', activeColor: 'bg-blue-200/50 dark:bg-blue-900/30' },
  { name: 'Energetic', icon: Zap, color: 'hover:bg-orange-200/50 dark:hover:bg-orange-900/30', activeColor: 'bg-orange-200/50 dark:bg-orange-900/30' },
  { name: 'Calm', icon: Coffee, color: 'hover:bg-green-200/50 dark:hover:bg-green-900/30', activeColor: 'bg-green-200/50 dark:bg-green-900/30' },
  { name: 'Romantic', icon: Heart, color: 'hover:bg-red-200/50 dark:hover:bg-red-900/30', activeColor: 'bg-red-200/50 dark:bg-red-900/30' },
  { name: 'Focused', icon: BrainCircuit, color: 'hover:bg-purple-200/50 dark:hover:bg-purple-900/30', activeColor: 'bg-purple-200/50 dark:bg-purple-900/30' },
  { name: 'Party', icon: PartyPopper, color: 'hover:bg-pink-200/50 dark:hover:bg-pink-900/30', activeColor: 'bg-pink-200/50 dark:bg-pink-900/30' },
  { name: 'Melancholic', icon: CloudRain, color: 'hover:bg-gray-200/50 dark:hover:bg-gray-700/30', activeColor: 'bg-gray-200/50 dark:bg-gray-700/30' },
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
