'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Settings, X } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* API Configuration */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">API Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Configure your OpenRouter API key for code generation
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                OpenRouter API Key
              </label>
              <div className="flex gap-2">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key..."
                  className="flex-1 px-3 py-2 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors text-muted-foreground text-sm font-medium"
                >
                  {showApiKey ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get your free API key at <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">openrouter.ai</a>
              </p>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Generation Settings */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Generation Settings</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Code Style
              </label>
              <select className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="modern">Modern (TypeScript + Tailwind)</option>
                <option value="simple">Simple (JavaScript + CSS)</option>
                <option value="component">Component-based</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Framework Version
              </label>
              <select className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="latest">Latest (Next.js 16)</option>
                <option value="v15">Next.js 15</option>
                <option value="v14">Next.js 14</option>
              </select>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* About */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">About</h3>
            <p className="text-sm text-muted-foreground">
              Vibe Coding v1.0.0
            </p>
            <p className="text-xs text-muted-foreground">
              Powered by OpenRouter and advanced AI models
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/50 sticky bottom-0">
          <Button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
