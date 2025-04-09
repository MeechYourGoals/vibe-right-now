
// A simple fallback service for when more advanced search services are unavailable

export const SimpleSearchService = {
  async searchForCityInfo(query: string): Promise<string> {
    console.log('Using simple search service with query:', query);
    
    // Log that search is happening regardless of speech synthesis
    console.log('Search service is being called - this should work even if speech fails');
    
    // Check which type of query this might be
    if (query.toLowerCase().includes('restaurant') || 
        query.toLowerCase().includes('food') || 
        query.toLowerCase().includes('eat')) {
      return getRestaurantResponse(query);
    }
    
    if (query.toLowerCase().includes('event') || 
        query.toLowerCase().includes('happening') || 
        query.toLowerCase().includes('concert')) {
      return getEventResponse(query);
    }
    
    if (query.toLowerCase().includes('hotel') || 
        query.toLowerCase().includes('stay') || 
        query.toLowerCase().includes('accommodation')) {
      return getHotelResponse(query);
    }
    
    // For keyword-based searching, check various common search terms
    if (query.toLowerCase().includes('search for') || 
        query.toLowerCase().includes('find') || 
        query.toLowerCase().includes('where can I') || 
        query.toLowerCase().includes('what are') ||
        query.toLowerCase().includes('how can I')) {
      return getGenericSearchResponse(query);
    }
    
    // Default response for general queries
    return `Based on your query about "${query}", I can provide some general information. While I don't have real-time data at the moment, I'd be happy to help you explore options for venues, events, or experiences based on what you're looking for. Could you tell me more about what type of place or activity interests you?`;
  }
};

// Helper functions to generate more specific responses
function getRestaurantResponse(query: string): string {
  const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
  const city = cityMatch ? cityMatch[1].trim() : "your area";
  
  return `While I don't have real-time restaurant data for ${city} at the moment, I can suggest checking popular review sites for the latest recommendations. Many cities have local food specialties and trending dining spots that you might want to explore. When looking for restaurants in ${city}, consider factors like cuisine type, price range, and atmosphere that would best suit your preferences.`;
}

function getEventResponse(query: string): string {
  const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
  const city = cityMatch ? cityMatch[1].trim() : "your area";
  
  return `For events in ${city}, I recommend checking the official city tourism website or event listing platforms for the most up-to-date information. Cities typically have a variety of events happening throughout the week, including concerts, festivals, exhibitions, and sporting events. The local convention center and performing arts venues in ${city} would be good places to start your search.`;
}

function getHotelResponse(query: string): string {
  const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
  const city = cityMatch ? cityMatch[1].trim() : "your area";
  
  return `For accommodations in ${city}, there are typically a range of options from luxury hotels to budget-friendly stays. The downtown area often has higher-end hotels with more amenities, while you might find more affordable options slightly outside the city center. Consider factors like proximity to attractions you plan to visit, transportation options, and amenities that matter to you like breakfast service or fitness facilities.`;
}

function getGenericSearchResponse(query: string): string {
  // Try to extract the search topic
  const searchPattern = /(search for|find|where can I|what are|how can I|tell me about)\s+([^?\.]+)/i;
  const match = query.match(searchPattern);
  
  if (match && match[2]) {
    const topic = match[2].trim();
    return `I've searched for information about "${topic}". Here's what I found: ${topic} is something many people are interested in. While I don't have real-time data, I can tell you that there are likely several options available in your area. The best approach would be to check specialized websites or local directories for the most current information about ${topic}.`;
  }
  
  return `I've searched based on your query. While I don't have access to real-time information, I can suggest checking local directories or specialized websites that focus on what you're looking for. Would you like me to be more specific about what kind of information you need?`;
}
