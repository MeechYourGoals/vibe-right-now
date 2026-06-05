
// Agent Service for generating responses to user queries
import { invokeEdgeWithFallback } from '@/services/edge/invokeEdge';

class AgentServiceClass {
  // Generate a response for a given query.
  // Routes through the `agent-protocol` edge function, then `vertex-ai`, then
  // the canned mock responses below so it always returns something.
  async generateResponse(query: string, isVenueMode: boolean = false): Promise<string> {
    const mode = isVenueMode ? 'venue' : 'event';
    const cannedFallback = () =>
      isVenueMode ? this.generateVenueResponse(query) : this.generateEventResponse(query);

    const data = await invokeEdgeWithFallback<unknown>(
      'agent-protocol',
      { query, mode },
      async () =>
        invokeEdgeWithFallback<unknown>(
          'vertex-ai',
          { prompt: query, mode },
          cannedFallback
        )
    );

    if (typeof data === 'string' && data.trim()) return data;
    if (data && typeof data === 'object') {
      const obj = data as Record<string, any>;
      const text = obj.text || obj.response || obj.content || obj.message;
      if (typeof text === 'string' && text.trim()) return text;
    }
    return cannedFallback();
  }
  
  // Generate venue-specific responses
  private generateVenueResponse(query: string): string {
    // Mock venue-specific responses
    const responses = [
      "Based on market research, the best way to promote your venue is through targeted social media campaigns focusing on your unique atmosphere and special events.",
      "To increase foot traffic, consider partnering with local businesses for cross-promotion and implementing a loyalty program that rewards frequent visitors.",
      "Analyzing your competitors reveals opportunities to differentiate through unique themed nights or special menu offerings that highlight local ingredients.",
      "The data suggests that Thursday through Saturday evenings are optimal for running promotions, with peak engagement times between 7-9pm.",
      "To improve your online presence, focus on consistent posting schedules, engaging storytelling, and high-quality visual content that showcases your venue's unique atmosphere."
    ];
    
    // Return a response based on query content or a random one
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Generate event-specific responses
  private generateEventResponse(query: string): string {
    // Mock event planning responses
    const responses = [
      "I've created a customized 3-day itinerary that balances popular attractions with hidden gems, allowing plenty of time to experience the local culture.",
      "Based on historical weather data and tourist patterns, the best time to visit would be early June or late September when crowds are thinner and temperatures are pleasant.",
      "For a family-friendly trip, I recommend focusing on these interactive museums, outdoor parks, and kid-approved restaurants that balance entertainment with educational value.",
      "Comparing these two destinations, one offers better cultural experiences and dining options while the other excels in outdoor activities and affordability.",
      "Here's a curated list of upcoming events happening during your planned dates, including festivals, live performances, and special exhibitions."
    ];
    
    // Return a response based on query content or a random one
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Export a singleton instance
export const AgentService = new AgentServiceClass();
