
import { getCitySpecificEvent, getEventWebsite } from './eventService';
import { getCitySpecificRestaurant, getRestaurantWebsite, getLocalFood } from './restaurantService';
import { getCitySpecificBar, getBarWebsite } from './nightlifeService';
import { getCitySpecificAttraction, getAttractionWebsite } from './attractionService';
import { getCitySpecificSportsEvent, getSportsEventWebsite } from './sportsService';
import { getCitySpecificLocation, getCitySpecificNeighborhood, getCitySpecificPark, getCitySpecificWeather, getCitySpecificSeason } from './locationService';

// Combined response for general "what's going on" queries
export function generateCombinedCityResponse(city: string): string {
  return `Here's what's happening in ${city} right now:

**Events:**
- ${getCitySpecificEvent(city)} - ${getEventWebsite(city)}
- Local Farmers Market at ${getCitySpecificLocation(city)} - Open Saturday mornings

**Food & Dining:**
- ${getCitySpecificRestaurant(city, "upscale")} - Award-winning fine dining - ${getRestaurantWebsite(city, "upscale")}
- ${getCitySpecificRestaurant(city, "casual")} - Local favorite for ${getLocalFood(city)} - ${getRestaurantWebsite(city, "casual")}

**Nightlife:**
- ${getCitySpecificBar(city, "cocktail")} - Craft cocktails and live music - ${getBarWebsite(city)}
- ${getCitySpecificBar(city, "club")} - Popular dance club with guest DJs

**Attractions:**
- ${getCitySpecificAttraction(city)} - ${getAttractionWebsite(city)}
- ${city} Outdoor Market - Open daily in the downtown area

**Sports:**
- ${getCitySpecificSportsEvent(city)} - ${getSportsEventWebsite(city)}

Would you like more specific recommendations for any of these categories?`;
}

export function generateGeneralCityResponse(city: string): string {
  return `${city} is a vibrant city with plenty to offer visitors and locals alike. Here's a general overview:

**Popular Areas:**
- Downtown ${city} - The urban heart with shopping, dining, and entertainment
- ${getCitySpecificNeighborhood(city)} District - Known for its charming shops and cafes
- ${getCitySpecificLocation(city, "waterfront")} - Beautiful views and recreational activities

**Top Attractions:**
- ${getCitySpecificAttraction(city)} - ${getAttractionWebsite(city)}
- ${getCitySpecificPark(city)} - Perfect for outdoor activities

**Local Cuisine:**
- Known for ${getLocalFood(city)}
- Popular restaurants include ${getCitySpecificRestaurant(city, "upscale")} and ${getCitySpecificRestaurant(city, "casual")}

**Transportation:**
The city offers public transportation including buses and possibly light rail. Rideshare services are also widely available throughout ${city}.

**Weather:**
${getCitySpecificWeather(city)}

**Local Tips:**
- The city is busiest during ${getCitySpecificSeason(city)}
- Many locals recommend exploring the ${getCitySpecificNeighborhood(city)} neighborhood for authentic experiences
- Street parking can be challenging in popular areas, so consider public transportation or parking garages

For more specific information about ${city}, feel free to ask about restaurants, events, attractions, or nightlife.`;
}
