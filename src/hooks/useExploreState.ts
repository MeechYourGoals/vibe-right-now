import { useState, useEffect } from "react";
import { useSearchParams } from "./explore/useSearchParams";
import { useLocationData } from "./explore/useLocationData";
import { useQueryProcessing } from "./explore/useQueryProcessing";
import { useFilterHandling } from "./explore/useFilterHandling";
import { EventItem, Location } from "@/types";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "@/mock/users";

export const useExploreState = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  
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
    // Fix type issue - cast through unknown type
    setComedyEvents as unknown as React.Dispatch<React.SetStateAction<Location[]>>,
    setActiveTab,
    setNightlifeVenues as unknown as React.Dispatch<React.SetStateAction<Location[]>>,
    setVibeFilter,
    setIsNaturalLanguageSearch
  );
  
  const {
    handleTabChange: filterHandleTabChange,
    handleSearch: filterHandleSearch,
    handleClearVibeFilter: filterHandleClearVibeFilter
  } = useFilterHandling();
  
  // Initialize with default search
  useEffect(() => {
    if (!searchQuery && !searchedCity && searchCategory !== 'users') {
      setSearchedCity("San Francisco");
      setSearchedState("CA");
    }
  }, [searchQuery, searchedCity, searchCategory, setSearchedCity, setSearchedState]);
  
  // Handle user search specifically
  useEffect(() => {
    if (searchCategory === 'users' && searchQuery) {
      const cleanUsername = searchQuery.replace('@', '').toLowerCase().trim();
      // Check if user exists in mock data
      const userExists = mockUsers.some(user => 
        user.username.toLowerCase() === cleanUsername || 
        user.name.toLowerCase().includes(cleanUsername)
      );
      
      if (userExists) {
        const foundUser = mockUsers.find(user => 
          user.username.toLowerCase() === cleanUsername ||
          user.name.toLowerCase().includes(cleanUsername)
        );
        if (foundUser) {
          navigate(`/user/${foundUser.username}`);
        }
      }
    }
  }, [searchCategory, searchQuery, navigate]);
  
  // Get page title
  const getPageTitle = () => {
    if (isNaturalLanguageSearch) {
      return "Smart Search Results";
    } else if (searchCategory === "users") {
      return `User Search: ${searchQuery || ""}`;
    } else if (searchedCity) {
      return `Explore Vibes in ${searchedCity}${searchedState ? `, ${searchedState}` : ''}`;
    }
    return "Explore Vibes";
  };
  
  // Wrapper functions to maintain the same API
  const handleSearch = (query: string, filterType: string, category: string) => {
    // Handle user search specifically
    if (category === 'users' && query) {
      const cleanUsername = query.replace('@', '').toLowerCase().trim();
      // Check if user exists in mock data
      const userExists = mockUsers.some(user => 
        user.username.toLowerCase() === cleanUsername || 
        user.name.toLowerCase().includes(cleanUsername)
      );
      
      if (userExists) {
        const foundUser = mockUsers.find(user => 
          user.username.toLowerCase() === cleanUsername ||
          user.name.toLowerCase().includes(cleanUsername)
        );
        if (foundUser) {
          navigate(`/user/${foundUser.username}`);
          return;
        }
      }
    }
    
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
      // Fix type issues - cast through unknown type
      setMusicEvents as unknown as React.Dispatch<React.SetStateAction<Location[]>>,
      setComedyEvents as unknown as React.Dispatch<React.SetStateAction<Location[]>>,
      setNightlifeVenues as unknown as React.Dispatch<React.SetStateAction<Location[]>>,
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
