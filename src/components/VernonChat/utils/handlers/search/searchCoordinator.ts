
import { SearchService } from '@/services/search/SearchService';
import { FallbackSearchStrategy } from './fallbackSearchStrategy';
import { LocalDataStrategy } from './localDataStrategy';
import { ComplexQueryStrategy } from './complexQueryStrategy';
import { ComedySearchStrategy } from './comedySearchStrategy';
import { LocationSearchStrategy } from './locationSearchStrategy';
import { SwirlSearchService } from '@/services/SwirlSearchService';
import { HuggingFaceService } from '@/services/HuggingFaceService';

/**
 * Central coordinator for all search strategies
 * Now with NLP integration support via HuggingFace
 */
export class SearchCoordinator {
  /**
   * Process a search query and return results
   * @param inputValue The search query
   * @param paginationState Pagination state for paginated results
   * @param categories Optional categories from NLP analysis
   */
  static async processSearchQuery(
    inputValue: string, 
    paginationState: Record<string, number> = {}, 
    categories: string[] = []
  ): Promise<string> {
    // Try to analyze the query with HuggingFace for better understanding
    try {
      const hfAvailable = await HuggingFaceService.isAvailable();
      
      if (hfAvailable) {
        const { enhancedQuery, extractedEntities } = await HuggingFaceService.analyzeQuery(inputValue);
        
        if (enhancedQuery && enhancedQuery !== inputValue) {
          console.log('Query enhanced from:', inputValue);
          console.log('To:', enhancedQuery);
          inputValue = enhancedQuery;
        }
        
        if (extractedEntities && extractedEntities.length > 0) {
          console.log('HuggingFace extracted entities:', extractedEntities);
          // Add extracted entities to categories
          categories = [...new Set([...categories, ...extractedEntities])];
        }
      }
    } catch (error) {
      console.error('Error during HuggingFace query analysis:', error);
    }
    
    // Check if it's a location query
    if (LocationSearchStrategy.isLocationQuery(inputValue)) {
      console.log('Detected location query, using LocationSearchStrategy');
      const locationResult = await LocationSearchStrategy.handleLocationSearch(inputValue);
      
      if (locationResult && locationResult.response && locationResult.response.length > 50) {
        console.log('Location strategy returned results');
        return locationResult.response;
      }
    }
    
    // Try Swirl Search for general web search
    try {
      const swirlAvailable = await SwirlSearchService.isAvailable();
      
      if (swirlAvailable) {
        console.log('Using Swirl search service');
        const swirlResult = await SwirlSearchService.search(inputValue);
        
        if (swirlResult && swirlResult.length > 100) {
          console.log('Swirl search returned good results');
          return swirlResult;
        }
      }
    } catch (error) {
      console.error('Swirl search failed:', error);
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
      // Fix the parameter mismatch - searchService.search only takes one parameter
      return await SearchService.search(inputValue);
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
}
