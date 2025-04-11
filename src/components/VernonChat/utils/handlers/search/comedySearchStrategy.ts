
import { SearchService } from '@/services/search/SearchService';
import { cleanResponseText } from '../../responseFormatter';

/**
 * Handles comedy-related searches
 */
export const ComedySearchStrategy = {
  /**
   * Detects if a query is related to comedy content
   */
  isComedyQuery(inputValue: string): boolean {
    return /comedy|comedian|stand[ -]?up|improv|funny|laugh|jokes/i.test(inputValue);
  },
  
  /**
   * Processes a comedy-related query
   */
  async handleComedySearch(inputValue: string): Promise<string> {
    console.log('Comedy-related query detected, using comedy-specific search');
    try {
      const comedyResponse = await SearchService.comedySearch(inputValue);
      if (comedyResponse && comedyResponse.length > 100) {
        const comedyExploreLinkText = "\n\nYou can also [view all comedy shows on our Explore page](/explore?q=" + 
          encodeURIComponent(inputValue) + "&tab=comedy) for a better visual experience.";
        
        // Set comedy category in sessionStorage
        try {
          sessionStorage.setItem('lastSearchCategories', JSON.stringify(['comedy']));
          sessionStorage.setItem('lastSearchQuery', inputValue);
        } catch (e) {
          console.error('Error setting categories in sessionStorage:', e);
        }
        
        return cleanResponseText(comedyResponse + comedyExploreLinkText);
      }
      return '';
    } catch (comedyError) {
      console.error('Comedy search failed:', comedyError);
      return '';
    }
  }
};
