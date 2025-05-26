
export async function generateAttractionsResponse(city: string): Promise<string> { // Modified signature
  return `When visiting ${city}, consider adding these attractions to your itinerary:

1. **${await getCitySpecificMuseum(city)}** - Housing an extensive collection of artwork and historical exhibits. [Buy Tickets](${await getAttractionWebsite(city, "museum")})

2. **${await getCitySpecificPark(city)}** - Perfect for outdoor activities, picnics, or just relaxing amid nature. Free admission.

3. **Historic ${city} District** - Walk through well-preserved architecture and learn about the city's history. Self-guided tours available at ${await getCitySpecificWebsite(city, "history")}.

4. **${await getCitySpecificAttraction(city)}** - A unique landmark that offers insight into the region's culture. [Visitor Information](${await getAttractionWebsite(city)})

5. **${city} Botanical Gardens** - Featuring diverse plant collections and seasonal displays. Located at ${await getCitySpecificLocation(city, "gardens")}.

Many of these attractions offer guided tours, and some may require tickets purchased in advance.`;
}

export async function getCitySpecificAttraction(city: string): Promise<string> { // Modified signature
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

export async function getAttractionWebsite(city: string, type: string = "general"): Promise<string> { // Modified signature
  return `https://www.visit${city.toLowerCase().replace(/\s+/g, "")}.com`;
}

export async function getCitySpecificMuseum(city: string): Promise<string> { // Modified signature
  return `${city} Museum of Fine Arts`;
}

export async function getCitySpecificPark(city: string): Promise<string> { // Modified signature
  return `${city} Central Park`;
}

import { getCitySpecificLocation, getCitySpecificWebsite } from './locationService';
