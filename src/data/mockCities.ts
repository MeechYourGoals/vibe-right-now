
import { CityData, Location } from '@/types';

import nyc from './mockCities/nyc';
import la from './mockCities/la';
import sanfrancisco from './mockCities/sanfrancisco';
import sydney from './mockCities/sydney';
import barcelona from './mockCities/barcelona';

// Reduced to ~50% of mock cities for better performance
export const mockCities: CityData[] = [
  nyc,
  la,
  sanfrancisco,
  sydney,
  barcelona
];

export const findCityByName = (cityName: string): CityData | undefined => {
  if (!cityName) return undefined;
  
  const normalizedSearch = cityName.toLowerCase().trim();
  
  return mockCities.find(city => {
    const cityMatches = city.name.toLowerCase() === normalizedSearch;
    
    // Also check for partial matches for major cities
    const partialMatches = city.name.toLowerCase().includes(normalizedSearch) ||
                          normalizedSearch.includes(city.name.toLowerCase());
    
    return cityMatches || partialMatches;
  });
};

export const getAllLocations = (): Location[] => {
  return mockCities.reduce((allLocations: Location[], city) => {
    return [...allLocations, ...city.venues];
  }, []);
};

export const getLocationsByType = (type: Location['type']): Location[] => {
  return getAllLocations().filter(location => location.type === type);
};

export const getLocationsByCity = (cityName: string): Location[] => {
  const city = findCityByName(cityName);
  return city ? city.venues : [];
};

export const findLocationById = (id: string): Location | undefined => {
  return getAllLocations().find(location => location.id === id);
};

export const searchLocations = (query: string): Location[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return [];
  
  return getAllLocations().filter(location => {
    const matchesName = location.name.toLowerCase().includes(normalizedQuery);
    const matchesCity = location.city.toLowerCase().includes(normalizedQuery);
    const matchesType = location.type.toLowerCase().includes(normalizedQuery);
    const matchesVibes = location.vibes?.some(vibe => 
      vibe.toLowerCase().includes(normalizedQuery)
    );
    
    return matchesName || matchesCity || matchesType || matchesVibes;
  });
};
