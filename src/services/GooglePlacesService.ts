
import { supabase } from "@/integrations/supabase/client";

export interface GooglePlace {
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
  user_ratings_total?: number;
  price_level?: number;
  types: string[];
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  opening_hours?: {
    open_now: boolean;
    weekday_text: string[];
  };
  business_status?: string;
}

export interface PlaceDetails extends GooglePlace {
  formatted_phone_number?: string;
  website?: string;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }>;
}

export interface PlaceSearchResult {
  results: GooglePlace[];
  status: string;
  next_page_token?: string;
}

class GooglePlacesService {
  private async getApiKey(): Promise<string> {
    const { data, error } = await supabase.functions.invoke('google-places', {
      body: { action: 'get-api-key' }
    });
    
    if (error || !data?.apiKey) {
      throw new Error('Failed to get Google Places API key');
    }
    
    return data.apiKey;
  }

  async searchPlaces(query: string, location?: { lat: number; lng: number }, radius = 5000): Promise<GooglePlace[]> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          action: 'search',
          query,
          location,
          radius
        }
      });

      if (error) {
        console.error('Google Places search error:', error);
        return [];
      }

      return data?.results || [];
    } catch (error) {
      console.error('Error searching places:', error);
      return [];
    }
  }

  async getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          action: 'details',
          placeId
        }
      });

      if (error) {
        console.error('Google Places details error:', error);
        return null;
      }

      return data?.result || null;
    } catch (error) {
      console.error('Error getting place details:', error);
      return null;
    }
  }

  async getNearbyPlaces(location: { lat: number; lng: number }, radius = 5000, type?: string): Promise<GooglePlace[]> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          action: 'nearby',
          location,
          radius,
          type
        }
      });

      if (error) {
        console.error('Google Places nearby error:', error);
        return [];
      }

      return data?.results || [];
    } catch (error) {
      console.error('Error getting nearby places:', error);
      return [];
    }
  }

  async getPlaceAutocomplete(input: string, location?: { lat: number; lng: number }): Promise<Array<{ place_id: string; description: string }>> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          action: 'autocomplete',
          input,
          location
        }
      });

      if (error) {
        console.error('Google Places autocomplete error:', error);
        return [];
      }

      return data?.predictions || [];
    } catch (error) {
      console.error('Error getting autocomplete suggestions:', error);
      return [];
    }
  }
}

export const googlePlacesService = new GooglePlacesService();
