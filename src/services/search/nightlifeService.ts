
import { getCitySpecificNeighborhood } from './locationService';
import { getCitySpecificSportsTeam } from './sportsService'; // This will likely become async too
import { getCitySpecificWebsite } from './locationService';

export async function generateNightlifeResponse(city: string): Promise<string> { // Modified signature
  return `${city} has a vibrant nightlife scene with options for every taste:

1. **${await getCitySpecificBar(city, "cocktail")}** - A popular cocktail bar known for its creative mixology and upscale atmosphere. [Visit Website](${await getBarWebsite(city)})

2. **${city} Brewing Company** - Local craft beer establishment with rotating taps and live music on weekends. Located in the ${await getCitySpecificNeighborhood(city)} district.

3. **${await getCitySpecificBar(city, "sports")}** - A casual sports bar with multiple screens and a lively game-day crowd. Great place to watch ${await getCitySpecificSportsTeam(city)} games.

4. **${city} Jazz Club** - Intimate venue featuring local and touring jazz musicians. [Event Calendar](${await getCitySpecificWebsite(city, "jazz")})

5. **${await getCitySpecificBar(city, "club")}** - A trendy nightclub that attracts both locals and tourists with guest DJs every weekend.

The nightlife in ${city} typically gets busy after 9 PM, with most venues staying open until 2 AM.`;
}

export async function getCitySpecificBar(city: string, type: string = "casual"): Promise<string> { // Modified signature
  return `The ${city} ${type === "cocktail" ? "Cocktail Lounge" : type === "club" ? "Nightclub" : type === "sports" ? "Sports Bar" : "Bar & Grill"}`;
}

export async function getBarWebsite(city: string, type: string = "casual"): Promise<string> { // Modified signature
  return `https://www.${city.toLowerCase().replace(/\s+/g, "")}${type === "cocktail" ? "cocktails" : "nightlife"}.com`;
}
