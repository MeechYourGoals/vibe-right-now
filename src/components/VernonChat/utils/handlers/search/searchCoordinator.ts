
import { VertexAIService } from '@/services/VertexAIService';

export class SearchCoordinator {
  /**
   * Search for information using Google services
   * @param query Search query text
   * @returns Search results formatted as a string
   */
  static async search(query: string): Promise<string> {
    try {
      // Use Vertex AI for search
      return await VertexAIService.searchWithVertex(query);
    } catch (error) {
      console.error('Error in search coordinator:', error);
      return `I couldn't find information about "${query}". Please try a different search or ask another question.`;
    }
  }
}
