// A simple service that provides search responses without requiring API keys
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
      
      return generateCombinedCityResponse(city);
    }
    
    // Otherwise, create a response based on the query content
    if (query.toLowerCase().includes("events") || 
        query.toLowerCase().includes("happening") || 
        query.toLowerCase().includes("going on")) {
      return generateEventsResponse(city);
    } else if (query.toLowerCase().includes("restaurant") || 
               query.toLowerCase().includes("food") || 
               query.toLowerCase().includes("eat")) {
      return generateRestaurantsResponse(city);
    } else if (query.toLowerCase().includes("nightlife") || 
               query.toLowerCase().includes("bar") || 
               query.toLowerCase().includes("club")) {
      return generateNightlifeResponse(city);
    } else if (query.toLowerCase().includes("attraction") || 
               query.toLowerCase().includes("visit") || 
               query.toLowerCase().includes("see")) {
      return generateAttractionsResponse(city);
    } else if (query.toLowerCase().includes("sports") ||
               query.toLowerCase().includes("game") ||
               query.toLowerCase().includes("team")) {
      return generateSportsResponse(city);
    } else {
      return generateGeneralCityResponse(city);
    }
  }
};

// Combined response for general "what's going on" queries
function generateCombinedCityResponse(city: string): string {
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

// Helper functions to generate responses about different topics
function generateEventsResponse(city: string): string {
  return `Here are some current and upcoming events in ${city}:

1. **${getCitySpecificEvent(city)}** - A celebration of local culture, music, and food happening this weekend. [Official Website](${getEventWebsite(city)})

2. **${getCitySpecificEvent(city, "conference")}** - Industry professionals gathering to discuss the latest trends. [Get Tickets](${getEventWebsite(city, "conference")})

3. **${city} Farmers Market** - Every Saturday morning at ${getCitySpecificLocation(city)}, featuring locally grown produce and artisanal goods.

4. **${city} Art Walk** - Monthly event showcasing local artists in galleries throughout downtown. Find details at ${getCitySpecificWebsite(city, "arts")}.

5. **Community Concert Series** - Free outdoor concerts at ${getCitySpecificPark(city)} every Friday evening. [Schedule](${getCitySpecificWebsite(city, "concerts")})

These events are quite popular, so I recommend checking their official websites for ticket information and exact schedules.`;
}

function generateRestaurantsResponse(city: string): string {
  return `Here are some notable restaurants in ${city} that locals and visitors enjoy:

1. **${getCitySpecificRestaurant(city, "upscale")}** - Known for its exquisite farm-to-table cuisine and seasonal menu. [Make Reservations](${getRestaurantWebsite(city, "upscale")})

2. **${getCitySpecificRestaurant(city, "casual")}** - A casual dining spot with an extensive menu of comfort food favorites. [Menu & Hours](${getRestaurantWebsite(city, "casual")})

3. **${city} Seafood House** - Specializing in fresh catches and traditional seafood dishes. Located at ${getCitySpecificLocation(city, "waterfront")}.

4. **${getCitySpecificRestaurant(city, "fusion")}** - An upscale dining experience with innovative fusion cuisine. [Official Website](${getRestaurantWebsite(city, "fusion")})

5. **${getLocalRestaurantName(city)}** - A cozy spot offering brunch, lunch, and dinner with locally-sourced ingredients. A true ${city} institution.

Most of these restaurants recommend reservations, especially for weekend dining.`;
}

function generateNightlifeResponse(city: string): string {
  return `${city} has a vibrant nightlife scene with options for every taste:

1. **${getCitySpecificBar(city, "cocktail")}** - A popular cocktail bar known for its creative mixology and upscale atmosphere. [Visit Website](${getBarWebsite(city)})

2. **${city} Brewing Company** - Local craft beer establishment with rotating taps and live music on weekends. Located in the ${getCitySpecificNeighborhood(city)} district.

3. **${getCitySpecificBar(city, "sports")}** - A casual sports bar with multiple screens and a lively game-day crowd. Great place to watch ${getCitySpecificSportsTeam(city)} games.

4. **${city} Jazz Club** - Intimate venue featuring local and touring jazz musicians. [Event Calendar](${getCitySpecificWebsite(city, "jazz")})

5. **${getCitySpecificBar(city, "club")}** - A trendy nightclub that attracts both locals and tourists with guest DJs every weekend.

The nightlife in ${city} typically gets busy after 9 PM, with most venues staying open until 2 AM.`;
}

function generateAttractionsResponse(city: string): string {
  return `When visiting ${city}, consider adding these attractions to your itinerary:

1. **${getCitySpecificMuseum(city)}** - Housing an extensive collection of artwork and historical exhibits. [Buy Tickets](${getAttractionWebsite(city, "museum")})

2. **${getCitySpecificPark(city)}** - Perfect for outdoor activities, picnics, or just relaxing amid nature. Free admission.

3. **Historic ${city} District** - Walk through well-preserved architecture and learn about the city's history. Self-guided tours available at ${getCitySpecificWebsite(city, "history")}.

4. **${getCitySpecificAttraction(city)}** - A unique landmark that offers insight into the region's culture. [Visitor Information](${getAttractionWebsite(city)})

5. **${city} Botanical Gardens** - Featuring diverse plant collections and seasonal displays. Located at ${getCitySpecificLocation(city, "gardens")}.

Many of these attractions offer guided tours, and some may require tickets purchased in advance.`;
}

function generateSportsResponse(city: string): string {
  return `Sports fans in ${city} have plenty to cheer about:

1. **${getCitySpecificSportsTeam(city, "baseball")}** - The local baseball team plays at ${getCitySpecificStadium(city, "baseball")}. [Schedule & Tickets](${getSportsWebsite(city, "baseball")})

2. **${getCitySpecificSportsTeam(city, "basketball")}** - Catch an exciting basketball game at the ${getCitySpecificArena(city)}. [Official Team Site](${getSportsWebsite(city, "basketball")})

3. **${getCitySpecificSportsTeam(city, "football")}** - Football games are a major event at ${getCitySpecificStadium(city, "football")}. Season typically runs September through January.

4. **${city} Marathon** - Annual racing event that draws participants from around the country. [Registration Information](${getCitySpecificWebsite(city, "marathon")})

5. **Local College Sports** - ${getCitySpecificCollege(city)} has competitive teams in various sports with affordable ticket prices.

Be sure to book tickets in advance for professional games, as they often sell out.`;
}

function generateGeneralCityResponse(city: string): string {
  return `${city} is a vibrant city with plenty to offer visitors and locals alike. Here's a general overview:

**Popular Areas:**
- Downtown ${city} - The urban heart with shopping, dining, and entertainment
- ${getCitySpecificNeighborhood(city)} District - Known for its charming shops and cafes
- ${getCitySpecificLocation(city, "waterfront")} - Beautiful views and recreational activities

**Top Attractions:**
- ${getCitySpecificAttraction(city)} - ${getAttractionWebsite(city)}
- ${getCitySpecificMuseum(city)} - ${getAttractionWebsite(city, "museum")}
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

// City-specific data generators
function getCitySpecificEvent(city: string, type: string = "festival"): string {
  const cityLower = city.toLowerCase();
  
  // Festival events by city
  if (type === "festival") {
    if (cityLower.includes("new york") || cityLower === "nyc") {
      return "Tribeca Film Festival";
    } else if (cityLower.includes("los angeles") || cityLower === "la") {
      return "Hollywood Bowl Summer Concert Series";
    } else if (cityLower.includes("chicago")) {
      return "Taste of Chicago Food Festival";
    } else if (cityLower.includes("miami")) {
      return "Ultra Music Festival";
    } else if (cityLower.includes("austin")) {
      return "Austin City Limits Music Festival";
    } else if (cityLower.includes("nashville")) {
      return "CMA Music Festival";
    } else if (cityLower.includes("new orleans")) {
      return "Jazz & Heritage Festival";
    } else if (cityLower.includes("san francisco") || cityLower === "sf") {
      return "Outside Lands Music Festival";
    } else if (cityLower.includes("seattle")) {
      return "Bumbershoot Arts Festival";
    } else if (cityLower.includes("portland")) {
      return "Portland Rose Festival";
    } else if (cityLower.includes("boston")) {
      return "Boston Calling Music Festival";
    } else if (cityLower.includes("philadelphia") || cityLower === "philly") {
      return "Made in America Festival";
    } else if (cityLower.includes("washington") || cityLower === "dc") {
      return "Smithsonian Folklife Festival";
    } else if (cityLower.includes("denver")) {
      return "Great American Beer Festival";
    } else if (cityLower.includes("san diego")) {
      return "San Diego Comic-Con";
    } else {
      return `${city} Cultural Festival`;
    }
  }
  
  // Conference events by city
  if (type === "conference") {
    if (cityLower.includes("san francisco") || cityLower === "sf") {
      return "Dreamforce Conference";
    } else if (cityLower.includes("las vegas")) {
      return "CES Technology Show";
    } else if (cityLower.includes("austin")) {
      return "SXSW Conference";
    } else if (cityLower.includes("new york") || cityLower === "nyc") {
      return "New York Tech Summit";
    } else if (cityLower.includes("chicago")) {
      return "Chicago Ideas Week";
    } else if (cityLower.includes("los angeles") || cityLower === "la") {
      return "E3 Gaming Expo";
    } else if (cityLower.includes("miami")) {
      return "Art Basel Miami";
    } else if (cityLower.includes("washington") || cityLower === "dc") {
      return "Smithsonian Innovation Conference";
    } else if (cityLower.includes("boston")) {
      return "BIO International Convention";
    } else if (cityLower.includes("seattle")) {
      return "GeekWire Summit";
    } else {
      return `${city} Business & Technology Conference`;
    }
  }
  
  return `${city} Annual Festival`;
}

function getEventWebsite(city: string, type: string = "festival"): string {
  const cityLower = city.toLowerCase();
  
  if (type === "festival") {
    if (cityLower.includes("new york") || cityLower === "nyc") {
      return "https://tribecafilm.com";
    } else if (cityLower.includes("los angeles") || cityLower === "la") {
      return "https://www.hollywoodbowl.com";
    } else if (cityLower.includes("chicago")) {
      return "https://www.chicago.gov/tasteofchicago";
    } else if (cityLower.includes("austin")) {
      return "https://www.aclfestival.com";
    } else if (cityLower.includes("miami")) {
      return "https://ultramusicfestival.com";
    } else if (cityLower.includes("new orleans")) {
      return "https://www.nojazzfest.com";
    } else if (cityLower.includes("san francisco") || cityLower === "sf") {
      return "https://www.outsidelands.com";
    } else {
      return `https://www.${city.toLowerCase().replace(/\s+/g, "")}.gov/events`;
    }
  }
  
  if (type === "conference") {
    if (cityLower.includes("san francisco") || cityLower === "sf")) {
      return "https://www.salesforce.com/dreamforce";
    } else if (cityLower.includes("las vegas")) {
      return "https://www.ces.tech";
    } else if (cityLower.includes("austin")) {
      return "https://www.sxsw.com";
    } else {
      return `https://www.${city.toLowerCase().replace(/\s+/g, "")}.org/conference`;
    }
  }
  
  return `https://www.${city.toLowerCase().replace(/\s+/g, "")}.com/events`;
}

function getCitySpecificRestaurant(city: string, type: string = "casual"): string {
  const cityLower = city.toLowerCase();
  
  if (type === "upscale") {
    if (cityLower.includes("new york") || cityLower === "nyc") {
      return "Le Bernardin";
    } else if (cityLower.includes("chicago")) {
      return "Alinea";
    } else if (cityLower.includes("los angeles") || cityLower === "la") {
      return "Providence";
    } else if (cityLower.includes("san francisco") || cityLower === "sf") {
      return "Quince";
    } else if (cityLower.includes("new orleans")) {
      return "Commander's Palace";
    } else if (cityLower.includes("las vegas")) {
      return "Joël Robuchon";
    } else if (cityLower.includes("miami")) {
      return "Bern's Steak House";
    } else if (cityLower.includes("washington") || cityLower === "dc") {
      return "Pineapple & Pearls";
    } else {
      return `The ${city} Grill`;
    }
  }
  
  if (type === "casual") {
    if (cityLower.includes("new york") || cityLower === "nyc") {
      return "Katz's Delicatessen";
    } else if (cityLower.includes("chicago")) {
      return "Lou Malnati's Pizzeria";
    } else if (cityLower.includes("los angeles") || cityLower === "la") {
      return "Grand Central Market vendors";
    } else if (cityLower.includes("philadelphia") || cityLower === "philly") {
      return "Jim's Steaks";
    } else if (cityLower.includes("new orleans")) {
      return "Café du Monde";
    } else if (cityLower.includes("austin")) {
      return "Franklin Barbecue";
    } else if (cityLower.includes("portland")) {
      return "Pok Pok";
    } else if (cityLower.includes("seattle")) {
      return "Pike Place Chowder";
    } else {
      return `${city} Diner`;
    }
  }
  
  if (type === "fusion") {
    if (cityLower.includes("los angeles") || cityLower === "la") {
      return "Bestia";
    } else if (cityLower.includes("new york") || cityLower === "nyc") {
      return "Momofuku Ko";
    } else if (cityLower.includes("chicago")) {
      return "Girl & the Goat";
    } else if (cityLower.includes("san francisco") || cityLower === "sf") {
      return "State Bird Provisions";
    } else if (cityLower.includes("miami")) {
      return "KYU";
    } else if (cityLower.includes("seattle")) {
      return "Canlis";
    } else {
      return `${city} Fusion Kitchen`;
    }
  }
  
  return `${city} Eatery`;
}

function getRestaurantWebsite(city: string, type: string = "casual"): string {
  const cityLower = city.toLowerCase();
  
  if (type === "upscale") {
    if (cityLower.includes("new york") || cityLower === "nyc") {
      return "https://www.le-bernardin.com";
    } else if (cityLower.includes("chicago")) {
      return "https://www.alinearestaurant.com";
    } else if (cityLower.includes("los angeles") || cityLower === "la") {
      return "https://www.providencela.com";
    } else {
      return `https://www.${city.toLowerCase().replace(/\s+/g, "")}grill.com`;
    }
  }
  
  if (type === "casual") {
    if (cityLower.includes("new york") || cityLower === "nyc") {
      return "https://www.katzsdelicatessen.com";
    } else if (cityLower.includes("chicago")) {
      return "https://www.loumalnatis.com";
    } else if (cityLower.includes("austin")) {
      return "https://franklinbbq.com";
    } else {
      return `https://www.${city.toLowerCase().replace(/\s+/g, "")}diner.com`;
    }
  }
  
  return `https://www.${city.toLowerCase().replace(/\s+/g, "")}dining.com`;
}

// Additional helper functions
function getCitySpecificLocation(city: string, type: string = "downtown"): string {
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

// Many more helper functions for city specificity...
// Keeping it simple for this implementation

// Stub implementations for remaining required functions
function getCitySpecificBar(city: string, type: string = "casual"): string {
  return `The ${city} ${type === "cocktail" ? "Cocktail Lounge" : type === "club" ? "Nightclub" : "Bar & Grill"}`;
}

function getBarWebsite(city: string, type: string = "casual"): string {
  return `https://www.${city.toLowerCase().replace(/\s+/g, "")}${type === "cocktail" ? "cocktails" : "nightlife"}.com`;
}

function getCitySpecificAttraction(city: string): string {
  const cityLower = city.toLowerCase();
  
  if (cityLower.includes("new york") || cityLower === "nyc") {
    return "Empire State Building";
  } else if (cityLower.includes("chicago")) {
    return "Willis Tower Skydeck";
  } else if (cityLower.includes("los angeles") || cityLower === "la")) {
    return "Hollywood Walk of Fame";
  } else if (cityLower.includes("san francisco") || cityLower === "sf") {
    return "Golden Gate Bridge";
  } else {
    return `${city} Monument`;
  }
}

function getAttractionWebsite(city: string, type: string = "general"): string {
  return `https://www.visit${city.toLowerCase().replace(/\s+/g, "")}.com`;
}

function getCitySpecificNeighborhood(city: string): string {
  return `Old ${city}`;
}

function getCitySpecificWebsite(city: string, type: string = "general"): string {
  return `www.${city.toLowerCase().replace(/\s+/g, "")}.${type === "general" ? "com" : "org"}`;
}

function getCitySpecificPark(city: string): string {
  return `${city} Central Park`;
}

function getCitySpecificMuseum(city: string): string {
  return `${city} Museum of Fine Arts`;
}

function getLocalFood(city: string): string {
  const cityLower = city.toLowerCase();
  
  if (cityLower.includes("new orleans")) {
    return "gumbo and beignets";
  } else if (cityLower.includes("chicago")) {
    return "deep dish pizza";
  } else if (cityLower.includes("philadelphia") || cityLower === "philly") {
    return "cheesesteaks";
  } else if (cityLower.includes("boston")) {
    return "clam chowder";
  } else if (cityLower.includes("memphis")) {
    return "barbecue ribs";
  } else if (cityLower.includes("nashville")) {
    return "hot chicken";
  } else if (cityLower.includes("baltimore")) {
    return "crab cakes";
  } else if (cityLower.includes("seattle")) {
    return "seafood";
  } else if (cityLower.includes("new york") || cityLower === "nyc") {
    return "pizza and bagels";
  } else {
    return "regional specialties";
  }
}

function getLocalRestaurantName(city: string): string {
  return `${city} Kitchen`;
}

function getCitySpecificSportsTeam(city: string, sport: string = "basketball"): string {
  const cityLower = city.toLowerCase();
  
  if (sport === "basketball") {
    if (cityLower.includes("chicago")) {
      return "Chicago Bulls";
    } else if (cityLower.includes("los angeles") || cityLower === "la") {
      return "Los Angeles Lakers";
    } else if (cityLower.includes("new york") || cityLower === "nyc") {
      return "New York Knicks";
    } else {
      return `${city} Basketball Team`;
    }
  }
  
  if (sport === "baseball") {
    if (cityLower.includes("new york") || cityLower === "nyc") {
      return "New York Yankees";
    } else if (cityLower.includes("boston")) {
      return "Boston Red Sox";
    } else if (cityLower.includes("chicago")) {
      return "Chicago Cubs";
    } else {
      return `${city} Baseball Club`;
    }
  }
  
  if (sport === "football") {
    if (cityLower.includes("dallas")) {
      return "Dallas Cowboys";
    } else if (cityLower.includes("green bay")) {
      return "Green Bay Packers";
    } else if (cityLower.includes("new england") || cityLower.includes("boston")) {
      return "New England Patriots";
    } else {
      return `${city} Football Team`;
    }
  }
  
  return `${city} Sports Team`;
}

function getCitySpecificSportsEvent(city: string): string {
  const cityLower = city.toLowerCase();
  
  if (cityLower.includes("boston")) {
    return "Boston Marathon";
  } else if (cityLower.includes("new york") || cityLower === "nyc") {
    return "New York City Marathon";
  } else if (cityLower.includes("chicago")) {
    return "Chicago Bulls home game";
  } else if (cityLower.includes("los angeles") || cityLower === "la") {
    return "Lakers vs. Clippers basketball game";
  } else {
    return `${city} Championship Series`;
  }
}

function getSportsEventWebsite(city: string): string {
  const cityLower = city.toLowerCase();
  
  if (cityLower.includes("boston") && cityLower.includes("marathon")) {
    return "https://www.baa.org";
  } else if ((cityLower.includes("new york") || cityLower === "nyc") && cityLower.includes("marathon")) {
    return "https://www.nyrr.org";
  } else {
    return `https://www.${city.toLowerCase().replace(/\s+/g, "")}sports.com`;
  }
}

function getCitySpecificStadium(city: string, sport: string = "baseball"): string {
  return `${city} ${sport === "baseball" ? "Ballpark" : "Stadium"}`;
}

function getCitySpecificArena(city: string): string {
  return `${city} Arena`;
}

function getSportsWebsite(city: string, sport: string = "basketball"): string {
  return `https://www.${city.toLowerCase().replace(/\s+/g, "")}${sport}.com`;
}

function getCitySpecificCollege(city: string): string {
  return `University of ${city}`;
}

function getCitySpecificWeather(city: string): string {
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

function getCitySpecificSeason(city: string): string {
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
