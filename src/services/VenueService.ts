
import { Venue, Location } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { generateMockLocations } from "@/utils/locations/locationGenerator";

// Get a venue by ID
export const getVenueById = async (id: string): Promise<Venue | null> => {
  try {
    // First, try to get from Supabase
    const { data, error } = await supabase
      .from("venues")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching venue:", error);
    }

    if (data) {
      return data as Venue;
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
export const createVenue = async (venue: Partial<Venue>): Promise<Venue | null> => {
  try {
    const { data, error } = await supabase
      .from("venues")
      .insert([venue])
      .select()
      .single();

    if (error) {
      console.error("Error creating venue:", error);
      toast.error("Failed to create venue");
      return null;
    }

    toast.success("Venue created successfully");
    return data as Venue;
  } catch (error) {
    console.error("Error in createVenue:", error);
    toast.error("An error occurred while creating the venue");
    return null;
  }
};

// Update a venue
export const updateVenue = async (id: string, updates: Partial<Venue>): Promise<Venue | null> => {
  try {
    const { data, error } = await supabase
      .from("venues")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating venue:", error);
      toast.error("Failed to update venue");
      return null;
    }

    toast.success("Venue updated successfully");
    return data as Venue;
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
      .from("venues")
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
    const { data, error } = await supabase
      .from("venues")
      .select("*")
      .eq("ownerId", userId);

    if (error) {
      console.error("Error fetching user venues:", error);
      return [];
    }

    return data as Venue[];
  } catch (error) {
    console.error("Error in getUserVenues:", error);
    return [];
  }
};

// Search venues by name or description
export const searchVenues = async (query: string): Promise<Venue[]> => {
  try {
    const { data, error } = await supabase
      .from("venues")
      .select("*")
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

    if (error) {
      console.error("Error searching venues:", error);
      return [];
    }

    return data as Venue[];
  } catch (error) {
    console.error("Error in searchVenues:", error);
    return [];
  }
};
