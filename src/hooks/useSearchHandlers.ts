
import { DateRange } from "react-day-picker";
import { Location } from "@/types";
import { parseCityStateFromQuery } from "@/utils/geocodingService";
import { generateMusicEvents, generateComedyEvents } from "@/services/search/eventService";
import { generateMockLocationsForCity } from "@/utils/explore/exploreHelpers";
import { generateLocalNightlifeVenues, generateRandomVibes } from "@/utils/locations/venueHelpers";
import { 
  detectVibeFromQuery, 
  isComedyRelatedQuery, 
  applyFiltersToLocations, 
  updateSearchUrl 
} from "@/utils/explore/searchUtils";

export const useSearchHandlers = (
  exploreData: any,
  fetchRealDataFn: any,
  navigate: any
) => {
  const {
    searchQuery,
    setSearchCategory,
    setActiveTab,
    setIsNaturalLanguageSearch,
    setVibeFilter,
    setSearchedCity,
    setSearchedState,
    setMusicEvents,
    setComedyEvents,
    setNightlifeVenues,
    filteredLocations,
    setFilteredLocations,
    realDataResults,
    dateRange,
    activeTab,
    vibeFilter
  } = exploreData;

  /**
   * Handle search form submission
   */
  const handleSearch = async (query: string, filterType: string, category: string) => {
    exploreData.setSearchQuery(query);
    setSearchCategory(category);
    
    const isComplexQuery = query.length > 50 && 
      /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(query);
    
    setIsNaturalLanguageSearch(isComplexQuery);
    
    // Detect if query is related to comedy
    if (isComedyRelatedQuery(query)) {
      setActiveTab("comedy");
    }
    
    // Detect vibe keywords from query
    const detectedVibe = detectVibeFromQuery(query);
    if (detectedVibe) {
      setVibeFilter(detectedVibe);
    }
    
    if (filterType !== "All") {
      setActiveTab(filterType.toLowerCase());
    } else {
      setActiveTab("all");
    }
    
    let city = "";
    let state = "";
    
    if (isComplexQuery) {
      fetchRealDataFn.processComplexQuery(query);
    } else if (query && !detectedVibe) {
      // Parse city and state using our improved utility
      const locationInfo = parseCityStateFromQuery(query);
      city = locationInfo.city;
      state = locationInfo.state;
      
      if (city) {
        setSearchedCity(city);
        setSearchedState(state);
        
        await fetchRealDataFn.fetchRealData(query, city, state);
        
        setMusicEvents(generateMusicEvents(city, state, dateRange));
        setComedyEvents(generateComedyEvents(city, state, dateRange));
        setNightlifeVenues(generateLocalNightlifeVenues(city, state));
      }
    }
    
    let results = filteredLocations;
    
    if (category === "places" && city) {
      if (realDataResults.length > 0) {
        results = [...realDataResults];
        
        if (results.length < 10) {
          const mockCityResults = generateMockLocationsForCity(city, state);
          results = [...results, ...mockCityResults.filter(mock => 
            !results.some(real => real.name === mock.name))];
        }
      } else {
        results = generateMockLocationsForCity(city, state);
      }
      
      results.forEach(location => {
        if (!location.vibes) {
          location.vibes = generateRandomVibes();
        }
      });
    } else if (query) {
      const allLocations = [...realDataResults, ...filteredLocations];
      results = allLocations.filter(location => {
        const locationMatches = 
          location.name.toLowerCase().includes(query.toLowerCase()) ||
          location.city.toLowerCase().includes(query.toLowerCase()) ||
          location.address.toLowerCase().includes(query.toLowerCase());
        
        return locationMatches;
      });
    }
    
    // Apply active filters
    results = applyFiltersToLocations(results, activeTab, query, vibeFilter);
    
    setFilteredLocations(results);
    
    // Update URL based on search parameters
    updateSearchUrl(navigate, query, vibeFilter, activeTab, dateRange);
  };

  /**
   * Handle tab change
   */
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Get filtered results based on current filters
    let results = filteredLocations;
    
    if (searchQuery) {
      results = results.filter(location => {
        const locationMatches = 
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.address.toLowerCase().includes(searchQuery.toLowerCase());
        
        return locationMatches;
      });
    }
    
    if (exploreData.searchCategory === "places" && exploreData.searchedCity) {
      if (realDataResults.length > 0) {
        results = [...realDataResults];
        
        if (results.length < 10) {
          const mockCityResults = generateMockLocationsForCity(exploreData.searchedCity, exploreData.searchedState);
          results = [...results, ...mockCityResults.filter(mock => 
            !results.some(real => real.name === mock.name))];
        }
      } else {
        results = generateMockLocationsForCity(exploreData.searchedCity, exploreData.searchedState);
      }
      
      results.forEach(location => {
        if (!location.vibes) {
          location.vibes = generateRandomVibes();
        }
      });
    }
    
    // Apply active filters
    results = applyFiltersToLocations(results, value, searchQuery, vibeFilter);
    
    setFilteredLocations(results);
  };

  /**
   * Handle date range change
   */
  const handleDateRangeChange = (range: DateRange | undefined) => {
    exploreData.setDateRange(range);
  };

  return {
    handleSearch,
    handleTabChange,
    handleDateRangeChange,
  };
};
