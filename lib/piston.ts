const PISTON_API_URL = 'https://emkc.org/api/v2/piston';

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  output: string;
  exitCode: number;
  runtime: number;
}

export async function executeCode(
  code: string,
  language: string = 'javascript',
  version: string = '*'
): Promise<ExecutionResult> {
  try {
    const response = await fetch(`${PISTON_API_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language,
        version,
        files: [
          {
            name: 'main',
            content: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Piston API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      stdout: data.run?.stdout || '',
      stderr: data.run?.stderr || '',
      output: data.run?.output || '',
      exitCode: data.run?.exit_code || 0,
      runtime: data.run?.runtime || 0,
    };
  } catch (error) {
    console.error('Code execution error:', error);
    return {
      stdout: '',
      stderr: error instanceof Error ? error.message : 'Unknown error',
      output: '',
      exitCode: 1,
      runtime: 0,
    };
  }
}

export async function getAvailableLanguages(): Promise<string[]> {
  try {
    const response = await fetch(`${PISTON_API_URL}/runtimes`);
    const data = await response.json();
    return data.map((runtime: any) => runtime.language);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
}

// Extract code blocks from different file formats
export function extractCode(content: string, language: string = 'typescript'): string {
  // Remove markdown code blocks if present
  const codeBlockRegex = /```(?:typescript|javascript|jsx|tsx)?\n?([\s\S]*?)```/;
  const match = content.match(codeBlockRegex);

  if (match) {
    return match[1].trim();
  }

  // If no code block, return the content as-is
  return content.trim();
}
