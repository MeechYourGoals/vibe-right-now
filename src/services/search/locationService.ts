import { PlaceService } from '../PlaceService'; // Added import

// Modified to be async and use PlaceService
export async function getCitySpecificLocation(city: string, type: string = "downtown"): Promise<string> {
  try {
    const query = `${type} in ${city}`;
    const results = await PlaceService.searchPlaces(query);
    if (results && results.length > 0 && results[0].name) {
      return results[0].name;
    }
    // Fallback to original logic
    const cityLower = city.toLowerCase();
    if (type === "downtown") {
      if (cityLower.includes("new york") || cityLower === "nyc") return "Union Square";
      if (cityLower.includes("chicago")) return "Millennium Park";
      if (cityLower.includes("los angeles") || cityLower === "la") return "Grand Central Market";
      if (cityLower.includes("san francisco") || cityLower === "sf") return "Ferry Building";
      return `Downtown ${city} Plaza`;
    }
    if (type === "waterfront") {
      if (cityLower.includes("chicago")) return "Navy Pier";
      if (cityLower.includes("san francisco") || cityLower === "sf") return "Fisherman's Wharf";
      if (cityLower.includes("seattle")) return "Pike Place Market";
      if (cityLower.includes("new york") || cityLower === "nyc") return "Battery Park";
      if (cityLower.includes("boston")) return "Boston Harbor";
      if (cityLower.includes("miami")) return "Bayside Marketplace";
      return `${city} Waterfront District`;
    }
    if (type === "gardens") {
      if (cityLower.includes("new york") || cityLower === "nyc") return "New York Botanical Garden";
      if (cityLower.includes("chicago")) return "Chicago Botanic Garden";
      if (cityLower.includes("los angeles") || cityLower === "la") return "Huntington Gardens";
      if (cityLower.includes("san francisco") || cityLower === "sf") return "Golden Gate Park Conservatory of Flowers";
      return `${city} Botanical Gardens`;
    }
    return `Downtown ${city}`;
  } catch (error) {
    console.error(`Error fetching location for ${city} (type: ${type}):`, error);
    // Fallback to original logic in case of error
    const cityLower = city.toLowerCase();
    if (type === "downtown") {
      if (cityLower.includes("new york") || cityLower === "nyc") return "Union Square";
      if (cityLower.includes("chicago")) return "Millennium Park";
      if (cityLower.includes("los angeles") || cityLower === "la") return "Grand Central Market";
      if (cityLower.includes("san francisco") || cityLower === "sf") return "Ferry Building";
      return `Downtown ${city} Plaza`;
    }
    if (type === "waterfront") {
      if (cityLower.includes("chicago")) return "Navy Pier";
      if (cityLower.includes("san francisco") || cityLower === "sf") return "Fisherman's Wharf";
      if (cityLower.includes("seattle")) return "Pike Place Market";
      if (cityLower.includes("new york") || cityLower === "nyc") return "Battery Park";
      if (cityLower.includes("boston")) return "Boston Harbor";
      if (cityLower.includes("miami")) return "Bayside Marketplace";
      return `${city} Waterfront District`;
    }
    if (type === "gardens") {
      if (cityLower.includes("new york") || cityLower === "nyc") return "New York Botanical Garden";
      if (cityLower.includes("chicago")) return "Chicago Botanic Garden";
      if (cityLower.includes("los angeles") || cityLower === "la") return "Huntington Gardens";
      if (cityLower.includes("san francisco") || cityLower === "sf") return "Golden Gate Park Conservatory of Flowers";
      return `${city} Botanical Gardens`;
    }
    return `Downtown ${city}`;
  }
}

// Modified to be async and use PlaceService
export async function getCitySpecificNeighborhood(city: string): Promise<string> {
  try {
    const query = `neighborhood in ${city}`; // Or a more specific query if needed
    const results = await PlaceService.searchPlaces(query);
    if (results && results.length > 0 && results[0].name) {
      return results[0].name;
    }
    return `Old ${city}`; // Fallback
  } catch (error) {
    console.error(`Error fetching neighborhood for ${city}:`, error);
    return `Old ${city}`; // Fallback
  }
}

// Modified to be async and use PlaceService
export async function getCitySpecificWebsite(city: string, type: string = "general"): Promise<string> {
  try {
    // Search for a prominent place in the city to get a potential website
    const results = await PlaceService.searchPlaces(city); 
    if (results && results.length > 0 && results[0].id) {
      const details = await PlaceService.getPlaceDetails(results[0].id);
      if (details && details.website) {
        return details.website;
      }
    }
    // Fallback to original logic
    return `www.${city.toLowerCase().replace(/\s+/g, "")}.${type === "general" ? "com" : "org"}`;
  } catch (error) {
    console.error(`Error fetching website for ${city}:`, error);
    // Fallback to original logic
    return `www.${city.toLowerCase().replace(/\s+/g, "")}.${type === "general" ? "com" : "org"}`;
  }
}

// Modified to be async and use PlaceService
export async function getCitySpecificPark(city: string): Promise<string> {
  try {
    const query = `park in ${city}`;
    const results = await PlaceService.searchPlaces(query);
    if (results && results.length > 0 && results[0].name) {
      return results[0].name;
    }
    return `${city} Central Park`; // Fallback
  } catch (error) {
    console.error(`Error fetching park for ${city}:`, error);
    return `${city} Central Park`; // Fallback
  }
}

// Modified to be async, implementation left as is for now
export async function getCitySpecificWeather(city: string): Promise<string> {
  const cityLower = city.toLowerCase();
  if (cityLower.includes("seattle")) {
    return "Currently experiencing mild temperatures with a chance of rain, typical for the Pacific Northwest.";
  } else if (cityLower.includes("miami")) {
    return "Warm and sunny with occasional afternoon showers, typical for the subtropical climate.";
  } else if (cityLower.includes("chicago")) {
    return "Weather can be variable, with windy conditions common. Check the forecast before heading out.";
  } else if (cityLower.includes("phoenix") || cityLower.includes("las vegas")) {
    return "Hot and dry conditions are common, especially in summer months. Stay hydrated when outdoors.";
  } else if (cityLower.includes("denver")) {
    return "Weather can change quickly due to the elevation. Sunny days are common but prepare for temperature drops.";
  } else {
    return "Check a local weather app for the most up-to-date forecast during your visit.";
  }
}

// Modified to be async, implementation left as is for now
export async function getCitySpecificSeason(city: string): Promise<string> {
  const cityLower = city.toLowerCase();
  if (cityLower.includes("new york") || cityLower.includes("boston") || cityLower.includes("chicago")) {
    return "summer months and during holiday seasons";
  } else if (cityLower.includes("miami") || cityLower.includes("orlando")) {
    return "winter months and spring break";
  } else if (cityLower.includes("san diego") || cityLower.includes("los angeles")) {
    return "summer vacation season";
  } else if (cityLower.includes("new orleans")) {
    return "Mardi Gras and Jazz Fest";
  } else if (cityLower.includes("nashville")) {
    return "CMA Fest and summer months";
  } else {
    return "summer vacation months";
  }
}
