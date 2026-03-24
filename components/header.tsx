'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary/80 flex items-center justify-center text-white">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-foreground">Vibe Coding</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </div>

        <Link href="/generator">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Start Building
          </Button>
        </Link>
      </nav>
    </header>
  );
}
