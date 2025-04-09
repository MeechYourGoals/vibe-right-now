
// Service to interact with free, open-source AI search alternatives
export const PerplexityService = {
  async searchPerplexity(query: string): Promise<string> {
    try {
      console.log('Searching for:', query);
      
      // First try using Perplexica (an open source alternative that doesn't require API keys)
      const response = await fetch('https://perplexica.vercel.app/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          temperature: 0.2,
          maxTokens: 1000
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.result || "I couldn't find specific information for your query. Could you try being more specific?";
      }
      
      // Fallback to using another free AI service as backup
      return await useFallbackService(query);
    } catch (error) {
      console.error('Error searching:', error);
      
      // Try fallback service
      try {
        return await useFallbackService(query);
      } catch (fallbackError) {
        console.error('Fallback service also failed:', fallbackError);
        
        // Provide a graceful response when all services fail
        if (query.toLowerCase().includes("going on in") || 
            query.toLowerCase().includes("events in") || 
            query.toLowerCase().includes("happening in")) {
          
          // Extract city name if possible for a more relevant fallback
          const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
          const city = cityMatch ? cityMatch[1].trim() : "the area";
          
          return `I'd love to tell you about events in ${city}, but I'm currently having trouble connecting to search services. This might be due to network issues or service limitations. For now, I can recommend checking local event websites or social media for the most up-to-date information.`;
        }
        
        return "I'm sorry, but I'm currently unable to search for that information. You might try asking for information I already have, like recommendations based on your current location or information about specific venues.";
      }
    }
  }
};

// Fallback service that uses another free option
async function useFallbackService(query: string): Promise<string> {
  // Using You.com's free search API as a fallback
  const response = await fetch('https://you.com/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: query,
      pageNumber: 1
    }),
  });
  
  if (!response.ok) {
    throw new Error('Fallback service failed');
  }
  
  const data = await response.json();
  return data.results?.answer || 
         data.results?.summary || 
         "I couldn't find specific information for your query. Could you try being more specific?";
}
