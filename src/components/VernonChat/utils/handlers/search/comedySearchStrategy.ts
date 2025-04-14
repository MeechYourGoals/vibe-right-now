
import { SearchService } from '@/services/search/SearchService';
import { cleanResponseText } from '../../responseFormatter';
import { getComedyEventsForCity } from '@/services/search/eventService';

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
      // Extract location from query if possible
      const locationMatch = inputValue.match(/in\s+([A-Za-z\s]+)(?:,|\s|$)/i);
      const city = locationMatch ? locationMatch[1].trim() : '';
      const stateMatch = inputValue.match(/([A-Za-z\s]+),\s+([A-Za-z]{2})/i);
      const state = stateMatch ? stateMatch[2].trim() : '';
      
      // Try to get real comedy events if location is provided
      if (city) {
        try {
          // Get real comedy events using our new service
          const comedyEvents = await getComedyEventsForCity(city, state);
          if (comedyEvents && comedyEvents.length > 0) {
            // Format the comedy events for chat display
            const eventsList = comedyEvents.map(event => `
- **${event.title}** 
  - ${new Date(event.date).toLocaleDateString()} at ${event.time}
  - ${event.location}
  - ${event.price}
            `).join('\n');
            
            const response = `Here are some comedy shows in ${city}${state ? `, ${state}` : ''}:\n\n${eventsList}`;
            
            const comedyExploreLinkText = "\n\nYou can also [view all comedy shows on our Explore page](/explore?q=" + 
              encodeURIComponent(inputValue) + "&tab=comedy) for a better visual experience.";
            
            // Set comedy category in sessionStorage
            try {
              sessionStorage.setItem('lastSearchCategories', JSON.stringify(['comedy']));
              sessionStorage.setItem('lastSearchQuery', inputValue);
            } catch (e) {
              console.error('Error setting categories in sessionStorage:', e);
            }
            
            return cleanResponseText(response + comedyExploreLinkText);
          }
        } catch (eventsError) {
          console.error('Error fetching comedy events:', eventsError);
        }
      }
      
      // Fallback to using SearchService if we couldn't get real events
      const comedyResponse = await SearchService.comedySearch(inputValue);
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
