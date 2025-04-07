
// Service to interact with HuggingFace Chat API
export const HuggingChatService = {
  async searchHuggingChat(query: string): Promise<string> {
    try {
      console.log('Searching HuggingChat for:', query);
      
      // Temporary API key input solution
      let apiKey = localStorage.getItem('huggingfaceApiKey');
      
      if (!apiKey) {
        return "I need a HuggingFace API key to search for information. Please add your API key in the settings (key icon).";
      }
      
      // Call the HuggingFace Inference API with a conversation-capable model
      const response = await fetch('https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            text: `
              <system>You are VeRNon, a helpful city guide assistant that provides detailed, accurate, and relevant information about events, venues, restaurants, and attractions in specific cities. Format venue names as markdown links with the format [Venue Name](https://venue-website.com) when mentioning specific places. Focus on current and upcoming events, popular venues, and interesting places to visit. Be concise but informative.</system>
              <user>${query}</user>
            `
          },
          parameters: {
            max_new_tokens: 1000,
            temperature: 0.2,
            top_p: 0.9,
            do_sample: true
          }
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('HuggingFace API error:', errorData);
        throw new Error(`API call failed with status: ${response.status}`);
      }
      
      const result = await response.json();
      let searchResult = result[0]?.generated_text || 
                        "I couldn't find specific information for your query. Could you try being more specific?";
      
      // Extract only the assistant's response
      const assistantMatch = searchResult.match(/<assistant>(.*?)<\/assistant>/s);
      if (assistantMatch && assistantMatch[1]) {
        searchResult = assistantMatch[1].trim();
      }
      
      return searchResult;
    } catch (error) {
      console.error('Error searching HuggingChat:', error);
      
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
