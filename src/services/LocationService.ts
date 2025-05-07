
import { Location } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { generateMockLocationsForCity } from "@/utils/explore/exploreHelpers";
import { getNearbyLocations } from "@/mock/cityLocations";

export const LocationService = {
  /**
   * Get locations by city
   */
  async getLocationsByCity(city: string, limit: number = 10): Promise<Location[]> {
    try {
      // Try to get from Supabase if connected
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('city', city)
        .limit(limit);
      
      if (!error && data && data.length > 0) {
        return data as unknown as Location[];
      }
    } catch (e) {
      console.log("Error fetching from Supabase, using mock data", e);
    }
    
    // Fall back to mock data
    return generateMockLocationsForCity(city, city.includes(" ") ? city.split(" ")[1] : "CA");
  },
  
  /**
   * Get locations near coordinates
   */
  async getNearbyLocations(lat: number, lng: number, radius: number = 10): Promise<Location[]> {
    try {
      // In a real implementation, we would use a spatial query
      // For now, we'll use the mock implementation
      return getNearbyLocations(lat, lng, radius);
    } catch (e) {
      console.log("Error getting nearby locations, using mock data", e);
      return getNearbyLocations(lat, lng, radius);
    }
  },
  
  /**
   * Search for locations
   */
  async searchLocations(query: string, limit: number = 20): Promise<Location[]> {
    try {
      // Try to search in Supabase if connected
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .or(`name.ilike.%${query}%,city.ilike.%${query}%,address.ilike.%${query}%`)
        .limit(limit);
      
      if (!error && data && data.length > 0) {
        return data as unknown as Location[];
      }
    } catch (e) {
      console.log("Error searching in Supabase, using mock data", e);
    }
    
    // Fall back to mock data - extract potential city name from query
    const cityMatch = query.match(/in\s+([a-zA-Z\s]+)(?:,\s*([a-zA-Z\s]+))?/i);
    if (cityMatch && cityMatch[1]) {
      return generateMockLocationsForCity(cityMatch[1].trim(), cityMatch[2] ? cityMatch[2].trim() : "");
    } else {
      // Default to a popular city if no city detected
      return generateMockLocationsForCity("San Francisco", "CA");
    }
  }
};

export default LocationService;
