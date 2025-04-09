
// Service to interact with free, open-source AI search alternatives
export const PerplexityService = {
  async searchPerplexity(query: string): Promise<string> {
    try {
      console.log('Searching for:', query);
      
      // Try using multiple free services with fallbacks
      try {
        // First try using Serper free API (doesn't require authentication)
        const response = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: query,
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          // Parse the organic results to create a natural response
          if (data.organic && data.organic.length > 0) {
            let resultText = `Here's what I found about "${query}":\n\n`;
            
            // Add knowledge graph if available
            if (data.knowledgeGraph) {
              resultText += `${data.knowledgeGraph.title || ''}: ${data.knowledgeGraph.description || ''}\n\n`;
            }
            
            // Extract and combine the top 3 results
            const topResults = data.organic.slice(0, 3);
            topResults.forEach((result: any, index: number) => {
              resultText += `${index + 1}. ${result.title}\n${result.snippet}\n\n`;
            });
            
            return resultText;
          }
        }
      } catch (error) {
        console.log('Serper search failed, trying next service:', error);
      }
      
      // Try using DDG API as second option
      try {
        const response = await fetch('https://api.duckduckgo.com/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // DuckDuckGo parameters
          body: JSON.stringify({
            q: query,
            format: 'json',
            no_html: 1,
            no_redirect: 1,
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.AbstractText) {
            return data.AbstractText;
          }
        }
      } catch (error) {
        console.log('DDG search failed, trying next service:', error);
      }
      
      // Final fallback - use a third free service or provide graceful degradation
      return await useFallbackLocalService(query);
    } catch (error) {
      console.error('Error searching:', error);
      return await useFallbackLocalService(query);
    }
  }
};

// Fallback service that uses local knowledge when online services fail
async function useFallbackLocalService(query: string): Promise<string> {
  try {
    // Try a direct Wikipedia request as last resort
    const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`, {
      method: 'GET',
    });
    
    if (wikiResponse.ok) {
      const data = await wikiResponse.json();
      if (data.extract) {
        return data.extract;
      }
    }
  } catch (error) {
    console.error('Wikipedia fallback failed:', error);
  }
  
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
