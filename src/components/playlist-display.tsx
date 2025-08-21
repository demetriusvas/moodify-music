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
import type { Mood } from '@/app/page';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';
import { Song } from '@/app/actions';
import { getAuthorizationUrl } from '@/lib/spotify';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

type PlaylistDisplayProps = {
  playlist: Song[] | null;
  isLoading: boolean;
  mood: Mood | null;
};

const spotifyConfigured = !!process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID && !!process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

export function PlaylistDisplay({ playlist, isLoading, mood }: PlaylistDisplayProps) {
  const router = useRouter();
  const { toast } = useToast();

  if (isLoading) {
    return <PlaylistSkeleton />;
  }

  if (!playlist || !mood) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
        <ListMusic className="h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-lg text-muted-foreground">Sua playlist aparecerá aqui</p>
      </div>
    );
  }
  
  const handleSaveToSpotify = () => {
    try {
      const authUrl = getAuthorizationUrl();
      window.open(authUrl, '_blank', 'noopener,noreferrer');
    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Erro de Configuração',
        description: error.message,
      });
    }
  }

  return (
    <Card className={cn("w-full animate-fade-in transition-colors", mood.playlistColor)}>
      <CardHeader>
        <div className="flex items-center gap-4">
          {mood && <span className="text-4xl">{mood.icon}</span>}
          <div>
            <CardTitle className="text-2xl md:text-3xl">
              Sua Playlist {mood?.name}
            </CardTitle>
            <CardDescription>
              20 músicas selecionadas para você.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {playlist.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm transition-colors group"
            >
              <Music className="h-4 w-4 text-muted-foreground mt-1" />
              <div className="flex flex-col">
                <span className="font-medium group-hover:text-primary">{item.song}</span>
                <span className="text-muted-foreground text-xs">{item.artist}</span>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 justify-end">
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div tabIndex={0} className={cn(!spotifyConfigured && "cursor-not-allowed")}>
                    <Button onClick={handleSaveToSpotify} disabled={!spotifyConfigured}>
                        Salvar no Spotify
                    </Button>
                </div>
              </TooltipTrigger>
              {!spotifyConfigured && (
                 <TooltipContent>
                    <p>A integração com o Spotify não está configurada. Verifique as variáveis de ambiente.</p>
                 </TooltipContent>
              )}
            </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
           <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" disabled>
                Salvar no YouTube Music
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Funcionalidade em breve!</p>
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
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-3/4" />
                 <Skeleton className="h-3 w-1/2" />
              </div>
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
