'use client';

import { useState } from 'react';
import { Play, Copy, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { executeCode, ExecutionResult } from '@/lib/piston';

interface CodeExecutorProps {
  code: string;
  language?: string;
}

export function CodeExecutor({ code, language = 'javascript' }: CodeExecutorProps) {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExecute = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const executionResult = await executeCode(code, language);
      setResult(executionResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Execution failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyOutput = () => {
    if (result) {
      const output = result.stdout || result.stderr || result.output;
      navigator.clipboard.writeText(output);
    }
  };

  const handleClearOutput = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="h-full flex flex-col bg-background rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="border-b border-border p-3 bg-muted/30 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Output</h3>
          <p className="text-xs text-muted-foreground">
            {isLoading && 'Executing...'}
            {result && `Exit Code: ${result.exitCode}`}
            {error && 'Error'}
            {!isLoading && !result && !error && 'Ready'}
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={handleExecute}
            disabled={isLoading || !code.trim()}
          >
            <Play className="w-3 h-3" />
            {isLoading ? 'Running...' : 'Run'}
          </Button>
        </div>
      </div>

      {/* Output Area */}
      <div className="flex-1 overflow-auto bg-background">
        {error ? (
          <div className="p-4 space-y-2">
            <div className="flex gap-2 text-destructive">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Execution Error</p>
                <p className="text-xs mt-1 font-mono">{error}</p>
              </div>
            </div>
          </div>
        ) : result ? (
          <div className="p-4 space-y-4 font-mono text-xs">
            {/* Stdout */}
            {result.stdout && (
              <div className="space-y-1">
                <p className="text-primary font-semibold">Output:</p>
                <div className="bg-muted/50 p-3 rounded border border-border/50 text-foreground whitespace-pre-wrap break-words max-h-40 overflow-auto">
                  {result.stdout}
                </div>
              </div>
            )}

            {/* Stderr */}
            {result.stderr && (
              <div className="space-y-1">
                <p className="text-destructive font-semibold">Errors:</p>
                <div className="bg-destructive/10 p-3 rounded border border-destructive/30 text-destructive/80 whitespace-pre-wrap break-words max-h-40 overflow-auto">
                  {result.stderr}
                </div>
              </div>
            )}

            {/* Exit Code & Runtime */}
            <div className="pt-2 border-t border-border/50 text-muted-foreground space-y-1">
              <p>Exit Code: {result.exitCode}</p>
              <p>Runtime: {result.runtime.toFixed(3)}s</p>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            <p className="text-sm">Click "Run" to execute the code</p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {result && (
        <div className="border-t border-border p-2 bg-muted/30 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 gap-2"
            onClick={handleCopyOutput}
          >
            <Copy className="w-3 h-3" />
            Copy Output
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 gap-2"
            onClick={handleClearOutput}
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
