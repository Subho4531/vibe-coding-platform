'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { Zap } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  const examples = [
    'A modern landing page for a SaaS product with pricing section',
    'An e-commerce product gallery with filters and cart',
    'A blog platform with search and dark mode',
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 flex flex-col gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Describe your website
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Build a modern AI tools directory with categories, search, and dark mode..."
            className="flex-1 resize-none bg-card border-border"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey && prompt.trim()) {
                handleSubmit();
              }
            }}
          />
        </div>

        {prompt.length === 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Quick examples:</p>
            <div className="flex flex-col gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  onClick={() => setPrompt(example)}
                  className="text-left text-sm p-2 rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isLoading || !prompt.trim()}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        size="lg"
      >
        {isLoading ? (
          <>
            <Spinner className="w-4 h-4" />
            Generating...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            Generate Website
          </>
        )}
      </Button>
    </div>
  );
}
