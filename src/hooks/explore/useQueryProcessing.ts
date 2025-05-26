
import { useState } from "react";
import { EventItem, Location } from "@/types";

export const useQueryProcessing = (
  setSearchedCity: (city: string) => void,
  setSearchedState: (state: string) => void,
  setFilteredLocations: (locations: Location[]) => void,
  setComedyEvents: (events: EventItem[]) => void,
  setActiveTab: (tab: string) => void,
  setNightlifeVenues: (venues: Location[]) => void,
  setVibeFilter: (filter: string) => void,
  setIsNaturalLanguageSearch: (isNatural: boolean) => void
) => {
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  const processComplexQuery = async (query: string) => {
    setIsLoadingResults(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock natural language processing
      const lowerQuery = query.toLowerCase();
      
      if (lowerQuery.includes('comedy') || lowerQuery.includes('funny')) {
        setActiveTab('comedy');
        const comedyEvents = await generateComedyEvents();
        setComedyEvents(comedyEvents);
      } else if (lowerQuery.includes('music') || lowerQuery.includes('concert')) {
        setActiveTab('music');
      } else if (lowerQuery.includes('nightlife') || lowerQuery.includes('bar') || lowerQuery.includes('club')) {
        setActiveTab('nightlife');
        const nightlifeVenues = await generateNightlifeVenues();
        setNightlifeVenues(nightlifeVenues);
      }
      
      // Extract location if mentioned
      const cityMatch = lowerQuery.match(/in ([a-z\s]+)/);
      if (cityMatch) {
        setSearchedCity(cityMatch[1].trim());
      }
      
      setIsNaturalLanguageSearch(true);
    } finally {
      setIsLoadingResults(false);
    }
  };

  const generateComedyEvents = async (): Promise<EventItem[]> => {
    // Mock comedy events generation
    return [
      {
        id: '1',
        name: 'Comedy Night',
        address: '123 Comedy Club St',
        city: 'San Francisco',
        state: 'CA',
        type: 'comedy',
        date: '2025-06-01',
        startTime: '8:00 PM',
        performers: ['John Comedian']
      }
    ];
  };

  const generateNightlifeVenues = async (): Promise<Location[]> => {
    // Mock nightlife venues generation
    return [
      {
        id: '1',
        name: 'Night Club',
        address: '456 Party St',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
        type: 'nightlife',
        lat: 37.7749,
        lng: -122.4194,
        verified: true
      }
    ];
  };

  return {
    isLoadingResults,
    processComplexQuery
  };
};
