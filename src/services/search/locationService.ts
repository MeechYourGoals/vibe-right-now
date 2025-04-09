
export function getCitySpecificLocation(city: string, type: string = "downtown"): string {
  const cityLower = city.toLowerCase();
  
  if (type === "downtown") {
    if (cityLower.includes("new york") || cityLower === "nyc") {
      return "Union Square";
    } else if (cityLower.includes("chicago")) {
      return "Millennium Park";
    } else if (cityLower.includes("los angeles") || cityLower === "la") {
      return "Grand Central Market";
    } else if (cityLower.includes("san francisco") || cityLower === "sf") {
      return "Ferry Building";
    } else {
      return `Downtown ${city} Plaza`;
    }
  }
  
  if (type === "waterfront") {
    if (cityLower.includes("chicago")) {
      return "Navy Pier";
    } else if (cityLower.includes("san francisco") || cityLower === "sf") {
      return "Fisherman's Wharf";
    } else if (cityLower.includes("seattle")) {
      return "Pike Place Market";
    } else if (cityLower.includes("new york") || cityLower === "nyc") {
      return "Battery Park";
    } else if (cityLower.includes("boston")) {
      return "Boston Harbor";
    } else if (cityLower.includes("miami")) {
      return "Bayside Marketplace";
    } else {
      return `${city} Waterfront District`;
    }
  }
  
  if (type === "gardens") {
    if (cityLower.includes("new york") || cityLower === "nyc") {
      return "New York Botanical Garden";
    } else if (cityLower.includes("chicago")) {
      return "Chicago Botanic Garden";
    } else if (cityLower.includes("los angeles") || cityLower === "la") {
      return "Huntington Gardens";
    } else if (cityLower.includes("san francisco") || cityLower === "sf") {
      return "Golden Gate Park Conservatory of Flowers";
    } else {
      return `${city} Botanical Gardens`;
    }
  }
  
  return `Downtown ${city}`;
}

export function getCitySpecificNeighborhood(city: string): string {
  return `Old ${city}`;
}

export function getCitySpecificWebsite(city: string, type: string = "general"): string {
  return `www.${city.toLowerCase().replace(/\s+/g, "")}.${type === "general" ? "com" : "org"}`;
}

export function getCitySpecificPark(city: string): string {
  return `${city} Central Park`;
}

export function getCitySpecificWeather(city: string): string {
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

export function getCitySpecificSeason(city: string): string {
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
