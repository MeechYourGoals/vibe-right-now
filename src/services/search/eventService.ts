
import { getCitySpecificLocation } from './locationService';
import { getCitySpecificWebsite } from './locationService';

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

