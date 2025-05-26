import { generateEventsResponse, getCitySpecificEvent, getEventWebsite } from './eventService';
import { generateRestaurantsResponse, getCitySpecificRestaurant, getRestaurantWebsite, getLocalFood, getLocalRestaurantName } from './restaurantService';
import { generateNightlifeResponse, getCitySpecificBar, getBarWebsite } from './nightlifeService';
import { generateAttractionsResponse, getCitySpecificAttraction, getAttractionWebsite, getCitySpecificMuseum } from './attractionService';
import { generateSportsResponse, getCitySpecificSportsTeam, getCitySpecificSportsEvent, getSportsEventWebsite, getCitySpecificStadium, getCitySpecificArena, getSportsWebsite, getCitySpecificCollege } from './sportsService';
import { getCitySpecificLocation, getCitySpecificNeighborhood, getCitySpecificWebsite, getCitySpecificPark, getCitySpecificWeather, getCitySpecificSeason } from './locationService';
import { generateCombinedCityResponse, generateGeneralCityResponse } from './combinedResponseService';

// The main search service that interfaces with all specialized services
export const SimpleSearchService = {
  async searchForCityInfo(query: string): Promise<string> {
    // Extract the city name from the query
    const cityPattern = /(?:in|at|near|around|for)\s+([a-zA-Z\s]+)(?:\?|$|\.)/i;
    const cityMatch = query.match(cityPattern);
    const city = cityMatch ? cityMatch[1].trim() : "the area";
    
    console.log('Searching for information about:', city);
    
    // Check if the query is seeking a specific category
    const isSpecificQuery = 
      query.toLowerCase().includes("restaurant") || 
      query.toLowerCase().includes("food") || 
      query.toLowerCase().includes("eat") ||
      query.toLowerCase().includes("bar") || 
      query.toLowerCase().includes("drink") ||
      query.toLowerCase().includes("club") ||
      query.toLowerCase().includes("nightlife") ||
      query.toLowerCase().includes("concert") ||
      query.toLowerCase().includes("show") ||
      query.toLowerCase().includes("sports") ||
      query.toLowerCase().includes("game") ||
      query.toLowerCase().includes("outdoor") ||
      query.toLowerCase().includes("park") ||
      query.toLowerCase().includes("museum");
    
    // If it's a general query like "what's going on in X city"
    if (!isSpecificQuery && 
        (query.toLowerCase().includes("what's going on") || 
         query.toLowerCase().includes("whats going on") ||
         query.toLowerCase().includes("what is going on") ||
         query.toLowerCase().includes("what's happening") ||
         query.toLowerCase().includes("things to do"))) {
      
      return await generateCombinedCityResponse(city); // Added await
    }
    
    // Otherwise, create a response based on the query content
    // Assuming these other generate...Response functions will also become async
    // and need to be awaited. If they are not yet async, this await might be harmless
    // or might need adjustment when those are updated.
    if (query.toLowerCase().includes("events") || 
        query.toLowerCase().includes("happening") || 
        query.toLowerCase().includes("going on")) {
      return await generateEventsResponse(city);
    } else if (query.toLowerCase().includes("restaurant") || 
               query.toLowerCase().includes("food") || 
               query.toLowerCase().includes("eat")) {
      return await generateRestaurantsResponse(city);
    } else if (query.toLowerCase().includes("nightlife") || 
               query.toLowerCase().includes("bar") || 
               query.toLowerCase().includes("club")) {
      return await generateNightlifeResponse(city);
    } else if (query.toLowerCase().includes("attraction") || 
               query.toLowerCase().includes("visit") || 
               query.toLowerCase().includes("see")) {
      return await generateAttractionsResponse(city);
    } else if (query.toLowerCase().includes("sports") ||
               query.toLowerCase().includes("game") ||
               query.toLowerCase().includes("team")) {
      return await generateSportsResponse(city);
    } else {
      return await generateGeneralCityResponse(city); // Added await
    }
  }
};
