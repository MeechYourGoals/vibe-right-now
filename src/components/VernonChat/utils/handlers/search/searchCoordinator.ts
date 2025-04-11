
import { ComedySearchStrategy } from './comedySearchStrategy';
import { LocationSearchStrategy } from './locationSearchStrategy';
import { VertexAIService } from '@/services/VertexAIService';
import { cleanResponseText } from '../../responseFormatter';

/**
 * Coordinates the search process by delegating to specialized search strategies
 */
export const SearchCoordinator = {
  /**
   * Process a search query using the appropriate strategy
   */
  async processSearchQuery(inputValue: string, paginationState: Record<string, number>): Promise<string> {
    console.log('SearchCoordinator processing query:', inputValue);
    
    try {
      // Always prioritize comedy search for comedy-related queries
      if (ComedySearchStrategy.isComedyQuery(inputValue)) {
        const comedyResponse = await ComedySearchStrategy.handleComedySearch(inputValue);
        if (comedyResponse) {
          console.log('Comedy search successful, returning results');
          return comedyResponse;
        }
      }
      
      // For location and general queries, try location strategy first
      if (LocationSearchStrategy.isLocationQuery(inputValue)) {
        const locationResult = await LocationSearchStrategy.handleLocationSearch(inputValue);
        if (locationResult && locationResult.response) {
          console.log('Location search successful, returning results');
          return locationResult.response;
        }
      }
      
      // Direct Vertex AI call as fallback for all queries
      console.log('Using Vertex AI as fallback search method');
      const vertexResponse = await VertexAIService.searchWithVertex(
        `Please provide detailed, factual information about: "${inputValue}".
         Include specific names, addresses, and details about real places and events.
         Focus on giving practical information that would help someone planning to visit these places.`
      );
      
      // Clean and format the response with explore link
      if (vertexResponse && vertexResponse.length > 100) {
        console.log('Vertex AI direct search successful');
        const exploreLinkText = "\n\nYou can also [view all results on our Explore page](/explore?q=" + 
          encodeURIComponent(inputValue) + ") for a better visual experience.";
        
        return cleanResponseText(vertexResponse + exploreLinkText);
      }
      
      return "I couldn't find specific information about that. Could you try asking in a different way?";
    } catch (error) {
      console.error('Error in SearchCoordinator:', error);
      return "I'm having trouble searching for information right now. Please try again shortly.";
    }
  }
};
