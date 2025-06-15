
import { CityData, Location } from '@/types';

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
import berlin from './mockCities/berlin';
import sydney from './mockCities/sydney';
import amsterdam from './mockCities/amsterdam';
import barcelona from './mockCities/barcelona';
import rome from './mockCities/rome';
import istanbul from './mockCities/istanbul';
import dubai from './mockCities/dubai';
import singapore from './mockCities/singapore';
import mumbai from './mockCities/mumbai';
import bangkok from './mockCities/bangkok';
import seoul from './mockCities/seoul';
import moscow from './mockCities/moscow';
import saopaulo from './mockCities/saopaulo';
import melbourne from './mockCities/melbourne';
import toronto from './mockCities/toronto';
import riodejaneiro from './mockCities/riodejaneiro';

export const mockCitiesData: CityData[] = [
  // North America
  nyc,
  la,
  phoenix,
  chicago,
  miami,
  vegas,
  sanfrancisco,
  toronto,
  
  // Europe
  london,
  paris,
  berlin,
  amsterdam,
  barcelona,
  rome,
  istanbul,
  moscow,
  
  // Asia
  tokyo,
  dubai,
  singapore,
  mumbai,
  bangkok,
  seoul,
  
  // Oceania
  sydney,
  melbourne,
  
  // South America
  saopaulo,
  riodejaneiro,
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
export const searchVenues = (searchTerm: string, cityName?: string): Location[] => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  let citiesToSearch = mockCitiesData;
  if (cityName) {
    const targetCity = findCityByName(cityName);
    if (targetCity) {
      citiesToSearch = [targetCity];
    }
  }
  let results: Location[] = [];
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
