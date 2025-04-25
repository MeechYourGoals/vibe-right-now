import { generateMusicVenues, generateComedyClubs, generateNightlifeVenues } from '@/utils/locations/mockVenueGenerators';
import { VertexAIService } from '@/services/VertexAIService';

interface SearchParams {
  city?: string;
  state?: string;
  category?: string;
  query: string;
  paginationState?: Record<string, number>;
}

interface LocationSearchResult {
  contextualResponse: string;
  locationInfo?: {
    city: string;
    state: string;
    category?: string;
  };
}

export class LocationSearchStrategy {
  private extractLocationFromQuery(query: string): { city?: string; state?: string } {
    // Extract location from a query like "restaurants in San Francisco" or "things to do in Miami, FL"
    const cityStateRegex = /(?:in|near|around)\s+([A-Za-z\s.]+)(?:,\s*([A-Za-z]{2}))?/i;
    const match = query.match(cityStateRegex);
    
    if (match) {
      return {
        city: match[1]?.trim(),
        state: match[2]?.trim() || undefined
      };
    }
    
    return { city: undefined, state: undefined };
  }
  
  private extractCategoryFromQuery(query: string): string | undefined {
    const categoryMap: Record<string, string[]> = {
      'restaurant': ['restaurant', 'dine', 'dining', 'food', 'eat', 'bistro', 'cafe'],
      'bar': ['bar', 'pub', 'drinks', 'cocktail', 'brewery', 'beer', 'wine'],
      'nightlife': ['nightlife', 'club', 'dancing', 'night out', 'party'],
      'music': ['music', 'concert', 'live music', 'band', 'show'],
      'comedy': ['comedy', 'stand-up', 'standup', 'improv', 'comedian', 'laugh'],
      'attraction': ['attraction', 'sightseeing', 'landmark', 'tour', 'tourism'],
      'museum': ['museum', 'gallery', 'exhibition', 'art'],
      'outdoor': ['outdoor', 'park', 'hike', 'hiking', 'trail', 'nature'],
      'sport': ['sport', 'game', 'match', 'stadium', 'arena', 'tournament']
    };
    
    const lowerQuery = query.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categoryMap)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        return category;
      }
    }
    
    return undefined;
  }
  
  private async generateContextualResponse(city: string, state: string, category?: string, query?: string): Promise<string> {
    try {
      let promptPrefix = '';
      
      if (category) {
        promptPrefix = `I'm looking for ${category} in ${city}${state ? ', ' + state : ''}. `;
      } else {
        promptPrefix = `What are some interesting places to visit in ${city}${state ? ', ' + state : ''}? `;
      }
      
      // Use Vertex AI for generating contextual information
      const vertexResponse = await VertexAIService.searchWithVertex(
        promptPrefix + (query || ''),
        {
          city,
          category
        }
      );
      
      return vertexResponse;
    } catch (error) {
      console.error('Error generating contextual response:', error);
      
      // Fallback to a simpler response
      return `Here are some popular ${category || 'places'} in ${city}${state ? ', ' + state : ''}:
      
1. ${category === 'restaurant' ? city + ' Grill' : category === 'bar' ? city + ' Craft Beer' : city + ' Main Attraction'}
2. ${category === 'restaurant' ? 'Downtown ' + city + ' Bistro' : category === 'bar' ? city + ' Rooftop Bar' : city + ' Museum'}
3. ${category === 'restaurant' ? city + ' Fine Dining' : category === 'bar' ? city + ' Nightclub' : city + ' Park'}

I recommend checking out reviews and opening hours before you visit.`;
    }
  }
  
  public async search(params: SearchParams): Promise<LocationSearchResult> {
    const { city: providedCity, state: providedState, category: providedCategory, query } = params;
    
    // If city and state are provided directly, use them
    let city = providedCity;
    let state = providedState;
    let category = providedCategory;
    
    // Otherwise try to extract them from the query
    if (!city || !state) {
      const extractedLocation = this.extractLocationFromQuery(query);
      city = city || extractedLocation.city;
      state = state || extractedLocation.state;
    }
    
    // Try to extract category from query if not provided
    if (!category) {
      category = this.extractCategoryFromQuery(query);
    }
    
    // Default to San Francisco if no city found
    city = city || 'San Francisco';
    state = state || 'CA';
    
    const contextualResponse = await this.generateContextualResponse(city, state, category, query);
    
    return {
      contextualResponse,
      locationInfo: {
        city,
        state,
        category
      }
    };
  }
}
