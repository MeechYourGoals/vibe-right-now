
import { ComedySearchService } from '../comedy/ComedySearchService';
import { OpenRouterService } from '@/services/OpenRouterService';

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
      let state = "";
      
      if (locationMatch && locationMatch[1]) {
        city = locationMatch[1].trim();
        if (locationMatch[2]) {
          state = locationMatch[2].trim();
        }
      }
      
      // First try using the Comedy Search Service
      try {
        const comedyResults = await ComedySearchService.comedySearch(query);
        if (comedyResults && comedyResults.length > 100) {
          return comedyResults;
        }
      } catch (error) {
        console.error('Error with ComedySearchService, trying alternative:', error);
      }
      
      // Try using OpenRouter to browse comedy websites
      try {
        const searchQuery = `comedy shows in ${city}${state ? `, ${state}` : ''}`;
        const browserEvents = await OpenRouterService.browseWebAndExtractEvents(searchQuery, 'comedy');
        
        if (browserEvents && browserEvents.length > 0) {
          let response = `Here are some upcoming comedy shows in ${city}${state ? `, ${state}` : ''}:\n\n`;
          
          browserEvents.forEach((event, index) => {
            const eventDate = event.date ? new Date(event.date) : null;
            const formattedDate = eventDate ? eventDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Upcoming';
            
            response += `${index + 1}. **${event.title || `Comedy Show featuring ${event.comedian}`}**\n`;
            response += `   - ${formattedDate}${event.time ? ` at ${event.time}` : ''}\n`;
            response += `   - Venue: ${event.venue || event.location}\n`;
            response += `   - ${event.price ? `Tickets: ${event.price}` : 'Check website for ticket info'}\n\n`;
          });
          
          response += `\nYou can find more comedy shows and purchase tickets at comedy clubs in ${city}.`;
          return response;
        }
      } catch (error) {
        console.error('Error browsing for comedy events:', error);
      }
      
      // If all else fails, generate a generic response
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
