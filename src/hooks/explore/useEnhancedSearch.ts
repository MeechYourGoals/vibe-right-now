
import { useState } from 'react';
import { Location } from '@/types';
import { GooglePlacesSearchService } from '@/services/GooglePlacesSearchService';
import { mockLocations } from '@/mock/data';

export const useEnhancedSearch = () => {
  const [isSearchingRealPlaces, setIsSearchingRealPlaces] = useState(false);

  /**
   * Enhanced search that combines Google Places API with mock data
   */
  const searchWithRealPlaces = async (
    query: string,
    searchedCity?: string,
    searchedState?: string
  ): Promise<{ locations: Location[], isRealData: boolean }> => {
    // Check if this looks like a real place query
    const isRealPlaceQuery = GooglePlacesSearchService.isRealPlaceQuery(query);
    
    if (isRealPlaceQuery) {
      setIsSearchingRealPlaces(true);
      
      try {
        // Search for real places using Google Places API
        const realPlaces = await GooglePlacesSearchService.searchPlaces(query);
        
        if (realPlaces.length > 0) {
          console.log(`Found ${realPlaces.length} real places for query: ${query}`);
          setIsSearchingRealPlaces(false);
          return { locations: realPlaces, isRealData: true };
        }
      } catch (error) {
        console.error('Real places search failed, falling back to mock data:', error);
      }
      
      setIsSearchingRealPlaces(false);
    }

    // Fall back to mock data filtering
    let filteredMockLocations = [...mockLocations];

    // Filter by city/state if provided
    if (searchedCity) {
      filteredMockLocations = filteredMockLocations.filter(
        location => location.city.toLowerCase().includes(searchedCity.toLowerCase())
      );
    }

    if (searchedState) {
      filteredMockLocations = filteredMockLocations.filter(
        location => location.state?.toLowerCase().includes(searchedState.toLowerCase())
      );
    }

    // Filter by query
    if (query.trim()) {
      const queryLower = query.toLowerCase();
      filteredMockLocations = filteredMockLocations.filter(
        location => 
          location.name.toLowerCase().includes(queryLower) ||
          location.address.toLowerCase().includes(queryLower) ||
          location.type.toLowerCase().includes(queryLower) ||
          (location.vibes && location.vibes.some(vibe => vibe.toLowerCase().includes(queryLower)))
      );
    }

    return { locations: filteredMockLocations, isRealData: false };
  };

  /**
   * Get place details from Google Places API
   */
  const getPlaceDetails = async (placeId: string): Promise<Location | null> => {
    return await GooglePlacesSearchService.getPlaceDetails(placeId);
  };

  return {
    searchWithRealPlaces,
    getPlaceDetails,
    isSearchingRealPlaces
  };
};
