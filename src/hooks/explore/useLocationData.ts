
import { useState, useEffect } from "react";
import { Location } from "@/types";
import { mockLocations } from "@/mock/data";
import { EventItem } from "@/components/venue/events/types";
import { generateMusicEvents, generateComedyEvents } from "@/services/search/eventService";
import { generateLocalNightlifeVenues } from "@/utils/explore/locationGenerators";
import { getAdditionalTags } from "@/utils/explore/mockGenerators";

export const useLocationData = (
  searchedCity: string,
  searchedState: string,
  dateRange?: { from: Date; to?: Date }
) => {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(mockLocations);
  const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
  const [musicEvents, setMusicEvents] = useState<EventItem[]>([]);
  const [comedyEvents, setComedyEvents] = useState<EventItem[]>([]);
  const [nightlifeVenues, setNightlifeVenues] = useState<Location[]>([]);
  
  // Initialize location tags
  useEffect(() => {
    const tagsMap: Record<string, string[]> = {};
    mockLocations.forEach(location => {
      tagsMap[location.id] = getAdditionalTags(location);
    });
    setLocationTags(tagsMap);
  }, []);
  
  // Update events when city or date range changes
  useEffect(() => {
    const loadEvents = async () => {
      if (searchedCity) {
        try {
          const musicEventsData = await generateMusicEvents(searchedCity, searchedState);
          const comedyEventsData = await generateComedyEvents(searchedCity, searchedState);
          const nightlifeData = generateLocalNightlifeVenues(searchedCity, searchedState);
          
          setMusicEvents(musicEventsData);
          setComedyEvents(comedyEventsData);
          setNightlifeVenues(nightlifeData);
        } catch (error) {
          console.error('Error loading events:', error);
          // Fallback to empty arrays
          setMusicEvents([]);
          setComedyEvents([]);
          setNightlifeVenues([]);
        }
      } else if (!musicEvents.length || !comedyEvents.length || !nightlifeVenues.length) {
        const defaultCity = "San Francisco";
        const defaultState = "CA";
        try {
          const musicEventsData = await generateMusicEvents(defaultCity, defaultState);
          const comedyEventsData = await generateComedyEvents(defaultCity, defaultState);
          const nightlifeData = generateLocalNightlifeVenues(defaultCity, defaultState);
          
          setMusicEvents(musicEventsData);
          setComedyEvents(comedyEventsData);
          setNightlifeVenues(nightlifeData);
        } catch (error) {
          console.error('Error loading default events:', error);
          setMusicEvents([]);
          setComedyEvents([]);
          setNightlifeVenues([]);
        }
      }
    };
    
    loadEvents();
  }, [dateRange, searchedCity, searchedState]);

  return {
    filteredLocations,
    setFilteredLocations,
    locationTags,
    musicEvents,
    setMusicEvents,
    comedyEvents,
    setComedyEvents,
    nightlifeVenues,
    setNightlifeVenues
  };
};
