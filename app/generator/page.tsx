'use client';

import { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { PromptInput } from '@/components/prompt-input';
import { CodeDisplay } from '@/components/code-display';
import { WebsitePreview } from '@/components/website-preview';
import { SettingsPanel } from '@/components/settings-panel';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useModel } from '@/lib/model-context';

export default function GeneratorPage() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { selectedModel } = useModel();

  const handleGenerateWebsite = async (prompt: string) => {
    setIsLoading(true);
    setIsStreaming(true);
    setCode('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model: selectedModel.id }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to generate code';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // Use default error message
        }
        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let fullCode = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        fullCode += text;
        setCode(fullCode);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setCode(`❌ Error: ${errorMsg}\n\nTroubleshooting:\n- Check if you have API credits available\n- Visit https://openrouter.ai/settings/credits to manage your account\n- Try with a shorter prompt\n- Contact support if the issue persists`);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vibe Coding</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Generate complete Next.js websites from natural language
            </p>
          </div>
          <Button
            onClick={() => setShowSettings(true)}
            variant="ghost"
            size="lg"
            className="h-10 w-10 p-0"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Input */}
          <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
            <div className="h-full overflow-auto p-6 space-y-4">
              <PromptInput
                onSubmit={handleGenerateWebsite}
                isLoading={isLoading}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle className="bg-border hover:bg-primary/50 transition-colors" />

          {/* Middle Panel - Code */}
          <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
            <div className="h-full overflow-hidden p-6">
              <CodeDisplay code={code} isStreaming={isStreaming} />
            </div>
          </ResizablePanel>

          <ResizableHandle className="bg-border hover:bg-primary/50 transition-colors" />

          {/* Right Panel - Preview */}
          <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
            <div className="h-full overflow-hidden p-6">
              <WebsitePreview isStreaming={isStreaming} code={code} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
