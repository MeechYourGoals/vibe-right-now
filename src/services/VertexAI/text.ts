
/**
 * Text generation services using Vertex AI
 */
import { invokeEdgeWithFallback } from '@/services/edge/invokeEdge';
import { GenerateTextOptions } from './types';

function asText(data: unknown, fallback: string): string {
  if (typeof data === 'string' && data.trim()) return data;
  if (data && typeof data === 'object') {
    const obj = data as Record<string, any>;
    const text =
      obj.text || obj.response || obj.content || obj.choices?.[0]?.message?.content;
    if (typeof text === 'string' && text.trim()) return text;
  }
  return fallback;
}

/**
 * Generate text. Routes through the `vertex-ai` edge function and falls back
 * to `openai-chat`, then a safe canned message so the chat never breaks.
 */
export async function generateText(
  prompt: string,
  history: Array<{ sender: 'user' | 'ai'; text: string }> = [],
  options: GenerateTextOptions = {}
): Promise<string> {
  const fallbackText =
    "I'm here to help you find great places and things to do. Tell me what you're in the mood for and where, and I'll dig up some real venues.";

  const data = await invokeEdgeWithFallback<unknown>(
    'vertex-ai',
    {
      prompt,
      history,
      model: options.model || 'gemini-1.5-pro',
      maxTokens: options.maxTokens || 2048,
      temperature: options.temperature || 0.7,
      mode: options.mode || 'default',
      safetySettings: options.safetySettings,
    },
    async () =>
      invokeEdgeWithFallback<unknown>(
        'openai-chat',
        { prompt, history, mode: options.mode || 'default' },
        () => fallbackText
      )
  );

  return asText(data, fallbackText);
}

/**
 * Generate factual information using Vertex AI search capabilities
 */
export async function searchWithAI(query: string, categories?: string[]): Promise<string> {
  const fallbackText =
    "I couldn't find specific information about that. Could you try rephrasing your question, or tell me a city to search?";

  // NL/online search -> perplexity-search, falling back to vertex-ai search mode.
  const data = await invokeEdgeWithFallback<unknown>(
    'perplexity-search',
    { query, categories: categories || [] },
    async () =>
      invokeEdgeWithFallback<unknown>(
        'vertex-ai',
        {
          prompt: query,
          mode: 'search',
          searchMode: true,
          categories: categories || [],
          temperature: 0.1,
        },
        () => fallbackText
      )
  );

  return asText(data, fallbackText);
}
