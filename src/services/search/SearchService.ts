// src/services/search/SearchService.ts
import { GoogleAIService } from '../GoogleAIService';
import { PlaceService, PlaceSearchResult } from '../PlaceService'; // Assuming PlaceSearchResult will be used or is what findEvents returns
// EventItem might not be strictly necessary if findEvents returns PlaceSearchResult and we only use 'name'
// import { EventItem } from '../../components/venue/events/types'; 

/**
 * Main search service that orchestrates different search strategies.
 */
export class SearchService {
  /**
   * Performs a general search using GoogleAIService.
   * @param query The search query.
   * @returns A promise that resolves to the search result string.
   */
  static async search(query: string): Promise<string> {
    try {
      console.log('Performing search with GoogleAIService for:', query);
      const searchResult = await GoogleAIService.search(query);
      if (searchResult) {
        return searchResult;
      }
      return `I searched for "${query}" but couldn't find specific results. Please try rephrasing your question.`;
    } catch (error) {
      console.error('Error in SearchService.search:', error);
      // Type assertion for error
      const errorMessage = error instanceof Error ? error.message : String(error);
      return `I encountered an error while searching for "${query}": ${errorMessage}. Please try again later.`;
    }
  }

  /**
   * Performs a vector search (currently delegates to the main search method).
   * @param query The search query.
   * @returns A promise that resolves to the search result string.
   */
  static async vectorSearch(query: string): Promise<string> {
    console.log('Performing vector search (delegating to main search) for:', query);
    return this.search(query);
  }

  /**
   * Searches for comedy events using PlaceService.
   * @param query The search query (e.g., "in London", "tonight").
   * @returns A promise that resolves to a string listing comedy events or a "not found" message.
   */
  static async comedySearch(query: string): Promise<string> {
    try {
      console.log('Performing comedy search with PlaceService for:', query);
      // Assuming findEvents returns objects with a 'name' or 'title' property.
      // PlaceService.findEvents is expected to return PlaceSearchResult[] or similar.
      const events: Array<PlaceSearchResult | { name?: string, title?: string }> = await PlaceService.findEvents(`comedy shows ${query}`); 

      if (events && events.length > 0) {
        // PlaceSearchResult has 'name'. If findEvents returns EventItem, it would have 'title'.
        const eventNames = events.map(event => event.name || (event as any).title).filter(name => !!name);
        if (eventNames.length > 0) {
          return `Found comedy events: ${eventNames.join(', ')}.`;
        }
      }
      return `Couldn't find specific comedy events for "${query}". Try a broader search.`;
    } catch (error) {
      console.error('Error in SearchService.comedySearch:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return `I encountered an error while searching for comedy events for "${query}": ${errorMessage}. Please try again later.`;
    }
  }

  // The performGoogleSearch method is intentionally removed as per instructions.
}
