
import { Venue, Location } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { generateMockLocations } from "@/utils/locations/locationGenerator";

// Get a venue by ID
export const getVenueById = async (id: string): Promise<Venue | null> => {
  try {
    // First, try to get from Supabase
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching venue:", error);
    }

    if (data) {
      const venue: Venue = {
        ...data,
        ownerId: "mock-owner", // Add required Venue property
      };
      return venue;
    }

    // If no data from Supabase, try mock data
    const mockLocations = generateMockLocations();
    const mockVenue = mockLocations.find(loc => loc.id === id);
    
    if (mockVenue) {
      return {
        ...mockVenue,
        ownerId: "mock-owner",
      };
    }

    return null;
  } catch (error) {
    console.error("Error in getVenueById:", error);
    return null;
  }
};

// Create a new venue
export const createVenue = async (venue: Partial<Location & { ownerId?: string }>): Promise<Venue | null> => {
  try {
    // Extract venue properties
    const { ownerId, ...locationData } = venue;
    
    // Prepare location data with required fields
    const locationToInsert = {
      ...locationData,
      source: locationData.source || 'user-created',
      category: locationData.category || locationData.type || 'other'
    };
    
    const { data, error } = await supabase
      .from("locations")
      .insert([locationToInsert as any])
      .select()
      .single();

    if (error) {
      console.error("Error creating venue:", error);
      toast.error("Failed to create venue");
      return null;
    }

    toast.success("Venue created successfully");
    return { ...data, ownerId: ownerId || "mock-owner" } as Venue;
  } catch (error) {
    console.error("Error in createVenue:", error);
    toast.error("An error occurred while creating the venue");
    return null;
  }
};

// Update a venue
export const updateVenue = async (id: string, updates: Partial<Venue>): Promise<Venue | null> => {
  try {
    // Extract owner ID
    const { ownerId, ...locationUpdates } = updates;
    
    const { data, error } = await supabase
      .from("locations")
      .update(locationUpdates as any)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating venue:", error);
      toast.error("Failed to update venue");
      return null;
    }

    toast.success("Venue updated successfully");
    return { ...data, ownerId: ownerId || "mock-owner" } as Venue;
  } catch (error) {
    console.error("Error in updateVenue:", error);
    toast.error("An error occurred while updating the venue");
    return null;
  }
};

// Delete a venue
export const deleteVenue = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("locations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting venue:", error);
      toast.error("Failed to delete venue");
      return false;
    }

    toast.success("Venue deleted successfully");
    return true;
  } catch (error) {
    console.error("Error in deleteVenue:", error);
    toast.error("An error occurred while deleting the venue");
    return false;
  }
};

// Get venues owned by a specific user
export const getUserVenues = async (userId: string): Promise<Venue[]> => {
  try {
    // Using mock data for now since we don't have actual user ownership
    const mockLocations = generateMockLocations(5);
    return mockLocations.map(location => ({
      ...location,
      ownerId: userId
    }));
  } catch (error) {
    console.error("Error in getUserVenues:", error);
    return [];
  }
};

// Search venues by name or description
export const searchVenues = async (query: string): Promise<Venue[]> => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .or(`name.ilike.%${query}%,address.ilike.%${query}%`);

    if (error) {
      console.error("Error searching venues:", error);
      return [];
    }

    return data.map(location => ({
      ...location,
      ownerId: "mock-owner"
    })) as Venue[];
  } catch (error) {
    console.error("Error in searchVenues:", error);
    return [];
  }
};
