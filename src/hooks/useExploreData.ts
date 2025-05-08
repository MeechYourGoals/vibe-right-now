
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Location } from '@/types';
import { DateRange } from 'react-day-picker';
import { mockLocations } from '@/mock/data';

// Hook for managing explore page state
export const useExploreData = () => {
  // URL search params
  const [searchParams, setSearchParams] = useSearchParams();

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState<string>(searchParams.get('tab') || 'all');
  const [searchedCity, setSearchedCity] = useState<string>(searchParams.get('city') || '');
  const [searchedState, setSearchedState] = useState<string>(searchParams.get('state') || '');
  const [searchCategory, setSearchCategory] = useState<string>(searchParams.get('category') || 'all');
  
  // Location data state
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
  
  // Event data state
  const [musicEvents, setMusicEvents] = useState<any[]>([]);
  const [comedyEvents, setComedyEvents] = useState<any[]>([]);
  const [nightlifeVenues, setNightlifeVenues] = useState<any[]>([]);
  
  // Filter state
  const [vibeFilter, setVibeFilter] = useState<string>(searchParams.get('vibe') || '');
  const [isNaturalLanguageSearch, setIsNaturalLanguageSearch] = useState<boolean>(false);
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);
  
  // Date filter state
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    searchParams.get('from') && searchParams.get('to') 
      ? { 
          from: new Date(searchParams.get('from')!), 
          to: new Date(searchParams.get('to')!) 
        } 
      : undefined
  );
  const [showDateFilter, setShowDateFilter] = useState<boolean>(false);
  
  // Location detection state
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  
  // Map state
  const [mapStyle, setMapStyle] = useState<"default" | "terrain" | "satellite">("default");
  const [showDistances, setShowDistances] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Sync URL parameters with state
  useEffect(() => {
    const query = searchParams.get('q');
    const tab = searchParams.get('tab');
    const category = searchParams.get('category');
    const vibe = searchParams.get('vibe');
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    
    if (query && query !== searchQuery) {
      setSearchQuery(query);
    }
    
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
    
    if (category && category !== searchCategory) {
      setSearchCategory(category);
    }
    
    if (vibe && vibe !== vibeFilter) {
      setVibeFilter(vibe);
    }
    
    if (city && city !== searchedCity) {
      setSearchedCity(city);
    }
    
    if (state && state !== searchedState) {
      setSearchedState(state);
    }
  }, [searchParams, activeTab, searchCategory, searchQuery, vibeFilter, searchedCity, searchedState]);

  // Get user location if available
  useEffect(() => {
    if (navigator.geolocation) {
      setIsDetectingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          setIsDetectingLocation(false);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setIsDetectingLocation(false);
        }
      );
    }
  }, []);

  // Toggle distance display on map
  const toggleDistances = () => {
    setShowDistances(prev => !prev);
  };

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    searchedCity,
    setSearchedCity,
    searchedState,
    setSearchedState,
    searchCategory,
    setSearchCategory,
    filteredLocations,
    setFilteredLocations,
    locationTags,
    setLocationTags,
    musicEvents,
    setMusicEvents,
    comedyEvents,
    setComedyEvents,
    nightlifeVenues,
    setNightlifeVenues,
    vibeFilter,
    setVibeFilter,
    isNaturalLanguageSearch,
    setIsNaturalLanguageSearch,
    dateRange,
    setDateRange,
    isLoadingResults,
    setIsLoadingResults,
    showDateFilter,
    setShowDateFilter,
    isDetectingLocation,
    userLocation,
    mapStyle,
    setMapStyle,
    showDistances,
    setShowDistances,
    toggleDistances,
    selectedLocation,
    setSelectedLocation
  };
};
