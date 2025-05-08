
import { GoogleVertexProvider } from './providers/GoogleVertexProvider';

/**
 * Unified search service that coordinates between multiple search providers
 */
export class SearchService {
  /**
   * Search using the best available provider
   * @param query The search query
   * @returns The search results
   */
  static async search(query: string): Promise<string> {
    console.log('Searching with query:', query);
    
    try {
      // Try Google Vertex AI first
      const vertexResult = await GoogleVertexProvider.search(query);
      if (vertexResult) {
        console.log('Got result from Google Vertex AI');
        return vertexResult;
      }
      
      // Fall back to a generic response if all searches fail
      return `I couldn't find detailed information about "${query}". Could you try rephrasing your question or provide more details about what you're looking for?`;
    } catch (error) {
      console.error('Error in SearchService:', error);
      return `I encountered an error while searching for "${query}". Please try again later.`;
    }
  }
  
  // Add these methods to satisfy references in the codebase
  static async comedySearch(query: string): Promise<string> {
    return await this.search(`comedy events: ${query}`);
  }
  
  static async vectorSearch(query: string, filters?: any): Promise<string> {
    return await this.search(query);
  }
}
