
import { SearchStrategy, SearchOptions } from '../types';
import { ComedySearchProvider } from '@/services/search/providers/ComedySearchProvider';

export class ComedySearchStrategy implements SearchStrategy {
  canHandle(query: string): boolean {
    return /comedy|comedian|stand[ -]?up|improv|funny|laugh|jokes/i.test(query);
  }

  async execute(query: string, options?: SearchOptions): Promise<string> {
    console.log('Executing ComedySearchStrategy for:', query);
    
    try {
      const result = await ComedySearchProvider.search(query);
      
      if (result && result.length > 100) {
        // Set comedy category in sessionStorage
        try {
          sessionStorage.setItem('lastSearchCategories', JSON.stringify(['comedy']));
          sessionStorage.setItem('lastSearchQuery', query);
        } catch (e) {
          console.error('Error setting categories in sessionStorage:', e);
        }
        
        const exploreLinkText = "\n\nYou can also [view all comedy shows on our Explore page](/explore?q=" + 
          encodeURIComponent(query) + "&tab=comedy) for a better visual experience.";
        
        return result + exploreLinkText;
      }
      
      return "I couldn't find specific comedy shows. Please try specifying a city or venue.";
    } catch (error) {
      console.error('ComedySearchStrategy error:', error);
      throw error;
    }
  }

  getPriority(): number {
    return 2;
  }
}
