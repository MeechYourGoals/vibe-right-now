
import { SearchService } from '@/services/search/SearchService';
import { FallbackSearchStrategy } from './fallbackSearchStrategy';
import { LocalDataStrategy } from './localDataStrategy';
import { ComplexQueryStrategy } from './complexQueryStrategy';
import { ComedySearchStrategy } from './comedySearchStrategy';
import { LocationSearchStrategy } from './locationSearchStrategy';
import { VertexAIService } from '@/services/VertexAIService';

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

/**
 * Central coordinator for all search strategies
 * Now with Google Cloud NLP integration support
 */
export class SearchCoordinator {
  static async performWebSearch(query: string): Promise<SearchResult[]> {
    // Placeholder for actual web search implementation
    console.log('Performing web search for:', query);
    return [
      {
        title: 'Mock Result 1',
        link: 'https://example.com/result1',
        snippet: 'This is a mock search result for testing purposes.'
      },
      {
        title: 'Mock Result 2',
        link: 'https://example.com/result2',
        snippet: 'Another mock result to simulate web search output.'
      }
    ];
  }

  static async summarizeSearchResults(query: string, results: SearchResult[]): Promise<string> {
    // Placeholder for actual summarization implementation
    console.log('Summarizing search results for:', query);
    return `Summary of search results for "${query}":\n` +
           results.map(result => `- ${result.title}: ${result.snippet}`).join('\n');
  }

  /**
   * Process a search query and return results
   * @param inputValue The search query
   * @param paginationState Pagination state for paginated results
   * @param categories Optional categories from Google Cloud NLP API
   */
  static async processSearchQuery(
    inputValue: string, 
    paginationState: Record<string, number> = {}, 
    categories: string[] = []
  ): Promise<string> {
    // First check if it's a location query
    if (LocationSearchStrategy.isLocationQuery(inputValue)) {
      console.log('Detected location query, using LocationSearchStrategy');
      try {
        const locationResult = await LocationSearchStrategy.handleLocationSearch(inputValue);
        
        if (locationResult && locationResult.response && locationResult.response.length > 50) {
          console.log('Location strategy returned results');
          return locationResult.response;
        }
      } catch (error) {
        console.error('Error in location search:', error);
      }
    }
    
    // Check if it's a complex query
    if (ComplexQueryStrategy.isComplexQuery(inputValue)) {
      console.log('Detected complex query, using ComplexQueryStrategy with NLP categories');
      try {
        return await ComplexQueryStrategy.handleComplexQuery(inputValue, paginationState, categories);
      } catch (error) {
        console.error('Error in complex query handling:', error);
      }
    }
    
    // Check if it's a comedy-related query
    if (ComedySearchStrategy.isComedyQuery(inputValue)) {
      console.log('Detected comedy query, using ComedySearchStrategy');
      try {
        return await ComedySearchStrategy.handleComedySearch(inputValue);
      } catch (error) {
        console.error('Error in comedy search:', error);
      }
    }
    
    // Fall back to general search service
    console.log('Using general search service with NLP categories');
    try {
      // Fix the parameter mismatch - searchService.search only takes one parameter
      return await SearchService.search(inputValue);
    } catch (error) {
      console.error('Error in general search service:', error);
      
      // Try local data strategy as fallback
      try {
        if (LocalDataStrategy.canHandleLocalQuery(inputValue)) {
          return await LocalDataStrategy.handleLocalSearch(inputValue, paginationState);
        }
      } catch (localError) {
        console.error('Error in local data strategy:', localError);
      }
      
      // Ultimate fallback
      return FallbackSearchStrategy.generateFallbackResponse(inputValue);
    }
  }
}

export default SearchCoordinator;
