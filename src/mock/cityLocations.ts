
import { Location } from "@/types";
import { generateAllCityLocations } from "@/utils/locations";

// Generate locations for all cities
export const cityLocations: Location[] = generateAllCityLocations();

// Function to get locations for a specific city
export const getLocationsByCity = (cityName: string): Location[] => {
  if (!cityName) return [];
  
  // Case-insensitive search for city name
  return cityLocations.filter(
    location => location.city.toLowerCase() === cityName.toLowerCase()
  );
};

// Function to get trending locations for a city
export const getTrendingLocationsForCity = (cityName: string): Location[] => {
  const cityLocs = getLocationsByCity(cityName);
  if (cityLocs.length === 0) return [];
  
  // Return up to 3 random locations from the city, prioritizing trending ones
  const trendingLocations = cityLocs.filter(loc => loc.trending);
  
  if (trendingLocations.length >= 3) {
    return trendingLocations
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }
  
  // If not enough trending locations, add some regular ones
  return [...trendingLocations, ...cityLocs.filter(loc => !loc.trending)]
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
    if (!location.lat || !location.lng) return false;
    
    const distance = Math.sqrt(
      Math.pow(location.lat - lat, 2) + Math.pow(location.lng - lng, 2)
    ) * 69; // Rough miles conversion
    return distance <= radius;
  }).slice(0, 20); // Limit to 20 locations
};

// Get locations with discounts
export const getDiscountLocations = (cityName?: string): Location[] => {
  let filteredLocations = cityName 
    ? getLocationsByCity(cityName)
    : cityLocations;
    
  // For demo purposes, randomly assign discounts to ~20% of locations
  return filteredLocations
    .filter(() => Math.random() > 0.8)
    .map(location => ({
      ...location,
      discount: {
        id: `discount-${location.id}`,
        title: `${Math.floor(Math.random() * 20) + 10}% Off`,
        description: `Special offer at ${location.name}`,
        amount: `${Math.floor(Math.random() * 20) + 10}%`,
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week from now
      }
    }))
    .slice(0, 5);
};

// Get locations matching specific vibes
export const getLocationsByVibes = (vibes: string[], cityName?: string): Location[] => {
  let filteredLocations = cityName 
    ? getLocationsByCity(cityName)
    : cityLocations;
    
  return filteredLocations.filter(location => {
    if (!location.vibes || location.vibes.length === 0) return false;
    
    // Match if any of the requested vibes match the location's vibes
    return vibes.some(vibe => 
      location.vibes?.some(locationVibe => 
        locationVibe.toLowerCase() === vibe.toLowerCase()
      )
    );
  });
};
