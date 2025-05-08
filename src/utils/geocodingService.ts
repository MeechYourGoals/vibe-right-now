
// Utility for parsing city and state from search queries
export const parseCityStateFromQuery = (query: string): { city: string, state: string } => {
  if (!query) return { city: "", state: "" };

  // Common city-state formats: "City, State", "City State", "City in State"
  const cityStateRegex = /^(.*?)[,\s]+([A-Za-z]{2})$/;
  const cityStateMatch = query.match(cityStateRegex);
  
  if (cityStateMatch) {
    const city = cityStateMatch[1].trim();
    const state = cityStateMatch[2].trim().toUpperCase();
    return { city, state };
  }
  
  // Check for known cities without state
  const knownCities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
    "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
    "Austin", "Jacksonville", "San Francisco", "Seattle", "Denver",
    "Boston", "Las Vegas", "Portland", "Miami", "Atlanta"
  ];
  
  for (const city of knownCities) {
    if (query.toLowerCase().includes(city.toLowerCase())) {
      return { city, state: "" };
    }
  }
  
  // If no match, assume the whole query is a city
  return { city: query.trim(), state: "" };
};

export default {
  parseCityStateFromQuery
};
