
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { useToast } from "@/components/ui/use-toast";
import { parseCityStateFromQuery } from "@/utils/geocodingService";
import { generateMusicEvents, generateComedyEvents } from "@/services/search/eventService";
import { generateLocalNightlifeVenues } from "@/utils/locations/venueHelpers";
import { processComplexQuery, fetchRealData } from "@/utils/explore/searchUtils";
import { searchTripAdvisor } from "@/services/tripAdvisorService";

export const useExploreInitialization = (
  exploreData: any,
  fetchRealDataFn: any
) => {
  const {
    setSearchQuery,
    setActiveTab,
    searchedCity,
    searchedState,
    setDateRange,
    setShowDateFilter,
    setIsNaturalLanguageSearch,
    setMusicEvents,
    setComedyEvents,
    setNightlifeVenues,
    setVibeFilter,
  } = exploreData;

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
        fetchRealDataFn.processComplexQuery(q);
      } else {
        // Parse city and state more intelligently
        const { city, state } = parseCityStateFromQuery(q);
        
        if (city) {
          exploreData.setSearchedCity(city);
          exploreData.setSearchedState(state);
          
          fetchRealDataFn.fetchRealData(q, city, state);
          
          setMusicEvents(generateMusicEvents(city, state, exploreData.dateRange));
          setComedyEvents(generateComedyEvents(city, state, exploreData.dateRange));
          setNightlifeVenues(generateLocalNightlifeVenues(city, state));
        }
      }
      
      exploreData.setSearchCategory("places");
    } else if (searchedCity) {
      // If no query but we have a detected city (from geolocation), search for it
      const searchText = `${searchedCity}${searchedState ? ', ' + searchedState : ''}`;
      fetchRealDataFn.fetchRealData(searchText, searchedCity, searchedState);
      
      setMusicEvents(generateMusicEvents(searchedCity, searchedState, exploreData.dateRange));
      setComedyEvents(generateComedyEvents(searchedCity, searchedState, exploreData.dateRange));
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
          fetchRealDataFn.processComplexQuery(lastChatQuery);
          sessionStorage.removeItem('isComplexQuery');
        }
        
        const searchParams = new URLSearchParams();
        searchParams.set('q', lastChatQuery);
        navigate(`/explore?${searchParams.toString()}`, { replace: true });
      }
    }
  }, [location.search, navigate, exploreData.dateRange, searchedCity, searchedState]);

  // Update locations when city search or date range changes
  useEffect(() => {
    if (searchedCity) {
      setMusicEvents(generateMusicEvents(searchedCity, searchedState, exploreData.dateRange));
      setComedyEvents(generateComedyEvents(searchedCity, searchedState, exploreData.dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues(searchedCity, searchedState));
    }
  }, [exploreData.dateRange, searchedCity, searchedState]);

  return {
    toast,
    navigate,
  };
};
