
import { VertexAIService } from '@/services/VertexAIService';

/**
 * Google Vertex AI search provider implementation
 */
export const GoogleVertexProvider = {
  /**
   * Search using Google's Vertex AI API
   */
  async search(query: string, categories: string[] = []): Promise<string | null> {
    try {
      console.log('Searching with Google Vertex AI:', query);
      if (categories.length > 0) {
        console.log('With categories:', categories);
      }
      
      // Call the VertexAIService
      const result = await VertexAIService.searchWithVertex(query, categories);
      return result || null;
    } catch (error) {
      console.error('Error with Google Vertex search:', error);
      return null;
    }
  }
};
