'use client';

import { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeEditor } from '@/components/code-editor';
import { AgentTab } from '@/components/agent-tab';
import { PromptInput } from '@/components/prompt-input';
import { CodeDisplay } from '@/components/code-display';
import { WebsitePreview } from '@/components/website-preview';
import { CodeExecutor } from '@/components/code-executor';
import { SettingsPanel } from '@/components/settings-panel';
import { Button } from '@/components/ui/button';
import { Settings, Play, Save } from 'lucide-react';
import { useModel } from '@/lib/model-context';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function IDEPage() {
  const [code, setCode] = useState('// Write or generate your code here\n\nexport default function Home() {\n  return (\n    <div className="flex items-center justify-center min-h-screen">\n      <h1>Hello World</h1>\n    </div>\n  );\n}');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);
  const { selectedModel } = useModel();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerateWebsite = async (prompt: string) => {
    setIsLoading(true);
    setIsStreaming(true);
    setCode('');

    // Add a task for the generation
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: 'Code Generation',
      description: prompt,
      status: 'in-progress',
    };
    setTasks((prev) => [newTask, ...prev]);

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

      // Mark task as completed
      setTasks((prev) =>
        prev.map((task) =>
          task.id === newTask.id ? { ...task, status: 'completed' } : task
        )
      );
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setCode(`❌ Error: ${errorMsg}\n\nTroubleshooting:\n- Check if you have API credits available\n- Visit https://openrouter.ai/settings/credits to manage your account\n- Try with a shorter prompt`);

      // Mark task as failed
      setTasks((prev) =>
        prev.map((task) =>
          task.id === newTask.id ? { ...task, status: 'pending' } : task
        )
      );
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Vibe IDE</h1>
            <p className="text-xs text-muted-foreground">AI-powered code editor with live preview</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Play className="w-4 h-4" />
              Run Code
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Save className="w-4 h-4" />
              Save
            </Button>
            <Button
              onClick={() => setShowSettings(true)}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main IDE Area */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel - Code Editor */}
          <ResizablePanel defaultSize={40} minSize={20} maxSize={60}>
            <div className="h-full flex flex-col">
              <div className="border-b border-border p-2 bg-muted/30">
                <p className="text-xs font-medium text-muted-foreground">Code Editor</p>
              </div>
              <div className="flex-1">
                <CodeEditor
                  defaultValue={code}
                  language="typescript"
                  onChange={(value) => setCode(value || '')}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Panel - Tabs */}
          <ResizablePanel defaultSize={60} minSize={25}>
            <Tabs defaultValue="prompt" className="h-full flex flex-col">
              <TabsList className="w-full justify-start rounded-none border-b border-border bg-muted/30 px-2">
                <TabsTrigger value="prompt" className="text-xs">
                  Generate
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-xs">
                  Preview
                </TabsTrigger>
                <TabsTrigger value="output" className="text-xs">
                  Output
                </TabsTrigger>
                <TabsTrigger value="tasks" className="text-xs">
                  Tasks ({tasks.length})
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                {/* Generate Tab */}
                <TabsContent value="prompt" className="h-full flex flex-col">
                  <div className="flex-1 overflow-auto">
                    <PromptInput onSubmit={handleGenerateWebsite} isLoading={isLoading} />
                  </div>
                </TabsContent>

                {/* Preview Tab */}
                <TabsContent value="preview" className="h-full p-4">
                  <WebsitePreview isStreaming={isStreaming} code={code} />
                </TabsContent>

                {/* Output Tab */}
                <TabsContent value="output" className="h-full">
                  <CodeExecutor code={code} language="javascript" />
                </TabsContent>

                {/* Tasks Tab */}
                <TabsContent value="tasks" className="h-full">
                  <AgentTab
                    tasks={tasks}
                    onTaskComplete={(taskId) => {
                      setTasks((prev) =>
                        prev.map((task) =>
                          task.id === taskId ? { ...task, status: 'completed' } : task
                        )
                      );
                    }}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
