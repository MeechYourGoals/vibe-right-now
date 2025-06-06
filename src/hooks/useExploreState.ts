
import { useState, useEffect } from "react";
import { useSearchParams } from "./explore/useSearchParams";
import { useLocationData } from "./explore/useLocationData";
import { useQueryProcessing } from "./explore/useQueryProcessing";
import { useFilterHandling } from "./explore/useFilterHandling";

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
  
  // Remove the auto-initialization to San Francisco
  // Let it start empty until user searches
  
  // Get page title
  const getPageTitle = () => {
    if (isNaturalLanguageSearch) {
      return "Smart Search Results";
    } else if (searchedCity && searchedCity.trim() !== "") {
      return `Explore Vibes in ${searchedCity}${searchedState ? `, ${searchedState}` : ''}`;
    }
    return "Explore Vibes";
  };
  
  // Wrapper functions to maintain the same API
  const handleSearch = (query: string, filterType: string, category: string) => {
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
    isLoadingResults,
    dateRange,
    showDateFilter,
    activeSearchTab,
    getPageTitle,
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
