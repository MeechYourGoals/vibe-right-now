
import { Location, BusinessHours } from "@/types";
import { generateMockVenue } from "@/utils/locations/locationGenerator";
import { supabase } from "@/integrations/supabase/client";

// Direct exported functions for compatibility
export const getVenueById = async (id: string): Promise<Location | null> => {
  return await VenueService.getVenueById(id);
};

export const deleteVenue = async (id: string): Promise<void> => {
  try {
    // First try to delete from Supabase if connected
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.log("Error deleting from Supabase or using mock operation", error);
    }
  } catch (e) {
    console.log("Error deleting venue", e);
  }
};

export const VenueService = {
  /**
   * Gets venue details for a specific venue ID
   */
  async getVenueById(id: string): Promise<Location | null> {
    // First try to get from Supabase if connected
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        return data as unknown as Location;
      }
    } catch (e) {
      console.log("Error fetching from Supabase, using mock data", e);
    }
    
    // Fall back to mock data
    return generateMockVenue(id);
  },
  
  /**
   * Gets recommended venues in a specific city
   */
  async getRecommendedVenues(city: string, limit = 6): Promise<Location[]> {
    // Try to get from Supabase if connected
    try {
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
    const venues: Location[] = [];
    for (let i = 0; i < limit; i++) {
      venues.push(generateMockVenue(`venue-${i}`, { city }));
    }
    return venues;
  },
  
  /**
   * Gets similar venues to a specific venue
   */
  async getSimilarVenues(venueId: string, limit = 3): Promise<Location[]> {
    // Get the original venue to match properties
    const originalVenue = await this.getVenueById(venueId);
    if (!originalVenue) return [];
    
    // Try to get from Supabase if connected
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('city', originalVenue.city)
        .eq('type', originalVenue.type)
        .neq('id', venueId)
        .limit(limit);
      
      if (!error && data && data.length > 0) {
        return data as unknown as Location[];
      }
    } catch (e) {
      console.log("Error fetching from Supabase, using mock data", e);
    }
    
    // Fall back to mock data
    const venues: Location[] = [];
    for (let i = 0; i < limit; i++) {
      venues.push(generateMockVenue(`similar-${venueId}-${i}`, { 
        city: originalVenue.city,
        type: originalVenue.type
      }));
    }
    return venues;
  },
  
  /**
   * Updates a venue's details
   */
  async updateVenue(venueId: string, updates: Partial<Location>): Promise<Location> {
    // Try to update in Supabase if connected
    try {
      const { data, error } = await supabase
        .from('locations')
        .update(updates)
        .eq('id', venueId)
        .select()
        .single();
      
      if (!error && data) {
        return data as unknown as Location;
      }
    } catch (e) {
      console.log("Error updating in Supabase, using mock data", e);
    }
    
    // Fall back to mock data
    const venue = await this.getVenueById(venueId);
    return { ...venue, ...updates } as Location;
  },

  /**
   * Deletes a venue
   */
  async deleteVenue(venueId: string): Promise<void> {
    await deleteVenue(venueId);
  }
};

export default VenueService;
