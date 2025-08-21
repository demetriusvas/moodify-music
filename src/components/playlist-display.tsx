"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, ListMusic } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from './ui/badge';
import type { Mood } from '@/app/page';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type PlaylistDisplayProps = {
  playlist: string[] | null;
  isLoading: boolean;
  mood: Mood | null;
};

export function PlaylistDisplay({ playlist, isLoading, mood }: PlaylistDisplayProps) {
  if (isLoading) {
    return <PlaylistSkeleton />;
  }

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
        <ListMusic className="h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-lg text-muted-foreground">Your playlist will appear here</p>
      </div>
    );
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-4">
          {mood && <mood.icon className="h-10 w-10 text-primary" />}
          <div>
            <CardTitle className="text-2xl md:text-3xl">
              Your {mood?.name} Playlist
            </CardTitle>
            <CardDescription>
              20 songs curated just for you.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {playlist.map((song, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
            >
              <Music className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{song}</span>
            </li>
          ))}
        </ol>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" disabled>
                Save to Spotify
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Feature coming soon!</p>
            </TooltipContent>
          </Tooltip>
           <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" disabled>
                Save to YouTube Music
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Feature coming soon!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}

function PlaylistSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
           <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-full max-w-sm" />
            </div>
          ))}
        </div>
      </CardContent>
       <CardFooter className="flex justify-end gap-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-48" />
      </CardFooter>
    </Card>
  );
}
