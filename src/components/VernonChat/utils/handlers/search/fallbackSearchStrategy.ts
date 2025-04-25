
import { VertexAIService } from '@/services/VertexAIService';
import { formatResponseWithLinks, formatDefaultResponse } from '../../responseFormatter';

interface SearchParams {
  city?: string;
  state?: string;
  category?: string;
  date?: string;
  query: string;
  paginationState?: Record<string, number>;
}

export class FallbackSearchStrategy {
  private normalizeCategoryString(category: string): string {
    const normalizedCategories: Record<string, string> = {
      'restaurant': 'restaurants',
      'bar': 'bars',
      'nightlife': 'nightlife',
      'concert': 'concerts',
      'music': 'music venues',
      'comedy': 'comedy clubs',
      'attraction': 'tourist attractions',
      'museum': 'museums',
      'art': 'art galleries',
      'outdoor': 'outdoor activities',
      'park': 'parks',
      'sport': 'sporting events',
      'theater': 'theaters'
    };
    
    const lowerCategory = category.toLowerCase();
    return normalizedCategories[lowerCategory] || category;
  }

  public async search({ city, state, category, query, date }: SearchParams): Promise<string> {
    try {
      // Default to city search if no specific parameters
      let searchQuery = query;
      
      if (city) {
        searchQuery = `${category ? this.normalizeCategoryString(category) + ' in ' : 'places to visit in '}${city}${state ? ', ' + state : ''}`;
        
        if (date) {
          searchQuery += ` on ${date}`;
        }
      }
      
      console.log(`[FallbackSearchStrategy] Using AI search with query: "${searchQuery}"`);
      
      // Use searchWithVertex for more contextual search results
      const aiResponse = await VertexAIService.searchWithVertex(searchQuery, { 
        city, 
        category 
      });
      
      // Format the response with links and proper layout
      return formatResponseWithLinks(aiResponse, searchQuery);
    } catch (error) {
      console.error("[FallbackSearchStrategy] Error in AI search:", error);
      
      // Generate a more generic response when AI search fails
      const cityLine = city ? `Here's what I found for ${city}${state ? ', ' + state : ''}:` : '';
      const categoryLine = category ? `Looking for ${this.normalizeCategoryString(category)}${city ? ' in the area' : ''}:` : '';
      
      return formatDefaultResponse(cityLine, categoryLine, query);
    }
  }
}
