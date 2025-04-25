
import { VertexAIService } from '@/services/VertexAIService';
import { cleanResponseText } from '../../responseFormatter';
import { extractCategories } from '@/services/VertexAI/analysis';
import { OpenAIService } from '@/services/OpenAIService';

/**
 * Handles location-based searches using OpenAI search capabilities
 */
export const LocationSearchStrategy = {
  /**
   * Detects if a query is likely related to locations or events
   */
  isLocationQuery(inputValue: string): boolean {
    const locationKeywords = /what|where|when|how|things\s+to\s+do|events|places|restaurants|bars|attractions|activities|visit|in|at|near|around/i;
    const cityNames = /miami|new york|los angeles|chicago|san francisco|boston|seattle|austin|denver|nashville|atlanta|portland|dallas|houston|phoenix|philadelphia|san diego|las vegas|orlando|washington|dc/i;
    
    return locationKeywords.test(inputValue) || cityNames.test(inputValue);
  },
  
  /**
   * Processes a location-based query using OpenAI search and Cloud Natural Language API
   */
  async handleLocationSearch(inputValue: string): Promise<{response: string, categories: string[]}> {
    console.log('Location query detected, using OpenAI search');
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
        
        Focus on giving practical information that would help someone planning to visit.
        Group information by categories (dining, nightlife, attractions, events, etc.)
      `;
      
      // Create system message to guide OpenAI response
      const systemMessage = {
        role: 'system',
        content: 'You are a helpful assistant specialized in providing accurate information about places, venues, events, and things to do. Your responses should be detailed, well-organized, and include specific information like addresses, hours, and prices when available.'
      };
      
      // Use OpenAI chat completion for better results
      const openAIResponse = await OpenAIService.sendChatRequest([
        systemMessage,
        { role: 'user', content: enhancedPrompt }
      ], {
        model: 'gpt-4o',
        context: 'user'
      });
      
      if (openAIResponse && openAIResponse.length > 100) {
        console.log('Got real-world information from OpenAI');
        
        // Extract likely categories based on content
        const contentCategories: string[] = [];
        const categoryKeywords = {
          'dining': /restaurant|dining|food|eat|cuisine|menu|chef|brunch|dinner|lunch/i,
          'nightlife': /bar|club|nightlife|pub|cocktail|brewery|dance|dj|party/i,
          'attractions': /museum|park|gallery|attraction|sight|tour|historical|memorial|zoo|aquarium/i,
          'events': /show|concert|performance|festival|event|theater|theatre|exhibition|game/i,
          'comedy': /comedy|comedian|stand[\s-]?up|improv|funny|laugh|jokes/i
        };
        
        Object.entries(categoryKeywords).forEach(([category, regex]) => {
          if (regex.test(openAIResponse)) {
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
          encodeURIComponent(inputValue) + ") for a better visual experience.";
        
        return {
          response: cleanResponseText(openAIResponse + exploreLinkText),
          categories: allCategories
        };
      }
      
      // Fall back to VertexAI if OpenAI fails
      const vertexResponse = await VertexAIService.searchWithVertex(enhancedPrompt);
      
      if (vertexResponse && vertexResponse.length > 100) {
        // Similar processing as above for VertexAI response
        return {
          response: cleanResponseText(vertexResponse),
          categories: extractedCategories
        };
      }
      
      return { response: '', categories: extractedCategories };
    } catch (error) {
      console.error('OpenAI search failed:', error);
      
      // Fall back to VertexAI
      try {
        const vertexResponse = await VertexAIService.searchWithVertex(inputValue);
        if (vertexResponse && vertexResponse.length > 100) {
          return {
            response: cleanResponseText(vertexResponse),
            categories: []
          };
        }
      } catch (vertexError) {
        console.error('Vertex AI search also failed:', vertexError);
      }
      
      return { response: '', categories: [] };
    }
  }
};
