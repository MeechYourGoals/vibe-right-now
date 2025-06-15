
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PlaceSearchRequest {
  query?: string;
  location?: { lat: number, lng: number };
  type?: string;
  placeId?: string;
  fields?: string[];
  radius?: number;
  keyword?: string;
  searchType?: 'city' | 'venue' | 'category';
}

interface EnhancedPlace {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: { lat: number, lng: number };
    viewport?: any;
  };
  types: string[];
  rating?: number;
  price_level?: number;
  photos?: Array<{
    photo_reference: string;
    width: number;
    height: number;
  }>;
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  };
  business_status?: string;
  website?: string;
  formatted_phone_number?: string;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }>;
  google_maps_url?: string;
}

// Helper function to generate Google Maps URL
function generateGoogleMapsUrl(placeId: string): string {
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

// Helper function for spell checking and suggestions
function generateSpellingSuggestions(query: string): string[] {
  const suggestions = [];

  // Common misspellings for venue types
  const corrections: { [key: string]: string } = {
    'resturant': 'restaurant',
    'restraunt': 'restaurant',
    'restaraunt': 'restaurant',
    'cafe': 'cafe',
    'coffe': 'coffee',
    'coffie': 'coffee',
    'bar': 'bar',
    'pub': 'pub',
    'hotel': 'hotel',
    'gym': 'gym',
    'museum': 'museum',
    'theator': 'theater',
    'theatre': 'theater'
  };

  const words = query.toLowerCase().split(' ');
  let correctedQuery = query;

  for (const word of words) {
    if (corrections[word]) {
      correctedQuery = correctedQuery.replace(new RegExp(word, 'gi'), corrections[word]);
      suggestions.push(correctedQuery);
    }
  }

  return suggestions;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: PlaceSearchRequest = await req.json();
    const { query, location, type, placeId, fields, radius, keyword, searchType } = requestData;
    
    console.log('Enhanced Google Places request:', {
      query: query?.substring(0, 50), 
      location, 
      type, 
      placeId, 
      searchType,
      radius, 
      keyword 
    });

    let endpoint;
    let params = new URLSearchParams();
    
    // Set up API key
    params.append('key', GOOGLE_MAPS_API_KEY || '');
    
    // Enhanced field selection for detailed information
    const defaultFields = [
      'place_id', 'name', 'formatted_address', 'geometry', 'types',
      'rating', 'price_level', 'photos', 'opening_hours', 'business_status',
      'website', 'formatted_phone_number'
    ];

    // Determine which API endpoint to use and configure accordingly
    if (placeId) {
      // Place Details request for full information
      endpoint = 'https://maps.googleapis.com/maps/api/place/details/json';
      params.append('place_id', placeId);
      params.append('fields', (fields || defaultFields).join(','));

    } else if (searchType === 'city' || (query && /^[a-zA-Z\s,]+$/.test(query) && query.split(',').length >= 2)) {
      // Geocoding for city/location searches
      endpoint = 'https://maps.googleapis.com/maps/api/geocode/json';
      params.append('address', query || '');
      
    } else if (location && typeof location === 'object') {
      // Nearby Search for venue discovery
      endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
      params.append('location', `${location.lat},${location.lng}`);
      params.append('radius', radius?.toString() || '5000');
      
      if (type) params.append('type', type);
      if (keyword) params.append('keyword', keyword);
      if (query) params.append('name', query);

    } else {
      // Text Search for general venue/place searches
      endpoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
      params.append('query', query || '');
      
      if (type) params.append('type', type);
      if (location && typeof location === 'string') {
        params.append('region', location);
      }
    }
    
    console.log('Calling Google API:', endpoint);
    
    // Make the request to Google Places/Geocoding API
    const response = await fetch(`${endpoint}?${params.toString()}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google API error:', response.status, errorText);

      // Generate spelling suggestions for failed queries
      if (query && response.status === 400) {
        const suggestions = generateSpellingSuggestions(query);
        return new Response(
          JSON.stringify({
            status: 'ZERO_RESULTS',
            results: [],
            spelling_suggestions: suggestions,
            error_message: 'No results found. Try the suggested spellings.'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`Google API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Google API response status:', data.status);
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Google API status error:', data.status, data.error_message);

      // Handle specific error cases with helpful suggestions
      if (data.status === 'ZERO_RESULTS' && query) {
        const suggestions = generateSpellingSuggestions(query);
        return new Response(
          JSON.stringify({
            ...data,
            spelling_suggestions: suggestions
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`Google API status: ${data.status}`);
    }

    // Enhance the response data with additional information
    let enhancedData = { ...data };

    // For places, add Google Maps URLs and enhanced information
    if (data.results && Array.isArray(data.results)) {
      enhancedData.results = data.results.map((place: any) => ({
        ...place,
        google_maps_url: place.place_id ? generateGoogleMapsUrl(place.place_id) : null,
        confidence_score: calculateConfidenceScore(place, query),
        search_relevance: calculateSearchRelevance(place, query, searchType)
      }));

      // Sort by relevance and confidence
      enhancedData.results.sort((a: any, b: any) => {
        return (b.confidence_score + b.search_relevance) - (a.confidence_score + a.search_relevance);
      });
    }

    // For single place details, add Google Maps URL
    if (data.result && data.result.place_id) {
      enhancedData.result = {
        ...data.result,
        google_maps_url: generateGoogleMapsUrl(data.result.place_id)
      };
    }

    // For geocoding results, enhance with place information
    if (endpoint.includes('geocode') && data.results) {
      enhancedData.results = data.results.map((result: any) => ({
        ...result,
        google_maps_url: result.place_id ? generateGoogleMapsUrl(result.place_id) : null,
        search_type: 'location'
      }));
    }
    
    return new Response(
      JSON.stringify(enhancedData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in enhanced google-places function:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        status: 'ERROR',
        spelling_suggestions: query ? generateSpellingSuggestions(query) : []
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper function to calculate confidence score based on place data quality
function calculateConfidenceScore(place: any, query?: string): number {
  let score = 0;

  // Base score for having essential information
  if (place.name) score += 20;
  if (place.formatted_address) score += 15;
  if (place.geometry?.location) score += 20;

  // Bonus for quality indicators
  if (place.rating && place.rating > 4.0) score += 15;
  if (place.photos && place.photos.length > 0) score += 10;
  if (place.opening_hours) score += 10;
  if (place.business_status === 'OPERATIONAL') score += 10;

  return Math.min(score, 100);
}

// Helper function to calculate search relevance
function calculateSearchRelevance(place: any, query?: string, searchType?: string): number {
  if (!query) return 50;

  let relevance = 0;
  const queryLower = query.toLowerCase();
  const nameLower = place.name?.toLowerCase() || '';
  const addressLower = place.formatted_address?.toLowerCase() || '';

  // Name matching
  if (nameLower.includes(queryLower)) relevance += 40;
  if (nameLower.startsWith(queryLower)) relevance += 20;

  // Address matching
  if (addressLower.includes(queryLower)) relevance += 20;

  // Type matching based on search intent
  if (searchType === 'venue' && place.types) {
    const venueTypes = ['restaurant', 'bar', 'cafe', 'gym', 'store', 'museum', 'theater'];
    const hasVenueType = place.types.some((type: string) => venueTypes.includes(type));
    if (hasVenueType) relevance += 20;
  }

  return Math.min(relevance, 100);
}
