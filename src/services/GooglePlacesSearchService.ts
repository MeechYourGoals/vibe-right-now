
import { supabase } from '@/integrations/supabase/client';
import { Location } from '@/types';

export interface GooglePlaceResult {
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
    width: number;
    height: number;
  }>;
}

export class GooglePlacesSearchService {
  /**
   * Search for real places using Google Places API
   */
  static async searchPlaces(query: string, location?: { lat: number; lng: number }): Promise<Location[]> {
    try {
      console.log('Searching Google Places for:', query);
      
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          query,
          location: location ? `${location.lat},${location.lng}` : undefined,
          radius: 50000 // 50km radius
        }
      });

      if (error) {
        console.error('Google Places API error:', error);
        return [];
      }

      if (data?.results) {
        return this.transformGooglePlacesToLocations(data.results);
      }

      return [];
    } catch (error) {
      console.error('Error calling Google Places API:', error);
      return [];
    }
  }

  /**
   * Get place details for a specific place
   */
  static async getPlaceDetails(placeId: string): Promise<Location | null> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          placeId,
          fields: 'place_id,name,formatted_address,geometry,types,rating,opening_hours,photos,formatted_phone_number,website'
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

  /**
   * Transform Google Places API results to our Location format
   */
  private static transformGooglePlacesToLocations(places: GooglePlaceResult[]): Location[] {
    return places.map(place => this.transformSinglePlace(place));
  }

  /**
   * Transform a single Google Place to our Location format
   */
  private static transformSinglePlace(place: GooglePlaceResult): Location {
    // Determine venue type based on Google Places types
    const venueType = this.determineVenueType(place.types);
    
    // Parse address components
    const addressParts = place.formatted_address.split(', ');
    const city = addressParts[addressParts.length - 3] || '';
    const state = addressParts[addressParts.length - 2]?.split(' ')[0] || '';
    const country = addressParts[addressParts.length - 1] || 'USA';

    // Generate business hours from Google data
    const hours = place.opening_hours?.weekday_text ? 
      this.parseBusinessHours(place.opening_hours.weekday_text) : undefined;

    return {
      id: `google_${place.place_id}`,
      name: place.name,
      address: place.formatted_address,
      city,
      state,
      country,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      type: venueType,
      verified: true, // Google Places are considered verified
      rating: place.rating,
      hours,
      vibes: this.generateVibes(place.types),
      followers: Math.floor(Math.random() * 1000) + 100, // Mock followers
      checkins: Math.floor(Math.random() * 500) + 50 // Mock checkins
    };
  }

  /**
   * Determine venue type from Google Places types
   */
  private static determineVenueType(types: string[]): "restaurant" | "bar" | "event" | "attraction" | "sports" | "other" {
    if (types.includes('restaurant') || types.includes('food') || types.includes('meal_takeaway')) {
      return 'restaurant';
    }
    if (types.includes('bar') || types.includes('night_club') || types.includes('liquor_store')) {
      return 'bar';
    }
    if (types.includes('stadium') || types.includes('gym') || types.includes('bowling_alley')) {
      return 'sports';
    }
    if (types.includes('tourist_attraction') || types.includes('museum') || types.includes('amusement_park')) {
      return 'attraction';
    }
    if (types.includes('movie_theater') || types.includes('casino')) {
      return 'event';
    }
    return 'other';
  }

  /**
   * Generate vibes based on Google Places types
   */
  private static generateVibes(types: string[]): string[] {
    const vibeMap: Record<string, string[]> = {
      'restaurant': ['Trendy', 'Casual', 'Family Friendly'],
      'bar': ['Lively', 'Intimate', 'NightOwl'],
      'night_club': ['Energetic', 'Vibrant', 'NightOwl'],
      'cafe': ['Cozy', 'Casual', 'Peaceful'],
      'tourist_attraction': ['Popular', 'Artistic', 'Historic'],
      'museum': ['Sophisticated', 'Artistic', 'Educational'],
      'stadium': ['Energetic', 'Exciting', 'Crowded'],
      'gym': ['Active', 'Health-focused', 'Motivating']
    };

    const vibes: string[] = [];
    types.forEach(type => {
      if (vibeMap[type]) {
        vibes.push(...vibeMap[type]);
      }
    });

    // Remove duplicates and limit to 3 vibes
    return [...new Set(vibes)].slice(0, 3);
  }

  /**
   * Parse Google's weekday_text into our business hours format
   */
  private static parseBusinessHours(weekdayText: string[]): Record<string, string> {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const hours: Record<string, string> = {};

    weekdayText.forEach((text, index) => {
      if (index < days.length) {
        // Extract just the hours part (after the colon)
        const hoursText = text.split(': ')[1] || 'Closed';
        hours[days[index]] = hoursText;
      }
    });

    return hours;
  }

  /**
   * Check if a query looks like a specific place search
   */
  static isSpecificPlaceQuery(query: string): boolean {
    // Check for specific venue patterns
    const placePatterns = [
      /\b(restaurant|bar|cafe|hotel|gym|museum|theater|stadium|park)\b/i,
      /\b[A-Z][a-z]+ [A-Z][a-z]+/,  // Proper nouns like "Madison Square"
      /\b\d+\s+[A-Z][a-z]+/,        // Address patterns like "123 Main"
      /(street|st|avenue|ave|road|rd|boulevard|blvd)/i
    ];

    return placePatterns.some(pattern => pattern.test(query));
  }
}
