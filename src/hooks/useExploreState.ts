import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Location } from "@/types";
import { mockLocations } from "@/mock/data";
import { generateMusicEvents, generateComedyEvents, getComedyEventsForCity } from "@/services/search/eventService";
import { generateMockLocationsForCity, generateLocalNightlifeVenues } from "@/utils/explore/locationGenerators";
import { getAdditionalTags } from "@/utils/explore/mockGenerators";
import { supabase } from "@/integrations/supabase/client";
import { EventItem } from "@/components/venue/events/types";

export const useExploreState = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchedCity, setSearchedCity] = useState("");
  const [searchedState, setSearchedState] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(mockLocations);
  const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
  const [musicEvents, setMusicEvents] = useState<EventItem[]>([]);
  const [comedyEvents, setComedyEvents] = useState<EventItem[]>([]);
  const [nightlifeVenues, setNightlifeVenues] = useState<Location[]>([]);
  const [vibeFilter, setVibeFilter] = useState<string>("");
  const [isNaturalLanguageSearch, setIsNaturalLanguageSearch] = useState(false);
  const [searchCategories, setSearchCategories] = useState<string[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState("all");

  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize location tags
  useEffect(() => {
    const tagsMap: Record<string, string[]> = {};
    mockLocations.forEach(location => {
      tagsMap[location.id] = getAdditionalTags(location);
    });
    setLocationTags(tagsMap);
  }, []);
  
  // Process URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const vibe = params.get('vibe');
    const tab = params.get('tab');
    const fromDate = params.get('from');
    const toDate = params.get('to');
    
    if (fromDate) {
      const from = new Date(fromDate);
      let range: DateRange = { from };
      
      if (toDate) {
        range.to = new Date(toDate);
      }
      
      setDateRange(range);
      setShowDateFilter(true);
    }
    
    if (q) {
      setSearchQuery(q);
      
      const isComplexQuery = q.length > 50 && 
        /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(q);
      
      setIsNaturalLanguageSearch(isComplexQuery);
      
      if (isComplexQuery) {
        processComplexQuery(q);
      } else {
        const parts = q.split(',');
        const city = parts[0].trim() || "San Francisco";
        const state = parts.length > 1 ? parts[1].trim() : "CA";
        
        setSearchedCity(city);
        setSearchedState(state);
        
        setMusicEvents(generateMusicEvents(city, state));
        setComedyEvents(generateComedyEvents(city, state));
        setNightlifeVenues(generateLocalNightlifeVenues(city, state));
      }
      
      setSearchCategory("places");
    } else {
      setSearchedCity("San Francisco");
      setSearchedState("CA");
      setMusicEvents(generateMusicEvents("San Francisco", "CA"));
      setComedyEvents(generateComedyEvents("San Francisco", "CA"));
      setNightlifeVenues(generateLocalNightlifeVenues("San Francisco", "CA"));
    }
    
    if (tab) {
      setActiveTab(tab);
    }
    
    if (vibe) {
      setVibeFilter(vibe);
    }
    
    const lastChatQuery = sessionStorage.getItem('lastChatQuery');
    const lastChatTimestamp = sessionStorage.getItem('lastChatTimestamp');
    
    if (lastChatQuery && lastChatTimestamp && !q) {
      const timestamp = new Date(lastChatTimestamp);
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
      
      if (timestamp > fiveMinutesAgo) {
        setSearchQuery(lastChatQuery);
        
        sessionStorage.removeItem('lastChatQuery');
        sessionStorage.removeItem('lastChatTimestamp');
        
        if (sessionStorage.getItem('isComplexQuery') === 'true') {
          setIsNaturalLanguageSearch(true);
          processComplexQuery(lastChatQuery);
          sessionStorage.removeItem('isComplexQuery');
        }
        
        const searchParams = new URLSearchParams();
        searchParams.set('q', lastChatQuery);
        navigate(`/explore?${searchParams.toString()}`, { replace: true });
      }
    }
  }, [location.search, navigate]);
  
  // Update events when city or date range changes
  useEffect(() => {
    if (searchedCity) {
      setMusicEvents(generateMusicEvents(searchedCity, searchedState));
      setComedyEvents(generateComedyEvents(searchedCity, searchedState));
      setNightlifeVenues(generateLocalNightlifeVenues(searchedCity, searchedState));
    } else if (!musicEvents.length || !comedyEvents.length || !nightlifeVenues.length) {
      const defaultCity = "San Francisco";
      const defaultState = "CA";
      setMusicEvents(generateMusicEvents(defaultCity, defaultState));
      setComedyEvents(generateComedyEvents(defaultCity, defaultState));
      setNightlifeVenues(generateLocalNightlifeVenues(defaultCity, defaultState));
    }
  }, [dateRange, searchedCity, searchedState]);
  
  // Process complex natural language queries
  const processComplexQuery = async (queryText: string) => {
    try {
      setIsLoadingResults(true);
      toast("Finding venues and events that match all your criteria...");
      
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
          
          const needsComedy = data.categories.includes('comedy');
          if (needsComedy) {
            try {
              const comedyEvents = getComedyEventsForCity(city, state);
              setComedyEvents(comedyEvents);
              setActiveTab('comedy');
            } catch (e) {
              console.error('Error loading comedy events:', e);
            }
          } else {
            setMusicEvents(generateMusicEvents(city, state));
            setComedyEvents(generateComedyEvents(city, state));
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
          
          setFilteredLocations(results);
        }
      }
      
      toast("We've found venues and events matching your criteria");
    } catch (e) {
      console.error('Error processing complex query:', e);
    } finally {
      setIsLoadingResults(false);
    }
  };
  
  // Handle search
  const handleSearch = (query: string, filterType: string, category: string) => {
    setSearchQuery(query);
    setSearchCategory(category);
    
    const isComplexQuery = query.length > 50 && 
      /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(query);
    
    setIsNaturalLanguageSearch(isComplexQuery);
    
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
    
    if (isComplexQuery) {
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
      
      results.forEach(location => {
        if (!location.vibes) {
          location.vibes = [];
        }
      });
    } else if (query) {
      results = mockLocations.filter(location => {
        const locationMatches = 
          location.name.toLowerCase().includes(query.toLowerCase()) ||
          location.city.toLowerCase().includes(query.toLowerCase()) ||
          location.address.toLowerCase().includes(query.toLowerCase());
        
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
    
    setFilteredLocations(results);
    
    if (query) {
      const searchParams = new URLSearchParams();
      searchParams.set('q', query);
      if (vibeFilter) searchParams.set('vibe', vibeFilter);
      if (isComedyQuery || activeTab !== "all") searchParams.set('tab', isComedyQuery ? 'comedy' : activeTab);
      
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

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    let results = [...mockLocations];
    
    if (searchQuery) {
      results = results.filter(location => {
        const locationMatches = 
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.address.toLowerCase().includes(searchQuery.toLowerCase());
        
        return locationMatches;
      });
    }
    
    if (searchCategory === "places" && searchedCity) {
      results = generateMockLocationsForCity(searchedCity, searchedState);
    }
    
    if (value !== "all") {
      results = results.filter(location => location.type === value);
    }
    
    if (vibeFilter && vibeFilter.length > 0) {
      results = results.filter(location => {
        if (!location.vibes) return false;
        return location.vibes.some(vibe => 
          vibe.toLowerCase().includes(vibeFilter.toLowerCase())
        );
      });
    }
    
    setFilteredLocations(results);
  };
  
  // Handle clearing vibe filter
  const handleClearVibeFilter = () => {
    setVibeFilter("");
    handleSearch(searchQuery, "All", searchCategory);
  };
  
  // Handle search tab change
  const handleSearchTabChange = (value: string) => {
    setActiveSearchTab(value);
    if (value === 'dates') {
      setShowDateFilter(true);
    } else {
      setShowDateFilter(false);
    }
  };
  
  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    
    // Update URL with date params
    if (range?.from) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('from', range.from.toISOString().split('T')[0]);
      if (range.to) {
        searchParams.set('to', range.to.toISOString().split('T')[0]);
      } else {
        searchParams.delete('to');
      }
      navigate(`/explore?${searchParams.toString()}`, { replace: true });
    }
  };
  
  // Handle clear dates
  const handleClearDates = () => {
    setDateRange(undefined);
    setShowDateFilter(false);
    
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('from');
    searchParams.delete('to');
    navigate(`/explore?${searchParams.toString()}`, { replace: true });
    
    toast("Showing events for all upcoming dates");
  };
  
  // Get page title
  const getPageTitle = () => {
    if (isNaturalLanguageSearch) {
      return "Smart Search Results";
    } else if (searchedCity) {
      return `Explore Vibes in ${searchedCity}${searchedState ? `, ${searchedState}` : ''}`;
    }
    return "Explore Vibes";
  };

  return {
    searchQuery,
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
