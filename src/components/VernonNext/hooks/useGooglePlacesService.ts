
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SearchResult, ExtractedIntent } from '../types';

export const useGooglePlacesService = () => {
  // Function to search for places using Google Places API
  const searchPlaces = useCallback(async (
    query: string, 
    intent: ExtractedIntent
  ): Promise<SearchResult[]> => {
    try {
      // Construct a search query based on intent
      let searchQuery = query;
      
      // If we have mood keywords, add them to the query
      if (intent.mood && intent.mood.length > 0) {
        const moods = intent.mood.join(' ');
        searchQuery = `${moods} ${searchQuery}`;
      }
      
      // Ensure we have a location
      if (!intent.location) {
        // Try to extract from the original query
        const locationMatch = query.match(/in\s+([A-Za-z\s,]+)(?:\s|$)/i);
        if (locationMatch) {
          intent.location = locationMatch[1].trim();
        }
      }
      
      // Call Google Places API via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          query: searchQuery,
          type: getPlaceType(intent),
          location: intent.location
        }
      });
      
      if (error) {
        console.error('Error calling Places service:', error);
        return [];
      }
      
      if (!data?.results) {
        return [];
      }
      
      // Transform to our format
      return data.results.slice(0, 5).map((place: any) => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        types: place.types,
        location: place.geometry?.location,
        url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
      }));
    } catch (error) {
      console.error('Error in searchPlaces:', error);
      return [];
    }
  }, []);
  
  // Function to get place details
  const getPlaceDetails = useCallback(async (
    placeId: string
  ): Promise<any> => {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          placeId,
          fields: [
            'name', 'formatted_address', 'formatted_phone_number', 
            'opening_hours', 'website', 'rating', 'reviews', 'photos'
          ]
        }
      });
      
      if (error) {
        console.error('Error calling Places details service:', error);
        return null;
      }
      
      return data?.result;
    } catch (error) {
      console.error('Error in getPlaceDetails:', error);
      return null;
    }
  }, []);
  
  // Function to get nearby places
  const getNearbyPlaces = useCallback(async (
    location: { lat: number, lng: number },
    radius: number = 5000,
    type?: string,
    keyword?: string
  ): Promise<SearchResult[]> => {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          location,
          radius,
          type,
          keyword
        }
      });
      
      if (error) {
        console.error('Error calling Places nearby service:', error);
        return [];
      }
      
      if (!data?.results) {
        return [];
      }
      
      // Transform to our format
      return data.results.slice(0, 5).map((place: any) => ({
        id: place.place_id,
        name: place.name,
        address: place.vicinity,
        rating: place.rating,
        types: place.types,
        location: place.geometry?.location,
        url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
      }));
    } catch (error) {
      console.error('Error in getNearbyPlaces:', error);
      return [];
    }
  }, []);
  
  // Helper to determine place type
  const getPlaceType = (intent: ExtractedIntent): string | undefined => {
    if (!intent.keywords || intent.keywords.length === 0) {
      return undefined;
    }
    
    // Map keywords to place types
    const keywordToTypeMap: Record<string, string> = {
      'restaurant': 'restaurant',
      'food': 'restaurant',
      'cafe': 'cafe',
      'coffee': 'cafe',
      'dinner': 'restaurant',
      'lunch': 'restaurant',
      'breakfast': 'restaurant',
      'bar': 'bar',
      'nightclub': 'night_club',
      'museum': 'museum',
      'gallery': 'art_gallery',
      'park': 'park',
      'movie': 'movie_theater',
      'theater': 'movie_theater',
      'cinema': 'movie_theater',
      'concert': 'event_venue',
      'shop': 'shopping_mall',
      'mall': 'shopping_mall',
      'hotel': 'lodging',
      'spa': 'spa',
      'gym': 'gym',
      'beach': 'natural_feature',
      'hiking': 'park'
    };
    
    // Find the first matching keyword
    for (const keyword of intent.keywords) {
      if (keywordToTypeMap[keyword.toLowerCase()]) {
        return keywordToTypeMap[keyword.toLowerCase()];
      }
    }
    
    return undefined;
  };
  
  return {
    searchPlaces,
    getPlaceDetails,
    getNearbyPlaces
  };
};
