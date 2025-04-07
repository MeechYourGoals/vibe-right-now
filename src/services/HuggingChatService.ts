
// Service to interact with a free, keyless chat service
export const HuggingChatService = {
  async searchHuggingChat(query: string): Promise<string> {
    try {
      console.log('Searching for:', query);
      
      // Mock data for city-based queries to demonstrate venue linking
      const cityKeywords = ['new york', 'los angeles', 'san francisco', 'chicago', 'miami', 'boston', 'austin'];
      const containsCityKeyword = cityKeywords.some(city => query.toLowerCase().includes(city));
      
      if (containsCityKeyword) {
        return generateCityResponse(query);
      }
      
      // For general questions, use a deterministic, knowledge-based approach
      if (query.toLowerCase().includes('restaurant') || query.toLowerCase().includes('food')) {
        return "I'd recommend checking out [The Local Eatery](https://localeatery.com) or [Foodie's Paradise](https://foodiesparadise.com). Both have excellent reviews and offer diverse menu options.";
      } 
      
      if (query.toLowerCase().includes('concert') || query.toLowerCase().includes('music')) {
        return "There are several great music venues in the area! [The Sound Garden](https://soundgarden.com) has indie bands playing this weekend, and [Rhythm House](https://rhythmhouse.com) features jazz musicians every Friday night.";
      }
      
      if (query.toLowerCase().includes('museum') || query.toLowerCase().includes('art')) {
        return "For art enthusiasts, I'd suggest visiting [Modern Art Gallery](https://modernartgallery.com) which has a new exhibition opening this month. [The History Museum](https://historymuseum.org) also has fascinating historical artifacts on display.";
      }
      
      if (query.toLowerCase().includes('park') || query.toLowerCase().includes('outdoor')) {
        return "For outdoor activities, [Central Park](https://centralpark.com) offers beautiful walking trails and picnic spots. [Riverside Park](https://riversidepark.org) has amazing views and recreational facilities as well.";
      }
      
      if (query.toLowerCase().includes('bar') || query.toLowerCase().includes('drink')) {
        return "For drinks and nightlife, [The Speakeasy](https://thespeakeasy.com) has craft cocktails and a vintage atmosphere. [Brewers' Corner](https://brewerscorner.com) offers a great selection of local beers.";
      }
      
      if (query.toLowerCase().includes('coffee') || query.toLowerCase().includes('cafe')) {
        return "I'd recommend [Bean There](https://beanthere.coffee) for excellent espresso and pastries. [Morning Brew](https://morningbrew.cafe) also has a lovely atmosphere for working or reading.";
      }
      
      // Default response with helpful suggestions
      return "I can help you discover places to visit, things to do, or answer questions about specific venues. Try asking about restaurants, concerts, museums, parks, or nightlife in a particular city!";
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having a bit of trouble right now. Could you try asking your question again?";
    }
  }
};

// Helper function to generate city-specific responses with venue links
function generateCityResponse(query: string): string {
  // Extract city from query
  const cityKeywords = {
    'new york': {
      restaurants: ['[Eleven Madison Park](https://elevenmadisonpark.com)', '[Katz\'s Delicatessen](https://katzsdelicatessen.com)'],
      attractions: ['[The Metropolitan Museum of Art](https://metmuseum.org)', '[Central Park](https://centralparknyc.org)'],
      nightlife: ['[230 Fifth Rooftop Bar](https://230-fifth.com)', '[The Rum House](https://therumhouse.com)']
    },
    'los angeles': {
      restaurants: ['[Bestia](https://bestiarestaurant.com)', '[Grand Central Market](https://grandcentralmarket.com)'],
      attractions: ['[The Getty Center](https://getty.edu)', '[Griffith Observatory](https://griffithobservatory.org)'],
      nightlife: ['[The Rooftop at The Standard](https://standardhotels.com)', '[Good Times at Davey Wayne\'s](https://goodtimesatdaveywaynes.com)']
    },
    'san francisco': {
      restaurants: ['[Tartine Bakery](https://tartinebakery.com)', '[Zuni Café](https://zunicafe.com)'],
      attractions: ['[Golden Gate Park](https://goldengatepark.com)', '[Alcatraz Island](https://alcatrazcruises.com)'],
      nightlife: ['[Trick Dog](https://trickdogbar.com)', '[California Academy of Sciences Nightlife](https://calacademy.org/nightlife)']
    },
    'chicago': {
      restaurants: ['[Alinea](https://alinearestaurant.com)', '[The Purple Pig](https://thepurplepigchicago.com)'],
      attractions: ['[The Art Institute of Chicago](https://artic.edu)', '[Millennium Park](https://millenniumpark.org)'],
      nightlife: ['[The Aviary](https://theaviary.com)', '[Kingston Mines](https://kingstonmines.com)']
    },
    'miami': {
      restaurants: ['[Joe\'s Stone Crab](https://joesstonecrab.com)', '[Versailles Restaurant](https://versaillesrestaurant.com)'],
      attractions: ['[Vizcaya Museum & Gardens](https://vizcaya.org)', '[South Beach](https://visitsouthbeach.com)'],
      nightlife: ['[LIV](https://livnightclub.com)', '[Ball & Chain](https://ballandchainmiami.com)']
    }
  };
  
  let cityMatch = '';
  // Find which city is mentioned in the query
  Object.keys(cityKeywords).forEach(city => {
    if (query.toLowerCase().includes(city)) {
      cityMatch = city;
    }
  });
  
  if (!cityMatch) {
    return "I can provide information about many cities including New York, Los Angeles, San Francisco, Chicago, and Miami. What would you like to know about these places?";
  }
  
  const cityInfo = cityKeywords[cityMatch as keyof typeof cityKeywords];
  
  // Check what kind of information the user is looking for
  if (query.toLowerCase().includes('restaurant') || query.toLowerCase().includes('food') || query.toLowerCase().includes('eat')) {
    return `Here are some great restaurants in ${cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1)}: ${cityInfo.restaurants.join(', ')}. Would you like more specific recommendations?`;
  } 
  
  if (query.toLowerCase().includes('see') || query.toLowerCase().includes('visit') || query.toLowerCase().includes('attraction')) {
    return `Top attractions in ${cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1)} include ${cityInfo.attractions.join(', ')}. Is there a specific type of attraction you're interested in?`;
  }
  
  if (query.toLowerCase().includes('bar') || query.toLowerCase().includes('nightlife') || query.toLowerCase().includes('club')) {
    return `For nightlife in ${cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1)}, check out ${cityInfo.nightlife.join(', ')}. These venues are popular and offer great experiences!`;
  }
  
  // General response about the city
  return `Here's what ${cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1)} has to offer:
  
🍽️ **Restaurants**: ${cityInfo.restaurants.join(', ')}
  
🏛️ **Attractions**: ${cityInfo.attractions.join(', ')}
  
🍸 **Nightlife**: ${cityInfo.nightlife.join(', ')}
  
Let me know if you'd like more specific recommendations!`;
}
