'use client';

import { useState } from 'react';
import { RefreshCw, ExternalLink, Globe } from 'lucide-react';

interface PreviewPanelProps {
  url: string;
  isDeployed: boolean;
  onRefresh?: () => void;
}

export function PreviewPanel({ url, isDeployed, onRefresh }: PreviewPanelProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    onRefresh?.();
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#3c3c3c] border-b border-[#252526]">
        {/* Window Controls */}
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center gap-2 mx-2 px-3 py-1 bg-[#252526] rounded-md">
          <Globe className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs text-gray-400 truncate flex-1">
            {url || 'localhost:5173'}
          </span>
        </div>

        {/* Actions */}
        <button
          onClick={handleRefresh}
          className="p-1.5 hover:bg-[#4c4c4c] rounded transition-colors"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        <button
          onClick={() => window.open(url || 'about:blank', '_blank')}
          className="p-1.5 hover:bg-[#4c4c4c] rounded transition-colors"
          title="Open in new tab"
        >
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 relative">
        <iframe
          src={url || 'about:blank'}
          className="w-full h-full border-0 bg-white"
          title="Preview"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
        
        {!url && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]">
            <div className="text-center">
              <Globe className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Preview will appear here</p>
              <p className="text-gray-500 text-xs mt-1">Run your code to see the preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
