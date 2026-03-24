'use client';

import { GitBranch, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface StatusBarProps {
  branch?: string;
  filePath?: string;
  line?: number;
  column?: number;
  deployStatus?: 'idle' | 'deploying' | 'success' | 'error';
  language?: string;
}

export function StatusBar({
  branch = 'main',
  filePath = '',
  line = 1,
  column = 1,
  deployStatus = 'idle',
  language = 'TypeScript',
}: StatusBarProps) {
  return (
    <div className="h-6 bg-[#007acc] flex items-center justify-between px-2 text-xs text-white">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Git Branch */}
        <div className="flex items-center gap-1">
          <GitBranch className="w-3.5 h-3.5" />
          <span>{branch}</span>
        </div>

        {/* Deploy Status */}
        <div className="flex items-center gap-1">
          {deployStatus === 'deploying' && (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Deploying...</span>
            </>
          )}
          {deployStatus === 'success' && (
            <>
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Deployed</span>
            </>
          )}
          {deployStatus === 'error' && (
            <>
              <XCircle className="w-3.5 h-3.5" />
              <span>Deploy failed</span>
            </>
          )}
          {deployStatus === 'idle' && (
            <span className="text-white/70">Ready</span>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* File Path */}
        {filePath && (
          <span className="text-white/70 max-w-[200px] truncate">{filePath}</span>
        )}

        {/* Line/Column */}
        <span>
          Ln {line}, Col {column}
        </span>

        {/* Language */}
        <span>{language}</span>

        {/* Encoding */}
        <span>UTF-8</span>
      </div>
    </div>
  );
}
