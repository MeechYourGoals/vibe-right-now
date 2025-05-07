
/**
 * Format location search results for the chat response
 */
export const formatLocationResponse = (
  cityName: string, 
  categoryResults: Record<string, string[]>,
  paginationParams: Record<string, number> = {}
): string => {
  const hasResults = Object.values(categoryResults).some(arr => arr.length > 0);
  
  if (!hasResults) {
    return `I couldn't find specific venues or events in ${cityName} at the moment. Would you like me to recommend some popular activities or search in a different city?`;
  }
  
  // Build response starting with an intro
  let response = `Here's what's happening in ${cityName} right now:\n\n`;
  
  // Add section for each category with results
  if (categoryResults.nightlife && categoryResults.nightlife.length > 0) {
    response += `**Nightlife & Bars**\n${categoryResults.nightlife.join('\n')}\n\n`;
  }
  
  if (categoryResults.dining && categoryResults.dining.length > 0) {
    response += `**Restaurants & Dining**\n${categoryResults.dining.join('\n')}\n\n`;
  }
  
  if (categoryResults.concerts && categoryResults.concerts.length > 0) {
    response += `**Live Music & Concerts**\n${categoryResults.concerts.join('\n')}\n\n`;
  }
  
  if (categoryResults.events && categoryResults.events.length > 0) {
    response += `**Events & Happenings**\n${categoryResults.events.join('\n')}\n\n`;
  }
  
  if (categoryResults.attractions && categoryResults.attractions.length > 0) {
    response += `**Attractions & Landmarks**\n${categoryResults.attractions.join('\n')}\n\n`;
  }
  
  if (categoryResults.sports && categoryResults.sports.length > 0) {
    response += `**Sports & Recreation**\n${categoryResults.sports.join('\n')}\n\n`;
  }
  
  if (categoryResults.other && categoryResults.other.length > 0) {
    response += `**Other Points of Interest**\n${categoryResults.other.join('\n')}\n\n`;
  }
  
  // Add a call to action
  response += `Want to see more options? Ask me about specific types of places or activities in ${cityName}!`;
  
  return response;
};

/**
 * Format a simple response for the chat
 */
export const formatSimpleResponse = (message: string): string => {
  return message;
};

/**
 * Clean response text by removing unnecessary formatting
 */
export const cleanResponseText = (text: string): string => {
  if (!text) return '';
  
  // Remove excessive newlines
  let cleaned = text.replace(/\n{3,}/g, '\n\n');
  
  // Remove excessive spaces
  cleaned = cleaned.replace(/[ ]{2,}/g, ' ');
  
  return cleaned.trim();
};

/**
 * Format API response for display
 */
export const formatAPIResponse = (data: any, type: string = 'general'): string => {
  if (!data) return 'No data available';
  
  switch (type) {
    case 'location':
      return `Found: ${data.name} in ${data.city}, ${data.state || data.country}`;
    case 'event':
      return `Event: ${data.name} on ${data.date} at ${data.venue}`;
    default:
      return typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
  }
};
