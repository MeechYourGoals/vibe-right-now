
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Location } from '@/types';

interface GooglePlaceResult {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types: string[];
  rating?: number;
  price_level?: number;
  photos?: Array<{
    photo_reference: string;
  }>;
}

export const useVenueSearch = () => {
  const [venues, setVenues] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController>();

  const searchVenues = async (query: string, location?: string) => {
    if (!query || query.length < 2) {
      setVenues([]);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const searchQuery = location ? `${query} in ${location}` : query;
      
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          query: searchQuery,
          type: 'establishment'
        },
        signal: abortControllerRef.current.signal
      });

      if (error) throw error;

      if (data && data.results) {
        const mappedVenues: Location[] = data.results.map((place: GooglePlaceResult) => ({
          id: place.place_id,
          name: place.name,
          address: place.formatted_address.split(',')[0] || '',
          city: extractCityFromAddress(place.formatted_address),
          state: extractStateFromAddress(place.formatted_address),
          country: 'US',
          zip: '',
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          type: mapGoogleTypeToLocationType(place.types),
          verified: true,
          rating: place.rating || 0,
          priceLevel: place.price_level || 1,
          googlePlaceId: place.place_id
        }));
        
        setVenues(mappedVenues);
      } else {
        setVenues([]);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Error searching venues:', err);
        setError('Failed to search venues');
        setVenues([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const extractCityFromAddress = (address: string): string => {
    const parts = address.split(',');
    return parts[1]?.trim() || 'Unknown';
  };

  const extractStateFromAddress = (address: string): string => {
    const parts = address.split(',');
    const statePart = parts[2]?.trim();
    return statePart?.split(' ')[0] || 'Unknown';
  };

  const mapGoogleTypeToLocationType = (types: string[]): string => {
    if (types.includes('restaurant') || types.includes('food')) return 'restaurant';
    if (types.includes('bar') || types.includes('night_club')) return 'bar';
    if (types.includes('gym') || types.includes('stadium')) return 'sports';
    if (types.includes('tourist_attraction')) return 'attraction';
    return 'other';
  };

  return {
    venues,
    isLoading,
    error,
    searchVenues
  };
};
