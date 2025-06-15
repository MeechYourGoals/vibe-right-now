import { CityData, Location } from '@/types/location';

// Gather all cities from their individual files
import nyc from "./mockCities/nyc";
import la from "./mockCities/la";
import london from "./mockCities/london";
// IMPORT NEW CITIES HERE as you add them...

export const mockCitiesData: CityData[] = [
  nyc,
  la,
  london,
  // ADD NEW CITIES HERE as you add them...
];

// Utility/type helpers and search logic remain
// Define VenueType strictly according to the Location interface
type VenueType = "restaurant" | "bar" | "event" | "attraction" | "sports" | "other" | "nightclub" | "mall" | "cafe";

// Helper function to ensure only valid VenueType values are allowed
function asVenueType(type: string): VenueType {
  const allowed: VenueType[] = [
    "restaurant", "bar", "event", "attraction", "sports", "other", "nightclub", "mall", "cafe"
  ];
  if (allowed.includes(type as VenueType)) return type as VenueType;
  return "other";
}

// Function to find city by name with fuzzy matching
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

// Function to search venues across all cities
export const searchVenues = (searchTerm: string, cityName?: string): Location[] => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  let citiesToSearch = mockCitiesData;
  
  if (cityName) {
    const targetCity = findCityByName(cityName);
    if (targetCity) {
      citiesToSearch = [targetCity];
    }
  }
  
  const results: Location[] = [];
  
  citiesToSearch.forEach(city => {
    city.venues.forEach(venue => {
      const venueName = venue.name.toLowerCase();
      const venueType = venue.type.toLowerCase();
      const venueVibes = venue.vibes?.join(' ').toLowerCase() || '';
      
      if (venueName.includes(normalizedSearch) ||
          venueType.includes(normalizedSearch) ||
          venueVibes.includes(normalizedSearch)) {
        results.push(venue);
      }
    });
  });
  
  return results.slice(0, 10); // Limit results
};
