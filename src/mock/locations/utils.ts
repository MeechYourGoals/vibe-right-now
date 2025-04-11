
import { Location } from "@/types";
import { mockLocations } from "./index";

/**
 * Filter locations by type
 * @param type Location type to filter by
 * @returns Filtered array of locations
 */
export const getLocationsByType = (type: string): Location[] => {
  return mockLocations.filter(location => location.type === type);
};

/**
 * Filter locations by city name
 * @param city City name to filter by
 * @returns Filtered array of locations
 */
export const getLocationsByCity = (city: string): Location[] => {
  return mockLocations.filter(
    location => location.city.toLowerCase() === city.toLowerCase()
  );
};

/**
 * Get locations within a radius of coordinates
 * @param lat Latitude
 * @param lng Longitude
 * @param radiusMiles Radius in miles
 * @returns Array of locations within the radius
 */
export const getLocationsNearby = (lat: number, lng: number, radiusMiles: number = 10): Location[] => {
  return mockLocations.filter(location => {
    // Simple distance calculation (not accurate for large distances but fine for prototype)
    const distance = Math.sqrt(
      Math.pow(location.lat - lat, 2) + Math.pow(location.lng - lng, 2)
    ) * 69; // Rough miles conversion
    return distance <= radiusMiles;
  });
};

/**
 * Find a location by ID
 * @param id Location ID
 * @returns Location or undefined if not found
 */
export const getLocationById = (id: string): Location | undefined => {
  return mockLocations.find(location => location.id === id);
};

/**
 * Search locations by name or city
 * @param query Search query
 * @returns Array of matching locations
 */
export const searchLocations = (query: string): Location[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return mockLocations.filter(
    location => 
      location.name.toLowerCase().includes(lowerQuery) || 
      location.city.toLowerCase().includes(lowerQuery) ||
      (location.state && location.state.toLowerCase().includes(lowerQuery))
  );
};
