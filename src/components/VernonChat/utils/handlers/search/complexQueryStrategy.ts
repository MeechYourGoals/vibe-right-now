
import { SearchCoordinator } from './SearchCoordinator';
import { SearchService } from '@/services/search/SearchService';
import { IntegratedSearchProvider } from '@/services/search/providers/IntegratedSearchProvider';
import { FallbackSearchStrategy } from './fallbackSearchStrategy';

/**
 * Strategy for handling complex search queries that might require
 * multiple search services or specialized processing
 */
export const ComplexQueryStrategy = {
  /**
   * Process a complex search query using multiple strategies
   * @param query The search query text
   * @returns Search results as text
   */
  async search(query: string): Promise<string> {
    console.log('Using ComplexQueryStrategy for query:', query);
    
    try {
      // First attempt - Use the SearchCoordinator for orchestrated search
      try {
        const searchResult = await SearchCoordinator.search(query, {
          priorityStrategy: 'google',
          includeCategories: []
        });
        
        if (searchResult && searchResult.length > 100) {
          console.log('SearchCoordinator returned a valid result');
          return searchResult;
        }
      } catch (coordErr) {
        console.error('SearchCoordinator failed:', coordErr);
      }
      
      // Second attempt - Use the search service
      try {
        console.log('Trying SearchService');
        const serviceResult = await SearchService.search(query);
        
        if (serviceResult && serviceResult.length > 100) {
          return serviceResult;
        }
      } catch (serviceErr) {
        console.error('SearchService failed:', serviceErr);
      }
      
      // Third attempt - Try integrated provider
      try {
        console.log('Trying IntegratedSearchProvider');
        const vectorResult = await IntegratedSearchProvider.attemptVectorSearch(query);
        
        if (vectorResult) {
          return vectorResult;
        }
        
        const directResult = await IntegratedSearchProvider.attemptDirectAISearch(query);
        
        if (directResult) {
          return directResult;
        }
        
        const allProvidersResult = await IntegratedSearchProvider.attemptAllProviders(query);
        
        if (allProvidersResult) {
          return allProvidersResult;
        }
      } catch (integratedErr) {
        console.error('IntegratedSearchProvider failed:', integratedErr);
      }
      
      // Final fallback
      return await FallbackSearchStrategy.search(query);
    } catch (error) {
      console.error('All complex query strategies failed:', error);
      return await FallbackSearchStrategy.search(query);
    }
  }
};
