'use client';

import { AlertTriangle, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface ErrorBoundaryProps {
  error?: string | null;
  onRetry?: () => void;
}

export function ErrorBoundary({ error, onRetry }: ErrorBoundaryProps) {
  const [visible, setVisible] = useState(!!error);

  useEffect(() => {
    setVisible(!!error);
  }, [error]);

  if (!visible || !error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-destructive/50 rounded-lg shadow-xl max-w-md p-6 space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
          <h2 className="text-lg font-semibold text-foreground">Error</h2>
        </div>

        <p className="text-muted-foreground">{error}</p>

        <div className="flex gap-3 pt-2">
          {onRetry && (
            <Button
              onClick={() => {
                onRetry();
                setVisible(false);
              }}
              className="flex-1 gap-2 bg-primary hover:bg-primary/90"
            >
              <RotateCw className="w-4 h-4" />
              Try Again
            </Button>
          )}

          <Button
            onClick={() => setVisible(false)}
            variant="outline"
            className="flex-1"
          >
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}
