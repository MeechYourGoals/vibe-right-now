
import { SearchStrategy, SearchOptions } from '../types';
import { PerplexityService } from '@/services/PerplexityService';
import { extractCategories } from '@/services/VertexAI/analysis';
import { cleanResponseText } from '../../../responseFormatter';

export class LocationSearchStrategy implements SearchStrategy {
  canHandle(query: string): boolean {
    const locationKeywords = /what|where|when|how|things\s+to\s+do|events|places|restaurants|bars|attractions|activities|visit|in|at|near|around/i;
    const cityNames = /miami|new york|los angeles|chicago|san francisco|boston|seattle|austin|denver|nashville|atlanta|portland|dallas|houston|phoenix|philadelphia|san diego|las vegas|orlando|washington|dc/i;
    
    return locationKeywords.test(query) || cityNames.test(query);
  }

  async execute(query: string, options?: SearchOptions): Promise<string> {
    console.log('Executing LocationSearchStrategy for:', query);
    
    try {
      // Extract categories using Cloud Natural Language API
      const extractedCategories = await extractCategories(query);
      console.log('Extracted categories:', extractedCategories);
      
      if (extractedCategories.length > 0) {
        try {
          sessionStorage.setItem('nlpCategories', JSON.stringify(extractedCategories));
          sessionStorage.setItem('lastSearchQuery', query);
          sessionStorage.setItem('lastSearchTimestamp', new Date().toISOString());
        } catch (e) {
          console.error('Error storing search data in session:', e);
        }
      }

      // Use Perplexity for location-based search
      const result = await PerplexityService.searchPerplexity(query);
      
      if (result && result.length > 100) {
        const exploreLinkText = "\n\nYou can also [view all these results on our Explore page](/explore?q=" + 
          encodeURIComponent(query) + ") for a better visual experience.";
        
        return cleanResponseText(result + exploreLinkText);
      }
      
      return "I couldn't find specific information about that location. Please try being more specific about what you're looking for.";
    } catch (error) {
      console.error('LocationSearchStrategy error:', error);
      throw error;
    }
  }

  getPriority(): number {
    return 1;
  }
}
