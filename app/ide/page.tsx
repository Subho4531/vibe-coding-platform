'use client';

import { useState, useEffect, useCallback } from 'react';
import { FileTree } from '@/components/ide/file-tree';
import { EditorTabs } from '@/components/ide/editor-tabs';
import { PreviewPanel } from '@/components/ide/preview-panel';
import { TerminalPanel } from '@/components/ide/terminal-panel';
import { AIPromptBar } from '@/components/ide/ai-prompt-bar';
import { StatusBar } from '@/components/ide/status-bar';
import { CodeEditor } from '@/components/code-editor';
import { useModel } from '@/lib/model-context';
import { 
  GitBranch, 
  Settings, 
  Columns2,
  Monitor,
  Terminal,
  MessageSquare,
  Loader2,
  ExternalLink
} from 'lucide-react';

// Sample file structure
const initialFiles = [
  {
    name: 'my-app',
    type: 'folder' as const,
    path: 'my-app',
    children: [
      {
        name: 'src',
        type: 'folder' as const,
        path: 'my-app/src',
        children: [
          { name: 'App.jsx', type: 'file' as const, path: 'my-app/src/App.jsx' },
          { name: 'index.css', type: 'file' as const, path: 'my-app/src/index.css' },
          { name: 'main.jsx', type: 'file' as const, path: 'my-app/src/main.jsx' },
        ],
      },
      {
        name: 'public',
        type: 'folder' as const,
        path: 'my-app/public',
        children: [],
      },
      { name: 'package.json', type: 'file' as const, path: 'my-app/package.json' },
      { name: 'vite.config.js', type: 'file' as const, path: 'my-app/vite.config.js' },
    ],
  },
];

// Sample file contents
const fileContents: Record<string, string> = {
  'my-app/src/App.jsx': `import React from 'react'

export default function App() {
  return (
    <div className="app">
      <h1>Hello Vibe</h1>
      <button className="btn">Get Started</button>
    </div>
  )
}`,
  'my-app/src/index.css': `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: #1a1a2e;
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app {
  text-align: center;
}

.btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #7c3aed;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.btn:hover {
  background: #6d28d9;
}`,
  'my-app/src/main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`,
  'my-app/package.json': `{
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}`,
  'my-app/vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,
};

export default function IDEPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFile, setActiveFile] = useState<string | null>('my-app/src/App.jsx');
  const [openTabs, setOpenTabs] = useState([
    { path: 'my-app/src/App.jsx', name: 'App.jsx', isModified: false },
    { path: 'my-app/src/index.css', name: 'index.css', isModified: false },
  ]);
  const [files, setFiles] = useState(fileContents);
  const [rightPanel, setRightPanel] = useState<'preview' | 'terminal' | 'console'>('preview');
  const [isSplitView, setIsSplitView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('success');
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const { selectedModel } = useModel();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileSelect = useCallback((path: string) => {
    setActiveFile(path);
    // Add to tabs if not already open
    if (!openTabs.find((tab) => tab.path === path)) {
      const fileName = path.split('/').pop() || path;
      setOpenTabs((prev) => [...prev, { path, name: fileName, isModified: false }]);
    }
  }, [openTabs]);

  const handleTabClose = useCallback((path: string) => {
    setOpenTabs((prev) => prev.filter((tab) => tab.path !== path));
    if (activeFile === path) {
      const remaining = openTabs.filter((tab) => tab.path !== path);
      setActiveFile(remaining.length > 0 ? remaining[remaining.length - 1].path : null);
    }
  }, [activeFile, openTabs]);

  const handleCodeChange = useCallback((value: string | undefined) => {
    if (!activeFile || !value) return;
    setFiles((prev) => ({ ...prev, [activeFile]: value }));
    setOpenTabs((prev) =>
      prev.map((tab) =>
        tab.path === activeFile ? { ...tab, isModified: true } : tab
      )
    );
  }, [activeFile]);

  const handleAIPrompt = async (prompt: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model: selectedModel.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate code');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let fullCode = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullCode += decoder.decode(value);
      }

      // Update the active file with generated code
      if (activeFile) {
        setFiles((prev) => ({ ...prev, [activeFile]: fullCode }));
        setOpenTabs((prev) =>
          prev.map((tab) =>
            tab.path === activeFile ? { ...tab, isModified: true } : tab
          )
        );
      }

      // Simulate deploy
      setIsDeploying(true);
      setDeployStatus('deploying');
      setTimeout(() => {
        setIsDeploying(false);
        setDeployStatus('success');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLanguageFromPath = (path: string): string => {
    const ext = path.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'ts':
        return 'typescript';
      case 'jsx':
      case 'js':
        return 'javascript';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'html':
        return 'html';
      default:
        return 'plaintext';
    }
  };

  if (!mounted) return null;

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white overflow-hidden">
      {/* Top Bar */}
      <header className="h-12 bg-[#323233] border-b border-[#3c3c3c] flex items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-xs font-bold">V</span>
            </div>
            <span className="font-semibold text-sm">VibeCode</span>
          </div>
        </div>

        {/* Center: Project Name + Branch */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">my-app</span>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#3c3c3c] rounded text-xs">
            <GitBranch className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-300">main</span>
          </div>
        </div>

        {/* Right: Deploy Status + Actions */}
        <div className="flex items-center gap-3">
          {/* Deploy Status */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs ${
            deployStatus === 'deploying' 
              ? 'bg-yellow-500/20 text-yellow-400' 
              : deployStatus === 'success'
              ? 'bg-green-500/20 text-green-400'
              : deployStatus === 'error'
              ? 'bg-red-500/20 text-red-400'
              : 'bg-gray-500/20 text-gray-400'
          }`}>
            {deployStatus === 'deploying' && (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deploying...</span>
              </>
            )}
            {deployStatus === 'success' && (
              <>
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span>Deployed</span>
                <ExternalLink className="w-3 h-3 ml-1 cursor-pointer hover:text-green-300" />
              </>
            )}
            {deployStatus === 'error' && (
              <>
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>Deploy failed</span>
              </>
            )}
          </div>

          {/* Split View Toggle */}
          <button
            onClick={() => setIsSplitView(!isSplitView)}
            className={`p-2 rounded transition-colors ${
              isSplitView ? 'bg-purple-600 text-white' : 'bg-[#3c3c3c] text-gray-400 hover:bg-[#4c4c4c]'
            }`}
            title="Toggle Split View"
          >
            <Columns2 className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button className="p-2 bg-[#3c3c3c] rounded hover:bg-[#4c4c4c] transition-colors">
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: File Tree */}
        <div className="w-56 flex-shrink-0">
          <FileTree
            files={initialFiles}
            activeFile={activeFile}
            onFileSelect={handleFileSelect}
          />
        </div>

        {/* Center + Right: Editor + Preview */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Panel */}
          <div className={`flex flex-col ${isSplitView ? 'w-1/2' : 'flex-1'} border-r border-[#3c3c3c]`}>
            {/* Editor Tabs */}
            <EditorTabs
              tabs={openTabs}
              activeTab={activeFile}
              onTabSelect={setActiveFile}
              onTabClose={handleTabClose}
            />

            {/* Code Editor */}
            <div className="flex-1">
              {activeFile && files[activeFile] !== undefined ? (
                <CodeEditor
                  defaultValue={files[activeFile]}
                  language={getLanguageFromPath(activeFile)}
                  onChange={handleCodeChange}
                  onCursorChange={(position) => setCursorPosition(position)}
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-[#1e1e1e]">
                  <p className="text-gray-500 text-sm">Select a file to edit</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          {isSplitView && (
            <div className="w-1/2 flex flex-col">
              {/* Panel Tabs */}
              <div className="h-9 bg-[#252526] border-b border-[#3c3c3c] flex items-center px-2 gap-1">
                <button
                  onClick={() => setRightPanel('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded transition-colors ${
                    rightPanel === 'preview'
                      ? 'bg-[#3c3c3c] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-[#3c3c3c]/50'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  Preview
                </button>
                <button
                  onClick={() => setRightPanel('terminal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded transition-colors ${
                    rightPanel === 'terminal'
                      ? 'bg-[#3c3c3c] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-[#3c3c3c]/50'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Terminal
                </button>
                <button
                  onClick={() => setRightPanel('console')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded transition-colors ${
                    rightPanel === 'console'
                      ? 'bg-[#3c3c3c] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-[#3c3c3c]/50'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Console
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1">
                {rightPanel === 'preview' && (
                  <PreviewPanel
                    url="localhost:5173"
                    isDeployed={deployStatus === 'success'}
                  />
                )}
                {rightPanel === 'terminal' && <TerminalPanel />}
                {rightPanel === 'console' && (
                  <div className="h-full bg-[#1e1e1e] p-4">
                    <p className="text-gray-500 text-sm">Console output will appear here...</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Prompt Bar */}
      <AIPromptBar
        onSubmit={handleAIPrompt}
        isLoading={isLoading}
        isAutoSaving={false}
        isDeployed={deployStatus === 'success'}
        branch="main"
      />

      {/* Status Bar */}
      <StatusBar
        branch="main"
        filePath={activeFile || ''}
        line={cursorPosition.line}
        column={cursorPosition.column}
        deployStatus={deployStatus}
        language={activeFile ? getLanguageFromPath(activeFile) : 'TypeScript'}
      />
    </div>
  );
}
