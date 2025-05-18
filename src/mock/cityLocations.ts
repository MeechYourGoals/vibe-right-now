
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

// Get nearby locations based on coordinates with improved distance calculation
export const getNearbyLocations = (lat: number, lng: number, radius: number = 10): Location[] => {
  // More accurate distance calculation using the Haversine formula
  const getDistanceInMiles = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 3958.8; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };
  
  // Filter locations within the specified radius
  const nearbyLocations = cityLocations.filter(location => {
    const distance = getDistanceInMiles(location.lat, location.lng, lat, lng);
    return distance <= radius;
  });
  
  // Sort by distance and limit to reasonable number
  const sortedLocations = nearbyLocations
    .sort((a, b) => {
      const distanceA = getDistanceInMiles(a.lat, a.lng, lat, lng);
      const distanceB = getDistanceInMiles(b.lat, b.lng, lat, lng);
      return distanceA - distanceB;
    })
    .slice(0, 20); // Limit to 20 locations
  
  return sortedLocations;
};
