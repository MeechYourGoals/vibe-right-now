
import { ComedySearchStrategy } from './comedySearchStrategy';
import { ComplexQueryStrategy } from './complexQueryStrategy';
import { LocalDataStrategy } from './localDataStrategy';
import { LocationSearchStrategy } from './locationSearchStrategy';
import { FallbackSearchStrategy } from './fallbackSearchStrategy';
import { PerplexityService } from '@/services/PerplexityService';
import { SearchService } from '@/services/search/SearchService';

/**
 * Coordinates different search strategies based on query type
 */
export const SearchCoordinator = {
  /**
   * Process a search query by determining the best strategy
   * @param query The user's search query
   * @param paginationState Current pagination state
   * @param categories Optional categories extracted by NLP
   * @returns Text response with search results
   */
  async processSearchQuery(
    query: string, 
    paginationState: Record<string, number> = {},
    categories: string[] = []
  ): Promise<string> {
    console.log(`Processing search query: "${query}"`);
    console.log('With NLP categories:', categories);
    
    // Check for comedy-related queries first
    if (ComedySearchStrategy.isComedyQuery(query)) {
      console.log('Using comedy search strategy');
      return ComedySearchStrategy.handleComedySearch(query, paginationState);
    }
    
    // Check for complex queries (now enhanced with NLP categories)
    if (ComplexQueryStrategy.isComplexQuery(query) || categories.length > 0) {
      console.log('Using complex query strategy (with NLP assistance)');
      return ComplexQueryStrategy.handleComplexQuery(query, paginationState, categories);
    }
    
    // Check for location-based queries
    if (LocationSearchStrategy.isLocationQuery(query)) {
      console.log('Using location search strategy');
      return LocationSearchStrategy.handleLocationSearch(query, paginationState);
    }
    
    // Try local data for simple queries
    if (LocalDataStrategy.canHandleQuery(query)) {
      console.log('Using local data strategy');
      return LocalDataStrategy.handleLocalSearch(query, paginationState);
    }
    
    // Use the integrated search service with NLP categories
    try {
      console.log('Using integrated search service with NLP categories');
      
      // Store categories in session for later use by other components
      if (categories.length > 0) {
        try {
          sessionStorage.setItem('lastSearchCategories', JSON.stringify(categories));
          sessionStorage.setItem('lastSearchQuery', query);
        } catch (e) {
          console.error('Error storing search categories in session:', e);
        }
      }
      
      // Try vector search first with categories
      const vectorSearchResult = await SearchService.vectorSearch(query);
      if (typeof vectorSearchResult === 'object' && vectorSearchResult !== null) {
        return vectorSearchResult.results;
      } else if (typeof vectorSearchResult === 'string' && vectorSearchResult.length > 0) {
        return vectorSearchResult;
      }
      
      // Fall back to regular search
      return await SearchService.search(query);
    } catch (error) {
      console.error('Error using integrated search service:', error);
      
      // Fall back to perplexity as a last resort
      try {
        console.log('Falling back to perplexity service');
        return await PerplexityService.searchPerplexity(query);
      } catch (secondError) {
        console.error('Error with perplexity fallback:', secondError);
        return FallbackSearchStrategy.generateFallbackResponse(query);
      }
    }
  }
};
