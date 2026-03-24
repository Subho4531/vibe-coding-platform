'use client';

import { useEffect, useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface CodeEditorProps {
  defaultValue?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

export function CodeEditor({
  defaultValue = '',
  language = 'typescript',
  onChange,
  readOnly = false,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEditorMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;

    // Set up dark theme
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'keyword', foreground: '569CD6' },
      ],
      colors: {
        'editor.background': '#1a1a2e',
        'editor.foreground': '#e0e0e0',
        'editor.lineNumbersBackground': '#16213e',
        'editor.lineNumbersForeground': '#6c757d',
        'editor.selectionBackground': '#264f78',
        'editorCursor.foreground': '#00d4ff',
      },
    });

    monaco.editor.setTheme('custom-dark');
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
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        readOnly: readOnly,
        fontSize: 14,
        lineHeight: 1.6,
        fontFamily: 'Fira Code, monospace',
        formatOnPaste: true,
        formatOnType: true,
        autoIndent: 'advanced',
        tabSize: 2,
        wordWrap: 'on',
        automaticLayout: true,
      }}
      theme="custom-dark"
    />
  );
}
