
/**
 * Fallback response generator for when all search providers fail
 */
export const FallbackResponseGenerator = {
  /**
   * Generate a detailed fallback response based on query type
   * @param query The search query
   * @returns Formatted fallback response
   */
  generateFallbackResponse(query: string): string {
    const lowercaseQuery = query.toLowerCase();
    
    // Check if it's a query about a city
    if (lowercaseQuery.includes('in ')) {
      const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
      if (cityMatch) {
        const city = cityMatch[1].trim();
        return `I'd like to provide you with specific information about ${city}, but I'm currently experiencing some limitations in accessing real-time web data. Here are some general suggestions for exploring ${city}:\n\n1. Check the official city tourism website for ${city} for current events and attractions.\n\n2. Popular review sites often have up-to-date information on trending restaurants and activities in ${city}.\n\n3. Local news websites for ${city} typically list upcoming events and festivals.\n\nI'll keep trying to get you more specific information about ${city}.`;
      }
    }
    
    return "I apologize, but I'm currently unable to retrieve specific web search results for your query. This could be due to temporary connectivity issues. Could you try asking again with more specific details, or perhaps I can help with something else?";
  },
  
  /**
   * Generate category-specific fallback responses
   * @param city City name
   * @param category Category of interest
   * @returns Formatted fallback response
   */
  generateCategorySpecificFallback(city: string, category: string): string {
    switch (category) {
      case "concerts":
        return `I'd love to tell you about concerts in ${city}, but I'm currently having trouble accessing real-time event information. Popular venues in most cities include arena venues, performing arts centers, and smaller club venues that regularly host live music. You might want to check local event listing websites for the most up-to-date concert information in ${city}.`;
      
      case "sports":
        return `I'd love to tell you about sports events in ${city}, but I'm currently having trouble accessing real-time schedules. Most cities have professional or college teams with regular home games, and tickets are typically available through the team's official website or major ticketing platforms. You might want to check the official team websites for ${city} to see upcoming games.`;
      
      case "dining":
        return `I'd love to tell you about restaurants in ${city}, but I'm currently having trouble accessing real-time dining information. ${city} likely has a variety of dining options from casual eateries to fine dining establishments. You might want to check restaurant review sites for the most popular spots in ${city} right now.`;
      
      case "nightlife":
        return `I'd love to tell you about nightlife in ${city}, but I'm currently having trouble accessing real-time venue information. Most cities have popular areas with concentrations of bars and clubs that are busiest on weekend evenings. You might want to check local entertainment guides for the hottest spots in ${city} this week.`;
      
      default:
        return `I'd love to tell you about events in ${city}, but I'm currently having trouble accessing external information. This might be due to connection limitations in this environment. I can still help you with recommendations based on local information I have, or assist with other questions that don't require web searches.`;
    }
  },
  
  /**
   * Fallback service that uses local knowledge when online services fail
   * @param query The search query
   * @returns Formatted fallback response
   */
  useFallbackLocalService(query: string): string {
    // Extract location queries for better responses when all services fail
    const lowercaseQuery = query.toLowerCase();
    
    // Handle location-specific queries with a helpful response
    if (lowercaseQuery.includes("going on in") || 
        lowercaseQuery.includes("events in") || 
        lowercaseQuery.includes("happening in")) {
      
      // Extract city name if possible for a more relevant fallback
      const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
      const city = cityMatch ? cityMatch[1].trim() : "the area";
      
      // Generate a more specific fallback based on query
      if (lowercaseQuery.includes("concerts") || lowercaseQuery.includes("music")) {
        return this.generateCategorySpecificFallback(city, "concerts");
      } else if (lowercaseQuery.includes("sports") || lowercaseQuery.includes("games")) {
        return this.generateCategorySpecificFallback(city, "sports");
      } else if (lowercaseQuery.includes("restaurants") || lowercaseQuery.includes("dining") || lowercaseQuery.includes("food")) {
        return this.generateCategorySpecificFallback(city, "dining");
      } else if (lowercaseQuery.includes("bars") || lowercaseQuery.includes("clubs") || lowercaseQuery.includes("nightlife")) {
        return this.generateCategorySpecificFallback(city, "nightlife");
      }
      
      // Generic location fallback
      return `I'd love to tell you about events in ${city}, but I'm currently having trouble accessing external information. This might be due to connection limitations in this environment. I can still help you with recommendations based on local information I have, or assist with other questions that don't require web searches.`;
    }
    
    // Generic fallback response
    return "I'm sorry, but I'm currently unable to access search information. I can still help with general questions or recommendations based on information I already have available.";
  }
};
