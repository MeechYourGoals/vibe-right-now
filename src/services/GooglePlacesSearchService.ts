
import { supabase } from "@/integrations/supabase/client";
import { Location } from "@/types";

interface GooglePlacesResult {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types: string[];
  rating?: number;
  opening_hours?: {
    open_now: boolean;
    weekday_text: string[];
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  price_level?: number;
  user_ratings_total?: number;
}

interface GooglePlacesResponse {
  results: GooglePlacesResult[];
  status: string;
  error_message?: string;
}

export class GooglePlacesSearchService {
  /**
   * Detects if a query is for a specific real place/venue
   */
  static isRealPlaceQuery(query: string): boolean {
    const realPlaceIndicators = [
      // Famous venues
      /madison square garden|msg/i,
      /yankee stadium|fenway park|soldier field/i,
      /empire state building|statue of liberty/i,
      /central park|golden gate bridge/i,
      // Chain restaurants/venues with locations
      /starbucks|mcdonalds|subway|olive garden/i,
      /whole foods|target|walmart|costco/i,
      // Generic venue types that might be real
      /\b(restaurant|bar|cafe|hotel|gym|hospital|school|mall|theater|museum) (in|at|near)\b/i,
      // Address-like patterns
      /\d+\s+\w+\s+(street|st|avenue|ave|road|rd|blvd|boulevard)/i,
      // Specific venue searches
      /best\s+(restaurants?|bars?|cafes?|hotels?)\s+(in|near)/i
    ];
    
    return realPlaceIndicators.some(pattern => pattern.test(query));
  }

  /**
   * Searches for places using Google Places API
   */
  static async searchPlaces(query: string, location?: { lat: number, lng: number }): Promise<Location[]> {
    try {
      console.log('Searching Google Places for:', query);
      
      const requestBody = {
        query,
        ...(location && { location }),
        type: 'establishment',
        radius: 5000
      };

      const { data, error } = await supabase.functions.invoke('google-places', {
        body: requestBody
      });

      if (error) {
        console.error('Google Places API error:', error);
        return [];
      }

      const response = data as GooglePlacesResponse;
      
      if (response.status !== 'OK' && response.status !== 'ZERO_RESULTS') {
        console.error('Google Places API status error:', response.status, response.error_message);
        return [];
      }

      return this.transformGooglePlacesToLocations(response.results || []);
    } catch (error) {
      console.error('Error searching Google Places:', error);
      return [];
    }
  }

  /**
   * Transforms Google Places results to our Location format
   */
  private static transformGooglePlacesToLocations(places: GooglePlacesResult[]): Location[] {
    return places.map(place => {
      // Extract city and state from formatted address
      const addressParts = place.formatted_address.split(', ');
      const city = addressParts[addressParts.length - 3] || '';
      const stateZip = addressParts[addressParts.length - 2] || '';
      const state = stateZip.split(' ')[0] || '';
      const country = addressParts[addressParts.length - 1] || 'USA';

      // Determine venue type from Google Places types
      const venueType = this.determineVenueType(place.types);

      return {
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        city,
        state,
        country,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        type: venueType,
        verified: true, // Google Places results are verified
        rating: place.rating,
        description: `Real venue found via Google Places. ${place.user_ratings_total ? `${place.user_ratings_total} reviews` : ''}`,
        hours: place.opening_hours ? this.transformOpeningHours(place.opening_hours.weekday_text) : undefined,
        tags: ['Real Venue', 'Google Places']
      };
    });
  }

  /**
   * Determines venue type from Google Places types array
   */
  private static determineVenueType(types: string[]): "restaurant" | "bar" | "event" | "attraction" | "sports" | "other" {
    const typeMap: Record<string, "restaurant" | "bar" | "event" | "attraction" | "sports" | "other"> = {
      'restaurant': 'restaurant',
      'food': 'restaurant',
      'meal_takeaway': 'restaurant',
      'cafe': 'restaurant',
      'bar': 'bar',
      'night_club': 'bar',
      'liquor_store': 'bar',
      'stadium': 'sports',
      'gym': 'sports',
      'bowling_alley': 'sports',
      'museum': 'attraction',
      'tourist_attraction': 'attraction',
      'amusement_park': 'attraction',
      'zoo': 'attraction',
      'aquarium': 'attraction',
      'movie_theater': 'event',
      'casino': 'event'
    };

    for (const type of types) {
      if (typeMap[type]) {
        return typeMap[type];
      }
    }

    return 'other';
  }

  /**
   * Transforms Google Places opening hours to our format
   */
  private static transformOpeningHours(weekdayText: string[]) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const hours: any = {};

    weekdayText.forEach((text, index) => {
      if (index < days.length) {
        // Simple parsing - just store the text for now
        hours[days[index]] = text.includes(':') ? text.split(': ')[1] : 'Closed';
      }
    });

    return hours;
  }

  /**
   * Gets place details for a specific place ID
   */
  static async getPlaceDetails(placeId: string): Promise<Location | null> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          placeId,
          fields: ['name', 'formatted_address', 'geometry', 'types', 'rating', 'opening_hours', 'photos', 'user_ratings_total']
        }
      });

      if (error || !data?.result) {
        console.error('Error getting place details:', error);
        return null;
      }

      const places = this.transformGooglePlacesToLocations([data.result]);
      return places[0] || null;
    } catch (error) {
      console.error('Error getting place details:', error);
      return null;
    }
  }
}
