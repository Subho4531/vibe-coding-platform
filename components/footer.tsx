'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Follow</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">GitHub</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">LinkedIn</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-border" />

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">© 2024 Vibe Coding. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Status</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Changelog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
