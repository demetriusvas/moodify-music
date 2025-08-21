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
  { name: 'Happy', icon: Smile },
  { name: 'Sad', icon: Frown },
  { name: 'Energetic', icon: Zap },
  { name: 'Calm', icon: Coffee },
  { name: 'Romantic', icon: Heart },
  { name: 'Focused', icon: BrainCircuit },
  { name: 'Party', icon: PartyPopper },
  { name: 'Melancholic', icon: CloudRain },
];

type MoodSelectorProps = {
  onMoodSelect: (mood: Mood) => void;
  isLoading: boolean;
};

export function MoodSelector({ onMoodSelect, isLoading }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
      {moods.map((mood) => (
        <Button
          key={mood.name}
          variant="outline"
          className="h-24 md:h-32 text-lg flex-col gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-accent/80 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          onClick={() => onMoodSelect(mood)}
          disabled={isLoading}
          aria-label={`Generate playlist for ${mood.name} mood`}
        >
          <mood.icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
          <span>{mood.name}</span>
        </Button>
      ))}
    </div>
  );
}
