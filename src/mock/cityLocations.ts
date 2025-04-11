
import { CityCoordinates } from "@/utils/locations/types";
import { generateRandomLocations } from "@/utils/locations/locationGenerator";
import { Location } from "@/types";

export const cityLocations: CityCoordinates[] = [
  { 
    city: "San Francisco", 
    state: "CA", 
    lat: 37.7749, 
    lng: -122.4194 
  },
  { 
    city: "New York", 
    state: "NY", 
    lat: 40.7128, 
    lng: -74.0060 
  },
  { 
    city: "Los Angeles", 
    state: "CA", 
    lat: 34.0522, 
    lng: -118.2437 
  },
  { 
    city: "Chicago", 
    state: "IL", 
    lat: 41.8781, 
    lng: -87.6298 
  },
  { 
    city: "Miami", 
    state: "FL", 
    lat: 25.7617, 
    lng: -80.1918 
  }
];

// Get locations for a specific city
export const getLocationsByCity = (cityName: string, count: number = 10): Location[] => {
  const city = cityLocations.find(c => c.city.toLowerCase() === cityName.toLowerCase());
  
  if (city) {
    return generateRandomLocations(count, city.lat, city.lng);
  }
  
  // Default to Los Angeles if city not found
  return generateRandomLocations(count, 34.0522, -118.2437);
};

// Get trending locations for a specific city
export const getTrendingLocationsForCity = (cityName: string, count: number = 3): Location[] => {
  const locations = getLocationsByCity(cityName, count * 3);
  
  // Sort by rating and return the top 'count'
  return locations
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, count);
};

// Get nearby locations based on coordinates
export const getNearbyLocations = (lat: number, lng: number, count: number = 8): Location[] => {
  return generateRandomLocations(count, lat, lng);
};
