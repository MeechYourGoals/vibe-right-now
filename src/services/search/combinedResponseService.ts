
import { generateRestaurantsResponse } from './restaurantService';
import { getCitySpecificEvent, getEventWebsite } from './eventService';
import { getCitySpecificBar } from './nightlifeService';
import { getCitySpecificAttraction } from './attractionService';
import { getCitySpecificSportsTeam } from './sportsService';

export const generateCombinedCityResponse = (city: string): string => {
  return `Here's what's happening in ${city}:

EVENTS:
🎵 ${getCitySpecificEvent(city)} is in town this weekend.
🎭 There are several shows playing at the local theaters.
🏙️ The downtown area has street festivals every Saturday this month.

FOOD & DRINK:
🍽️ Check out the trending restaurants in the ${city} food scene.
🍸 ${getCitySpecificBar(city)} is the hot spot for cocktails right now.
🍺 There are several craft breweries offering weekend tours.

ATTRACTIONS:
🏛️ ${getCitySpecificAttraction(city)} is a must-visit.
🏞️ The local parks have walking tours and outdoor activities.
🏙️ Downtown has several guided city tours available.

SPORTS:
⚾ ${getCitySpecificSportsTeam(city)} has home games this week.
🏃‍♀️ There's a 5K charity run this Saturday morning.
🏈 College sports are in full swing with lots of local events.

Would you like more specific information about any of these categories?`;
};

export const generateGeneralCityResponse = (city: string): string => {
  return `${city} has a lot happening right now! Here are some highlights:

The weather is great for exploring the city's neighborhoods. 
Many local restaurants have special seasonal menus this month.
There are cultural events and performances scheduled throughout the week.
${getCitySpecificAttraction(city)} is especially beautiful this time of year.
The local ${getCitySpecificSportsTeam(city)} fans are excited about the upcoming season.

What specifically are you interested in doing in ${city}? I can give you more targeted recommendations for restaurants, events, nightlife, attractions, or sports.`;
};
