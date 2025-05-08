
import { useState, useCallback } from "react";
import { useExploreData } from "./useExploreData";
import { LocalAIService } from "@/services/LocalAIService";
import { generateMockLocationsForCity } from "@/utils/explore/exploreHelpers";
import { generateMusicEvents, generateComedyEvents } from "@/services/search/eventService";
import { generateLocalNightlifeVenues } from "@/utils/locations/venueHelpers";
import { Location } from "@/types";
import { mockLocations } from '@/mock/data';
import { parseCityStateFromQuery } from "@/utils/geocodingService";

/**
 * Enhanced hook for explore search with AI personalization
 */
const useExploreSearchWithAI = () => {
  const {
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
    setIsLoadingResults
  } = useExploreData();

  // Enhanced search with mock data
  const handleSearch = useCallback((query: string, filterType: string, category: string) => {
    setIsLoadingResults(true);
    setSearchQuery(query);
    setSearchCategory(category);
    
    if (filterType !== "all") {
      setActiveTab(filterType.toLowerCase());
    } else {
      setActiveTab("all");
    }
    
    // Parse city and state from query
    const { city, state } = parseCityStateFromQuery(query);
    
    if (city) {
      setSearchedCity(city);
      setSearchedState(state || "");
      
      // Generate mock locations based on city
      const mockCityLocations = generateMockLocationsForCity(city, state || "");
      setFilteredLocations(mockCityLocations);
      
      // Generate mock events
      setMusicEvents(generateMusicEvents(city, state, dateRange));
      setComedyEvents(generateComedyEvents(city, state, dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues(city, state));
    } else if (query) {
      // If no city detected but we have a query, search the mock locations
      const filteredResults = mockLocations.filter(location => 
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.address.toLowerCase().includes(query.toLowerCase()) ||
        location.city.toLowerCase().includes(query.toLowerCase()) ||
        location.type.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocations(filteredResults.length > 0 ? filteredResults : mockLocations.slice(0, 12));
    } else {
      // Default locations if no query
      setFilteredLocations(mockLocations.slice(0, 12));
    }
    
    // If vibeFilter is set, filter by vibe
    if (vibeFilter && vibeFilter.length > 0) {
      const vibeFilteredLocations = [...filteredLocations].filter(location => {
        if (!location.vibes) return false;
        return location.vibes.some(vibe => 
          vibe.toLowerCase().includes(vibeFilter.toLowerCase())
        );
      });
      setFilteredLocations(vibeFilteredLocations);
    }
    
    // After slight delay to show loading state
    setTimeout(() => {
      setIsLoadingResults(false);
    }, 800);
  }, [
    activeTab, 
    dateRange, 
    filteredLocations,
    setActiveTab, 
    setComedyEvents, 
    setFilteredLocations, 
    setIsLoadingResults, 
    setMusicEvents, 
    setNightlifeVenues, 
    setSearchCategory, 
    setSearchQuery, 
    setSearchedCity, 
    setSearchedState,
    vibeFilter
  ]);

  // Tab change with mock data filtering
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    setIsLoadingResults(true);
    
    // Filter locations based on tab
    let tabFilteredLocations: Location[];
    
    if (value === "all") {
      // For "all" tab, show mix of all venue types
      if (searchedCity) {
        tabFilteredLocations = generateMockLocationsForCity(searchedCity, searchedState);
      } else {
        tabFilteredLocations = mockLocations.slice(0, 12);
      }
    } else {
      // For specific tabs, filter by type
      if (searchedCity) {
        tabFilteredLocations = generateMockLocationsForCity(searchedCity, searchedState)
          .filter(location => location.type === value);
      } else {
        tabFilteredLocations = mockLocations
          .filter(location => location.type === value);
      }
      
      // Add more locations if we don't have enough
      if (tabFilteredLocations.length < 6) {
        const additionalLocations = mockLocations
          .filter(loc => loc.type === value && !tabFilteredLocations.some(tl => tl.id === loc.id))
          .slice(0, 6 - tabFilteredLocations.length);
        
        tabFilteredLocations = [...tabFilteredLocations, ...additionalLocations];
      }
    }
    
    // Filter by vibe if needed
    if (vibeFilter && vibeFilter.length > 0) {
      tabFilteredLocations = tabFilteredLocations.filter(location => {
        if (!location.vibes) return false;
        return location.vibes.some(vibe => 
          vibe.toLowerCase().includes(vibeFilter.toLowerCase())
        );
      });
    }
    
    // Update state with filtered locations
    setTimeout(() => {
      setFilteredLocations(tabFilteredLocations);
      setIsLoadingResults(false);
    }, 500);
    
    // Generate specialized content for specific tabs
    if (value === "music") {
      const city = searchedCity || "San Francisco";
      const state = searchedState || "CA";
      setMusicEvents(generateMusicEvents(city, state, dateRange));
    } else if (value === "comedy") {
      const city = searchedCity || "San Francisco";
      const state = searchedState || "CA";
      setComedyEvents(generateComedyEvents(city, state, dateRange));
    } else if (value === "nightlife") {
      const city = searchedCity || "San Francisco";
      const state = searchedState || "CA";
      setNightlifeVenues(generateLocalNightlifeVenues(city, state));
    }
  }, [
    dateRange, 
    searchedCity, 
    searchedState, 
    setActiveTab, 
    setComedyEvents, 
    setFilteredLocations, 
    setIsLoadingResults, 
    setMusicEvents, 
    setNightlifeVenues,
    vibeFilter
  ]);

  // Handle date range change
  const handleDateRangeChange = useCallback((range: any) => {
    setDateRange(range);
    
    // Update events data with new date range
    if (searchedCity) {
      setMusicEvents(generateMusicEvents(searchedCity, searchedState, range));
      setComedyEvents(generateComedyEvents(searchedCity, searchedState, range));
    } else {
      setMusicEvents(generateMusicEvents("San Francisco", "CA", range));
      setComedyEvents(generateComedyEvents("San Francisco", "CA", range));
    }
  }, [searchedCity, searchedState, setComedyEvents, setDateRange, setMusicEvents]);

  return {
    handleSearch,
    handleTabChange,
    handleDateRangeChange
  };
};

export default useExploreSearchWithAI;
