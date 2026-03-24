'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Trash2 } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

interface TerminalPanelProps {
  lines?: TerminalLine[];
  onCommand?: (command: string) => void;
}

export function TerminalPanel({ lines = [], onCommand }: TerminalPanelProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to VibeCode Terminal', timestamp: new Date() },
    { type: 'output', content: 'Type "help" for available commands', timestamp: new Date() },
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLine: TerminalLine = {
      type: 'input',
      content: input,
      timestamp: new Date(),
    };

    setHistory((prev) => [...prev, newLine]);
    
    // Simulate command handling
    if (input === 'clear') {
      setHistory([]);
    } else if (input === 'help') {
      setHistory((prev) => [
        ...prev,
        { type: 'output', content: 'Available commands:', timestamp: new Date() },
        { type: 'output', content: '  clear  - Clear terminal', timestamp: new Date() },
        { type: 'output', content: '  help   - Show this help', timestamp: new Date() },
        { type: 'output', content: '  run    - Run current file', timestamp: new Date() },
        { type: 'output', content: '  deploy - Deploy to Vercel', timestamp: new Date() },
      ]);
    } else {
      onCommand?.(input);
      setHistory((prev) => [
        ...prev,
        { type: 'output', content: `Command "${input}" executed`, timestamp: new Date() },
      ]);
    }

    setInput('');
  };

  const handleClear = () => {
    setHistory([]);
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">Terminal</span>
        </div>
        <button
          onClick={handleClear}
          className="p-1 hover:bg-[#3c3c3c] rounded transition-colors"
          title="Clear Terminal"
        >
          <Trash2 className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>

      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-auto p-3 space-y-1"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="flex items-start gap-2">
            {line.type === 'input' && (
              <span className="text-green-400 select-none">$</span>
            )}
            <span
              className={
                line.type === 'error'
                  ? 'text-red-400'
                  : line.type === 'input'
                  ? 'text-white'
                  : 'text-gray-400'
              }
            >
              {line.content}
            </span>
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-400 select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none caret-white"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
