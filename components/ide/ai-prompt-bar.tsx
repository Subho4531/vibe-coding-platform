'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';

interface AIPromptBarProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  isAutoSaving?: boolean;
  isDeployed?: boolean;
  branch?: string;
}

export function AIPromptBar({
  onSubmit,
  isLoading = false,
  isAutoSaving = false,
  isDeployed = false,
  branch = 'main',
}: AIPromptBarProps) {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim() || isLoading) return;
    onSubmit(prompt.trim());
    setPrompt('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-[#3c3c3c] bg-[#252526]">
      {/* Input Area */}
      <div className="flex items-end gap-2 p-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want to build or change..."
            className="w-full bg-[#3c3c3c] text-white text-sm rounded-lg px-4 py-3 pr-12 resize-none outline-none focus:ring-2 focus:ring-purple-500/50 placeholder:text-gray-500"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isLoading}
            className="absolute right-2 bottom-2 p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Status Chips */}
      <div className="flex items-center gap-3 px-3 pb-2 text-xs">
        <div className="flex items-center gap-1.5">
          {isAutoSaving ? (
            <>
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-gray-400">Auto-saving</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-400">Auto-saves</span>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-1.5">
          {isDeployed ? (
            <>
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-400">Deployed</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-gray-400">Not deployed</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" />
          </svg>
          <span className="text-gray-400">{branch}</span>
        </div>
      </div>
    </div>
  );
}
