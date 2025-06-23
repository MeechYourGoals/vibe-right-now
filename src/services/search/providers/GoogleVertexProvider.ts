
import { PerplexityService } from '@/services/PerplexityService';

/**
 * Google Vertex AI / Gemini search provider implementation
 */
export const GoogleVertexProvider = {
  /**
   * Search using Google's Vertex AI API
   */
  async search(query: string): Promise<string | null> {
    try {
      console.log('Searching with Perplexity:', query);

      const result = await PerplexityService.searchPerplexity(query);
      return result || null;
    } catch (error) {
      console.error('Error with Google Vertex search:', error);
      return null;
    }
  }
};
