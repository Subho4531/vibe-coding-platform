'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, Plus, FolderPlus } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  path: string;
}

interface FileTreeProps {
  files: FileNode[];
  activeFile: string | null;
  onFileSelect: (path: string) => void;
  onNewFile?: () => void;
  onNewFolder?: () => void;
}

function getFileIcon(name: string): { color: string; label: string } {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'tsx':
    case 'ts':
      return { color: 'bg-blue-500', label: 'TS' };
    case 'jsx':
    case 'js':
      return { color: 'bg-yellow-500', label: 'JS' };
    case 'css':
      return { color: 'bg-purple-500', label: 'CS' };
    case 'json':
      return { color: 'bg-green-500', label: 'JS' };
    case 'md':
      return { color: 'bg-gray-500', label: 'MD' };
    case 'html':
      return { color: 'bg-orange-500', label: 'HT' };
    default:
      return { color: 'bg-gray-400', label: '' };
  }
}

function FileTreeItem({
  node,
  depth,
  activeFile,
  onFileSelect,
}: {
  node: FileNode;
  depth: number;
  activeFile: string | null;
  onFileSelect: (path: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const isActive = activeFile === node.path;
  const icon = getFileIcon(node.name);

  if (node.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center gap-1 py-1 px-2 text-sm text-left hover:bg-[#2a2d2e] transition-colors ${
            depth > 0 ? 'pl-' + (depth * 4 + 2) : ''
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          )}
          <Folder className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          <span className="text-gray-300 truncate">{node.name}</span>
        </button>
        {isOpen && node.children && (
          <div>
            {node.children.map((child) => (
              <FileTreeItem
                key={child.path}
                node={child}
                depth={depth + 1}
                activeFile={activeFile}
                onFileSelect={onFileSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => onFileSelect(node.path)}
      className={`w-full flex items-center gap-2 py-1 px-2 text-sm text-left transition-colors ${
        isActive ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'
      }`}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
    >
      <span className={`w-2 h-2 rounded-full ${icon.color} flex-shrink-0`} />
      <span className={`truncate ${isActive ? 'text-white' : 'text-gray-400'}`}>
        {node.name}
      </span>
    </button>
  );
}

export function FileTree({
  files,
  activeFile,
  onFileSelect,
  onNewFile,
  onNewFolder,
}: FileTreeProps) {
  return (
    <div className="h-full flex flex-col bg-[#252526] border-r border-[#3c3c3c]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#3c3c3c]">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Explorer
        </span>
        <div className="flex gap-1">
          <button
            onClick={onNewFile}
            className="p-1 hover:bg-[#3c3c3c] rounded transition-colors"
            title="New File"
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={onNewFolder}
            className="p-1 hover:bg-[#3c3c3c] rounded transition-colors"
            title="New Folder"
          >
            <FolderPlus className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-auto py-1">
        {files.map((node) => (
          <FileTreeItem
            key={node.path}
            node={node}
            depth={0}
            activeFile={activeFile}
            onFileSelect={onFileSelect}
          />
        ))}
      </div>
    </div>
  );
}
