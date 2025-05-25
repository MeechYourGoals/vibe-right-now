import { PlaceService } from '@/services/PlaceService';

/**
 * Gets a specific type of location (e.g., downtown, waterfront) in a given city.
 * @param city The city name.
 * @param type The type of location (e.g., "downtown", "waterfront", "gardens").
 * @returns The name of the location or a fallback message.
 */
export async function getCitySpecificLocation(city: string, type: string = "downtown"): Promise<string> {
  try {
    const query = `${type} in ${city}`;
    const places = await PlaceService.searchPlacesByText(query);
    if (places && places.length > 0 && places[0].name) {
      return places[0].name;
    }
    return `No specific ${type} found for ${city}. You can try a general web search.`;
  } catch (error) {
    console.error(`Error fetching ${type} for ${city}:`, error);
    return `Could not fetch ${type} information for ${city}. Please try a web search.`;
  }
}

/**
 * Gets a famous neighborhood in a given city.
 * @param city The city name.
 * @returns The name of a neighborhood or a fallback message.
 */
export async function getCitySpecificNeighborhood(city: string): Promise<string> {
  try {
    const query = `famous neighborhood in ${city}`;
    const places = await PlaceService.searchPlacesByText(query);
    if (places && places.length > 0 && places[0].name) {
      return places[0].name;
    }
    return `No specific neighborhood found for ${city}. You can try a general web search.`;
  } catch (error) {
    console.error(`Error fetching neighborhood for ${city}:`, error);
    return `Could not fetch neighborhood information for ${city}. Please try a web search.`;
  }
}

/**
 * Gets a website relevant to the city, possibly for a prominent place.
 * @param city The city name.
 * @param type The type of information (e.g., "general", "tourist information").
 * @returns A website URL or a Google search URL as a fallback.
 */
export async function getCitySpecificWebsite(city: string, type: string = "general"): Promise<string> {
  try {
    const query = type === "general" ? `official city website ${city}` : `${type} in ${city}`;
    const places = await PlaceService.searchPlacesByText(query);
    if (places && places.length > 0 && places[0].website) {
      return places[0].website;
    }
    // Fallback: try to get details of a prominent place like city hall or tourist info
    const prominentPlaceQuery = `city hall in ${city}`;
    const prominentPlaces = await PlaceService.searchPlacesByText(prominentPlaceQuery);
    if (prominentPlaces && prominentPlaces.length > 0 && prominentPlaces[0].place_id) {
        const details = await PlaceService.getPlaceDetails(prominentPlaces[0].place_id, ['website']);
        if (details && details.website) {
            return details.website;
        }
    }
    return `https://www.google.com/search?q=${encodeURIComponent(city + " " + type + " information")}`;
  } catch (error) {
    console.error(`Error fetching website for ${city} (${type}):`, error);
    return `https://www.google.com/search?q=${encodeURIComponent(city + " " + type + " information")}`;
  }
}

/**
 * Gets a prominent park in a given city.
 * @param city The city name.
 * @returns The name of a park or a fallback message.
 */
export async function getCitySpecificPark(city: string): Promise<string> {
  try {
    const query = `park in ${city}`;
    const places = await PlaceService.searchPlacesByText(query, "park");
    if (places && places.length > 0 && places[0].name) {
      return places[0].name;
    }
    return `No specific park found for ${city}. You can try a general web search.`;
  } catch (error) {
    console.error(`Error fetching park for ${city}:`, error);
    return `Could not fetch park information for ${city}. Please try a web search.`;
  }
}

/**
 * Provides guidance on finding weather information for a city.
 * @param city The city name.
 * @returns An informational string.
 */
export function getCitySpecificWeather(city: string): string {
  return `Please use a web search (e.g., Google, weather websites) to find the current weather in ${city}.`;
}

/**
 * Provides guidance on finding the best season to visit a city.
 * @param city The city name.
 * @returns An informational string.
 */
export function getCitySpecificSeason(city: string): string {
  return `For the best season to visit ${city}, please consult travel guides or perform a web search.`;
}
