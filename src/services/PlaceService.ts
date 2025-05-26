import { supabase } from '@/integrations/supabase/client';

export interface PlaceSearchResult {
  // Define expected properties for a place search result item based on Google Places API
  // e.g., id: string, name: string, address: string, types: string[], etc.
  id: string;
  name: string;
  formatted_address?: string;
  types?: string[];
  // Add other relevant fields you expect from the Google Places API
}

export interface PlaceDetails extends PlaceSearchResult {
  // Define expected properties for place details, extending PlaceSearchResult
  // e.g., phone_number?: string, website?: string, opening_hours?: any, etc.
  phone_number?: string;
  website?: string;
  rating?: number;
  // Add other relevant fields
}

export class PlaceService {
  /**
   * Searches for places using the Google Places API via a Supabase function.
   * @param query The search query (e.g., "restaurants in New York")
   * @param type Optional type of place to search for (e.g., 'restaurant', 'cafe')
   * @returns A promise that resolves to an array of PlaceSearchResult objects.
   */
  static async searchPlaces(query: string, type?: string): Promise<PlaceSearchResult[]> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          action: 'search', // Assuming your Supabase function handles different actions
          query,
          type
        }
      });

      if (error) {
        console.error('Error calling google-places function for search:', error);
        throw new Error(`Failed to search places: ${error.message}`);
      }

      return data?.results || []; // Adjust based on actual Supabase function response
    } catch (error) {
      console.error('Error in PlaceService.searchPlaces:', error);
      throw error;
    }
  }

  /**
   * Fetches details for a specific place using its place ID.
   * @param placeId The Google Place ID.
   * @returns A promise that resolves to a PlaceDetails object.
   */
  static async getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          action: 'details', // Assuming your Supabase function handles different actions
          placeId
        }
      });

      if (error) {
        console.error('Error calling google-places function for details:', error);
        throw new Error(`Failed to get place details: ${error.message}`);
      }

      return data?.details || null; // Adjust based on actual Supabase function response
    } catch (error) {
      console.error('Error in PlaceService.getPlaceDetails:', error);
      throw error;
    }
  }

  /**
   * Finds events near a location or based on a query.
   * This might use a specific 'events' action in your google-places Supabase function
   * or combine place search with keyword filtering if Places API supports event types.
   * @param query Query for events (e.g., "concerts in London", "music festivals near me")
   * @param location Optional location context (e.g., { latitude: number, longitude: number })
   * @returns A promise that resolves to an array of event-like objects.
   */
  static async findEvents(query: string, location?: { latitude: number, longitude: number }): Promise<any[]> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          action: 'events', // Or 'search' with event-specific types
          query,
          location // Pass location if your function supports it
          // You might need to specify types like 'tourist_attraction', 'event', etc.
          // if the Places API Text Search is used for events.
        }
      });

      if (error) {
        console.error('Error calling google-places function for events:', error);
        throw new Error(`Failed to find events: ${error.message}`);
      }
      // The structure of event results will depend heavily on how Google Places API returns them
      // or if you are filtering results from a broader search.
      return data?.events || data?.results || []; 
    } catch (error) {
      console.error('Error in PlaceService.findEvents:', error);
      throw error;
    }
  }
}
