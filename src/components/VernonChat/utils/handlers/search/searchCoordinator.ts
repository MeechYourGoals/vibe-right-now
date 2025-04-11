
import { SearchService } from '@/services/search/SearchService';
import { FallbackSearchStrategy } from './fallbackSearchStrategy';
import { LocalDataStrategy } from './localDataStrategy';
import { ComplexQueryStrategy } from './complexQueryStrategy';
import { ComedySearchStrategy } from './comedySearchStrategy';
import { LocationSearchStrategy } from './locationSearchStrategy';

/**
 * Central coordinator for all search strategies
 * Now with Google Cloud NLP integration support
 */
export const SearchCoordinator = {
  /**
   * Process a search query and return results
   * @param inputValue The search query
   * @param paginationState Pagination state for paginated results
   * @param categories Optional categories from Google Cloud NLP API
   */
  async processSearchQuery(
    inputValue: string, 
    paginationState: Record<string, number> = {}, 
    categories: string[] = []
  ): Promise<string> {
    // First check if it's a location query
    if (LocationSearchStrategy.isLocationQuery(inputValue)) {
      console.log('Detected location query, using LocationSearchStrategy');
      const locationResult = await LocationSearchStrategy.handleLocationSearch(inputValue);
      
      if (locationResult && locationResult.response && locationResult.response.length > 50) {
        console.log('Location strategy returned results');
        return locationResult.response;
      }
    }
    
    // Check if it's a complex query
    if (ComplexQueryStrategy.isComplexQuery(inputValue)) {
      console.log('Detected complex query, using ComplexQueryStrategy with NLP categories');
      return await ComplexQueryStrategy.handleComplexQuery(inputValue, paginationState, categories);
    }
    
    // Check if it's a comedy-related query
    if (ComedySearchStrategy.isComedyQuery(inputValue)) {
      console.log('Detected comedy query, using ComedySearchStrategy');
      return await ComedySearchStrategy.handleComedySearch(inputValue);
    }
    
    // Fall back to general search service
    console.log('Using general search service with NLP categories');
    try {
      return await SearchService.search(inputValue, categories);
    } catch (error) {
      console.error('Error in general search service:', error);
      
      // Try local data strategy as fallback
      if (LocalDataStrategy.canHandleLocalQuery(inputValue)) {
        return await LocalDataStrategy.handleLocalSearch(inputValue, paginationState);
      }
      
      // Ultimate fallback
      return FallbackSearchStrategy.generateFallbackResponse(inputValue);
    }
  }
};
