
import { useLocation, useNavigate } from "react-router-dom";
import { Location } from "@/types";
import { mockLocations } from "@/mock/data";
import { generateMusicEvents, generateComedyEvents } from "@/services/search/eventService";
import { generateMockLocationsForCity, generateLocalNightlifeVenues } from "@/utils/explore/locationGenerators";

export const useFilterHandling = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleTabChange = (
    value: string, 
    searchQuery: string,
    searchedCity: string,
    searchedState: string,
    searchCategory: string,
    vibeFilter: string,
    setFilteredLocations: (locations: Location[]) => void
  ) => {
    let results = [...mockLocations];
    
    if (searchQuery) {
      results = results.filter(loc => {
        const locationMatches = 
          loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.address.toLowerCase().includes(searchQuery.toLowerCase());
        
        return locationMatches;
      });
    }
    
    if (searchCategory === "places" && searchedCity) {
      results = generateMockLocationsForCity(searchedCity, searchedState);
    }
    
    if (value !== "all") {
      results = results.filter(loc => loc.type === value);
    }
    
    if (vibeFilter && vibeFilter.length > 0) {
      results = results.filter(loc => {
        if (!loc.vibes) return false;
        return loc.vibes.some(vibe => 
          vibe.toLowerCase().includes(vibeFilter.toLowerCase())
        );
      });
    }
    
    setFilteredLocations(results);
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
    setNightlifeVenues: (venues: Location[]) => void,
    setFilteredLocations: (locations: Location[]) => void,
    vibeFilter: string,
    setVibeFilter: (vibe: string) => void,
    dateRange?: { from: Date; to?: Date },
    processComplexQuery?: (query: string) => void,
    setIsNaturalLanguageSearch?: (isNL: boolean) => void
  ) => {
    setSearchQuery(query);
    setSearchCategory(category);
    
    const isComplexQuery = query.length > 50 && 
      /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(query);
    
    if (setIsNaturalLanguageSearch) {
      setIsNaturalLanguageSearch(isComplexQuery);
    }
    
    const isComedyQuery = /comedy|comedian|stand[ -]?up|improv|funny|laugh|jokes/i.test(query);
    if (isComedyQuery) {
      setActiveTab("comedy");
    }
    
    const vibeKeywords = ["cozy", "family friendly", "nightowl", "trendy", "chill", "upscale", "casual", "romantic"];
    const queryLower = query.toLowerCase();
    let detectedVibe = "";
    
    for (const vibe of vibeKeywords) {
      if (queryLower.includes(vibe)) {
        detectedVibe = vibe;
        break;
      }
    }
    
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
    
    if (isComplexQuery && processComplexQuery) {
      processComplexQuery(query);
    } else if (query && !detectedVibe) {
      const parts = query.split(',');
      city = parts[0].trim();
      state = parts.length > 1 ? parts[1].trim() : "";
      setSearchedCity(city);
      setSearchedState(state);
      
      setMusicEvents(generateMusicEvents(city, state));
      setComedyEvents(generateComedyEvents(city, state));
      setNightlifeVenues(generateLocalNightlifeVenues(city, state));
    } else {
      setSearchedCity("");
      setSearchedState("");
      setMusicEvents([]);
      setComedyEvents([]);
      setNightlifeVenues([]);
    }
    
    let results = [...mockLocations];
    
    if (category === "places" && city) {
      results = generateMockLocationsForCity(city, state);
      
      results.forEach(loc => {
        if (!loc.vibes) {
          loc.vibes = [];
        }
      });
    } else if (query) {
      results = mockLocations.filter(loc => {
        const locationMatches = 
          loc.name.toLowerCase().includes(query.toLowerCase()) ||
          loc.city.toLowerCase().includes(query.toLowerCase()) ||
          loc.address.toLowerCase().includes(query.toLowerCase());
        
        return locationMatches;
      });
    }
    
    if (filterType.toLowerCase() !== "all") {
      results = results.filter(loc => loc.type === filterType.toLowerCase());
    }
    
    if (vibeFilter && vibeFilter.length > 0) {
      results = results.filter(loc => {
        if (!loc.vibes) return false;
        return loc.vibes.some(vibe => 
          vibe.toLowerCase().includes(vibeFilter.toLowerCase())
        );
      });
    }
    
    setFilteredLocations(results);
    
    if (query) {
      const searchParams = new URLSearchParams();
      searchParams.set('q', query);
      if (vibeFilter) searchParams.set('vibe', vibeFilter);
      if (isComedyQuery || filterType.toLowerCase() !== "all") searchParams.set('tab', isComedyQuery ? 'comedy' : filterType.toLowerCase());
      
      if (dateRange?.from) {
        searchParams.set('from', dateRange.from.toISOString().split('T')[0]);
        if (dateRange.to) {
          searchParams.set('to', dateRange.to.toISOString().split('T')[0]);
        } else {
          searchParams.delete('to');
        }
      }
      
      navigate(`/explore?${searchParams.toString()}`, { replace: true });
    } else if (vibeFilter) {
      navigate(`/explore?vibe=${vibeFilter}`, { replace: true });
    } else {
      navigate('/explore', { replace: true });
    }
  };
  
  const handleClearVibeFilter = (
    searchQuery: string,
    searchCategory: string,
    setVibeFilter: (vibe: string) => void,
    handleSearch: (query: string, filterType: string, category: string) => void
  ) => {
    setVibeFilter("");
    handleSearch(searchQuery, "All", searchCategory);
  };
  
  return {
    handleTabChange,
    handleSearch,
    handleClearVibeFilter
  };
};
