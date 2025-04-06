
// Service to interact with Perplexity AI
export const PerplexityService = {
  async searchPerplexity(query: string): Promise<string> {
    try {
      // Note: In a real implementation, this would call a Supabase Edge Function with a Perplexity API key
      // For now, we'll simulate the response
      console.log('Searching Perplexity for:', query);
      
      // Check if query is about local events
      if (query.toLowerCase().includes("going on in") || 
          query.toLowerCase().includes("events in") || 
          query.toLowerCase().includes("happening in")) {
        
        // Extract city name if possible
        const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
        const city = cityMatch ? cityMatch[1].trim() : "the area";
        
        return `Based on my search, here are some exciting events happening in ${city} tonight:\n\n` +
               `1. "Summer Music Festival" at Downtown Park - Live performances starting at 7PM\n` +
               `2. "Art Gallery Opening" at Metropolitan Museum - New exhibition from 6-9PM\n` +
               `3. "Food Truck Rally" at Civic Center - Various food options from 5-10PM\n\n` +
               `Would you like more details about any of these events?`;
      }
      
      // For other types of questions, provide a helpful response
      return `I found this information for you: ${query} is a great question! Based on my search, there are several interesting answers. The most relevant information suggests that this is something many people are curious about. Would you like more specific details?`;
    } catch (error) {
      console.error('Error searching Perplexity:', error);
      return "I'm having trouble connecting to my search service right now. Could you try again in a moment?";
    }
  }
};
