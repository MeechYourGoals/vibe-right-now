
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { parseCityStateFromQuery } from "@/utils/geocodingService";
import { useExploreData } from "@/hooks/useExploreData";
import { generateMusicEvents, generateComedyEvents } from "@/services/search/eventService";
import { searchTripAdvisor } from "@/services/tripAdvisorService";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { generateMockLocationsForCity } from "@/utils/explore/exploreHelpers";
import { Location } from "@/types";
import { generateLocalNightlifeVenues, generateRandomVibes } from "@/utils/locations/venueHelpers";
import { getAdditionalTags } from "@/utils/explore/exploreHelpers";

export const useExploreSearch = () => {
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
    searchCategories,
    setSearchCategories,
    isLoadingResults,
    setIsLoadingResults,
    dateRange,
    setDateRange,
    showDateFilter,
    setShowDateFilter,
    realDataResults,
    setRealDataResults,
    hasRealData
  } = useExploreData();

  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

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
    
    // If we have a query parameter, search for it immediately
    if (q) {
      setSearchQuery(q);
      
      const isComplexQuery = q.length > 50 && 
        /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(q);
      
      setIsNaturalLanguageSearch(isComplexQuery);
      
      if (isComplexQuery) {
        processComplexQuery(q);
      } else {
        // Parse city and state more intelligently
        const { city, state } = parseCityStateFromQuery(q);
        
        setSearchedCity(city || "San Francisco");
        setSearchedState(state || "CA");
        
        fetchRealData(q, city, state);
        
        setMusicEvents(generateMusicEvents(city, state, dateRange));
        setComedyEvents(generateComedyEvents(city, state, dateRange));
        setNightlifeVenues(generateLocalNightlifeVenues(city, state));
      }
      
      setSearchCategory("places");
    } else if (searchedCity) {
      // If no query but we have a detected city (from geolocation), search for it
      const searchText = `${searchedCity}${searchedState ? ', ' + searchedState : ''}`;
      fetchRealData(searchText, searchedCity, searchedState);
      
      setMusicEvents(generateMusicEvents(searchedCity, searchedState, dateRange));
      setComedyEvents(generateComedyEvents(searchedCity, searchedState, dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues(searchedCity, searchedState));
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
  }, [location.search, navigate, dateRange, searchedCity, searchedState]);

  // Update locations when city search or date range changes
  useEffect(() => {
    if (searchedCity) {
      setMusicEvents(generateMusicEvents(searchedCity, searchedState, dateRange));
      setComedyEvents(generateComedyEvents(searchedCity, searchedState, dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues(searchedCity, searchedState));
    } else if (!musicEvents.length || !comedyEvents.length || !nightlifeVenues.length) {
      const defaultCity = "San Francisco";
      const defaultState = "CA";
      setMusicEvents(generateMusicEvents(defaultCity, defaultState, dateRange));
      setComedyEvents(generateComedyEvents(defaultCity, defaultState, dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues(defaultCity, defaultState));
    }
  }, [dateRange, searchedCity, searchedState]);

  const fetchRealData = async (query: string, city: string, state: string) => {
    setIsLoadingResults(true);
    
    try {
      toast({
        title: "Searching for real data",
        description: "Looking for venues in " + (city || query) + "...",
      });
      
      const searchQuery = query || `${city}, ${state}`;
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

  const processComplexQuery = async (queryText: string) => {
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

  const handleSearch = async (query: string, filterType: string, category: string) => {
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
      // Parse city and state using our improved utility
      const locationInfo = parseCityStateFromQuery(query);
      city = locationInfo.city;
      state = locationInfo.state;
      
      setSearchedCity(city);
      setSearchedState(state);
      
      await fetchRealData(query, city, state);
      
      setMusicEvents(generateMusicEvents(city, state, dateRange));
      setComedyEvents(generateComedyEvents(city, state, dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues(city, state));
    } else {
      // Don't clear the city if we're just filtering by vibe
      if (!query) {
        fetchRealData("San Francisco, CA", "San Francisco", "CA");
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
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
    
    if (searchCategory === "places" && searchedCity) {
      if (realDataResults.length > 0) {
        results = [...realDataResults];
        
        if (results.length < 10) {
          const mockCityResults = generateMockLocationsForCity(searchedCity, searchedState);
          results = [...results, ...mockCityResults.filter(mock => 
            !results.some(real => real.name === mock.name))];
        }
      } else {
        results = generateMockLocationsForCity(searchedCity, searchedState);
      }
      
      results.forEach(location => {
        if (!location.vibes) {
          location.vibes = generateRandomVibes();
        }
      });
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

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return {
    handleSearch,
    handleTabChange,
    handleDateRangeChange,
    processComplexQuery,
    fetchRealData
  };
};
