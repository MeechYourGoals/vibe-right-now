
// Service to interact with a free, keyless chat service
export const HuggingChatService = {
  async searchHuggingChat(query: string): Promise<string> {
    try {
      console.log('Searching for:', query);
      
      // Mock data for city-based queries to demonstrate venue linking
      const cityKeywords = ['new york', 'los angeles', 'san francisco', 'chicago', 'miami', 'boston', 'austin', 'portland', 'seattle', 'denver'];
      const containsCityKeyword = cityKeywords.some(city => query.toLowerCase().includes(city));
      
      if (containsCityKeyword) {
        return generateCityResponse(query);
      }
      
      // For general questions, use a deterministic, knowledge-based approach
      if (query.toLowerCase().includes('restaurant') || query.toLowerCase().includes('food')) {
        return "I'd recommend checking out [The Local Eatery](/explore?q=The%20Local%20Eatery) or [Foodie's Paradise](/explore?q=Foodie's%20Paradise). Both have excellent reviews and offer diverse menu options. Would you like me to suggest more specific cuisine types?";
      } 
      
      if (query.toLowerCase().includes('concert') || query.toLowerCase().includes('music')) {
        return "There are several great music venues in the area! [The Sound Garden](/explore?q=Sound%20Garden) has indie bands playing this weekend, and [Rhythm House](/explore?q=Rhythm%20House) features jazz musicians every Friday night. Both venues have excellent acoustics and vibrant crowds.";
      }
      
      if (query.toLowerCase().includes('museum') || query.toLowerCase().includes('art')) {
        return "For art enthusiasts, I'd suggest visiting [Modern Art Gallery](/explore?q=Modern%20Art%20Gallery) which has a new exhibition opening this month. [The History Museum](/explore?q=History%20Museum) also has fascinating historical artifacts on display. Both places are perfect for a cultural day out!";
      }
      
      if (query.toLowerCase().includes('park') || query.toLowerCase().includes('outdoor')) {
        return "For outdoor activities, [Central Park](/explore?q=Central%20Park) offers beautiful walking trails and picnic spots. [Riverside Park](/explore?q=Riverside%20Park) has amazing views and recreational facilities as well. The weather looks great this weekend, perfect for outdoor exploration!";
      }
      
      if (query.toLowerCase().includes('bar') || query.toLowerCase().includes('drink') || query.toLowerCase().includes('nightlife')) {
        return "For drinks and nightlife, [The Speakeasy](/explore?q=The%20Speakeasy) has craft cocktails and a vintage atmosphere. [Brewers' Corner](/explore?q=Brewers%20Corner) offers a great selection of local beers. Both places are buzzing with energy tonight!";
      }
      
      if (query.toLowerCase().includes('coffee') || query.toLowerCase().includes('cafe')) {
        return "I'd recommend [Bean There](/explore?q=Bean%20There) for excellent espresso and pastries. [Morning Brew](/explore?q=Morning%20Brew) also has a lovely atmosphere for working or reading. Both cafes have free WiFi and comfortable seating arrangements.";
      }
      
      if (query.toLowerCase().includes('sports') || query.toLowerCase().includes('game')) {
        // Check for real sporting events based on current month (mock implementation)
        const today = new Date();
        const month = today.getMonth(); // 0-11 (January is 0, December is 11)
        
        let sportingEvent = "";
        if (month >= 8 && month <= 11) { // September to December - football season
          sportingEvent = "There's an NFL game tonight! The [Seattle Seahawks](/explore?q=Seattle%20Seahawks) are playing at home. [Get tickets from Ticketmaster](https://www.ticketmaster.com/nfl-tickets/league/7)";
        } else if (month >= 9 || month <= 3) { // October to April - basketball season
          sportingEvent = "The [Portland Trail Blazers](/explore?q=Portland%20Trail%20Blazers) have a home game tonight at 7:30 PM. [Get tickets from NBA.com](https://www.nba.com/tickets)";
        } else if (month >= 2 && month <= 8) { // March to September - baseball season
          sportingEvent = "The [Chicago Cubs](/explore?q=Chicago%20Cubs) are playing at Wrigley Field tonight. [Get tickets from MLB.com](https://www.mlb.com/tickets)";
        }
        
        return `${sportingEvent || "There are no major sporting events happening today."} You can also check out [The Sports Bar](/explore?q=The%20Sports%20Bar) where they'll be showing all the games on their big screens.`;
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
      restaurants: ['[Eleven Madison Park](/explore?q=Eleven%20Madison%20Park)', '[Katz\'s Delicatessen](/explore?q=Katz%20Delicatessen)'],
      attractions: ['[The Metropolitan Museum of Art](/explore?q=The%20Metropolitan%20Museum%20of%20Art)', '[Central Park](/explore?q=Central%20Park)'],
      nightlife: ['[230 Fifth Rooftop Bar](/explore?q=230%20Fifth%20Rooftop%20Bar)', '[The Rum House](/explore?q=The%20Rum%20House)'],
      sports: ['[New York Knicks game](/explore?q=New%20York%20Knicks) at Madison Square Garden - [Buy Tickets](https://www.ticketmaster.com)', '[New York Yankees](/explore?q=New%20York%20Yankees) at Yankee Stadium - [Buy Tickets](https://www.mlb.com/yankees/tickets)'],
      concerts: ['[Madison Square Garden concert](/explore?q=Madison%20Square%20Garden%20concert) - [Buy Tickets](https://www.ticketmaster.com)', '[Radio City Music Hall show](/explore?q=Radio%20City%20Music%20Hall) - [Buy Tickets](https://www.ticketmaster.com)']
    },
    'los angeles': {
      restaurants: ['[Bestia](/explore?q=Bestia)', '[Grand Central Market](/explore?q=Grand%20Central%20Market)'],
      attractions: ['[The Getty Center](/explore?q=The%20Getty%20Center)', '[Griffith Observatory](/explore?q=Griffith%20Observatory)'],
      nightlife: ['[The Rooftop at The Standard](/explore?q=The%20Rooftop%20at%20The%20Standard)', '[Good Times at Davey Wayne\'s](/explore?q=Good%20Times%20at%20Davey%20Waynes)'],
      sports: ['[LA Lakers game](/explore?q=LA%20Lakers) at Crypto.com Arena - [Buy Tickets](https://www.ticketmaster.com)', '[LA Dodgers](/explore?q=LA%20Dodgers) at Dodger Stadium - [Buy Tickets](https://www.mlb.com/dodgers/tickets)'],
      concerts: ['[Hollywood Bowl concert](/explore?q=Hollywood%20Bowl) - [Buy Tickets](https://www.hollywoodbowl.com)', '[The Greek Theatre show](/explore?q=The%20Greek%20Theatre) - [Buy Tickets](https://www.lagreektheatre.com)']
    },
    'san francisco': {
      restaurants: ['[Tartine Bakery](/explore?q=Tartine%20Bakery)', '[Zuni Café](/explore?q=Zuni%20Cafe)'],
      attractions: ['[Golden Gate Park](/explore?q=Golden%20Gate%20Park)', '[Alcatraz Island](/explore?q=Alcatraz%20Island)'],
      nightlife: ['[Trick Dog](/explore?q=Trick%20Dog)', '[California Academy of Sciences Nightlife](/explore?q=California%20Academy%20of%20Sciences%20Nightlife)'],
      sports: ['[San Francisco Giants](/explore?q=San%20Francisco%20Giants) at Oracle Park - [Buy Tickets](https://www.mlb.com/giants/tickets)', '[Golden State Warriors](/explore?q=Golden%20State%20Warriors) at Chase Center - [Buy Tickets](https://www.nba.com/warriors/tickets)'],
      concerts: ['[The Fillmore concert](/explore?q=The%20Fillmore) - [Buy Tickets](https://www.livenation.com)', '[Great American Music Hall show](/explore?q=Great%20American%20Music%20Hall) - [Buy Tickets](https://www.gamh.com)']
    },
    'chicago': {
      restaurants: ['[Alinea](/explore?q=Alinea)', '[The Purple Pig](/explore?q=The%20Purple%20Pig)'],
      attractions: ['[The Art Institute of Chicago](/explore?q=The%20Art%20Institute%20of%20Chicago)', '[Millennium Park](/explore?q=Millennium%20Park)'],
      nightlife: ['[The Aviary](/explore?q=The%20Aviary)', '[Kingston Mines](/explore?q=Kingston%20Mines)'],
      sports: ['[Chicago Bulls](/explore?q=Chicago%20Bulls) at United Center - [Buy Tickets](https://www.nba.com/bulls/tickets)', '[Chicago Cubs](/explore?q=Chicago%20Cubs) at Wrigley Field - [Buy Tickets](https://www.mlb.com/cubs/tickets)'],
      concerts: ['[Chicago Symphony Orchestra](/explore?q=Chicago%20Symphony%20Orchestra) - [Buy Tickets](https://cso.org)', '[House of Blues show](/explore?q=House%20of%20Blues%20Chicago) - [Buy Tickets](https://www.houseofblues.com/chicago)']
    },
    'miami': {
      restaurants: ['[Joe\'s Stone Crab](/explore?q=Joes%20Stone%20Crab)', '[Versailles Restaurant](/explore?q=Versailles%20Restaurant)'],
      attractions: ['[Vizcaya Museum & Gardens](/explore?q=Vizcaya%20Museum%20and%20Gardens)', '[South Beach](/explore?q=South%20Beach)'],
      nightlife: ['[LIV](/explore?q=LIV%20Miami)', '[Ball & Chain](/explore?q=Ball%20and%20Chain%20Miami)'],
      sports: ['[Miami Heat](/explore?q=Miami%20Heat) at FTX Arena - [Buy Tickets](https://www.nba.com/heat/tickets)', '[Miami Marlins](/explore?q=Miami%20Marlins) at LoanDepot Park - [Buy Tickets](https://www.mlb.com/marlins/tickets)'],
      concerts: ['[The Fillmore Miami Beach](/explore?q=The%20Fillmore%20Miami%20Beach) - [Buy Tickets](https://www.fillmoremb.com)', '[Bayfront Park Amphitheater show](/explore?q=Bayfront%20Park%20Amphitheater) - [Buy Tickets](https://www.livenation.com)']
    },
    'portland': {
      restaurants: ['[Le Pigeon](/explore?q=Le%20Pigeon)', '[Pok Pok](/explore?q=Pok%20Pok)', '[Screen Door](/explore?q=Screen%20Door)'],
      attractions: ['[Powell\'s Books](/explore?q=Powells%20Books)', '[Portland Japanese Garden](/explore?q=Portland%20Japanese%20Garden)'],
      nightlife: ['[Teardrop Lounge](/explore?q=Teardrop%20Lounge)', '[Ground Kontrol Classic Arcade](/explore?q=Ground%20Kontrol)', '[Multnomah Whiskey Library](/explore?q=Multnomah%20Whiskey%20Library)'],
      sports: ['[Portland Trail Blazers](/explore?q=Portland%20Trail%20Blazers) at Moda Center - [Buy Tickets](https://www.nba.com/blazers/tickets)', '[Portland Timbers](/explore?q=Portland%20Timbers) at Providence Park - [Buy Tickets](https://www.timbers.com/tickets)'],
      concerts: ['[Crystal Ballroom](/explore?q=Crystal%20Ballroom) - [Buy Tickets](https://www.mcmenamins.com/crystal-ballroom)', '[Arlene Schnitzer Concert Hall](/explore?q=Arlene%20Schnitzer%20Concert%20Hall) - [Buy Tickets](https://www.portland5.com)']
    },
    'seattle': {
      restaurants: ['[Canlis](/explore?q=Canlis)', '[The Walrus and the Carpenter](/explore?q=The%20Walrus%20and%20the%20Carpenter)'],
      attractions: ['[Space Needle](/explore?q=Space%20Needle)', '[Pike Place Market](/explore?q=Pike%20Place%20Market)'],
      nightlife: ['[Canon](/explore?q=Canon%20Seattle)', '[The Crocodile](/explore?q=The%20Crocodile%20Seattle)'],
      sports: ['[Seattle Seahawks](/explore?q=Seattle%20Seahawks) at Lumen Field - [Buy Tickets](https://www.seahawks.com/tickets/)', '[Seattle Mariners](/explore?q=Seattle%20Mariners) at T-Mobile Park - [Buy Tickets](https://www.mlb.com/mariners/tickets)'],
      concerts: ['[Showbox](/explore?q=Showbox%20Seattle) - [Buy Tickets](https://www.showboxpresents.com)', '[Neumos](/explore?q=Neumos) - [Buy Tickets](https://www.neumos.com)']
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
    return "I can provide information about many cities including New York, Los Angeles, San Francisco, Chicago, Miami, Portland, and Seattle. What would you like to know about these places?";
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
    return `For nightlife in ${cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1)}, check out ${cityInfo.nightlife.join(', ')}. These venues are popular and offer great experiences tonight!`;
  }

  if (query.toLowerCase().includes('sports') || query.toLowerCase().includes('game')) {
    return `For sports fans in ${cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1)}, here are current options: ${cityInfo.sports.join(', ')}. Tickets are going fast, so you might want to book soon!`;
  }

  if (query.toLowerCase().includes('concert') || query.toLowerCase().includes('music') || query.toLowerCase().includes('show')) {
    return `For live entertainment in ${cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1)} tonight, check out: ${cityInfo.concerts.join(', ')}. These venues have great performances scheduled!`;
  }
  
  // "What's going on tonight" or similar generic query
  if (query.toLowerCase().includes('tonight') || query.toLowerCase().includes('going on') || query.toLowerCase().includes('happening')) {
    return `Here's what's happening in ${cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1)} tonight:
    
🍽️ **Food**: ${cityInfo.restaurants.join(', ')}
    
🍸 **Nightlife**: ${cityInfo.nightlife.join(', ')}
    
🏛️ **Attractions**: ${cityInfo.attractions.join(', ')}
    
🏈 **Sports**: ${cityInfo.sports.join(', ')}
    
🎵 **Live Entertainment**: ${cityInfo.concerts.join(', ')}
    
All these places are showing good activity levels tonight according to recent vibes. Which one sounds most interesting?`;
  }
  
  // General response about the city
  return `Here's what ${cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1)} has to offer:
  
🍽️ **Restaurants**: ${cityInfo.restaurants.join(', ')}
  
🏛️ **Attractions**: ${cityInfo.attractions.join(', ')}
  
🍸 **Nightlife**: ${cityInfo.nightlife.join(', ')}

🏈 **Sports**: ${cityInfo.sports.join(', ')}

🎵 **Live Entertainment**: ${cityInfo.concerts.join(', ')}
  
Let me know if you'd like more specific recommendations!`;
}
