'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Model {
  id: string;
  name: string;
  description: string;
  isFree: boolean;
  maxTokens: number;
}

export const FREE_MODELS: Model[] = [
  {
    id: 'meta-llama/llama-2-70b-chat',
    name: 'Llama 2 70B (Free)',
    description: 'Open-source, completely free - recommended!',
    isFree: true,
    maxTokens: 1000,
  },
  {
    id: 'mistralai/mistral-7b-instruct',
    name: 'Mistral 7B (Free)',
    description: 'Efficient open-source model, free to use',
    isFree: true,
    maxTokens: 1000,
  },
  {
    id: 'meta-llama/llama-3-8b-instruct',
    name: 'Llama 3 8B (Free)',
    description: 'Latest open-source, improved capabilities',
    isFree: true,
    maxTokens: 1000,
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Requires paid OpenRouter account',
    isFree: false,
    maxTokens: 1000,
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Most capable - requires paid account',
    isFree: false,
    maxTokens: 1000,
  },
];

interface ModelContextType {
  selectedModel: Model;
  setSelectedModel: (model: Model) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<Model>(FREE_MODELS[0]);
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('selectedModel');
    if (saved) {
      try {
        const model = JSON.parse(saved);
        setSelectedModel(model);
      } catch (e) {
        // Use default
      }
    }
  }, []);

  const handleSetSelectedModel = (model: Model) => {
    setSelectedModel(model);
    localStorage.setItem('selectedModel', JSON.stringify(model));
  };

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel: handleSetSelectedModel }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModel must be used within ModelProvider');
  }
  return context;
}
