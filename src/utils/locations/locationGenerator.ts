
import { Location, BusinessHours } from "@/types";
import { cityCoordinates } from "./cityDatabase";
import { getRandomUserProfile, MockUserProfile } from "./types";

// Generate mock locations for demo/testing
export const generateMockLocations = (count: number = 20): Location[] => {
  const locations: Location[] = [];
  
  // Generate a variety of locations with different types
  const types = ["restaurant", "bar", "sports", "attraction", "event"];
  const cities = Object.keys(cityCoordinates).slice(0, 5); // Limit to first 5 cities
  
  for (let i = 0; i < count; i++) {
    const city = cities[i % cities.length];
    const cityData = cityCoordinates[city];
    
    if (!cityData) continue;
    
    // Create random offset from city center (for visual distribution)
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;
    
    const location: Location = {
      id: `${i + 1}`,
      name: generateName(i, types[i % types.length]),
      address: `${100 + i} Main St`,
      city: cityData.name,
      state: cityData.state || '',
      country: cityData.country,
      lat: cityData.lat + latOffset,
      lng: cityData.lng + lngOffset,
      type: types[i % types.length],
      hours: generateHours(types[i % types.length]) as BusinessHours,
      rating: 3 + Math.random() * 2,
      verified: i % 3 === 0, // Every third location is verified
      vibes: generateVibes(types[i % types.length]),
      distance: Math.random() * 5 + 0.5,
    };
    
    locations.push(location);
  }
  
  return locations;
};

// Generate mock locations for a specific city
export const generateCityLocations = (cityName: string, count: number = 5): Location[] => {
  const cityKey = Object.keys(cityCoordinates).find(key => 
    cityCoordinates[key].name.toLowerCase() === cityName.toLowerCase()
  );
  
  if (!cityKey) return [];
  
  const cityData = cityCoordinates[cityKey];
  const locations: Location[] = [];
  const types = ["restaurant", "bar", "sports", "attraction", "event"];
  
  for (let i = 0; i < count; i++) {
    // Create random offset from city center
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;
    
    const location: Location = {
      id: `${cityName.toLowerCase().replace(/\s+/g, '')}-${i + 1}`,
      name: generateName(i, types[i % types.length]),
      address: `${100 + i} ${cityName} Ave`,
      city: cityData.name,
      state: cityData.state || '',
      country: cityData.country,
      lat: cityData.lat + latOffset,
      lng: cityData.lng + lngOffset,
      type: types[i % types.length],
      hours: generateHours(types[i % types.length]) as BusinessHours,
      rating: 3 + Math.random() * 2,
      verified: i % 3 === 0,
      vibes: generateVibes(types[i % types.length]),
    };
    
    locations.push(location);
  }
  
  return locations;
};

// Generate locations for all cities in the database
export const generateAllCityLocations = (locationsPerCity: number = 3): Location[] => {
  const allLocations: Location[] = [];
  
  for (const cityKey of Object.keys(cityCoordinates)) {
    const cityLocations = generateCityLocations(cityCoordinates[cityKey].name, locationsPerCity);
    allLocations.push(...cityLocations);
  }
  
  return allLocations;
};

// Helper function to generate venue name based on type
const generateName = (index: number, type: string): string => {
  const prefixes = {
    restaurant: ["Tasty", "Gourmet", "Spice", "Fresh", "Urban"],
    bar: ["Sunset", "Corner", "Crafty", "Downtown", "Night"],
    sports: ["Victory", "Champion", "Elite", "Stadium", "Arena"],
    attraction: ["Wonder", "Amazing", "Historic", "Grand", "Scenic"],
    event: ["Annual", "Festival", "Celebration", "Showcase", "Expo"]
  };
  
  const suffixes = {
    restaurant: ["Bistro", "Kitchen", "Grill", "Diner", "Cafe"],
    bar: ["Lounge", "Tavern", "Pub", "Bar & Grill", "Brewery"],
    sports: ["Field", "Stadium", "Center", "Arena", "Park"],
    attraction: ["Museum", "Gallery", "Garden", "Tower", "Park"],
    event: ["Festival", "Fair", "Convention", "Show", "Concert"]
  };
  
  const prefix = prefixes[type as keyof typeof prefixes][index % 5];
  const suffix = suffixes[type as keyof typeof suffixes][index % 5];
  
  return `${prefix} ${suffix}`;
};

// Helper function to generate business hours
const generateHours = (type: string): Record<string, string> => {
  if (type === "restaurant") {
    return {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "11:00 AM - 11:00 PM",
      sunday: "12:00 PM - 9:00 PM"
    };
  } else if (type === "bar") {
    return {
      monday: "4:00 PM - 12:00 AM",
      tuesday: "4:00 PM - 12:00 AM",
      wednesday: "4:00 PM - 12:00 AM",
      thursday: "4:00 PM - 1:00 AM",
      friday: "4:00 PM - 2:00 AM",
      saturday: "4:00 PM - 2:00 AM",
      sunday: "4:00 PM - 12:00 AM"
    };
  } else if (type === "attraction") {
    return {
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 6:00 PM",
      wednesday: "10:00 AM - 6:00 PM", 
      thursday: "10:00 AM - 6:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 9:00 PM", 
      sunday: "9:00 AM - 6:00 PM"
    };
  } else if (type === "sports" || type === "event") {
    return {
      monday: "Event times vary",
      tuesday: "Event times vary",
      wednesday: "Event times vary",
      thursday: "Event times vary", 
      friday: "Event times vary",
      saturday: "Event times vary",
      sunday: "Event times vary"
    };
  }
  
  // Default hours
  return {
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM",
    wednesday: "9:00 AM - 5:00 PM", 
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 3:00 PM",
    sunday: "Closed"
  };
};

// Generate vibes based on venue type
const generateVibes = (type: string): string[] => {
  const vibesByType = {
    restaurant: ["Cozy", "Upscale", "Family-friendly", "Romantic", "Trendy"],
    bar: ["Lively", "Chill", "Upbeat", "Sophisticated", "Energetic"],
    sports: ["Exciting", "Competitive", "Team spirit", "High-energy", "Fan-friendly"],
    attraction: ["Cultural", "Educational", "Inspiring", "Scenic", "Historic"],
    event: ["Festive", "Entertaining", "Social", "Creative", "Memorable"]
  };
  
  const allVibes = ["Busy", "Popular", "Local favorite", "Hidden gem"];
  const typeVibes = vibesByType[type as keyof typeof vibesByType] || [];
  
  // Select 2-3 vibes
  const numberOfVibes = Math.floor(Math.random() * 2) + 2;
  const combinedVibes = [...typeVibes, ...allVibes];
  const selectedVibes: string[] = [];
  
  for (let i = 0; i < numberOfVibes; i++) {
    const randomIndex = Math.floor(Math.random() * combinedVibes.length);
    const vibe = combinedVibes[randomIndex];
    
    if (!selectedVibes.includes(vibe)) {
      selectedVibes.push(vibe);
    }
    
    // Remove selected vibe to avoid duplicates
    combinedVibes.splice(randomIndex, 1);
    
    if (combinedVibes.length === 0) break;
  }
  
  return selectedVibes;
};

// Format location hours for display
export const formatLocationHours = (hours: BusinessHours | undefined): string => {
  if (!hours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  return hours[today as keyof BusinessHours] as string || "Hours not available";
};

// Get location open/closed status
export const getLocationStatus = (location: Location): "open" | "closed" | "unknown" => {
  if (!location.hours) return "unknown";
  
  const now = new Date();
  const today = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const hours = location.hours[today as keyof typeof location.hours];
  
  if (!hours || hours === "Closed") return "closed";
  if (hours === "Open 24 hours") return "open";
  
  // Parse hours like "9:00 AM - 5:00 PM"
  const hoursMatch = hours.match(/(\d+):(\d+)\s+(AM|PM)\s+-\s+(\d+):(\d+)\s+(AM|PM)/);
  if (!hoursMatch) return "unknown";
  
  const [_, openHour, openMinute, openPeriod, closeHour, closeMinute, closePeriod] = hoursMatch;
  
  const openTime = getTimeInMinutes(parseInt(openHour), parseInt(openMinute), openPeriod);
  const closeTime = getTimeInMinutes(parseInt(closeHour), parseInt(closeMinute), closePeriod);
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  return (currentTime >= openTime && currentTime <= closeTime) ? "open" : "closed";
};

// Helper function to convert time to minutes since midnight
const getTimeInMinutes = (hour: number, minute: number, period: string): number => {
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  
  return hour * 60 + minute;
};

// Get today's hours string
export const getTodaysHours = (location: Location): string => {
  if (!location.hours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const hours = location.hours as BusinessHours;
  
  return hours[today as keyof BusinessHours] as string || "Hours not available";
};
