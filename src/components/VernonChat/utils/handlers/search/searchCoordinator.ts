
import { LocationSearchStrategy } from './locationSearchStrategy';
import { ComedySearchStrategy } from './comedySearchStrategy';
import { ComplexQueryStrategy } from './complexQueryStrategy';
import { FallbackSearchStrategy } from './fallbackSearchStrategy';
import { LocalDataStrategy } from './localDataStrategy';
import { cleanResponseText } from '../../responseFormatter';

/**
 * Coordinates the search process by trying different strategies
 * in order of priority until a satisfactory result is found
 */
export const SearchCoordinator = {
  /**
   * Handles a search query using multiple strategies
   */
  async processSearchQuery(
    inputValue: string,
    paginationState: Record<string, number>
  ): Promise<string> {
    console.log('Processing search query:', inputValue);
    let responseText = '';
    
    // Strategy 1: Location-based search with Vertex AI
    if (LocationSearchStrategy.isLocationQuery(inputValue)) {
      const locationResult = await LocationSearchStrategy.handleLocationSearch(inputValue);
      if (locationResult.response) {
        return locationResult.response;
      }
    }
    
    // Strategy 2: Comedy-specific search
    if (ComedySearchStrategy.isComedyQuery(inputValue)) {
      const comedyResult = await ComedySearchStrategy.handleComedySearch(inputValue);
      if (comedyResult) {
        return comedyResult;
      }
    }
    
    // Strategy 3: Complex natural language query search
    if (ComplexQueryStrategy.isComplexQuery(inputValue) || LocationSearchStrategy.isLocationQuery(inputValue)) {
      const complexResult = await ComplexQueryStrategy.handleComplexSearch(inputValue);
      if (complexResult.response) {
        return complexResult.response;
      }
    }
    
    // Strategy 4: Standard search service
    responseText = await FallbackSearchStrategy.useStandardSearch(inputValue);
    if (responseText) {
      return responseText;
    }
    
    // Strategy 5: Swirl search
    responseText = await FallbackSearchStrategy.useSwirlSearch(inputValue);
    if (responseText) {
      return responseText;
    }
    
    // Strategy 6: HuggingChat search
    responseText = await FallbackSearchStrategy.useHuggingChatSearch(inputValue);
    if (responseText) {
      return responseText;
    }
    
    // Strategy 7: Last attempt with Vertex AI
    responseText = await FallbackSearchStrategy.useVertexAILastAttempt(inputValue);
    if (responseText) {
      return responseText;
    }
    
    // Strategy 8: Local data fallback
    responseText = LocalDataStrategy.augmentWithLocalData(inputValue, responseText, paginationState);
    
    // If we have any result, return it
    if (responseText && (typeof responseText === 'string' && responseText.length > 0)) {
      // Add a link to the Explore page
      const exploreLinkText = "\n\nYou can also [view all these results on our Explore page](/explore?q=" + 
        encodeURIComponent(inputValue) + ") for a better visual experience.";
      return cleanResponseText((typeof responseText === 'string' ? responseText : JSON.stringify(responseText)) + exploreLinkText);
    }
    
    // Ultimate fallback if all else fails
    return LocalDataStrategy.getUltimateFallback(inputValue);
  }
};
