
/**
 * Utilities for formatting and cleaning responses
 */

// Clean response text to remove markdown formatting and symbols
export const cleanResponseText = (text: string): string => {
  let cleanedText = text;
  
  // Remove category headers with HTML tags like "<strong>Category</strong>: "
  cleanedText = cleanedText.replace(/<strong>(.*?)<\/strong>:\s*/gi, '$1: ');
  
  // Remove category headers with markdown like "**Category**: "
  cleanedText = cleanedText.replace(/\*\*(.*?)\*\*:\s*/gi, '$1: ');
  
  // Remove emoji symbols at the start of lines
  cleanedText = cleanedText.replace(/^[^\w\s]+ /gm, '');
  
  // Remove emoji symbols before categories
  const categories = ['Live Entertainment', 'Nightlife', 'Food', 'Dining', 'Restaurants', 
                     'Events', 'Attractions', 'Sports', 'Concerts', 'Other', 'Activities'];
  
  categories.forEach(category => {
    // Remove patterns like "🍸 Category: " or "🎭 Category: "
    const emojiPattern = new RegExp(`[^\\w\\s]+ ${category}:`, 'gi');
    cleanedText = cleanedText.replace(emojiPattern, `${category}:`);
  });
  
  return cleanedText;
};

/**
 * Format location response with multiple options per category
 */
export const formatLocationResponse = (cityName: string, categoryResults: Record<string, string[]>): string => {
  if (Object.keys(categoryResults).length === 0) return "";
  
  let response = `Here are some places with great vibes in ${cityName} right now:\n\n`;
  
  // Add each category with its venues
  if (categoryResults.sports && categoryResults.sports.length > 0) {
    response += `Sports: ${categoryResults.sports.join(", ")}.\n\n`;
  }
  
  if (categoryResults.nightlife && categoryResults.nightlife.length > 0) {
    response += `Nightlife: ${categoryResults.nightlife.join(", ")}.\n\n`;
  }
  
  if (categoryResults.dining && categoryResults.dining.length > 0) {
    response += `Dining: ${categoryResults.dining.join(", ")}.\n\n`;
  }
  
  if (categoryResults.concerts && categoryResults.concerts.length > 0) {
    response += `Concerts: ${categoryResults.concerts.join(", ")}.\n\n`;
  }
  
  if (categoryResults.events && categoryResults.events.length > 0) {
    response += `Events: ${categoryResults.events.join(", ")}.\n\n`;
  }
  
  if (categoryResults.attractions && categoryResults.attractions.length > 0) {
    response += `Attractions: ${categoryResults.attractions.join(", ")}.\n\n`;
  }
  
  if (categoryResults.other && categoryResults.other.length > 0) {
    response += `Other Activities: ${categoryResults.other.join(", ")}.\n\n`;
  }
  
  response += "Each place has recent vibes posted by users who are there right now. Click on any venue to see what it's really like tonight!";
  
  return response;
};

