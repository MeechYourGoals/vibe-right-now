
import { GoogleVertexProvider } from './providers/GoogleVertexProvider';
import { VertexAIService } from '@/services/VertexAIService';

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
      
      // Fall back to a direct call to Vertex AI service
      try {
        const vertexServiceResult = await VertexAIService.searchWithVertex(query);
        if (vertexServiceResult) {
          console.log('Got result from VertexAIService search');
          return vertexServiceResult;
        }
      } catch (vertexError) {
        console.error('Error with VertexAIService search:', vertexError);
      }
      
      // Fall back to a generic response if all searches fail
      return `I couldn't find detailed information about "${query}". Could you try rephrasing your question or provide more details about what you're looking for?`;
    } catch (error) {
      console.error('Error in SearchService:', error);
      return `I encountered an error while searching for "${query}". Please try again later.`;
    }
  }
  
  /**
   * Specialized search for comedy events
   */
  static async comedySearch(query: string): Promise<string> {
    try {
      // Enhance the query to focus on comedy
      const enhancedQuery = `comedy events: ${query}`;
      
      // Use Vertex AI's contextual search
      return await VertexAIService.searchWithVertex(enhancedQuery, ['Comedy', 'Entertainment']);
    } catch (error) {
      console.error('Error in comedy search:', error);
      return await this.search(query);
    }
  }
  
  /**
   * Semantic vector search using Google's natural language understanding
   */
  static async vectorSearch(query: string, filters?: any): Promise<string> {
    try {
      // Use Google's NLP capabilities through Vertex AI
      const categories = filters?.categories || [];
      
      // Create a more detailed search prompt
      const searchPrompt = `
        I need detailed information about "${query}".
        ${categories.length > 0 ? `Focus on these categories: ${categories.join(', ')}` : ''}
        Please provide:
        - Specific venues, events, or locations
        - Dates, times, and prices if applicable
        - Contact information and websites where available
        - Any other relevant details
      `;
      
      return await VertexAIService.generateResponse(searchPrompt, 'search');
    } catch (error) {
      console.error('Error in vector search:', error);
      return await this.search(query);
    }
  }
}
