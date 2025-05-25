import { GoogleAIService } from '@/services/GoogleAIService';
import { DateRange } from "react-day-picker"; // Keep for type signature if needed by callers
import { format } from "date-fns"; // Keep for formatting dates in query

// Removed EventItem type and uuidv4 as they are no longer used here.

/**
 * Fetches music event information for a given city and state, optionally within a date range.
 * @param city The city name.
 * @param state The state abbreviation.
 * @param dateRange Optional date range for the event search.
 * @returns A promise that resolves to a string with event information or null.
 */
export async function fetchMusicEvents(
  city: string,
  state: string,
  dateRange?: DateRange
): Promise<string | null> {
  try {
    let query = `live music events in ${city}, ${state}`;
    if (dateRange?.from) {
      query += ` starting from ${format(dateRange.from, "MMMM d, yyyy")}`;
      if (dateRange.to) {
        query += ` until ${format(dateRange.to, "MMMM d, yyyy")}`;
      }
    }
    console.log(`Searching for music events with query: ${query}`);
    const results = await GoogleAIService.search(query);
    return results || `No music events found for ${city}, ${state} during the specified dates.`;
  } catch (error) {
    console.error('Error fetching music events:', error);
    return `Could not fetch music events for ${city}, ${state} at this time. Please try again later.`;
  }
}

/**
 * Fetches comedy event information for a given city and state, optionally within a date range.
 * @param city The city name.
 * @param state The state abbreviation.
 * @param dateRange Optional date range for the event search.
 * @returns A promise that resolves to a string with event information or null.
 */
export async function fetchComedyEvents(
  city: string,
  state: string,
  dateRange?: DateRange
): Promise<string | null> {
  try {
    let query = `comedy shows in ${city}, ${state}`;
    if (dateRange?.from) {
      query += ` starting from ${format(dateRange.from, "MMMM d, yyyy")}`;
      if (dateRange.to) {
        query += ` until ${format(dateRange.to, "MMMM d, yyyy")}`;
      }
    }
    console.log(`Searching for comedy events with query: ${query}`);
    const results = await GoogleAIService.search(query);
    return results || `No comedy events found for ${city}, ${state} during the specified dates.`;
  } catch (error) {
    console.error('Error fetching comedy events:', error);
    return `Could not fetch comedy events for ${city}, ${state} at this time. Please try again later.`;
  }
}

/**
 * Generates a summary response for general events in a city using Google Search.
 * @param city The city name.
 * @returns A promise that resolves to a string with event information or null.
 */
export async function generateEventsResponse(city: string): Promise<string | null> {
  try {
    const query = `upcoming events in ${city}`;
    console.log(`Searching for general events with query: ${query}`);
    const results = await GoogleAIService.search(query);
    if (results) {
      // Basic summarization if results are too long, could be more sophisticated
      return results.length > 1000 ? results.substring(0, 997) + "..." : results;
    }
    return `No general events found for ${city}. Try specifying an event type or date range.`;
  } catch (error) {
    console.error('Error generating events response:', error);
    return `Could not fetch event information for ${city} at this time. Please try again later.`;
  }
}

/**
 * Fetches information about a specific or popular event in a city using Google Search.
 * @param city The city name.
 * @returns A promise that resolves to a string with event information or null.
 */
export async function getCitySpecificEvent(city: string): Promise<string | null> {
  try {
    const query = `popular event in ${city}`;
    console.log(`Searching for specific event with query: ${query}`);
    const results = await GoogleAIService.search(query);
    return results || `No specific popular event found for ${city}. Try a broader search.`;
  } catch (error) {
    console.error('Error fetching specific city event:', error);
    return `Could not fetch specific event information for ${city} at this time. Please try again later.`;
  }
}

/**
 * Fetches event website information for a city using Google Search.
 * @param city The city name.
 * @returns A promise that resolves to a string with website information or null.
 */
export async function getEventWebsite(city: string): Promise<string | null> {
  try {
    const query = `official event ticket website for ${city} or Ticketmaster ${city}`;
    console.log(`Searching for event website with query: ${query}`);
    const results = await GoogleAIService.search(query);
    return results || `No event website information found for ${city}. Try searching directly on venue or ticket seller sites.`;
  } catch (error) {
    console.error('Error fetching event website:', error);
    return `Could not fetch event website information for ${city} at this time. Please try again later.`;
  }
}

// Removed:
// - generateMusicEvents
// - generateComedyEvents
// - getComedyEventsForCity
// - EventItem type (definition itself)
// - Mock data arrays (mockArtists, mockVenues, mockComedians)
// - uuidv4 import
//
// The functions fetchMusicEvents and fetchComedyEvents were kept but their implementation
// and return types were changed as per instructions.
// DateRange and format imports are kept as they are used in the function signatures/bodies.
// If EventItem is used by other parts of the application (e.g., UI components),
// those parts will need to be refactored separately. This service no longer produces EventItem[].
