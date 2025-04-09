
import { getCitySpecificWebsite } from './locationService';

export function generateSportsResponse(city: string): string {
  return `Sports fans in ${city} have plenty to cheer about:

1. **${getCitySpecificSportsTeam(city, "baseball")}** - The local baseball team plays at ${getCitySpecificStadium(city, "baseball")}. [Schedule & Tickets](${getSportsWebsite(city, "baseball")})

2. **${getCitySpecificSportsTeam(city, "basketball")}** - Catch an exciting basketball game at the ${getCitySpecificArena(city)}. [Official Team Site](${getSportsWebsite(city, "basketball")})

3. **${getCitySpecificSportsTeam(city, "football")}** - Football games are a major event at ${getCitySpecificStadium(city, "football")}. Season typically runs September through January.

4. **${city} Marathon** - Annual racing event that draws participants from around the country. [Registration Information](${getCitySpecificWebsite(city, "marathon")})

5. **Local College Sports** - ${getCitySpecificCollege(city)} has competitive teams in various sports with affordable ticket prices.

Be sure to book tickets in advance for professional games, as they often sell out.`;
}

export function getCitySpecificSportsTeam(city: string, sport: string = "basketball"): string {
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

export function getCitySpecificSportsEvent(city: string): string {
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

export function getSportsEventWebsite(city: string): string {
  const cityLower = city.toLowerCase();
  
  if (cityLower.includes("boston") && cityLower.includes("marathon")) {
    return "https://www.baa.org";
  } else if ((cityLower.includes("new york") || cityLower === "nyc") && cityLower.includes("marathon")) {
    return "https://www.nyrr.org";
  } else {
    return `https://www.${city.toLowerCase().replace(/\s+/g, "")}sports.com`;
  }
}

export function getCitySpecificStadium(city: string, sport: string = "baseball"): string {
  return `${city} ${sport === "baseball" ? "Ballpark" : "Stadium"}`;
}

export function getCitySpecificArena(city: string): string {
  return `${city} Arena`;
}

export function getSportsWebsite(city: string, sport: string = "basketball"): string {
  return `https://www.${city.toLowerCase().replace(/\s+/g, "")}${sport}.com`;
}

export function getCitySpecificCollege(city: string): string {
  return `University of ${city}`;
}
