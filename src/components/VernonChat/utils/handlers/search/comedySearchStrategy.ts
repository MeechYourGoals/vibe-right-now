import { SearchStrategy } from '../types';
import { SearchService } from '@/services/search/SearchService';

/**
 * Strategy for handling comedy show search queries
 */
export class ComedySearchStrategy implements SearchStrategy {
  /**
   * Determines if the given query is related to comedy shows
   * @param query The search query
   * @returns True if the query is related to comedy shows, false otherwise
   */
  canHandle(query: string): boolean {
    const comedyKeywords = ['comedy', 'comedian', 'stand-up', 'funny', 'joke', 'improv'];
    const lowerQuery = query.toLowerCase();
    return comedyKeywords.some(keyword => lowerQuery.includes(keyword));
  }

  /**
   * Determines if this strategy should be used based on certain conditions
   * @param query The search query
   * @returns True if this strategy should be used, false otherwise
   */
  shouldUse(query: string): boolean {
    // For now, always use this strategy if canHandle returns true
    return this.canHandle(query);
  }

  async search(query: string): Promise<string> {
    try {
      console.log('ComedySearchStrategy: Searching for comedy shows with query:', query);
      
      // Extract location and other details from the query
      const locationMatch = query.match(/(?:in|at|near)\s+([^,\s]+(?:\s+[^,\s]+)*)/i);
      const location = locationMatch ? locationMatch[1].trim() : '';
      
      console.log('Extracted location:', location);
      
      // Use SearchService for comedy-specific search
      const searchResult = await SearchService.search(`comedy shows events ${query}`);
      
      if (searchResult && searchResult.length > 0) {
        return searchResult;
      }
      
      // Fallback response for comedy queries
      return this.generateComedyFallbackResponse(query, location);
    } catch (error) {
      console.error('Error in ComedySearchStrategy:', error);
      return `I encountered an error searching for comedy shows. Please try rephrasing your question or search again.`;
    }
  }

  /**
   * Generates a fallback response for comedy-related queries
   * @param query The original search query
   * @param location The extracted location from the query
   * @returns A fallback response string
   */
  private generateComedyFallbackResponse(query: string, location: string): string {
    if (location) {
      return `I couldn't find specific comedy shows for "${query}" near ${location}. You might want to check local event listings or comedy club websites for more information.`;
    } else {
      return `I couldn't find specific comedy shows for "${query}". Please provide a location or try rephrasing your question.`;
    }
  }
}
