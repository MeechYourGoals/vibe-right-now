
import { useState } from "react";
import { toast } from "sonner";
import { Location } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { generateMockLocationsForCity, generateLocalNightlifeVenues } from "@/utils/explore/locationGenerators";
import { getComedyEventsForCity } from "@/services/search/eventService";

export const useQueryProcessing = (
  setSearchedCity: (city: string) => void,
  setSearchedState: (state: string) => void,
  setFilteredLocations: (locations: Location[]) => void,
  setComedyEvents: (events: any[]) => void,
  setActiveTab: (tab: string) => void,
  setNightlifeVenues: (venues: Location[]) => void,
  setVibeFilter: (vibe: string) => void,
  setIsNaturalLanguageSearch: (isNL: boolean) => void
) => {
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  
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
  
  return {
    isLoadingResults,
    processComplexQuery
  };
};
