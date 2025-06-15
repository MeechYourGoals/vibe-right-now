
import { CityData } from '@/types/location';

import nyc from './mockCities/nyc';
import la from './mockCities/la';
import phoenix from './mockCities/phoenix';
import london from './mockCities/london';
import chicago from './mockCities/chicago';
import miami from './mockCities/miami';
import vegas from './mockCities/vegas';
import sanfrancisco from './mockCities/sanfrancisco';
import paris from './mockCities/paris';
import tokyo from './mockCities/tokyo';

export const mockCitiesData: CityData[] = [
  nyc,
  la,
  phoenix,
  london,
  chicago,
  miami,
  vegas,
  sanfrancisco,
  paris,
  tokyo,
];

// Export utility/type helpers as before

// Define VenueType strictly for code completion elsewhere
export type VenueType = "restaurant" | "bar" | "event" | "attraction" | "sports" | "other" | "nightclub" | "mall" | "cafe";

// Utility/Type helpers
export function asVenueType(type: string): VenueType {
  const allowed: VenueType[] = [
    "restaurant", "bar", "event", "attraction", "sports", "other", "nightclub", "mall", "cafe"
  ];
  if (allowed.includes(type as VenueType)) return type as VenueType;
  return "other";
}

// Find city by name
export const findCityByName = (searchTerm: string): CityData | null => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  return mockCitiesData.find(city => {
    const cityName = city.name.toLowerCase();
    const fullName = `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`.toLowerCase();
    return cityName.includes(normalizedSearch) || 
      fullName.includes(normalizedSearch) ||
      normalizedSearch.includes(cityName);
  }) || null;
};

// Search venues in all cities
export const searchVenues = (searchTerm: string, cityName?: string) => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  let citiesToSearch = mockCitiesData;
  if (cityName) {
    const targetCity = findCityByName(cityName);
    if (targetCity) {
      citiesToSearch = [targetCity];
    }
  }
  let results: any[] = [];
  citiesToSearch.forEach(city => {
    city.venues.forEach(venue => {
      const venueName = venue.name.toLowerCase();
      const venueType = (venue.type as string).toLowerCase();
      const venueVibes = (venue.vibes?.join(' ') || '').toLowerCase();
      if (
        venueName.includes(normalizedSearch) ||
        venueType.includes(normalizedSearch) ||
        venueVibes.includes(normalizedSearch)
      ) {
        results.push(venue);
      }
    });
  });
  return results.slice(0, 10);
};
