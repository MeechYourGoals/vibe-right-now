
import { DateRange } from "react-day-picker";
import { Location } from "@/types";
import { parseCityStateFromQuery } from "@/utils/geocodingService";
import { generateMusicEvents, generateComedyEvents } from "@/services/search/eventService";
import { generateMockLocationsForCity } from "@/utils/explore/exploreHelpers";
import { generateLocalNightlifeVenues, generateRandomVibes } from "@/utils/locations/venueHelpers";
import { getAdditionalTags } from "@/utils/explore/exploreHelpers";

/**
 * Process a complex natural language search query
 */
export const processComplexQuery = async (
  queryText: string,
  setIsLoadingResults: (loading: boolean) => void,
  toast: any,
  supabase: any,
  setSearchCategories: (categories: string[]) => void,
  setSearchedCity: (city: string) => void,
  setSearchedState: (state: string) => void,
  fetchRealData: (query: string, city: string, state: string) => Promise<void>,
  setComedyEvents: (events: any[]) => void,
  setMusicEvents: (events: any[]) => void,
  setNightlifeVenues: (venues: Location[]) => void,
  dateRange: DateRange | undefined,
  setFilteredLocations: (locations: Location[]) => void,
  realDataResults: Location[],
  setActiveTab: (tab: string) => void,
  setVibeFilter: (vibe: string) => void
) => {
  try {
    setIsLoadingResults(true);
    toast({
      title: "Processing Complex Search",
      description: "Finding venues and events that match all your criteria...",
    });
    
    const { data, error } = await supabase.functions.invoke('vector-search', {
      body: { query: queryText }
    });
    
    if (error) {
      console.error('Error calling vector-search function:', error);
      setIsLoadingResults(false);
      return;
    }
    
    if (data && data.categories && data.categories.length > 0) {
      setSearchCategories(data.categories);
      sessionStorage.setItem('lastSearchCategories', JSON.stringify(data.categories));
      
      const locationMatch = queryText.match(/in\s+([a-zA-Z\s]+)(?:,\s*([a-zA-Z\s]+))?/i);
      
      if (locationMatch && locationMatch[1]) {
        const city = locationMatch[1].trim();
        const state = locationMatch[2] ? locationMatch[2].trim() : "";
        
        setSearchedCity(city);
        setSearchedState(state);
        
        await fetchRealData(queryText, city, state);
        
        const needsComedy = data.categories.includes('comedy');
        if (needsComedy) {
          try {
            const comedyEvents = generateComedyEvents(city, state, dateRange);
            setComedyEvents(comedyEvents);
            setActiveTab('comedy');
          } catch (e) {
            console.error('Error loading comedy events:', e);
          }
        } else {
          setMusicEvents(generateMusicEvents(city, state, dateRange));
          setComedyEvents(generateComedyEvents(city, state, dateRange));
        }
        
        setNightlifeVenues(generateLocalNightlifeVenues(city, state));
        
        let results = generateMockLocationsForCity(city, state);
        
        const categoryMap: Record<string, string> = {
          'restaurant': 'restaurant',
          'dining': 'restaurant',
          'bar': 'bar',
          'nightlife': 'bar',
          'attraction': 'attraction',
          'sport': 'sports',
          'sports': 'sports',
          'event': 'event',
          'upscale': 'restaurant',
          'family friendly': 'restaurant'
        };
        
        const relevantTypes = data.categories
          .map((cat: string) => categoryMap[cat.toLowerCase()])
          .filter(Boolean);
        
        if (relevantTypes.length > 0) {
          results = results.filter(location => 
            relevantTypes.includes(location.type)
          );
        }
        
        const vibes = data.categories.filter((cat: string) => 
          ['upscale', 'family friendly', 'casual', 'romantic', 'cozy', 'trendy', 'nightowl'].includes(cat.toLowerCase())
        );
        
        if (vibes.length > 0) {
          results.forEach(location => {
            if (!location.vibes) {
              location.vibes = [];
            }
            location.vibes.push(...vibes);
          });
          
          if (vibes[0]) {
            setVibeFilter(vibes[0]);
          }
        }
        
        if (realDataResults.length > 0) {
          results = [...realDataResults, ...results.filter(mock => 
            !realDataResults.some(real => real.name === mock.name))];
        }
        
        setFilteredLocations(results);
      }
    }
    
    toast({
      title: "Search Results Ready",
      description: "We've found venues and events matching your criteria",
    });
  } catch (e) {
    console.error('Error processing complex query:', e);
  } finally {
    setIsLoadingResults(false);
  }
};

/**
 * Fetch real venue data for a location
 */
export const fetchRealData = async (
  query: string,
  city: string,
  state: string,
  searchTripAdvisor: any,
  setIsLoadingResults: (loading: boolean) => void,
  toast: any,
  setRealDataResults: (results: Location[]) => void,
  locationTags: Record<string, string[]>,
  setLocationTags: (tags: Record<string, string[]>) => void,
  setFilteredLocations: (locations: Location[]) => void
) => {
  setIsLoadingResults(true);
  
  try {
    toast({
      title: "Searching for real data",
      description: "Looking for venues in " + (city || query) + "...",
    });
    
    const searchQuery = query || `${city}${state ? ', ' + state : ''}`;
    const results = await searchTripAdvisor(searchQuery);
    
    if (results && results.length > 0) {
      console.log('Found real data results:', results.length);
      setRealDataResults(results);
      
      const newLocationTags: Record<string, string[]> = {...locationTags};
      
      results.forEach(location => {
        if (!newLocationTags[location.id]) {
          newLocationTags[location.id] = getAdditionalTags(location);
        }
      });
      
      setLocationTags(newLocationTags);
      
      setFilteredLocations(prevLocations => {
        const combinedResults = [...results];
        
        if (combinedResults.length < 10) {
          const mockResults = generateMockLocationsForCity(city, state);
          combinedResults.push(...mockResults.slice(0, 10 - combinedResults.length));
        }
        
        return combinedResults;
      });
      
      toast({
        title: "Real data found!",
        description: `Found ${results.length} real venues to explore`,
      });
    } else {
      console.log('No real data found, falling back to mock data');
      const mockResults = generateMockLocationsForCity(city, state);
      setFilteredLocations(mockResults);
      
      toast({
        title: "Using mock data",
        description: "Couldn't find real data, showing similar venues instead",
      });
    }
  } catch (error) {
    console.error('Error fetching real data:', error);
    const mockResults = generateMockLocationsForCity(city, state);
    setFilteredLocations(mockResults);
  } finally {
    setIsLoadingResults(false);
  }
};

/**
 * Detect vibe keywords from a search query
 */
export const detectVibeFromQuery = (query: string): string => {
  const vibeKeywords = ["cozy", "family friendly", "nightowl", "trendy", "chill", "upscale", "casual", "romantic"];
  const queryLower = query.toLowerCase();
  
  for (const vibe of vibeKeywords) {
    if (queryLower.includes(vibe)) {
      return vibe;
    }
  }
  
  return "";
};

/**
 * Detect if query is related to comedy
 */
export const isComedyRelatedQuery = (query: string): boolean => {
  return /comedy|comedian|stand[ -]?up|improv|funny|laugh|jokes/i.test(query);
};

/**
 * Update filtered locations based on filters
 */
export const applyFiltersToLocations = (
  locations: Location[],
  activeTab: string,
  searchQuery: string,
  vibeFilter: string
): Location[] => {
  let results = [...locations];
  
  if (searchQuery) {
    results = results.filter(location => {
      const locationMatches = 
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      return locationMatches;
    });
  }
  
  if (activeTab !== "all") {
    results = results.filter(location => location.type === activeTab);
  }
  
  if (vibeFilter && vibeFilter.length > 0) {
    results = results.filter(location => {
      if (!location.vibes) return false;
      return location.vibes.some(vibe => 
        vibe.toLowerCase().includes(vibeFilter.toLowerCase())
      );
    });
  }
  
  return results;
};

/**
 * Update URL based on search parameters
 */
export const updateSearchUrl = (
  navigate: any,
  searchQuery: string,
  vibeFilter: string,
  activeTab: string,
  dateRange: DateRange | undefined
) => {
  if (searchQuery) {
    const searchParams = new URLSearchParams();
    searchParams.set('q', searchQuery);
    if (vibeFilter) searchParams.set('vibe', vibeFilter);
    if (activeTab !== "all") searchParams.set('tab', activeTab);
    
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
