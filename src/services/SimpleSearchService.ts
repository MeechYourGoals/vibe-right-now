
// A simple service that provides search responses without requiring API keys
export const SimpleSearchService = {
  async searchForCityInfo(query: string): Promise<string> {
    // Extract the city name from the query
    const cityPattern = /(?:in|at|near|around|for)\s+([a-zA-Z\s]+)(?:\?|$|\.)/i;
    const cityMatch = query.match(cityPattern);
    const city = cityMatch ? cityMatch[1].trim() : "the area";
    
    console.log('Searching for information about:', city);
    
    // Create a response based on the query content
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
    } else {
      return generateGeneralCityResponse(city);
    }
  }
};

// Helper functions to generate responses about different topics
function generateEventsResponse(city: string): string {
  return `Here are some current and upcoming events in ${city}:

1. **${getRandomEventName()} Festival** - A celebration of local culture, music, and food happening this weekend in the heart of ${city}.

2. **${getRandomEventName()} Conference** - Industry professionals gathering to discuss the latest trends and innovations.

3. **Local Farmers Market** - Every Saturday morning, featuring locally grown produce and artisanal goods.

4. **${city} Art Walk** - Monthly event showcasing local artists in galleries throughout downtown.

5. **Community Concert Series** - Free outdoor concerts in the park every Friday evening.

These events are quite popular, so I recommend checking their official websites for ticket information and exact schedules.`;
}

function generateRestaurantsResponse(city: string): string {
  return `Here are some notable restaurants in ${city} that locals and visitors enjoy:

1. **${getRandomRestaurantName()}** - Known for its exquisite farm-to-table cuisine and seasonal menu.

2. **${getRandomRestaurantName()}** - A casual dining spot with an extensive menu of comfort food favorites.

3. **${city} Seafood House** - Specializing in fresh catches and traditional seafood dishes.

4. **${getRandomRestaurantName()}** - An upscale dining experience with innovative fusion cuisine.

5. **Local Bistro** - A cozy spot offering brunch, lunch, and dinner with locally-sourced ingredients.

Most of these restaurants recommend reservations, especially for weekend dining.`;
}

function generateNightlifeResponse(city: string): string {
  return `${city} has a vibrant nightlife scene with options for every taste:

1. **${getRandomBarName()}** - A popular cocktail bar known for its creative mixology and upscale atmosphere.

2. **Downtown Brewery** - Local craft beer establishment with rotating taps and live music on weekends.

3. **${getRandomBarName()}** - A casual sports bar with multiple screens and a lively game-day crowd.

4. **${city} Jazz Club** - Intimate venue featuring local and touring jazz musicians.

5. **${getRandomBarName()}** - A trendy nightclub that attracts both locals and tourists with guest DJs.

The nightlife in ${city} typically gets busy after 9 PM, with most venues staying open until 2 AM.`;
}

function generateAttractionsResponse(city: string): string {
  return `When visiting ${city}, consider adding these attractions to your itinerary:

1. **${city} Museum of Art** - Housing an extensive collection of local and international artwork.

2. **City Central Park** - Perfect for outdoor activities, picnics, or just relaxing amid nature.

3. **Historic ${city} District** - Walk through well-preserved architecture and learn about the city's history.

4. **${getRandomAttractionName()}** - A unique landmark that offers insight into the region's culture.

5. **${city} Botanical Gardens** - Featuring diverse plant collections and seasonal displays.

Many of these attractions offer guided tours, and some may require tickets purchased in advance.`;
}

function generateGeneralCityResponse(city: string): string {
  return `${city} is a vibrant city with plenty to offer visitors and locals alike. Here's a general overview:

**Popular Areas:**
- Downtown ${city} - The urban heart with shopping, dining, and entertainment
- ${getRandomNeighborhoodName()} District - Known for its charming shops and cafes
- Waterfront Area - Beautiful views and recreational activities

**Transportation:**
The city offers public transportation including buses and possibly light rail. Rideshare services are also widely available throughout ${city}.

**Weather:**
The current season in ${city} typically brings [seasonal weather patterns]. It's advisable to check a weather app for the most up-to-date forecast.

**Local Tips:**
- The city is busiest during [peak tourist season]
- Many locals recommend exploring the ${getRandomNeighborhoodName()} neighborhood for authentic experiences
- Street parking can be challenging in popular areas, so consider public transportation or parking garages

For more specific information about ${city}, feel free to ask about restaurants, events, attractions, or nightlife.`;
}

// Helper functions to generate random names
function getRandomEventName(): string {
  const events = ["Summer", "Heritage", "International", "Arts", "Music", "Cultural", "Innovation", "Tech", "Food & Wine"];
  return events[Math.floor(Math.random() * events.length)];
}

function getRandomRestaurantName(): string {
  const prefixes = ["The", "Le", "La", "El", ""];
  const mains = ["Bistro", "Grill", "Kitchen", "Table", "Spoon", "Fork", "Plate", "Garden"];
  const suffixes = ["House", "Room", "Café", "Restaurant", "Eatery", ""];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const main = mains[Math.floor(Math.random() * mains.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return prefix ? `${prefix} ${main} ${suffix}`.trim() : `${main} ${suffix}`.trim();
}

function getRandomBarName(): string {
  const prefixes = ["The", ""];
  const mains = ["Lounge", "Bar", "Pub", "Tavern", "Speakeasy", "Brewery", "Distillery"];
  const suffixes = ["Room", "House", "& Grill", "Social", ""];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const main = mains[Math.floor(Math.random() * mains.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return prefix ? `${prefix} ${main} ${suffix}`.trim() : `${main} ${suffix}`.trim();
}

function getRandomAttractionName(): string {
  const prefixes = ["National", "Historic", "Ancient", "Modern", ""];
  const mains = ["Monument", "Museum", "Tower", "Cathedral", "Castle", "Palace", "Gardens"];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const main = mains[Math.floor(Math.random() * mains.length)];
  
  return prefix ? `${prefix} ${main}` : main;
}

function getRandomNeighborhoodName(): string {
  const prefixes = ["Old", "New", "East", "West", "North", "South", "Central", ""];
  const suffixes = ["Town", "Quarter", "District", "Village", "Heights", "Park", "Gardens"];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix} ${suffix}`.trim();
}
