
export function generateRestaurantsResponse(city: string): string {
  return `Here are some notable restaurants in ${city} that locals and visitors enjoy:

1. **${getCitySpecificRestaurant(city, "upscale")}** - Known for its exquisite farm-to-table cuisine and seasonal menu. [Make Reservations](${getRestaurantWebsite(city, "upscale")})

2. **${getCitySpecificRestaurant(city, "casual")}** - A casual dining spot with an extensive menu of comfort food favorites. [Menu & Hours](${getRestaurantWebsite(city, "casual")})

3. **${city} Seafood House** - Specializing in fresh catches and traditional seafood dishes. Located at ${city} waterfront.

4. **${getCitySpecificRestaurant(city, "fusion")}** - An upscale dining experience with innovative fusion cuisine. [Official Website](${getRestaurantWebsite(city, "fusion")})

5. **${getLocalRestaurantName(city)}** - A cozy spot offering brunch, lunch, and dinner with locally-sourced ingredients. A true ${city} institution.

Most of these restaurants recommend reservations, especially for weekend dining.`;
}

export function getCitySpecificRestaurant(city: string, type: string = "casual"): string {
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

export function getRestaurantWebsite(city: string, type: string = "casual"): string {
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

export function getLocalFood(city: string): string {
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

export function getLocalRestaurantName(city: string): string {
  return `${city} Kitchen`;
}
