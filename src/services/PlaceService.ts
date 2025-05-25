import { supabase } from '@/integrations/supabase/client';

export class PlaceService {
  /**
   * Fetches detailed information about a specific place.
   * @param placeId The ID of the place to fetch details for.
   * @param fields Array of fields to retrieve (e.g., 'name', 'rating', 'photos').
   *               Defaults to a comprehensive list.
   * @returns A promise that resolves to the place details.
   */
  static async getPlaceDetails(
    placeId: string,
    fields: string[] = [
      'place_id', 'name', 'formatted_address', 'geometry', 'types', 'rating',
      'user_ratings_total', 'photos', 'reviews', 'opening_hours', 'website',
      'international_phone_number', 'price_level', 'vicinity'
    ]
  ): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: { placeId, fields }
      });

      if (error) {
        console.error('Error calling google-places (getPlaceDetails):', error);
        throw new Error(`Failed to get place details: ${error.message}`);
      }
      // Google Places API returns details in 'result' field
      return data?.result || data;
    } catch (error) {
      console.error('Error in PlaceService.getPlaceDetails:', error);
      throw error;
    }
  }

  /**
   * Finds places nearby a given location.
   * @param location Object with latitude (lat) and longitude (lng).
   * @param radius Search radius in meters (default: 5000m).
   * @param type Restricts results to places matching the specified type (e.g., 'restaurant').
   * @param keyword A term to be matched against all content that Google has indexed for this place.
   * @returns A promise that resolves to a list of nearby places.
   */
  static async findNearbyPlaces(
    location: { lat: number; lng: number },
    radius: number = 5000,
    type?: string,
    keyword?: string
  ): Promise<any> {
    try {
      const body: { location: { lat: number; lng: number }; radius: number; type?: string; keyword?: string } = {
        location,
        radius
      };
      if (type) body.type = type;
      if (keyword) body.keyword = keyword;
      
      const { data, error } = await supabase.functions.invoke('google-places', {
        body
      });

      if (error) {
        console.error('Error calling google-places (findNearbyPlaces):', error);
        throw new Error(`Failed to find nearby places: ${error.message}`);
      }
      // Google Places API returns nearby search results in 'results' field
      return data?.results || data;
    } catch (error) {
      console.error('Error in PlaceService.findNearbyPlaces:', error);
      throw error;
    }
  }

  /**
   * Searches for places based on a textual query.
   * @param query The text string to search for (e.g., "restaurants in New York").
   * @param type Restricts results to places matching the specified type (e.g., 'cafe').
   * @param region The region code (e.g., 'us') to bias search results.
   * @returns A promise that resolves to a list of places matching the search query.
   */
  static async searchPlacesByText(
    query: string,
    type?: string,
    region?: string // In the Supabase function, this is 'location' but used as region for text search
  ): Promise<any> {
    try {
      const body: { query: string; type?: string; region?: string } = { query };
      if (type) body.type = type;
      if (region) body.region = region; // The Supabase function expects 'location' for region here
                                        // but we'll keep 'region' for clarity in this service
                                        // and the function will handle it.
                                        // Update: The Supabase function actually uses 'location' for region
                                        // if it's a string. Let's map `region` to `location` in the body.
      
      const requestBody: { query: string; type?: string; location?: string } = { query };
      if (type) requestBody.type = type;
      if (region) requestBody.location = region;


      const { data, error } = await supabase.functions.invoke('google-places', {
        body: requestBody
      });

      if (error) {
        console.error('Error calling google-places (searchPlacesByText):', error);
        throw new Error(`Failed to search places by text: ${error.message}`);
      }
      // Google Places API returns text search results in 'results' field
      return data?.results || data;
    } catch (error) {
      console.error('Error in PlaceService.searchPlacesByText:', error);
      throw error;
    }
  }
}
