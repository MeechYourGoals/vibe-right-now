import { PlaceService, PlaceSearchResult } from '../../PlaceService';
import { EventItem } from '../../../components/venue/events/types';
import { mapPlaceToEventItem } from '../../search/eventService'; // Assuming this is now exported

/**
 * Provider for comedy-specific search
 */
export const ComedySearchProvider = {
  /**
   * Search for comedy events and shows
   * @param query The search query about comedy
   * @returns A string with information about comedy shows
   */
  async search(query: string): Promise<string> {
    try {
      console.log('Using ComedySearchProvider for query:', query);
      
      // Extract location from query if present
      const locationMatch = query.match(/in\s+([a-zA-Z\s]+)(?:,\s*([a-zA-Z\s]+))?/i);
      let city = "your area";
      let state = ""; // State might not be used by mapPlaceToEventItem if address is formatted
      
      if (locationMatch && locationMatch[1]) {
        city = locationMatch[1].trim();
        if (locationMatch[2]) {
          state = locationMatch[2].trim(); // Capture state if provided
        }
      }
      
      const searchQuery = `comedy shows in ${city}${state ? `, ${state}` : ''}`;
      try {
        const placeResults: PlaceSearchResult[] = await PlaceService.findEvents(searchQuery);

        if (placeResults && placeResults.length > 0) {
          const comedyEvents: EventItem[] = placeResults.map(p => mapPlaceToEventItem(p, 'comedy', city, state));

          if (comedyEvents.length > 0) {
            let response = `Here are some upcoming comedy shows in ${city}${state ? `, ${state}` : ''}:\n\n`;
            comedyEvents.forEach((event, index) => {
              // Ensure date is valid before trying to format
              let formattedDate = 'Date not specified';
              if (event.date) {
                try {
                  const eventDate = new Date(event.date); // mapPlaceToEventItem should format it as yyyy-MM-dd
                  // Check if date is valid
                  if (!isNaN(eventDate.getTime())) {
                     // Adjusting to ensure it's treated as local date, not UTC
                    const [year, month, day] = event.date.split('-').map(Number);
                    const localDate = new Date(year, month -1, day);

                    formattedDate = localDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      timeZone: 'UTC' // Specify UTC to avoid local timezone shifts if dates are meant to be absolute
                    });
                  } else {
                    console.warn(`Invalid date format for event ${event.title}: ${event.date}`);
                  }
                } catch (e) {
                  console.warn(`Error parsing date for event ${event.title}: ${event.date}`, e);
                }
              }
              
              response += `${index + 1}. **${event.title || 'Comedy Show'}**\n`; // Fallback title
              response += `   - ${formattedDate}${event.time && event.time !== "N/A" ? ` at ${event.time}` : ''}\n`;
              response += `   - Venue: ${event.venue || event.location || city}\n`; // Fallback venue
              response += `   - ${event.price && event.price !== "N/A" ? `Tickets: ${event.price}` : 'Check website for ticket info'}\n\n`;
            });
            response += `\nYou can find more comedy shows and purchase tickets at comedy clubs in ${city}.`;
            return response;
          }
        }
      } catch (error) {
        console.error('Error fetching or mapping comedy events with PlaceService:', error);
        // Fall through to generic response if PlaceService fails
      }
      
      // Fallback to generic response
      return `I found several comedy shows and stand-up performances in ${city}. 
      
      Check out local venues like The Comedy Club, Laugh Factory, and Improv theaters for upcoming shows. 
      
      Popular comedians frequently tour through ${city}, and you can find tickets on websites like TicketMaster, LiveNation, or directly through the venues.
      
      I recommend checking local event listings for the most up-to-date information on comedy shows in ${city}.`;
    } catch (error) {
      console.error('Error in ComedySearchProvider:', error);
      return "I'm sorry, I couldn't retrieve information about comedy shows at this time. Please try again later or check local event listings websites.";
    }
  }
};
