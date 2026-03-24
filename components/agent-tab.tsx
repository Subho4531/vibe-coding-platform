'use client';

import { useState } from 'react';
import { ChevronDown, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface AgentTabProps {
  tasks?: Task[];
  onTaskSelect?: (taskId: string) => void;
  onTaskComplete?: (taskId: string) => void;
}

export function AgentTab({ tasks = [], onTaskSelect, onTaskComplete }: AgentTabProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          Agent Tasks
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {tasks.filter((t) => t.status === 'completed').length} of {tasks.length} completed
        </p>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-auto space-y-2 p-4">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No tasks yet</p>
            <p className="text-xs mt-1">Generate code to see tasks here</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
            >
              {/* Task Header */}
              <button
                onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 text-left flex-1">
                  {/* Status Badge */}
                  <div className="w-2 h-2 rounded-full flex-shrink-0">
                    {task.status === 'completed' && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                    {task.status === 'in-progress' && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    )}
                    {task.status === 'pending' && (
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    )}
                  </div>

                  {/* Task Title */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {task.status === 'completed' && 'Completed'}
                      {task.status === 'in-progress' && 'In progress'}
                      {task.status === 'pending' && 'Pending'}
                    </p>
                  </div>
                </div>

                {/* Expand Icon */}
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedTask === task.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Task Details */}
              {expandedTask === task.id && (
                <div className="px-3 pb-3 pt-0 border-t border-border space-y-3">
                  <p className="text-sm text-muted-foreground">{task.description}</p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {task.status !== 'completed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={() => onTaskComplete?.(task.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => onTaskSelect?.(task.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border p-4 space-y-2">
        <Button variant="outline" size="sm" className="w-full text-xs" disabled>
          <Copy className="w-3 h-3 mr-2" />
          Copy All Tasks
        </Button>
        <Button variant="outline" size="sm" className="w-full text-xs" disabled>
          <Trash2 className="w-3 h-3 mr-2" />
          Clear Tasks
        </Button>
      </div>
    </div>
  );
}
