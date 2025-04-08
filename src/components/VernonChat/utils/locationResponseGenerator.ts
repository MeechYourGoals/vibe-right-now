
import { cityCoordinates } from '@/utils/locations';

/**
 * Generate a natural language response about locations in a city
 */
export const generateLocationResponse = (cityName: string, locations: any[]): string => {
  if (locations.length === 0) return "";
  
  const sportVenues = locations.filter(loc => loc.type === "sports");
  const bars = locations.filter(loc => loc.type === "bar");
  const restaurants = locations.filter(loc => loc.type === "restaurant");
  const events = locations.filter(loc => loc.type === "event");
  const attractions = locations.filter(loc => loc.type === "attraction");
  const others = locations.filter(loc => loc.type === "other");
  
  let response = `Here are some places with great vibes in ${cityName} right now:\n\n`;
  
  if (sportVenues.length > 0) {
    response += `🏟️ **Sports:** ${sportVenues.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`).join(", ")}.\n\n`;
  }
  
  if (bars.length > 0) {
    response += `🍸 **Nightlife:** ${bars.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`).join(", ")}.\n\n`;
  }
  
  if (restaurants.length > 0) {
    response += `🍽️ **Dining:** ${restaurants.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`).join(", ")}.\n\n`;
  }
  
  if (events.length > 0) {
    response += `🎭 **Events:** ${events.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`).join(", ")}.\n\n`;
  }
  
  if (attractions.length > 0) {
    response += `🏛️ **Attractions:** ${attractions.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`).join(", ")}.\n\n`;
  }
  
  if (others.length > 0) {
    response += `🏋️ **Other Activities:** ${others.map(v => `[${v.name}](/explore?q=${encodeURIComponent(v.name)})`).join(", ")}.\n\n`;
  }
  
  response += "Each place has recent vibes posted by users who are there right now. Click on any venue to see what it's really like tonight!";
  
  return response;
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
    "bars", "clubs", "attractions", "activities"
  ];
  
  const inputLower = inputValue.toLowerCase();
  return locationEventKeywords.some(keyword => inputLower.includes(keyword));
};
