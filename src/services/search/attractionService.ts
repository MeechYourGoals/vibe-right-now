
export function generateAttractionsResponse(city: string): string {
  return `When visiting ${city}, consider adding these attractions to your itinerary:

1. **${getCitySpecificMuseum(city)}** - Housing an extensive collection of artwork and historical exhibits. [Buy Tickets](${getAttractionWebsite(city, "museum")})

2. **${getCitySpecificPark(city)}** - Perfect for outdoor activities, picnics, or just relaxing amid nature. Free admission.

3. **Historic ${city} District** - Walk through well-preserved architecture and learn about the city's history. Self-guided tours available at ${getCitySpecificWebsite(city, "history")}.

4. **${getCitySpecificAttraction(city)}** - A unique landmark that offers insight into the region's culture. [Visitor Information](${getAttractionWebsite(city)})

5. **${city} Botanical Gardens** - Featuring diverse plant collections and seasonal displays. Located at ${getCitySpecificLocation(city, "gardens")}.

Many of these attractions offer guided tours, and some may require tickets purchased in advance.`;
}

export function getCitySpecificAttraction(city: string): string {
  const cityLower = city.toLowerCase();
  
  if (cityLower.includes("new york") || cityLower === "nyc") {
    return "Empire State Building";
  } else if (cityLower.includes("chicago")) {
    return "Willis Tower Skydeck";
  } else if (cityLower.includes("los angeles") || cityLower === "la") {
    return "Hollywood Walk of Fame";
  } else if (cityLower.includes("san francisco") || cityLower === "sf") {
    return "Golden Gate Bridge";
  } else {
    return `${city} Monument`;
  }
}

export function getAttractionWebsite(city: string, type: string = "general"): string {
  return `https://www.visit${city.toLowerCase().replace(/\s+/g, "")}.com`;
}

export function getCitySpecificMuseum(city: string): string {
  return `${city} Museum of Fine Arts`;
}

export function getCitySpecificPark(city: string): string {
  return `${city} Central Park`;
}

import { getCitySpecificLocation, getCitySpecificWebsite } from './locationService';
