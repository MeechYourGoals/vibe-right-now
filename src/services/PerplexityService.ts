
import { VertexAIService } from './VertexAIService';

/**
 * Perplexity Service that proxies through Google Vertex AI
 * Maintains backward compatibility while using Google ecosystem
 */
export const PerplexityService = {
  /**
   * Search using Vertex AI (maintaining Perplexity interface)
   * @param query The search query
   * @returns The search results as text
   */
  async searchPerplexity(query: string): Promise<string> {
    try {
      console.log('Perplexity proxy: searching with Vertex AI:', query);
      return await VertexAIService.searchWithVertex(query);
    } catch (error) {
      console.error('Error in Perplexity proxy service:', error);
      return `I couldn't find specific information about "${query}". Please try a different search.`;
    }
  }
};
