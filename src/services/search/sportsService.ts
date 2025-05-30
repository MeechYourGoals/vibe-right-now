
import { getCitySpecificWebsite } from './locationService';

export async function generateSportsResponse(city: string): Promise<string> { // Modified signature
  return `Sports fans in ${city} have plenty to cheer about:

1. **${await getCitySpecificSportsTeam(city, "baseball")}** - The local baseball team plays at ${await getCitySpecificStadium(city, "baseball")}. [Schedule & Tickets](${await getSportsWebsite(city, "baseball")})

2. **${await getCitySpecificSportsTeam(city, "basketball")}** - Catch an exciting basketball game at the ${await getCitySpecificArena(city)}. [Official Team Site](${await getSportsWebsite(city, "basketball")})

3. **${await getCitySpecificSportsTeam(city, "football")}** - Football games are a major event at ${await getCitySpecificStadium(city, "football")}. Season typically runs September through January.

4. **${city} Marathon** - Annual racing event that draws participants from around the country. [Registration Information](${await getCitySpecificWebsite(city, "marathon")})

5. **Local College Sports** - ${await getCitySpecificCollege(city)} has competitive teams in various sports with affordable ticket prices.

Be sure to book tickets in advance for professional games, as they often sell out.`;
}

export async function getCitySpecificSportsTeam(city: string, sport: string = "basketball"): Promise<string> { // Modified signature
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

export async function getCitySpecificSportsEvent(city: string): Promise<string> { // Modified signature
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

export async function getSportsEventWebsite(city: string): Promise<string> { // Modified signature
  const cityLower = city.toLowerCase();
  
  if (cityLower.includes("boston") && cityLower.includes("marathon")) {
    return "https://www.baa.org";
  } else if ((cityLower.includes("new york") || cityLower === "nyc") && cityLower.includes("marathon")) {
    return "https://www.nyrr.org";
  } else {
    return `https://www.${city.toLowerCase().replace(/\s+/g, "")}sports.com`;
  }
}

export async function getCitySpecificStadium(city: string, sport: string = "baseball"): Promise<string> { // Modified signature
  return `${city} ${sport === "baseball" ? "Ballpark" : "Stadium"}`;
}

export async function getCitySpecificArena(city: string): Promise<string> { // Modified signature
  return `${city} Arena`;
}

export async function getSportsWebsite(city: string, sport: string = "basketball"): Promise<string> { // Modified signature
  return `https://www.${city.toLowerCase().replace(/\s+/g, "")}${sport}.com`;
}

export async function getCitySpecificCollege(city: string): Promise<string> { // Modified signature
  return `University of ${city}`;
}
