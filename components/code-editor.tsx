'use client';

import { useEffect, useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface CodeEditorProps {
  defaultValue?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  onCursorChange?: (position: { line: number; column: number }) => void;
  readOnly?: boolean;
}

export function CodeEditor({
  defaultValue = '',
  language = 'typescript',
  onChange,
  onCursorChange,
  readOnly = false,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEditorMount = (editorInstance: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editorInstance;

    // Set up VS Code dark theme
    monaco.editor.defineTheme('vscode-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable', foreground: '9CDCFE' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2d2e',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
        'editor.selectionBackground': '#264f78',
        'editorCursor.foreground': '#aeafad',
        'editor.inactiveSelectionBackground': '#3a3d41',
      },
    });

    monaco.editor.setTheme('vscode-dark');

    // Listen for cursor position changes
    editorInstance.onDidChangeCursorPosition((e) => {
      onCursorChange?.({
        line: e.position.lineNumber,
        column: e.position.column,
      });
    });
  };

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-background flex items-center justify-center rounded-lg border border-border">
        <p className="text-muted-foreground">Loading editor...</p>
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={defaultValue}
      onChange={onChange}
      onMount={handleEditorMount}
      options={{
        minimap: { enabled: true, scale: 1 },
        scrollBeyondLastLine: false,
        readOnly: readOnly,
        fontSize: 13,
        lineHeight: 20,
        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
        fontLigatures: true,
        formatOnPaste: true,
        formatOnType: true,
        autoIndent: 'advanced',
        tabSize: 2,
        wordWrap: 'off',
        automaticLayout: true,
        renderLineHighlight: 'all',
        cursorBlinking: 'blink',
        cursorSmoothCaretAnimation: 'on',
        smoothScrolling: true,
        padding: { top: 8 },
      }}
      theme="vscode-dark"
    />
  );
}
