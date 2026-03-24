'use client';

import { X } from 'lucide-react';

interface Tab {
  path: string;
  name: string;
  isModified: boolean;
}

interface EditorTabsProps {
  tabs: Tab[];
  activeTab: string | null;
  onTabSelect: (path: string) => void;
  onTabClose: (path: string) => void;
}

function getFileColor(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'tsx':
    case 'ts':
      return 'border-blue-500';
    case 'jsx':
    case 'js':
      return 'border-yellow-500';
    case 'css':
      return 'border-purple-500';
    case 'json':
      return 'border-green-500';
    default:
      return 'border-gray-500';
  }
}

export function EditorTabs({ tabs, activeTab, onTabSelect, onTabClose }: EditorTabsProps) {
  if (tabs.length === 0) {
    return (
      <div className="h-9 bg-[#252526] border-b border-[#3c3c3c] flex items-center px-4">
        <span className="text-xs text-gray-500">No files open</span>
      </div>
    );
  }

  return (
    <div className="h-9 bg-[#252526] border-b border-[#3c3c3c] flex items-center overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.path;
        const borderColor = getFileColor(tab.name);

        return (
          <div
            key={tab.path}
            className={`group flex items-center gap-2 px-3 h-full border-t-2 cursor-pointer transition-colors ${
              isActive
                ? `${borderColor} bg-[#1e1e1e]`
                : 'border-transparent bg-[#2d2d2d] hover:bg-[#2a2d2e]'
            }`}
            onClick={() => onTabSelect(tab.path)}
          >
            <span className={`text-sm ${isActive ? 'text-white' : 'text-gray-400'}`}>
              {tab.name}
            </span>
            {tab.isModified && (
              <span className="w-2 h-2 rounded-full bg-white" />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.path);
              }}
              className={`p-0.5 rounded hover:bg-[#3c3c3c] transition-colors ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <X className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
