'use client';

import { AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WebsitePreviewProps {
  isStreaming: boolean;
  code?: string;
}

export function WebsitePreview({ isStreaming, code }: WebsitePreviewProps) {
  const codeStats = {
    lines: code?.split('\n').length || 0,
    chars: code?.length || 0,
    components: (code?.match(/export(?:\s+default)?\s+(?:function|const)/g) || []).length,
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Code Statistics
        </span>
        <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-green-500 animate-pulse' : 'bg-muted'}`} />
      </div>

      <div className="flex-1 overflow-auto bg-background p-6 flex flex-col items-center justify-center space-y-8">
        {code ? (
          <div className="w-full space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <p className="text-2xl font-bold text-primary">{codeStats.lines}</p>
                <p className="text-xs text-muted-foreground mt-1">Lines of Code</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 text-center">
                <p className="text-2xl font-bold text-secondary">{codeStats.components}</p>
                <p className="text-xs text-muted-foreground mt-1">Components</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 text-center">
                <p className="text-2xl font-bold text-accent">{(codeStats.chars / 1024).toFixed(1)}</p>
                <p className="text-xs text-muted-foreground mt-1">KB</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-3 w-full">
              <p className="text-sm font-semibold text-foreground">Next Steps:</p>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Copy the code from the middle panel</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Create a new Next.js project or use existing one</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Paste the code into your app directory</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span>Run npm install && npm run dev</span>
                </li>
              </ol>
            </div>

            <Button
              variant="outline"
              className="w-full border-border hover:bg-card"
              onClick={() => window.open('https://nextjs.org/docs', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Next.js Documentation
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4 text-muted-foreground">
            <div className="flex justify-center">
              <AlertCircle className="w-12 h-12 opacity-50" />
            </div>
            <div>
              <p className="font-semibold mb-1">Code Statistics</p>
              <p className="text-sm text-balance">
                Generate some code to see statistics and deployment instructions
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
