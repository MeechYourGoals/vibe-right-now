
import { VertexAIService } from '@/services/VertexAIService';

/**
 * Service for searching comedy shows and events
 */
export const ComedySearchService = {
  /**
   * Search for comedy shows and events
   * @param query The user's query about comedy shows
   * @returns Information about comedy shows in the area
   */
  async searchComedy(query: string): Promise<string> {
    try {
      console.log('Searching for comedy shows with query:', query);
      
      // Extract location from query if possible
      const locationMatch = query.match(/in\s+([A-Za-z\s]+)(?:,|\s|$)/i);
      const location = locationMatch ? locationMatch[1].trim() : '';
      
      // Enhance the query for comedy-specific search
      const enhancedQuery = `
        Find comedy shows, standup events, and comedy clubs ${location ? `in ${location}` : ''}.
        Include:
        - Name of comedy club or venue
        - Featured comedians if known
        - Show times and dates
        - Ticket prices if available
        - Address and contact information
        
        Return the information in a well-formatted, easy to read format.
      `;
      
      // Use VertexAI for both search and context-aware responses
      const comedyInfo = await VertexAIService.searchWithVertex(
        enhancedQuery,
        ['entertainment', 'comedy', 'events']
      );
      
      if (comedyInfo && comedyInfo.length > 0) {
        return comedyInfo;
      }
      
      // Fallback to general AI response if search doesn't yield results
      return VertexAIService.generateResponse(query, 'default');
    } catch (error) {
      console.error('Error searching for comedy events:', error);
      return 'I apologize, but I had trouble finding comedy events. Please try asking in a different way or check back later.';
    }
  }
};
