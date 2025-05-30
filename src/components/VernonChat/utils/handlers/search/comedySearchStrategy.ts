
import { SearchService } from '@/services/search/SearchService';
import { cleanResponseText } from '../../responseFormatter';
import { fetchComedyEvents } from '@/services/search/eventService';
import { OpenRouterService } from '@/services/OpenRouterService';

/**
 * Handles comedy-related searches
 */
export const ComedySearchStrategy = {
  /**
   * Detects if a query is related to comedy content
   */
  isComedyQuery(inputValue: string): boolean {
    return /comedy|comedian|stand[ -]?up|improv|funny|laugh|jokes/i.test(inputValue);
  },
  
  /**
   * Processes a comedy-related query
   */
  async handleComedySearch(inputValue: string): Promise<string> {
    console.log('Comedy-related query detected, using comedy-specific search');
    try {
      // Extract city name if present
      const cityMatch = inputValue.match(/in\s+([a-zA-Z\s]+)(?:,\s*([a-zA-Z\s]+))?/i);
      let city = "your area";
      let state = "";
      
      if (cityMatch && cityMatch[1]) {
        city = cityMatch[1].trim();
        if (cityMatch[2]) {
          state = cityMatch[2].trim();
        }
      }
      
      // First attempt: Try to get real comedy events using our event service
      console.log(`Fetching comedy events for ${city}, ${state}`);
      let comedyEvents = await fetchComedyEvents(city, state);
      let comedyResponse = "";
      
      if (comedyEvents && comedyEvents.length > 0) {
        comedyResponse = `Here are some upcoming comedy shows in ${city}${state ? `, ${state}` : ''}:\n\n`;
        
        comedyEvents.forEach((event, index) => {
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          });
          
          comedyResponse += `${index + 1}. **${event.title}**\n`;
          comedyResponse += `   - ${formattedDate} at ${event.time}\n`;
          comedyResponse += `   - Venue: ${event.venue || event.location}\n`;
          comedyResponse += `   - Tickets: ${event.price}\n\n`;
        });
      } else {
        // Second attempt: Try direct web browsing using OpenRouter
        console.log('No comedy events found, trying direct web browsing');
        const searchQuery = `comedy shows in ${city}${state ? `, ${state}` : ''}`;
        const browserEvents = await OpenRouterService.browseWebAndExtractEvents(searchQuery, 'comedy');
        
        if (browserEvents && browserEvents.length > 0) {
          comedyResponse = `Here are some upcoming comedy shows in ${city}${state ? `, ${state}` : ''}:\n\n`;
          
          browserEvents.forEach((event, index) => {
            const eventDate = event.date ? new Date(event.date) : null;
            const formattedDate = eventDate ? eventDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Upcoming';
            
            comedyResponse += `${index + 1}. **${event.title || `Comedy Show featuring ${event.comedian}`}**\n`;
            comedyResponse += `   - ${formattedDate}${event.time ? ` at ${event.time}` : ''}\n`;
            comedyResponse += `   - Venue: ${event.venue || event.location}\n`;
            comedyResponse += `   - ${event.price ? `Tickets: ${event.price}` : 'Check website for ticket info'}\n\n`;
          });
        } else {
          // Third attempt: Fallback to the search service
          console.log('No comedy events found via browsing, using search service');
          comedyResponse = await SearchService.comedySearch(inputValue);
        }
      }
      
      if (comedyResponse && comedyResponse.length > 100) {
        const comedyExploreLinkText = "\n\nYou can also [view all comedy shows on our Explore page](/explore?q=" + 
          encodeURIComponent(inputValue) + "&tab=comedy) for a better visual experience.";
        
        // Set comedy category in sessionStorage
        try {
          sessionStorage.setItem('lastSearchCategories', JSON.stringify(['comedy']));
          sessionStorage.setItem('lastSearchQuery', inputValue);
        } catch (e) {
          console.error('Error setting categories in sessionStorage:', e);
        }
        
        return cleanResponseText(comedyResponse + comedyExploreLinkText);
      }
      return '';
    } catch (comedyError) {
      console.error('Comedy search failed:', comedyError);
      return '';
    }
  }
};
