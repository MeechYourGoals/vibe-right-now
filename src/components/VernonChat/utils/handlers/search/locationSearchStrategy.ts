
import { VertexAIService } from '@/services/VertexAIService';
import { cleanResponseText } from '../../responseFormatter';

/**
 * Handles location-based searches using Vertex AI search capabilities
 */
export const LocationSearchStrategy = {
  /**
   * Detects if a query is likely related to locations or events
   */
  isLocationQuery(inputValue: string): boolean {
    const isLocationQuery = /what|where|when|things to do|events|places|restaurants|bars|attractions|activities|visit|in|at|near|around/i.test(inputValue);
    const hasCityName = /miami|new york|los angeles|chicago|san francisco|boston|seattle|austin|denver|nashville|atlanta|portland|dallas|houston|phoenix|philadelphia|san diego|las vegas|orlando|washington|dc/i.test(inputValue);
    
    return isLocationQuery || hasCityName;
  },
  
  /**
   * Processes a location-based query using Vertex AI search
   */
  async handleLocationSearch(inputValue: string): Promise<{response: string, categories: string[]}> {
    console.log('Location query detected, trying Vertex AI search first');
    try {
      const vertexResponse = await VertexAIService.searchWithVertex(inputValue);
      
      if (vertexResponse && vertexResponse.length > 100 && !vertexResponse.includes("I don't have specific information")) {
        console.log('Got real-world information from Vertex AI');
        
        // Extract likely categories based on content
        const categories: string[] = [];
        if (vertexResponse.toLowerCase().includes('restaurant') || vertexResponse.toLowerCase().includes('dining')) {
          categories.push('dining');
        }
        if (vertexResponse.toLowerCase().includes('bar') || vertexResponse.toLowerCase().includes('club') || vertexResponse.toLowerCase().includes('nightlife')) {
          categories.push('nightlife');
        }
        if (vertexResponse.toLowerCase().includes('museum') || vertexResponse.toLowerCase().includes('park') || vertexResponse.toLowerCase().includes('attraction')) {
          categories.push('attractions');
        }
        if (vertexResponse.toLowerCase().includes('show') || vertexResponse.toLowerCase().includes('concert') || vertexResponse.toLowerCase().includes('event')) {
          categories.push('events');
        }
        
        // Set categories in sessionStorage for the Explore page to use
        if (categories.length > 0) {
          try {
            sessionStorage.setItem('lastSearchCategories', JSON.stringify(categories));
            sessionStorage.setItem('lastSearchQuery', inputValue);
            console.log('Set search categories in session storage:', categories);
          } catch (e) {
            console.error('Error setting categories in sessionStorage:', e);
          }
        }
        
        // Include a link to the Explore page for a better visual experience
        const exploreLinkText = "\n\nYou can also [view all these results on our Explore page](/explore?q=" + 
          encodeURIComponent(inputValue) + ") for a better visual experience.";
        
        return {
          response: cleanResponseText(vertexResponse + exploreLinkText),
          categories
        };
      }
      
      return { response: '', categories: [] };
    } catch (vertexError) {
      console.error('Vertex AI search failed, trying other methods:', vertexError);
      return { response: '', categories: [] };
    }
  }
};
