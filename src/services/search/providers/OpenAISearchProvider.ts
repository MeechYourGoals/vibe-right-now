
import { PerplexityService } from '@/services/PerplexityService';

/**
 * OpenAI search provider implementation - now proxied through Google Vertex AI
 */
export const OpenAISearchProvider = {
  /**
   * Search using Vertex AI (proxied from OpenAI)
   */
  async search(query: string): Promise<string | null> {
    try {
      console.log('Searching with OpenAI (via Google Vertex AI):', query);
      
      // Use Perplexity for search instead of direct OpenAI calls
      const result = await PerplexityService.searchPerplexity(query);
      return result || null;
    } catch (error) {
      console.error('Error with OpenAI search (via Vertex AI):', error);
      return null;
    }
  }
};
