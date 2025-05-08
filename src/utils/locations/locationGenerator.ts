
import { Location } from "@/types";
import { cityCoordinates } from "./cityDatabase";
import { generateRandomVenues } from "./mockVenueGenerators";

// Generate mock locations for testing
export const generateMockLocations = (count: number): Location[] => {
  const mockLocations: Location[] = [];
  
  for (let i = 0; i < count; i++) {
    mockLocations.push({
      id: `location-${i}`,
      name: `Location ${i}`,
      address: `${100 + i} Main St`,
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zip: "94105",
      lat: 37.7749 + (Math.random() * 0.05),
      lng: -122.4194 + (Math.random() * 0.05),
      type: ["restaurant", "bar", "attraction", "event", "sports"][i % 5] as any,
      verified: Math.random() > 0.3,
    });
  }
  
  return mockLocations;
};

// Generate mock locations for a specific city
export const generateCityLocations = (city: string, state: string, count: number = 10): Location[] => {
  const cityCoord = cityCoordinates[city.toLowerCase()];
  if (!cityCoord) {
    return generateMockLocations(count);
  }
  
  const mockLocations: Location[] = [];
  
  for (let i = 0; i < count; i++) {
    mockLocations.push({
      id: `${city.toLowerCase()}-location-${i}`,
      name: `${city} ${["Bistro", "Lounge", "Café", "Museum", "Stadium"][i % 5]} ${i}`,
      address: `${100 + i} ${["Main", "Park", "Market", "Broadway", "1st"][i % 5]} St`,
      city: city,
      state: state || "CA",
      country: "USA",
      zip: `${Math.floor(Math.random() * 90000) + 10000}`,
      lat: cityCoord.lat + (Math.random() * 0.05 - 0.025),
      lng: cityCoord.lng + (Math.random() * 0.05 - 0.025),
      type: ["restaurant", "bar", "attraction", "event", "sports"][i % 5] as any,
      verified: Math.random() > 0.3,
    });
  }
  
  return mockLocations;
};

// Format location hours for display
export const formatLocationHours = (hours: any) => {
  if (!hours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todayHours = hours[today];
  
  if (!todayHours) return "Closed today";
  if (todayHours === true) return "Open 24 hours";
  if (todayHours === false) return "Closed today";
  
  return `Today: ${todayHours.open ? `${todayHours.openTime} - ${todayHours.closeTime}` : "Closed"}`;
};

// Get current status of a location (open/closed)
export const getLocationStatus = (hours: any) => {
  if (!hours) return { isOpen: false, status: "Unknown hours" };
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todayHours = hours[today];
  
  if (!todayHours) return { isOpen: false, status: "Closed today" };
  if (todayHours === true) return { isOpen: true, status: "Open 24 hours" };
  if (todayHours === false) return { isOpen: false, status: "Closed today" };
  
  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();
  
  const openTime = parseInt(todayHours.openTime.replace(':', ''));
  const closeTime = parseInt(todayHours.closeTime.replace(':', ''));
  
  const isOpen = currentTime >= openTime && currentTime <= closeTime;
  
  return {
    isOpen,
    status: isOpen ? "Open now" : "Closed now",
  };
};

// Get today's hours for display
export const getTodaysHours = (hours: any) => {
  if (!hours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todayHours = hours[today];
  
  if (!todayHours) return "Closed today";
  if (todayHours === true) return "Open 24 hours";
  if (todayHours === false) return "Closed today";
  
  return `${todayHours.openTime} - ${todayHours.closeTime}`;
};
