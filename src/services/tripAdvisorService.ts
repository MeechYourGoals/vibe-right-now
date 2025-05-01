
import { Location } from "@/types";
import { toast } from "sonner";

const APIFY_API_KEY = "apify_api_AhrL7ckIO65JyOsJKpCra1YRxZl87t1bTPwz";

export interface TripAdvisorResult {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  category?: string;
  rating?: number;
  phone?: string;
  website?: string;
  description?: string;
  images?: string[];
  reviews?: any[];
}

export const searchTripAdvisor = async (query: string): Promise<Location[]> => {
  try {
    console.log('Searching TripAdvisor for:', query);
    
    // Show toast to indicate we're searching for real data
    toast({
      title: "Searching for real data",
      description: "Looking for venues on TripAdvisor...",
      duration: 3000,
    });
    
    // Parse query to extract city and state if possible
    const parts = query.split(',');
    const city = parts[0].trim();
    const state = parts.length > 1 ? parts[1].trim() : "";
    
    // First try a direct API call with error handling
    try {
      // Call Apify API to run the TripAdvisor scraper
      const response = await fetch(`https://api.apify.com/v2/acts/apify~tripadvisor-scraper/runs?token=${APIFY_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationFullName: query,
          includeRestaurants: true,
          includeHotels: false,
          includeAttractions: true,
          includeReviews: false,
          maxItems: 20
        }),
      });
      
      if (!response.ok) {
        console.error('TripAdvisor API error:', response.status);
        throw new Error(`TripAdvisor API error: ${response.status}`);
      }
      
      const runData = await response.json();
      const runId = runData.data.id;
      
      // Wait for the run to finish (poll every 2 seconds)
      let isFinished = false;
      let results: TripAdvisorResult[] = [];
      
      for (let i = 0; i < 15 && !isFinished; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const statusResponse = await fetch(`https://api.apify.com/v2/acts/apify~tripadvisor-scraper/runs/${runId}?token=${APIFY_API_KEY}`);
        const statusData = await statusResponse.json();
        
        if (statusData.data.status === 'SUCCEEDED') {
          isFinished = true;
          
          // Get the dataset items
          const datasetResponse = await fetch(`https://api.apify.com/v2/datasets/${statusData.data.defaultDatasetId}/items?token=${APIFY_API_KEY}`);
          results = await datasetResponse.json();
        }
      }
      
      if (!isFinished) {
        console.warn('TripAdvisor API timeout, returning empty results');
        throw new Error('TripAdvisor API timeout');
      }
      
      // Convert TripAdvisor results to our Location format
      return results.map((result, index) => ({
        id: `tripadvisor-${index}-${Date.now()}`,
        name: result.name || 'Unknown Venue',
        address: result.address || '',
        city: result.city || city,
        state: result.state || state,
        country: result.country || 'USA',
        zip: result.postalCode,
        lat: result.latitude || 0,
        lng: result.longitude || 0,
        type: convertTripAdvisorCategory(result.category || ''),
        verified: true,
        phone: result.phone,
        website: result.website,
        rating: result.rating,
        description: result.description,
        images: result.images,
        reviews: result.reviews,
        vibes: generateVibesFromCategory(result.category || '')
      }));
    } catch (apiError) {
      console.error('Error with direct TripAdvisor API call:', apiError);
      throw apiError;
    }
  } catch (error) {
    console.error('Error fetching TripAdvisor data:', error);
    
    // Notify the user
    toast({
      title: "Error fetching real data",
      description: "Falling back to mockdata. Please try again later.",
      duration: 5000,
      variant: "destructive"
    });
    
    return [];
  }
};

// Helper function to convert TripAdvisor categories to our venue types
const convertTripAdvisorCategory = (category: string): "restaurant" | "bar" | "event" | "attraction" | "sports" | "other" => {
  const lowerCategory = category.toLowerCase();
  
  if (lowerCategory.includes('restaurant') || lowerCategory.includes('food') || lowerCategory.includes('dining')) {
    return 'restaurant';
  } else if (lowerCategory.includes('bar') || lowerCategory.includes('pub') || lowerCategory.includes('lounge')) {
    return 'bar';
  } else if (lowerCategory.includes('event') || lowerCategory.includes('concert') || lowerCategory.includes('festival')) {
    return 'event';
  } else if (lowerCategory.includes('attraction') || lowerCategory.includes('sight') || lowerCategory.includes('museum')) {
    return 'attraction';
  } else if (lowerCategory.includes('sport') || lowerCategory.includes('stadium') || lowerCategory.includes('arena')) {
    return 'sports';
  } else {
    return 'other';
  }
};

// Generate vibes based on category
const generateVibesFromCategory = (category: string): string[] => {
  const lowerCategory = category.toLowerCase();
  const vibes: string[] = [];
  
  if (lowerCategory.includes('restaurant') || lowerCategory.includes('food')) {
    vibes.push('Culinary');
    
    if (lowerCategory.includes('fine') || lowerCategory.includes('upscale')) {
      vibes.push('Upscale');
    } else if (lowerCategory.includes('casual')) {
      vibes.push('Casual');
    }
    
    if (lowerCategory.includes('family')) {
      vibes.push('Family Friendly');
    }
  } 
  
  if (lowerCategory.includes('bar') || lowerCategory.includes('pub')) {
    vibes.push('NightOwl');
    
    if (lowerCategory.includes('sports')) {
      vibes.push('Energetic');
    } else if (lowerCategory.includes('lounge')) {
      vibes.push('Chill');
    }
  }
  
  if (lowerCategory.includes('outdoor')) {
    vibes.push('Outdoor');
  }
  
  if (vibes.length === 0) {
    // Default vibes if none matched
    vibes.push('Trendy');
  }
  
  return vibes;
};
