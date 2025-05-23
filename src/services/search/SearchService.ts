
import { GoogleVertexProvider } from './providers/GoogleVertexProvider';

/**
 * Unified search service that uses Google Vertex AI
 */
export const SearchService = {
  /**
   * Search using Google Vertex AI (replaces Perplexity)
   * @param query The search query
   * @returns The search results as text
   */
  async search(query: string): Promise<string> {
    try {
      console.log('Searching with Google Vertex AI:', query);
      
      const result = await GoogleVertexProvider.search(query);
      
      if (result) {
        return result;
      }
      
      // Fallback response
      return `I searched for "${query}" but couldn't find specific results at the moment. Please try refining your search or try again later.`;
    } catch (error) {
      console.error('Error in search service:', error);
      return `I encountered an error while searching for "${query}". Please try again later.`;
    }
  }
};
