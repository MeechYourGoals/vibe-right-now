
import { VertexAIService } from '@/services/VertexAIService';

/**
 * Google Vertex AI / Gemini search provider implementation
 */
export const GoogleVertexProvider = {
  /**
   * Search using Google's Vertex AI API
   * @param query The search query
   * @returns The search results as text or null if search fails
   */
  async search(query: string): Promise<string | null> {
    try {
      console.log('Searching with Google Vertex AI:', query);
      
      // Enhanced search prompt
      const searchPrompt = `
        Please provide detailed information about "${query}" for a user of the Vibe Right Now app.
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
      
      const result = await VertexAIService.searchWithVertex(query);
      return result || null;
    } catch (error) {
      console.error('Error with Google Vertex search:', error);
      return null;
    }
  }
};
