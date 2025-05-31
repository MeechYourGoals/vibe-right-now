
import { SimpleSearchService } from '@/services/search/SimpleSearchService';

/**
 * Strategy for fetching information from local mock data
 * Used as a fallback when other strategies fail
 */
export const LocalDataStrategy = {
  /**
   * Check if the query can be handled with local data
   */
  canHandleLocalQuery(inputValue: string): boolean {
    // Check if query contains keywords that we have local data for
    const localDataKeywords = /city|travel|visitor|location|venue|event|bar|restaurant|nightclub|concert/i;
    return localDataKeywords.test(inputValue);
  },
  
  /**
   * Handle search using local data sources
   */
  async handleLocalSearch(
    inputValue: string, 
    paginationState: Record<string, number> = {}
  ): Promise<string> {
    console.log('Using local data strategy for query:', inputValue);
    
    // Try to find city information in our local data
    const cityInfo = await SimpleSearchService.searchForCityInfo(inputValue);
    if (cityInfo && cityInfo.length > 50) {
      return cityInfo;
    }
    
    // If no specific city info, return a general response
    return this.augmentWithLocalData(inputValue, '', paginationState);
  },
  
  /**
   * Augment an existing response with additional local data
   */
  augmentWithLocalData(
    inputValue: string, 
    existingResponse: string,
    paginationState: Record<string, number>
  ): string {
    // If we already have a substantial response, return it
    if (existingResponse && existingResponse.length > 100) {
      return existingResponse;
    }
    
    // Generate a generic response based on available local data
    return `Based on our local information, I can help you discover interesting venues related to "${inputValue}". Try being more specific about what you're looking for, or explore our featured locations.`;
  },
  
  /**
   * Get ultimate fallback when no other strategies work
   */
  getUltimateFallback(inputValue: string): string {
    return `I don't have specific information about "${inputValue}". Try searching for specific cities, venues, or events.`;
  }
};
