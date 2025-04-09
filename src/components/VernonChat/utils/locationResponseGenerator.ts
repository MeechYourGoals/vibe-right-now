
import { cityCoordinates } from '@/utils/locations';
import { Location } from '@/types';

/**
 * Generate a natural language response about locations in a city with multiple options per category
 */
export const generateLocationResponse = (cityName: string, locations: Location[]): string => {
  if (locations.length === 0) return "";
  
  // Group locations by type
  const sportVenues = locations.filter(loc => loc.type === "sports");
  const bars = locations.filter(loc => loc.type === "bar");
  const restaurants = locations.filter(loc => loc.type === "restaurant");
  const events = locations.filter(loc => loc.type === "event");
  // Handle concerts by filtering events that have music in their name or description
  const concerts = locations.filter(loc => 
    loc.name.toLowerCase().includes("concert") || 
    loc.name.toLowerCase().includes("music") ||
    (loc.type === "event" && loc.name.toLowerCase().includes("festival"))
  );
  const attractions = locations.filter(loc => loc.type === "attraction");
  const others = locations.filter(loc => !["sports", "bar", "restaurant", "event", "attraction"].includes(loc.type));
  
  // Create category results object with properly formatted links
  const categoryResults: Record<string, string[]> = {};
  
  if (sportVenues.length > 0) {
    categoryResults.sports = sportVenues.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`);
  }
  
  if (bars.length > 0) {
    categoryResults.nightlife = bars.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`);
  }
  
  if (restaurants.length > 0) {
    categoryResults.dining = restaurants.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`);
  }
  
  if (concerts.length > 0) {
    categoryResults.concerts = concerts.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`);
  }
  
  if (events.length > 0) {
    // Filter out any events already listed in concerts
    const nonConcertEvents = events.filter(e => !concerts.some(c => c.id === e.id));
    if (nonConcertEvents.length > 0) {
      categoryResults.events = nonConcertEvents.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`);
    }
  }
  
  if (attractions.length > 0) {
    categoryResults.attractions = attractions.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`);
  }
  
  if (others.length > 0) {
    categoryResults.other = others.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`);
  }
  
  // Use the new formatter function to create the response
  const { formatLocationResponse } = require('./responseFormatter');
  return formatLocationResponse(cityName, categoryResults);
};

/**
 * Helper function to detect city in user query
 */
export const detectCityInQuery = (inputValue: string): string => {
  // Common patterns for city detection in user queries
  const cityPatterns = [
    /(?:in|at|near|around|for)\s+([a-zA-Z\s]+)(?:\?|$|\.)/i,
    /what's\s+(?:happening|going on)\s+in\s+([a-zA-Z\s]+)(?:\?|$|\.)/i,
    /places\s+(?:in|at|near)\s+([a-zA-Z\s]+)(?:\?|$|\.)/i,
    /events\s+(?:in|at|near)\s+([a-zA-Z\s]+)(?:\?|$|\.)/i,
    /([a-zA-Z\s]+)\s+(?:nightlife|restaurants|bars|clubs)(?:\?|$|\.)/i,
    /([a-zA-Z\s]+)\s+(?:things to do|activities|attractions)(?:\?|$|\.)/i
  ];
  
  // Try to detect a city in the query
  for (const pattern of cityPatterns) {
    const match = inputValue.match(pattern);
    if (match && match[1]) {
      const potentialCity = match[1].trim().toLowerCase();
      // Check if it matches any of our city keys
      if (Object.keys(cityCoordinates).includes(potentialCity)) {
        return potentialCity;
      }
    }
  }
  
  return "";
};

/**
 * Helper function to check if the query is about locations or events
 */
export const isLocationOrEventQuery = (inputValue: string): boolean => {
  const locationEventKeywords = [
    "going on", "events", "places", "happening", 
    "visit", "things to do", "nightlife", "restaurants",
    "bars", "clubs", "attractions", "activities",
    "concerts", "shows", "performances", "sports",
    "games", "dining", "eat", "drink"
  ];
  
  const inputLower = inputValue.toLowerCase();
  return locationEventKeywords.some(keyword => inputLower.includes(keyword));
};

/**
 * Helper function to detect specific category request in query
 */
export const detectCategoryInQuery = (inputValue: string): string => {
  const inputLower = inputValue.toLowerCase();
  
  // Check for category-specific queries
  if (inputLower.includes("concert") || inputLower.includes("music") || inputLower.includes("show")) {
    return "concerts";
  } else if (inputLower.includes("sport") || inputLower.includes("game") || inputLower.includes("match")) {
    return "sports";
  } else if (inputLower.includes("restaurant") || inputLower.includes("dining") || inputLower.includes("eat")) {
    return "dining";
  } else if (inputLower.includes("bar") || inputLower.includes("club") || inputLower.includes("drink") || inputLower.includes("nightlife")) {
    return "nightlife";
  } else if (inputLower.includes("attraction") || inputLower.includes("sight") || inputLower.includes("landmark")) {
    return "attractions";
  } else if (inputLower.includes("event") || inputLower.includes("happening")) {
    return "events";
  }
  
  // No specific category detected
  return "";
}
