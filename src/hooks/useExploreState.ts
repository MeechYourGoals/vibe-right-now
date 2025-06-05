
import { useState, useEffect } from "react";
import { useSearchParams } from "./explore/useSearchParams";
import { useLocationData } from "./explore/useLocationData";
import { useQueryProcessing } from "./explore/useQueryProcessing";
import { useFilterHandling } from "./explore/useFilterHandling";
import { useEnhancedSearch } from "./explore/useEnhancedSearch";

export const useExploreState = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Import modularized hooks
  const {
    searchQuery,
    searchedCity,
    searchedState,
    searchCategory,
    vibeFilter,
    isNaturalLanguageSearch,
    dateRange,
    showDateFilter,
    activeSearchTab,
    setSearchQuery,
    setSearchedCity,
    setSearchedState,
    setSearchCategory,
    setVibeFilter,
    setIsNaturalLanguageSearch,
    handleSearchTabChange,
    handleDateRangeChange,
    handleClearDates,
    setShowDateFilter
  } = useSearchParams();
  
  const {
    filteredLocations,
    locationTags,
    musicEvents,
    comedyEvents,
    nightlifeVenues,
    setFilteredLocations,
    setMusicEvents,
    setComedyEvents,
    setNightlifeVenues
  } = useLocationData(searchedCity, searchedState, dateRange);
  
  const {
    isLoadingResults,
    processComplexQuery
  } = useQueryProcessing(
    setSearchedCity,
    setSearchedState,
    setFilteredLocations,
    setComedyEvents,
    setActiveTab,
    setNightlifeVenues,
    setVibeFilter,
    setIsNaturalLanguageSearch
  );
  
  const {
    handleTabChange: filterHandleTabChange,
    handleSearch: filterHandleSearch,
    handleClearVibeFilter: filterHandleClearVibeFilter
  } = useFilterHandling();

  // Enhanced search with Google Places integration
  const { searchWithRealPlaces, isSearchingRealPlaces } = useEnhancedSearch();
  
  // Get active vibe filters for intelligent category filtering
  const getActiveVibeFilters = (): string[] => {
    if (vibeFilter) {
      return [vibeFilter];
    }
    return [];
  };
  
  // Get page title
  const getPageTitle = () => {
    if (isNaturalLanguageSearch) {
      return "Smart Search Results";
    } else if (searchedCity && searchedCity.trim() !== "") {
      return `Explore Vibes in ${searchedCity}${searchedState ? `, ${searchedState}` : ''}`;
    }
    return "Explore Vibes";
  };
  
  // Enhanced search function that uses Google Places API
  const handleEnhancedSearch = async (query: string, filterType: string, category: string) => {
    // Try enhanced search first
    try {
      const { locations, isRealData } = await searchWithRealPlaces(query, searchedCity, searchedState);
      
      if (isRealData && locations.length > 0) {
        console.log('Using real Google Places data');
        setFilteredLocations(locations);
        setIsNaturalLanguageSearch(true);
        return;
      }
    } catch (error) {
      console.error('Enhanced search failed, falling back to regular search:', error);
    }

    // Fall back to regular search
    filterHandleSearch(
      query,
      filterType,
      category,
      searchQuery,
      setSearchQuery,
      setSearchCategory,
      setActiveTab,
      setSearchedCity,
      setSearchedState,
      setMusicEvents,
      setComedyEvents,
      setNightlifeVenues,
      setFilteredLocations,
      vibeFilter,
      setVibeFilter,
      dateRange,
      processComplexQuery,
      setIsNaturalLanguageSearch
    );
  };
  
  // Wrapper functions to maintain the same API
  const handleSearch = (query: string, filterType: string, category: string) => {
    handleEnhancedSearch(query, filterType, category);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterHandleTabChange(
      value, 
      searchQuery,
      searchedCity,
      searchedState,
      searchCategory,
      vibeFilter,
      setFilteredLocations
    );
  };
  
  const handleClearVibeFilter = () => {
    filterHandleClearVibeFilter(
      searchQuery,
      searchCategory,
      setVibeFilter,
      handleSearch
    );
  };

  return {
    activeTab,
    searchedCity,
    searchedState,
    searchCategory,
    filteredLocations,
    locationTags,
    musicEvents,
    comedyEvents,
    nightlifeVenues,
    vibeFilter,
    isNaturalLanguageSearch,
    isLoadingResults: isLoadingResults || isSearchingRealPlaces,
    dateRange,
    showDateFilter,
    activeSearchTab,
    getPageTitle,
    getActiveVibeFilters,
    handleSearch,
    handleTabChange,
    handleClearVibeFilter,
    handleDateRangeChange,
    handleClearDates,
    handleSearchTabChange,
    setShowDateFilter
  };
};

export default useExploreState;
