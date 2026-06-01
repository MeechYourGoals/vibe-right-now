
import { useState, useEffect } from "react";
import { Location } from "@/types";
import { EventItem } from "@/components/venue/events/types";
import { generateMusicEvents, generateComedyEvents, getComedyEventsForCity } from "@/services/search/eventService";
import { generateMockLocationsForCity, generateLocalNightlifeVenues } from "@/utils/explore/locationGenerators";
import { getAdditionalTags } from "@/utils/explore/mockGenerators";
import { locationsRepo } from "@/services/data";

export const useLocationData = (
  searchedCity: string,
  searchedState: string,
  dateRange?: { from: Date; to?: Date }
) => {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
  const [musicEvents, setMusicEvents] = useState<EventItem[]>([]);
  const [comedyEvents, setComedyEvents] = useState<EventItem[]>([]);
  const [nightlifeVenues, setNightlifeVenues] = useState<Location[]>([]);

  // Load the venue list from the data layer (Supabase with mock fallback). A searched
  // city uses byCity, otherwise we surface a default nearby set so the list is populated.
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const results = searchedCity && searchedCity.trim()
          ? await locationsRepo.byCity(searchedCity.trim())
          : await locationsRepo.nearby(0, 0, 50);

        if (cancelled) return;
        setFilteredLocations(results);

        // Build the per-location tag map from the loaded set.
        const tagsMap: Record<string, string[]> = {};
        results.forEach((location) => {
          tagsMap[location.id] = getAdditionalTags(location);
        });
        setLocationTags(tagsMap);
      } catch (err) {
        console.error("Error loading explore locations:", err);
        if (!cancelled) setFilteredLocations([]);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [searchedCity]);

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
