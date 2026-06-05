
import { invokeEdgeWithFallback } from '@/services/edge/invokeEdge';
import { locationsRepo } from '@/services/data';

/**
 * NL / online search service backed by the `perplexity-search` edge function.
 *
 * When the edge call is unavailable we fall back to a local answer built from
 * REAL venues via `locationsRepo` (with mock fallback). We deliberately do NOT
 * call back into SearchService here to avoid recursion.
 */

function extractText(data: unknown): string {
  if (typeof data === 'string' && data.trim()) return data;
  if (data && typeof data === 'object') {
    const obj = data as Record<string, any>;
    const text = obj.text || obj.response || obj.answer || obj.content;
    if (typeof text === 'string' && text.trim()) return text;
  }
  return '';
}

async function localVenueAnswer(query: string): Promise<string> {
  try {
    const venues = await locationsRepo.search(query, 6);
    if (venues.length > 0) {
      const lines = venues.map(
        (v) =>
          `- [${v.name}](/venue/${encodeURIComponent(v.id)})${
            v.city ? ` — ${v.type ? v.type + ' • ' : ''}${v.city}` : ''
          }`
      );
      return [
        "Here are some places I found that match what you're looking for:",
        '',
        ...lines,
        '',
        `[See more on the Explore page](/explore?q=${encodeURIComponent(query)})`,
      ].join('\n');
    }
  } catch (error) {
    console.warn('PerplexityService local venue fallback failed:', error);
  }
  return `I couldn't pull live results for "${query}" right now, but tell me a city or the kind of place you want and I'll find real venues for you.`;
}

export const PerplexityService = {
  /**
   * Generate a chat-style answer using the Perplexity search edge function.
   */
  async generateResponse(prompt: string): Promise<string> {
    const data = await invokeEdgeWithFallback<unknown>(
      'perplexity-search',
      { query: prompt },
      () => localVenueAnswer(prompt)
    );
    const text = extractText(data);
    return text || (await localVenueAnswer(prompt));
  },

  /**
   * Search using Perplexity with a local, real-venue fallback.
   */
  async searchPerplexity(query: string): Promise<string> {
    const data = await invokeEdgeWithFallback<unknown>(
      'perplexity-search',
      { query },
      () => localVenueAnswer(query)
    );
    const text = extractText(data);
    return text || (await localVenueAnswer(query));
  },
};
