
import { vibeTags } from "@/constants/vibeTags";

export const useFilterHandling = () => {
  const handleTabChange = (
    value: string,
    searchQuery: string,
    searchedCity?: string,
    searchedState?: string,
    searchCategory?: string,
    vibeFilter?: string,
    setFilteredLocations?: (locations: any[]) => void
  ) => {
    // Handle tab change logic
    console.log('Tab changed to:', value);
  };

  const handleSearch = (
    query: string,
    filterType: string,
    category: string,
    searchQuery: string,
    setSearchQuery: (query: string) => void,
    setSearchCategory: (category: string) => void,
    setActiveTab: (tab: string) => void,
    setSearchedCity: (city: string) => void,
    setSearchedState: (state: string) => void,
    setMusicEvents: (events: any[]) => void,
    setComedyEvents: (events: any[]) => void,
    setNightlifeVenues: (venues: any[]) => void,
    setFilteredLocations: (locations: any[]) => void,
    vibeFilter?: string,
    setVibeFilter?: (filter: string) => void,
    dateRange?: any,
    processComplexQuery?: (query: string) => void,
    setIsNaturalLanguageSearch?: (isNatural: boolean) => void
  ) => {
    setSearchQuery(query);
    setSearchCategory(category);
    
    if (processComplexQuery && query.length > 10) {
      processComplexQuery(query);
    }
  };

  const handleClearVibeFilter = (
    searchQuery: string,
    searchCategory: string,
    setVibeFilter: (filter: string) => void,
    handleSearch: (query: string, filterType: string, category: string) => void
  ) => {
    setVibeFilter('');
    handleSearch(searchQuery, 'all', searchCategory);
  };

  return {
    handleTabChange,
    handleSearch,
    handleClearVibeFilter
  };
};
