
// Service to interact with Perplexity AI
export const PerplexityService = {
  async searchPerplexity(query: string): Promise<string> {
    try {
      console.log('Searching Perplexity for:', query);
      
      // Temporary API key input solution (for demonstration)
      let apiKey = localStorage.getItem('perplexityApiKey');
      
      if (!apiKey) {
        // If no API key is found, ask the user for one and store it
        apiKey = prompt('Please enter your Perplexity API key to enable search functionality:');
        if (apiKey) {
          localStorage.setItem('perplexityApiKey', apiKey);
        } else {
          return "I need a Perplexity API key to search for information. Please refresh and try again with a valid API key.";
        }
      }
      
      // Call the Perplexity API
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful city guide assistant named Vernon that provides detailed, accurate, and relevant information about events, venues, restaurants, and attractions in specific cities. Format venue names as markdown links with the format [Venue Name](https://venue-website.com) when mentioning specific places. Focus on current and upcoming events, popular venues, and interesting places to visit. Be concise but informative. Do NOT use category headers like "Nightlife:", "Restaurants:", etc. at the beginning of sentences.'
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          search_domain_filter: [],
          search_recency_filter: 'month',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Perplexity API error:', errorData);
        throw new Error(`API call failed with status: ${response.status}`);
      }
      
      const result = await response.json();
      const searchResult = result.choices[0]?.message?.content || 
                           "I couldn't find specific information for your query. Could you try being more specific?";
      
      return searchResult;
    } catch (error) {
      console.error('Error searching Perplexity:', error);
      
      // Fallback for API errors or connectivity issues
      if (query.toLowerCase().includes("going on in") || 
          query.toLowerCase().includes("events in") || 
          query.toLowerCase().includes("happening in")) {
        
        // Extract city name if possible for a more relevant fallback
        const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
        const city = cityMatch ? cityMatch[1].trim() : "the area";
        
        return `I'm currently having trouble connecting to my search service for information about ${city}. This could be due to an invalid API key or network issues. Please check your API key and try again later.`;
      }
      
      return "I'm having trouble connecting to my search service right now. This could be due to an invalid API key or network issues. Please check your API key and try again later.";
    }
  }
};
