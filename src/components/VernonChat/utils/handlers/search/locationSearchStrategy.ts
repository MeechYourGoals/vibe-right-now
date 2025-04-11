
import { VertexAIService } from '@/services/VertexAIService';
import { cleanResponseText } from '../../responseFormatter';
import { extractCategories } from '@/services/VertexAI/analysis';

/**
 * Handles location-based searches using Vertex AI search capabilities
 */
export const LocationSearchStrategy = {
  /**
   * Detects if a query is likely related to locations or events
   */
  isLocationQuery(inputValue: string): boolean {
    // Enhanced detection for location and venue queries
    const locationKeywords = /what|where|when|how|things\s+to\s+do|events|places|restaurants|bars|attractions|activities|visit|in|at|near|around|nearby|close to|open now|happening|this weekend|tonight/i;
    const venueTypes = /restaurant|cafe|bar|club|museum|theater|cinema|park|mall|store|shop|concert|venue|hotel|beach|gallery|gym|spa|salon|nightclub|lounge/i;
    const cityNames = /miami|new york|los angeles|chicago|san francisco|boston|seattle|austin|denver|nashville|atlanta|portland|dallas|houston|phoenix|philadelphia|san diego|las vegas|orlando|washington|dc/i;
    const cuisineTypes = /italian|mexican|chinese|japanese|thai|indian|french|mediterranean|spanish|korean|vietnamese|vegan|vegetarian|gluten-free|seafood|steak|bbq|pizza|sushi|burger/i;
    const ambience = /romantic|quiet|lively|cozy|family-friendly|upscale|casual|trendy|hipster|outdoor|rooftop|waterfront|historic|modern|intimate/i;
    
    return locationKeywords.test(inputValue) || 
           venueTypes.test(inputValue) || 
           cityNames.test(inputValue) ||
           cuisineTypes.test(inputValue) ||
           ambience.test(inputValue);
  },
  
  /**
   * Processes a location-based query using Vertex AI search and Cloud Natural Language API
   */
  async handleLocationSearch(inputValue: string): Promise<{response: string, categories: string[]}> {
    console.log('Location query detected, using Cloud Natural Language API and Vertex AI search');
    try {
      // First, extract categories using the Cloud Natural Language API
      const extractedCategories = await extractCategories(inputValue);
      console.log('Extracted categories using Cloud NLP:', extractedCategories);
      
      // Enhance the prompt for location-specific information
      const enhancedPrompt = `
        Please provide real information about "${inputValue}".
        Include:
        - Names of specific venues, attractions or events
        - Actual addresses and locations
        - Opening hours and pricing when available
        - Links to official websites if possible
        - If it's about restaurants or bars, mention the type of cuisine or drinks they serve
        - For entertainment venues, include any upcoming special events
        - Mention if reservations are recommended
        - For outdoor places, note any special features or tips
        - Add whether the place is kid-friendly, pet-friendly, or good for groups
        
        Focus on giving practical information that would help someone planning to visit.
        Group information by categories (dining, nightlife, attractions, events, etc.)
        If the query mentions "nearby" or "close", prioritize places within walking distance.
        If the query mentions "open now", only include places that are currently open.
      `;
      
      const vertexResponse = await VertexAIService.searchWithVertex(enhancedPrompt);
      
      if (vertexResponse && vertexResponse.length > 100) {
        console.log('Got real-world information from Vertex AI');
        
        // Extract likely categories based on content
        const contentCategories: string[] = [];
        const categoryKeywords = {
          'dining': /restaurant|dining|food|eat|cuisine|menu|chef|brunch|dinner|lunch|breakfast|culinary|bistro|eatery|cafe|cafeteria|diner/i,
          'nightlife': /bar|club|nightlife|pub|cocktail|brewery|dance|dj|party|lounge|tavern|distillery|mixology/i,
          'attractions': /museum|park|gallery|attraction|sight|tour|historical|memorial|zoo|aquarium|landmark|monument|statue/i,
          'events': /show|concert|performance|festival|event|theater|theatre|exhibition|game|tournament|match|screening|premiere/i,
          'comedy': /comedy|comedian|stand[\s-]?up|improv|funny|laugh|jokes|humor|witty/i,
          'family': /family|kid|child|children|playground|arcade|amusement|miniature golf|carousel|zoo|aquarium/i,
          'sports': /sports|game|match|stadium|arena|court|field|gym|fitness|exercise|workout|athletic/i,
          'shopping': /shop|mall|boutique|store|market|outlet|retail|plaza|shopping center|galleria/i,
          'outdoors': /hiking|beach|park|trail|nature|garden|outdoor|mountain|lake|river|forest|camping/i
        };
        
        Object.entries(categoryKeywords).forEach(([category, regex]) => {
          if (regex.test(vertexResponse)) {
            contentCategories.push(category);
          }
        });
        
        // Combine extracted categories from NLP API with content-based categories
        const allCategories = [...new Set([...extractedCategories, ...contentCategories])];
        
        // Set categories in sessionStorage for the Explore page to use
        if (allCategories.length > 0) {
          try {
            sessionStorage.setItem('lastSearchCategories', JSON.stringify(allCategories));
            sessionStorage.setItem('lastSearchQuery', inputValue);
            sessionStorage.setItem('lastSearchTimestamp', new Date().toISOString());
            console.log('Set search categories in session storage:', allCategories);
          } catch (e) {
            console.error('Error setting categories in sessionStorage:', e);
          }
        }
        
        // Include a link to the Explore page for a better visual experience
        const exploreLinkText = "\n\nYou can also [view all these results on our Explore page](/explore?q=" + 
          encodeURIComponent(inputValue) + ") for a better visual experience with an interactive map.";
        
        return {
          response: cleanResponseText(vertexResponse + exploreLinkText),
          categories: allCategories
        };
      }
      
      return { response: '', categories: extractedCategories };
    } catch (vertexError) {
      console.error('Vertex AI search failed:', vertexError);
      return { response: '', categories: [] };
    }
  }
};
