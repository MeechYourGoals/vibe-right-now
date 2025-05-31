
import { VertexAIService } from '@/services/VertexAIService';

/**
 * Google Vertex AI search provider implementation
 */
export const GoogleVertexProvider = {
  /**
   * Search using Google's Vertex AI API
   * @param query The search query
   * @param categories Optional categories to focus the search
   * @returns The search results as text or null if search fails
   */
  async search(query: string, categories: string[] = []): Promise<string | null> {
    try {
      console.log('Searching with Google Vertex AI:', query);
      if (categories.length > 0) {
        console.log('With categories:', categories);
      }
      
      // Create an enhanced search prompt
      const searchPrompt = `
        Please provide detailed information about "${query}" for a user of the Vibe Right Now app.
        ${categories.length > 0 ? `Focus on these categories: ${categories.join(', ')}` : ''}
        
        Include:
        - Names of specific venues, events, or places
        - Locations, addresses, and neighborhoods when relevant
        - Dates, times, and prices if applicable
        - Highlight any special features or unique aspects
        
        If this is about events like comedy shows, concerts, or other performances:
        - List the specific venues where they're happening
        - Include performer names and show times
        - Mention ticket prices and availability if known
        
        Format your response in a clear, readable way with appropriate sections.
      `;
      
      // Call the VertexAIService
      const result = await VertexAIService.searchWithVertex(searchPrompt);
      return result || null;
    } catch (error) {
      console.error('Error with Google Vertex search:', error);
      return null;
    }
  }
};
