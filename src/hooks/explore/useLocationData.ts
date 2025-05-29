
import { useState, useEffect } from "react";
import { Location } from "@/types";
import { mockLocations } from "@/mock/data";
import { EventItem } from "@/components/venue/events/types";
import { generateMusicEvents, generateComedyEvents, getComedyEventsForCity } from "@/services/search/eventService";
import { generateMockLocationsForCity, generateLocalNightlifeVenues } from "@/utils/explore/locationGenerators";
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
