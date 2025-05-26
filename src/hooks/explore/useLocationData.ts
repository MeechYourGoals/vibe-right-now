
import { useState, useEffect } from "react";
import { EventItem, Location } from "@/types";
import { mockLocations } from "@/mock/locations";

export const useLocationData = (
  searchedCity?: string,
  searchedState?: string,
  dateRange?: { from: Date; to?: Date }
) => {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
  const [musicEvents, setMusicEvents] = useState<EventItem[]>([]);
  const [comedyEvents, setComedyEvents] = useState<EventItem[]>([]);
  const [nightlifeVenues, setNightlifeVenues] = useState<Location[]>([]);

  useEffect(() => {
    // Filter locations based on search criteria
    let filtered = mockLocations;
    
    if (searchedCity) {
      filtered = filtered.filter(location => 
        location.city?.toLowerCase().includes(searchedCity.toLowerCase())
      );
    }
    
    if (searchedState) {
      filtered = filtered.filter(location => 
        location.state?.toLowerCase().includes(searchedState.toLowerCase())
      );
    }
    
    setFilteredLocations(filtered);
    
    // Extract unique tags and create a mapping
    const tagsMap: Record<string, string[]> = {};
    filtered.forEach(location => {
      if (location.vibeTags) {
        tagsMap[location.id] = location.vibeTags;
      }
    });
    setLocationTags(tagsMap);
    
    // Load events asynchronously
    loadMusicEvents().then(setMusicEvents);
    loadComedyEvents().then(setComedyEvents);
    loadNightlifeVenues().then(setNightlifeVenues);
  }, [searchedCity, searchedState, dateRange]);

  const loadMusicEvents = async (): Promise<EventItem[]> => {
    // Mock async loading
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Live Music Night',
            address: '123 Music Ave',
            city: searchedCity || 'San Francisco',
            state: searchedState || 'CA',
            type: 'music',
            date: '2025-06-15',
            startTime: '9:00 PM'
          }
        ]);
      }, 500);
    });
  };

  const loadComedyEvents = async (): Promise<EventItem[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: '2',
            name: 'Comedy Show',
            address: '456 Laugh Lane',
            city: searchedCity || 'San Francisco',
            state: searchedState || 'CA',
            type: 'comedy',
            date: '2025-06-20',
            startTime: '8:00 PM'
          }
        ]);
      }, 500);
    });
  };

  const loadNightlifeVenues = async (): Promise<Location[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: '3',
            name: 'Club Night',
            address: '789 Party Blvd',
            city: searchedCity || 'San Francisco',
            state: searchedState || 'CA',
            country: 'US',
            type: 'nightlife',
            lat: 37.7749,
            lng: -122.4194,
            verified: true
          }
        ]);
      }, 500);
    });
  };

  return {
    filteredLocations,
    locationTags,
    musicEvents,
    comedyEvents,
    nightlifeVenues,
    setFilteredLocations,
    setMusicEvents,
    setComedyEvents,
    setNightlifeVenues
  };
};
