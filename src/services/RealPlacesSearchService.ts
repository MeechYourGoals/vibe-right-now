
import { supabase } from "@/integrations/supabase/client";
import { Location } from "@/types";

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
  rating?: number;
  price_level?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  types: string[];
  business_status?: string;
  opening_hours?: {
    open_now: boolean;
  };
}

export interface GooglePlacesResponse {
  results: GooglePlaceResult[];
  status: string;
  error_message?: string;
}

export class RealPlacesSearchService {
  private static instance: RealPlacesSearchService;
  private cache = new Map<string, GooglePlacesResponse>();
  private debounceTimeouts = new Map<string, NodeJS.Timeout>();

  static getInstance(): RealPlacesSearchService {
    if (!RealPlacesSearchService.instance) {
      RealPlacesSearchService.instance = new RealPlacesSearchService();
    }
    return RealPlacesSearchService.instance;
  }

  async searchPlaces(query: string): Promise<Location[]> {
    if (!query || query.length < 3) return [];

    try {
      // Check cache first
      if (this.cache.has(query)) {
        const cachedResponse = this.cache.get(query)!;
        return this.transformGooglePlacesToLocations(cachedResponse.results);
      }

      // Call Google Places API via Supabase edge function
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: { 
          query: query,
          type: 'establishment'
        }
      });

      if (error) {
        console.error('Error calling Google Places API:', error);
        return [];
      }

      if (data && data.status === 'OK') {
        // Cache the result
        this.cache.set(query, data);
        return this.transformGooglePlacesToLocations(data.results || []);
      }

      return [];
    } catch (error) {
      console.error('Error in searchPlaces:', error);
      return [];
    }
  }

  async getPlaceDetails(placeId: string): Promise<Location | null> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: { 
          placeId: placeId,
          fields: ['place_id', 'name', 'formatted_address', 'geometry', 'rating', 'opening_hours', 'photos', 'international_phone_number', 'website', 'types']
        }
      });

      if (error) {
        console.error('Error getting place details:', error);
        return null;
      }

      if (data && data.result) {
        return this.transformGooglePlaceToLocation(data.result);
      }

      return null;
    } catch (error) {
      console.error('Error in getPlaceDetails:', error);
      return null;
    }
  }

  private transformGooglePlacesToLocations(places: GooglePlaceResult[]): Location[] {
    return places.map(place => this.transformGooglePlaceToLocation(place)).filter(Boolean) as Location[];
  }

  private transformGooglePlaceToLocation(place: GooglePlaceResult): Location {
    // Extract city from formatted_address
    const addressParts = place.formatted_address.split(', ');
    const city = addressParts.length > 2 ? addressParts[addressParts.length - 3] : addressParts[0];
    const country = addressParts[addressParts.length - 1];

    // Determine type based on Google Places types
    let type: Location['type'] = 'other';
    if (place.types.includes('restaurant') || place.types.includes('food')) {
      type = 'restaurant';
    } else if (place.types.includes('bar') || place.types.includes('night_club')) {
      type = 'bar';
    } else if (place.types.includes('tourist_attraction') || place.types.includes('museum')) {
      type = 'attraction';
    } else if (place.types.includes('stadium') || place.types.includes('gym')) {
      type = 'sports';
    }

    return {
      id: `google_${place.place_id}`,
      name: place.name,
      address: place.formatted_address,
      city: city,
      country: country,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      type: type,
      verified: true,
      rating: place.rating,
      hours: place.opening_hours ? {
        monday: place.opening_hours.open_now ? 'Open' : 'Closed',
        tuesday: place.opening_hours.open_now ? 'Open' : 'Closed',
        wednesday: place.opening_hours.open_now ? 'Open' : 'Closed',
        thursday: place.opening_hours.open_now ? 'Open' : 'Closed',
        friday: place.opening_hours.open_now ? 'Open' : 'Closed',
        saturday: place.opening_hours.open_now ? 'Open' : 'Closed',
        sunday: place.opening_hours.open_now ? 'Open' : 'Closed',
        isOpenNow: place.opening_hours.open_now ? 'Open' : 'Closed'
      } : undefined
    };
  }

  debouncedSearch(query: string, callback: (results: Location[]) => void, delay: number = 300): void {
    // Clear existing timeout for this query
    const existingTimeout = this.debounceTimeouts.get(query);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(async () => {
      const results = await this.searchPlaces(query);
      callback(results);
      this.debounceTimeouts.delete(query);
    }, delay);

    this.debounceTimeouts.set(query, timeout);
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const realPlacesSearchService = RealPlacesSearchService.getInstance();
