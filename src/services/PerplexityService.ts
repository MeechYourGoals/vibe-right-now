
// Service to interact with free, open-source AI search alternatives
export const PerplexityService = {
  async searchPerplexity(query: string): Promise<string> {
    try {
      console.log('Searching for:', query);
      
      // First try DuckDuckGo JSONP API - most reliable free option
      try {
        // Use direct JSONP callback approach for DuckDuckGo
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&callback=&pretty=1`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (response.ok) {
          const text = await response.text();
          // Strip JSONP callback if present
          const jsonStr = text.replace(/^[^{]*/, '').replace(/[^}]*$/, '');
          
          try {
            const data = JSON.parse(jsonStr);
            
            if (data.Abstract && data.Abstract.length > 10) {
              return `Here's what I found about "${query}":\n\n${data.Abstract}`;
            } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
              let resultText = `Here's what I found about "${query}":\n\n`;
              
              // Extract information from related topics
              for (let i = 0; i < Math.min(3, data.RelatedTopics.length); i++) {
                const topic = data.RelatedTopics[i];
                if (topic.Text) {
                  resultText += `${topic.Text}\n\n`;
                }
              }
              
              return resultText;
            }
          } catch (err) {
            console.error('Error parsing DuckDuckGo response:', err);
          }
        }
      } catch (error) {
        console.log('DuckDuckGo search failed, trying alternative method:', error);
      }
      
      // Try Brave Search API as a good alternative
      try {
        // Use a CORS proxy for Brave Search to avoid CORS issues
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const braveUrl = `https://search.brave.com/api/search?q=${encodeURIComponent(query)}&format=json`;
        const braveResponse = await fetch(proxyUrl + encodeURIComponent(braveUrl));
        
        if (braveResponse.ok) {
          const proxyData = await braveResponse.json();
          if (proxyData.contents) {
            try {
              const data = JSON.parse(proxyData.contents);
              if (data.results && data.results.length > 0) {
                let resultText = `Here's what I found about "${query}":\n\n`;
                
                data.results.slice(0, 3).forEach((result: any, index: number) => {
                  resultText += `${index + 1}. ${result.title}\n${result.description || ''}\n\n`;
                });
                
                return resultText;
              }
            } catch (e) {
              console.error('Error parsing Brave search results:', e);
            }
          }
        }
      } catch (error) {
        console.log('Brave search failed, trying next service:', error);
      }
      
      // Try Wikipedia API directly - most widely accessible
      try {
        const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`, {
          method: 'GET',
        });
        
        if (wikiResponse.ok) {
          const data = await wikiResponse.json();
          if (data.extract && data.extract.length > 0) {
            return `Here's what I found about "${query}":\n\n${data.extract}`;
          }
        }
      } catch (error) {
        console.log('Wikipedia search failed, trying fallback service:', error);
      }
      
      // Try SimpleSearchService as the final fallback
      const simpleFallbackResult = await SimpleSearchService.searchForCityInfo(query);
      if (simpleFallbackResult) {
        return simpleFallbackResult;
      }
      
      // Ultimate fallback if all services fail
      return "I'm sorry, but I'm currently having trouble accessing search information. I can still help with general questions or recommendations based on information I already have.";
    } catch (error) {
      console.error('Error in search services:', error);
      return await useFallbackLocalService(query);
    }
  }
};

// Simple Search Service - imported locally so it's available
import { SimpleSearchService } from './SimpleSearchService';

// Fallback service that uses local knowledge when online services fail
function useFallbackLocalService(query: string): string {
  // Extract location queries for better responses when all services fail
  const lowercaseQuery = query.toLowerCase();
  
  // Handle location-specific queries with a helpful response
  if (lowercaseQuery.includes("going on in") || 
      lowercaseQuery.includes("events in") || 
      lowercaseQuery.includes("happening in")) {
    
    // Extract city name if possible for a more relevant fallback
    const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
    const city = cityMatch ? cityMatch[1].trim() : "the area";
    
    return `I'd love to tell you about events in ${city}, but I'm currently having trouble accessing external information. This might be due to connection limitations in this environment. I can still help you with recommendations based on local information I have, or assist with other questions that don't require web searches.`;
  }
  
  // Generic fallback response
  return "I'm sorry, but I'm currently unable to access search information. I can still help with general questions or recommendations based on information I already have available.";
}
