
import { Location } from "@/types";
import { generateAllCityLocations } from "@/utils/locations";

// Generate locations for all cities
export const cityLocations: Location[] = generateAllCityLocations();

// Function to get locations for a specific city
export const getLocationsByCity = (cityName: string): Location[] => {
  if (!cityName) return [];
  return cityLocations.filter(
    location => location.city.toLowerCase() === cityName.toLowerCase()
  );
};

// Function to get trending locations for a city
export const getTrendingLocationsForCity = (cityName: string): Location[] => {
  const cityLocs = getLocationsByCity(cityName);
  if (cityLocs.length === 0) return [];
  
  // Return 3 random locations from the city
  return cityLocs
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
};

// Function to get recommended locations based on user preferences or history
export const getRecommendedLocations = (): Location[] => {
  // In a real app, this would be based on user preferences, history, etc.
  // For the prototype, just return some random locations from different cities
  return cityLocations
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
};

// Get nearby locations based on coordinates
export const getNearbyLocations = (lat: number, lng: number, radius: number = 10): Location[] => {
  // Simple distance calculation (not accurate for large distances but fine for prototype)
  return cityLocations.filter(location => {
    const distance = Math.sqrt(
      Math.pow(location.lat - lat, 2) + Math.pow(location.lng - lng, 2)
    ) * 69; // Rough miles conversion
    return distance <= radius;
  }).slice(0, 20); // Limit to 20 locations
};
