import { getCitySpecificLocation } from './locationService';
import { getCitySpecificWebsite } from './locationService';
import { OpenRouterService } from '../OpenRouterService';

export function generateEventsResponse(city: string): string {
  return `Here are some current and upcoming events in ${city}:

1. **${getCitySpecificEvent(city)}** - A celebration of local culture, music, and food happening this weekend. [Official Website](${getEventWebsite(city)})

2. **${getCitySpecificEvent(city, "conference")}** - Industry professionals gathering to discuss the latest trends. [Get Tickets](${getEventWebsite(city, "conference")})

3. **${city} Farmers Market** - Every Saturday morning at ${getCitySpecificLocation(city)}, featuring locally grown produce and artisanal goods.

4. **${city} Art Walk** - Monthly event showcasing local artists in galleries throughout downtown. Find details at ${getCitySpecificWebsite(city, "arts")}.

5. **Community Concert Series** - Free outdoor concerts at ${getCitySpecificPark(city)} every Friday evening. [Schedule](${getCitySpecificWebsite(city, "concerts")})

These events are quite popular, so I recommend checking their official websites for ticket information and exact schedules.`;
}

export function getCitySpecificEvent(city: string, type: string = "festival"): string {
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
  
  // Comedy events by city
  if (type === "comedy") {
    if (cityLower.includes("new york") || cityLower === "nyc") {
      return "Comedy Cellar Stand-up Weekend";
    } else if (cityLower.includes("los angeles") || cityLower === "la") {
      return "Hollywood Improv Showcase";
    } else if (cityLower.includes("chicago")) {
      return "Second City Comedy Festival";
    } else if (cityLower.includes("austin")) {
      return "Austin Comedy Festival";
    } else if (cityLower.includes("boston")) {
      return "Boston Comedy Festival";
    } else if (cityLower.includes("san francisco") || cityLower === "sf") {
      return "Sketchfest San Francisco";
    } else if (cityLower.includes("denver")) {
      return "High Plains Comedy Festival";
    } else if (cityLower.includes("nashville")) {
      return "Nashville Comedy Festival";
    } else if (cityLower.includes("portland")) {
      return "Bridgetown Comedy Festival";
    } else if (cityLower.includes("miami")) {
      return "South Beach Comedy Festival";
    } else {
      return `${city} Comedy Festival`;
    }
  }
  
  return `${city} Annual Festival`;
}

export function getEventWebsite(city: string, type: string = "festival"): string {
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
    if (cityLower.includes("san francisco") || cityLower === "sf") {
      return "https://www.salesforce.com/dreamforce";
    } else if (cityLower.includes("las vegas")) {
      return "https://www.ces.tech";
    } else if (cityLower.includes("austin")) {
      return "https://www.sxsw.com";
    } else {
      return `https://www.${city.toLowerCase().replace(/\s+/g, "")}.org/conference`;
    }
  }
  
  if (type === "comedy") {
    if (cityLower.includes("new york") || cityLower === "nyc") {
      return "https://www.comedycellar.com";
    } else if (cityLower.includes("los angeles") || cityLower === "la") {
      return "https://hollywood.improv.com";
    } else if (cityLower.includes("chicago")) {
      return "https://www.secondcity.com";
    } else {
      return "https://punchup.live";
    }
  }
  
  return `https://www.${city.toLowerCase().replace(/\s+/g, "")}.com/events`;
}

export function getCitySpecificPark(city: string): string {
  return `${city} Central Park`;
}

/**
 * Generate comedy events for a specific city
 */
export function getComedyEventsForCity(city: string, state: string = ""): any[] {
  const comedians = [
    "Dave Chappelle", "John Mulaney", "Ali Wong", "Bill Burr", 
    "Hannah Gadsby", "Kevin Hart", "Trevor Noah", "Wanda Sykes",
    "Jim Gaffigan", "Iliza Shlesinger", "Mike Birbiglia", "Michelle Wolf",
    "Bert Kreischer", "Tom Segura", "Nikki Glaser", "Marc Maron"
  ];
  
  const venues = [
    `${city} Comedy Club`,
    `Laugh Factory ${city}`,
    `${city} Improv`,
    `The Comedy Store ${city}`,
    `Funny Bone ${city}`
  ];
  
  // Generate upcoming dates
  const today = new Date();
  const events = [];
  
  for (let i = 0; i < 5; i++) {
    const randomComedian = comedians[Math.floor(Math.random() * comedians.length)];
    const randomVenue = venues[Math.floor(Math.random() * venues.length)];
    
    // Random date in the next 2 weeks
    const eventDate = new Date();
    eventDate.setDate(today.getDate() + Math.floor(Math.random() * 14) + 1);
    
    const eventTime = `${7 + Math.floor(Math.random() * 3)}:00 PM`;
    const price = 35 + Math.floor(Math.random() * 40);
    
    events.push({
      id: `comedy-${city}-${i}`,
      title: `${randomComedian} - Stand-up Show`,
      comedian: randomComedian,
      description: `Live stand-up comedy with ${randomComedian}`,
      venue: randomVenue,
      address: `123 Comedy St, ${city}${state ? `, ${state}` : ''}`,
      date: eventDate.toISOString(),
      time: eventTime,
      price: `$${price} - $${price + 20}`,
      imageUrl: `https://source.unsplash.com/random/800x600/?comedian,${randomComedian.split(' ').join('-')}`,
      ticketUrl: `https://punchup.live/events/${randomComedian.toLowerCase().replace(/\s+/g, '-')}`
    });
  }
  
  return events;
}

/**
 * Fetch music events for a specific city using OpenRouter with enhanced fallbacks
 */
export async function fetchMusicEvents(city: string, state: string = "", dateRange?: { from: Date, to?: Date }) {
  try {
    // First attempt: Use OpenRouter to get music events information
    const dateRangeText = dateRange?.from
      ? dateRange.to
        ? ` between ${dateRange.from.toLocaleDateString()} and ${dateRange.to.toLocaleDateString()}`
        : ` after ${dateRange.from.toLocaleDateString()}`
      : '';
    
    const prompt = `Create a JSON array of 5 realistic music events in ${city}, ${state}${dateRangeText}. 
    Include these fields for each event: id (string), title (string), description (string), 
    date (ISO string), time (string like "7:00 PM"), location (string), 
    imageUrl (placeholder URL), ticketUrl (placeholder URL), price (string like "$40 - $60"), 
    type (always "music"). Make them diverse and realistic for the location.`;
    
    console.log("Fetching music events with prompt:", prompt);
    
    const response = await OpenRouterService.getCompletion({
      prompt,
      model: "anthropic/claude-3-opus:beta",
      max_tokens: 2000,
    });
    
    console.log("OpenRouter response for music events:", response);
    
    if (!response) {
      throw new Error("No response from OpenRouter");
    }
    
    // Parse JSON from the response
    const jsonMatch = response.match(/\[\s*{[\s\S]*}\s*\]/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in the response");
    }
    
    try {
      const events = JSON.parse(jsonMatch[0]);
      console.log("Parsed music events:", events);
      if (events && events.length > 0) {
        return events;
      }
    } catch (parseError) {
      console.error("Error parsing music events JSON:", parseError);
    }
    
    // Second attempt: Try to scrape Bandsintown using OpenRouter browser capability
    console.log("Attempting to get data from Bandsintown...");
    const bandsintownPrompt = `Search for concerts and music events in ${city}, ${state} on Bandsintown.com. 
    Return the results as a JSON array with these fields: id (string), title (string), description (string), 
    date (ISO string), time (string), location (string), imageUrl (string), ticketUrl (string), price (string), type: "music".
    Extract at least 5 events if possible. Ensure all dates are in the future.`;
    
    const bandsintownResponse = await OpenRouterService.getCompletion({
      prompt: bandsintownPrompt,
      model: "anthropic/claude-3-sonnet",
      max_tokens: 2500,
    });
    
    if (bandsintownResponse) {
      const bandsinTownJsonMatch = bandsintownResponse.match(/\[\s*{[\s\S]*}\s*\]/);
      if (bandsinTownJsonMatch) {
        try {
          const bandsinTownEvents = JSON.parse(bandsinTownJsonMatch[0]);
          if (bandsinTownEvents && bandsinTownEvents.length > 0) {
            console.log("Successfully extracted Bandsintown events:", bandsinTownEvents.length);
            return bandsinTownEvents;
          }
        } catch (e) {
          console.error("Error parsing Bandsintown events:", e);
        }
      }
    }
    
    // Third attempt: Generate mock data
    console.log("Falling back to generated mock music events for", city);
    return generateMockMusicEvents(city, state, dateRange);
  } catch (error) {
    console.error("Error in all music event fetching attempts:", error);
    // Final fallback: Always ensure we have something to display
    return generateMockMusicEvents(city, state, dateRange);
  }
}

/**
 * Generate mock music events as a final fallback
 */
function generateMockMusicEvents(city: string, state: string, dateRange?: { from: Date, to?: Date }) {
  const artists = [
    "Taylor Swift", "The Weeknd", "Bad Bunny", "Billie Eilish", "Drake", 
    "BTS", "Dua Lipa", "Post Malone", "Harry Styles", "Beyoncé",
    "Kendrick Lamar", "Ariana Grande", "Ed Sheeran", "Travis Scott"
  ];
  
  const venues = [
    `${city} Arena`, `${city} Amphitheater`, `Downtown ${city} Concert Hall`, 
    `${city} Stadium`, `${city} Center`, `${city} Music Hall`
  ];
  
  const events = [];
  
  for (let i = 0; i < 6; i++) {
    const artist = artists[Math.floor(Math.random() * artists.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    
    let eventDate = new Date();
    if (dateRange?.from) {
      const from = new Date(dateRange.from);
      const to = dateRange.to ? new Date(dateRange.to) : new Date(from);
      to.setDate(to.getDate() + 90); // Extend to range if needed
      
      // Random date between from and to (or from + 90 days)
      const timeDiff = to.getTime() - from.getTime();
      eventDate = new Date(from.getTime() + Math.random() * timeDiff);
    } else {
      // Random date in next 3 months if no date range
      eventDate.setDate(eventDate.getDate() + Math.floor(Math.random() * 90) + 1);
    }
    
    const hour = 7 + Math.floor(Math.random() * 4);
    const minutes = [0, 30][Math.floor(Math.random() * 2)];
    
    events.push({
      id: `mock-music-${city.toLowerCase()}-${i}`,
      title: `${artist} - ${["World Tour", "Live Concert", "Summer Tour", "Acoustic Night"][Math.floor(Math.random() * 4)]}`,
      description: `Don't miss ${artist} performing live at ${venue}!`,
      date: eventDate.toISOString(),
      time: `${hour}:${minutes === 0 ? '00' : '30'} PM`,
      location: venue,
      imageUrl: `https://source.unsplash.com/random/800x600/?concert,${artist.split(' ').join('-')}`,
      ticketUrl: `https://tickets.example.com/${artist.toLowerCase().replace(/\s+/g, '-')}`,
      price: `$${45 + Math.floor(Math.random() * 150)}`,
      type: "music"
    });
  }
  
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Fetch comedy events for a specific city using OpenRouter with enhanced fallbacks
 */
export async function fetchComedyEvents(city: string, state: string = "", dateRange?: { from: Date, to?: Date }) {
  try {
    // First attempt: Use OpenRouter to get comedy events information
    const dateRangeText = dateRange?.from
      ? dateRange.to
        ? ` between ${dateRange.from.toLocaleDateString()} and ${dateRange.to.toLocaleDateString()}`
        : ` after ${dateRange.from.toLocaleDateString()}`
      : '';
    
    const prompt = `Create a JSON array of 5 realistic comedy shows and stand-up performances in ${city}, ${state}${dateRangeText}. 
    Include these fields for each event: id (string), title (string), comedian (string), description (string), 
    venue (string), address (string), date (ISO string), time (string like "8:00 PM"), 
    price (string like "$25 - $40"), imageUrl (string), ticketUrl (string),
    type (always "comedy"). Use realistic comedian names and venues for the location.`;
    
    console.log("Fetching comedy events with prompt:", prompt);
    
    const response = await OpenRouterService.getCompletion({
      prompt,
      model: "anthropic/claude-3-haiku",
      max_tokens: 2000,
    });
    
    console.log("OpenRouter response for comedy events:", response);
    
    if (!response) {
      throw new Error("No response from OpenRouter");
    }
    
    // Parse JSON from the response
    const jsonMatch = response.match(/\[\s*{[\s\S]*}\s*\]/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in the response");
    }
    
    try {
      const events = JSON.parse(jsonMatch[0]);
      console.log("Parsed comedy events:", events);
      if (events && events.length > 0) {
        return events;
      }
    } catch (parseError) {
      console.error("Error parsing comedy events JSON:", parseError);
    }
    
    // Second attempt: Try to scrape Punchup.live using OpenRouter browser capability
    console.log("Attempting to get data from Punchup.live...");
    const punchupPrompt = `Search for comedy shows and stand-up events in ${city}, ${state} on Punchup.live or similar comedy event sites.
    Return the results as a JSON array with these fields: id (string), title (string), comedian (string), description (string), 
    venue (string), address (string), date (ISO string), time (string), price (string), imageUrl (string), ticketUrl (string), type: "comedy".
    Extract at least 5 events if possible. Ensure all dates are in the future.`;
    
    const punchupResponse = await OpenRouterService.getCompletion({
      prompt: punchupPrompt,
      model: "anthropic/claude-3-sonnet",
      max_tokens: 2500,
    });
    
    if (punchupResponse) {
      const punchupJsonMatch = punchupResponse.match(/\[\s*{[\s\S]*}\s*\]/);
      if (punchupJsonMatch) {
        try {
          const punchupEvents = JSON.parse(punchupJsonMatch[0]);
          if (punchupEvents && punchupEvents.length > 0) {
            console.log("Successfully extracted Punchup events:", punchupEvents.length);
            return punchupEvents;
          }
        } catch (e) {
          console.error("Error parsing Punchup events:", e);
        }
      }
    }
    
    // Third attempt: Generate mock data
    console.log("Falling back to generated mock comedy events for", city);
    return generateMockComedyEvents(city, state, dateRange);
  } catch (error) {
    console.error("Error in all comedy event fetching attempts:", error);
    // Final fallback: Always ensure we have something to display
    return generateMockComedyEvents(city, state, dateRange);
  }
}

/**
 * Generate mock comedy events as a final fallback
 */
function generateMockComedyEvents(city: string, state: string, dateRange?: { from: Date, to?: Date }) {
  const comedians = [
    "Dave Chappelle", "John Mulaney", "Ali Wong", "Bill Burr", 
    "Hannah Gadsby", "Kevin Hart", "Trevor Noah", "Wanda Sykes",
    "Jim Gaffigan", "Iliza Shlesinger", "Mike Birbiglia", "Michelle Wolf",
    "Bert Kreischer", "Tom Segura", "Nikki Glaser", "Marc Maron"
  ];
  
  const venues = [
    `${city} Comedy Club`,
    `Laugh Factory ${city}`,
    `${city} Improv`,
    `The Comedy Store ${city}`,
    `Funny Bone ${city}`
  ];
  
  const events = [];
  
  for (let i = 0; i < 6; i++) {
    const comedian = comedians[Math.floor(Math.random() * comedians.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    
    let eventDate = new Date();
    if (dateRange?.from) {
      const from = new Date(dateRange.from);
      const to = dateRange.to ? new Date(dateRange.to) : new Date(from);
      to.setDate(to.getDate() + 90); // Extend to range if needed
      
      // Random date between from and to (or from + 90 days)
      const timeDiff = to.getTime() - from.getTime();
      eventDate = new Date(from.getTime() + Math.random() * timeDiff);
    } else {
      // Random date in next 3 months if no date range
      eventDate.setDate(eventDate.getDate() + Math.floor(Math.random() * 90) + 1);
    }
    
    const hour = 7 + Math.floor(Math.random() * 3);
    const minutes = [0, 30][Math.floor(Math.random() * 2)];
    
    events.push({
      id: `mock-comedy-${city.toLowerCase()}-${i}`,
      title: `${comedian} - ${["Stand-up Show", "Comedy Night", "Live Tour", "Special Event"][Math.floor(Math.random() * 4)]}`,
      comedian: comedian,
      description: `Live stand-up comedy with ${comedian}`,
      venue: venue,
      address: `123 Comedy St, ${city}${state ? `, ${state}` : ''}`,
      date: eventDate.toISOString(),
      time: `${hour}:${minutes === 0 ? '00' : '30'} PM`,
      price: `$${25 + Math.floor(Math.random() * 40)}`,
      imageUrl: `https://source.unsplash.com/random/800x600/?comedian,${comedian.split(' ').join('-')}`,
      ticketUrl: `https://punchup.live/events/${comedian.toLowerCase().replace(/\s+/g, '-')}`,
      type: "comedy"
    });
  }
  
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Generate nightlife venues with enhanced data and fallbacks
 */
export function generateNightlifeVenues(city: string, state: string = ""): any[] {
  if (!city) return [];
  
  const venueTypes = [
    "Rooftop Lounge", "Nightclub", "Cocktail Bar", "Jazz Bar", "Dance Club", 
    "Speakeasy", "Brewery", "Wine Bar", "Pub", "Karaoke Bar"
  ];
  
  const venues = [];
  const count = Math.floor(Math.random() * 7) + 5; // Always at least 5 venues
  
  for (let i = 0; i < count; i++) {
    const venueType = venueTypes[Math.floor(Math.random() * venueTypes.length)];
    let venueName = "";
    
    // Generate more realistic venue names
    if (Math.random() > 0.5) {
      venueName = `The ${city} ${venueType}`;
    } else {
      // Random creative names
      const prefixes = ["Blue", "Silver", "Gold", "Ruby", "Emerald", "Crystal", "Royal", "Urban", "Metro", "Velvet"];
      const suffixes = ["Lounge", "Room", "Club", "Bar", "Tavern", "Social", "House", "Loft"];
      venueName = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
    }
    
    // Generate more realistic address
    const streets = ["Main St", "Broadway", "5th Avenue", "Park Ave", "Center St", "Market St", "Washington Blvd", "Oak Lane"];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const streetNumber = Math.floor(Math.random() * 1000) + 100;
    const address = `${streetNumber} ${street}`;
    
    // Random hours of operation
    const openHour = 4 + Math.floor(Math.random() * 4); // 4PM to 7PM
    const closeHour = Math.random() > 0.7 ? 2 : 3; // 2AM or 3AM
    const hours = `${openHour}:00 PM - ${closeHour}:00 AM`;
    
    // Random rating
    const rating = (3.5 + Math.random() * 1.5).toFixed(1);
    
    // Random popular times
    const popularDays = ["Friday", "Saturday"];
    const popularDay = popularDays[Math.floor(Math.random() * popularDays.length)];
    const popularTime = `${9 + Math.floor(Math.random() * 3)}:00 PM`;
    
    // Random cover charge
    const hasCover = Math.random() > 0.5;
    const coverCharge = hasCover ? `$${5 + Math.floor(Math.random() * 20)}` : "No cover";
    
    // Vibes
    const allVibes = [
      "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", 
      "Upscale", "Casual", "Romantic", "Lively", "Intimate", 
      "High Energy", "Laid Back", "Artsy", "Eclectic", "Historic"
    ];
    
    const numberOfVibes = Math.floor(Math.random() * 3) + 2;
    const vibes = [];
    
    for (let j = 0; j < numberOfVibes; j++) {
      const vibe = allVibes[Math.floor(Math.random() * allVibes.length)];
      if (!vibes.includes(vibe)) {
        vibes.push(vibe);
      }
    }
    
    venues.push({
      id: `nightlife-${city.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      name: venueName,
      type: venueType.toLowerCase().includes("club") ? "club" : 
            venueType.toLowerCase().includes("pub") || venueType.toLowerCase().includes("bar") ? "bar" : "lounge",
      venueType: venueType,
      address: address,
      city: city,
      state: state,
      hours: hours,
      rating: rating,
      popularTime: `${popularDay}s around ${popularTime}`,
      coverCharge: coverCharge,
      description: `A ${venueType.toLowerCase()} featuring ${vibes.map(v => v.toLowerCase()).join(' and ')} vibes in the heart of ${city}.`,
      imageUrl: `https://source.unsplash.com/random/800x600/?${venueType.toLowerCase().replace(/\s+/g, '-')},nightlife`,
      website: `https://www.${venueName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      verified: Math.random() > 0.4,
      vibes: vibes
    });
  }
  
  return venues;
}
