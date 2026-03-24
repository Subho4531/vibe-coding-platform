'use client';

import { useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { StreamingLoader } from '@/components/streaming-loader';

interface CodeDisplayProps {
  code: string;
  isStreaming: boolean;
}

export function CodeDisplay({ code, isStreaming }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTop = codeRef.current.scrollHeight;
    }
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!code && !isStreaming) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">Generated code will appear here</p>
          <p className="text-sm">Start by describing your website in the prompt</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Generated Code
        </span>
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div
        ref={codeRef}
        className="flex-1 overflow-auto bg-background font-mono text-sm p-4 text-foreground/80 whitespace-pre-wrap break-words flex items-center justify-center"
      >
        {isStreaming && !code ? (
          <StreamingLoader />
        ) : code ? (
          <span>{code}</span>
        ) : (
          <span className="text-muted-foreground">
            Generated code will appear here...
          </span>
        )}
      </div>
    </div>
  );
}
