import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Icons } from '@/components/icons';
import { User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">
            Moodify
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Login</span>
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
