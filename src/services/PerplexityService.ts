
// Service to interact with free, open-source AI search alternatives
export const PerplexityService = {
  async searchPerplexity(query: string): Promise<string> {
    try {
      console.log('Searching for:', query);
      
      // Try using multiple free services with fallbacks
      try {
        // First try using DuckDuckGo API (doesn't require authentication)
        const ddgResponse = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (ddgResponse.ok) {
          const data = await ddgResponse.json();
          if (data.AbstractText) {
            return `Here's what I found about "${query}":\n\n${data.AbstractText}`;
          }
        }
      } catch (error) {
        console.log('DuckDuckGo search failed, trying next service:', error);
      }
      
      // Try using You.com search API as fallback (free tier)
      try {
        const youResponse = await fetch(`https://you.com/api/streamingSearch?q=${encodeURIComponent(query)}&page=1&count=10`);
        
        if (youResponse.ok) {
          const data = await youResponse.json();
          if (data.results && data.results.length > 0) {
            let resultText = `Here's what I found about "${query}":\n\n`;
            
            // Extract and combine the top 3 results
            const topResults = data.results.slice(0, 3);
            topResults.forEach((result: any, index: number) => {
              resultText += `${index + 1}. ${result.title}\n${result.snippet}\n\n`;
            });
            
            return resultText;
          }
        }
      } catch (error) {
        console.log('You.com search failed, trying next service:', error);
      }
      
      // Try using Brave Search API as another alternative
      try {
        const braveResponse = await fetch(`https://search.brave.com/api/search?q=${encodeURIComponent(query)}`);
        
        if (braveResponse.ok) {
          const data = await braveResponse.json();
          if (data.results && data.results.length > 0) {
            let resultText = `Here's what I found about "${query}":\n\n`;
            
            data.results.slice(0, 3).forEach((result: any, index: number) => {
              resultText += `${index + 1}. ${result.title}\n${result.description || result.snippet || ''}\n\n`;
            });
            
            return resultText;
          }
        }
      } catch (error) {
        console.log('Brave search failed, trying fallback service:', error);
      }
      
      // Final fallback - use a direct Wikipedia request (usually works reliably)
      return await useFallbackWikipediaService(query);
    } catch (error) {
      console.error('Error searching:', error);
      return await useFallbackLocalService(query);
    }
  }
};

// Fallback service that uses Wikipedia when online services fail
async function useFallbackWikipediaService(query: string): Promise<string> {
  try {
    // Try a direct Wikipedia request as last resort
    const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`, {
      method: 'GET',
    });
    
    if (wikiResponse.ok) {
      const data = await wikiResponse.json();
      if (data.extract) {
        return `Here's what I found about "${query}":\n\n${data.extract}`;
      }
    }
    
    // If Wikipedia fails, fall back to local service
    return useFallbackLocalService(query);
  } catch (error) {
    console.error('Wikipedia fallback failed:', error);
    return useFallbackLocalService(query);
  }
}

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
