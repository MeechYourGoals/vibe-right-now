import { supabase } from '@/integrations/supabase/client';

export interface PlaceSearchResult {
  id: string; // Typically place_id from Google
  name: string;
  formatted_address?: string;
  types?: string[];
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: any[]; // Define more strictly if possible
  rating?: number;
  user_ratings_total?: number;
  opening_hours?: any; // Define more strictly if possible
  vicinity?: string;
  // Add other relevant fields you expect from Google Places API searches
}

export interface PlaceDetails extends PlaceSearchResult {
  reviews?: any[]; // Define more strictly if possible
  website?: string;
  international_phone_number?: string;
  price_level?: number;
  // Add other specific details fields
}

export class PlaceService {
  /**
   * Fetches detailed information about a specific place.
   */
  static async getPlaceDetails(
    placeId: string,
    fields: string[] = [
      'place_id', 'name', 'formatted_address', 'geometry', 'types', 'rating',
      'user_ratings_total', 'photos', 'reviews', 'opening_hours', 'website',
      'international_phone_number', 'price_level', 'vicinity'
    ]
  ): Promise<PlaceDetails | null> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: { action: 'details', placeId, fields }
      });

      if (error) {
        console.error('Error calling google-places (getPlaceDetails):', error);
        throw new Error(`Failed to get place details: ${error.message}`);
      }
      // Assuming Supabase function returns Google Places API 'result' for details
      return (data?.result as PlaceDetails) || null;
    } catch (error) {
      console.error('Error in PlaceService.getPlaceDetails:', error);
      throw error;
    }
  }

  /**
   * Searches for places based on a textual query.
   */
  static async searchPlacesByText(
    query: string,
    type?: string,
    region?: string
  ): Promise<PlaceSearchResult[]> {
    try {
      const requestBody: { action: string; query: string; type?: string; location?: string } = {
        action: 'text_search',
        query
      };
      if (type) requestBody.type = type;
      if (region) requestBody.location = region; // Map 'region' to 'location' for Supabase

      const { data, error } = await supabase.functions.invoke('google-places', {
        body: requestBody
      });

      if (error) {
        console.error('Error calling google-places (searchPlacesByText):', error);
        throw new Error(`Failed to search places by text: ${error.message}`);
      }
      // Assuming Supabase function returns Google Places API 'results' for text search
      return (data?.results as PlaceSearchResult[]) || [];
    } catch (error) {
      console.error('Error in PlaceService.searchPlacesByText:', error);
      throw error;
    }
  }

  /**
   * Finds places nearby a given location.
   */
  static async findNearbyPlaces(
    location: { lat: number; lng: number },
    radius: number = 5000,
    type?: string,
    keyword?: string
  ): Promise<PlaceSearchResult[]> {
    try {
      const requestBody: {
        action: string;
        location: { lat: number; lng: number };
        radius: number;
        type?: string;
        keyword?: string;
      } = {
        action: 'nearby_search',
        location,
        radius
      };
      if (type) requestBody.type = type;
      if (keyword) requestBody.keyword = keyword;

      const { data, error } = await supabase.functions.invoke('google-places', {
        body: requestBody
      });

      if (error) {
        console.error('Error calling google-places (findNearbyPlaces):', error);
        throw new Error(`Failed to find nearby places: ${error.message}`);
      }
      // Assuming Supabase function returns Google Places API 'results' for nearby search
      return (data?.results as PlaceSearchResult[]) || [];
    } catch (error) {
      console.error('Error in PlaceService.findNearbyPlaces:', error);
      throw error;
    }
  }

  /**
   * Finds events near a location or based on a query.
   * Assumes events are place-like and can be returned as PlaceSearchResult.
   */
  static async findEvents(
    query: string,
    location?: { latitude: number; longitude: number } // Note: Google Places usually uses lat/lng
  ): Promise<PlaceSearchResult[]> {
    try {
      // Adapt location to lat/lng if necessary for Supabase function
      const googleLocation = location ? { lat: location.latitude, lng: location.longitude } : undefined;

      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          action: 'events', // This action needs to be supported by your Supabase function
          query,
          location: googleLocation
        }
      });

      if (error) {
        console.error('Error calling google-places function for events:', error);
        throw new Error(`Failed to find events: ${error.message}`);
      }
      // Assuming events are returned in 'results' or 'events' field
      const eventResults = data?.events || data?.results;
      return (eventResults as PlaceSearchResult[]) || [];
    } catch (error) {
      console.error('Error in PlaceService.findEvents:', error);
      throw error;
    }
  }
}
