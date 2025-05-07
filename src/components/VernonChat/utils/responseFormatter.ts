
/**
 * Format and clean up AI responses for better user experience
 */

/**
 * Clean up response text from AI models
 * @param text The raw text returned from AI
 * @returns Cleaned up and formatted text
 */
export const cleanResponseText = (text: string): string => {
  if (!text) return "";
  
  // Remove any markdown code block syntax
  text = text.replace(/```[a-z]*\n/g, '').replace(/```/g, '');
  
  // Remove any warnings about AI limitations
  text = text.replace(/I'm an AI assistant and don't have real-time information beyond my training data\./gi, '');
  text = text.replace(/As an AI assistant, I don't have access to real-time information\./gi, '');
  text = text.replace(/I don't have access to current or real-time information\./gi, '');
  text = text.replace(/My knowledge cutoff is .*?\./gi, '');
  
  // Trim any excessive whitespace
  text = text.trim();
  
  return text;
};

/**
 * Format a location-based response
 * @param city The city being referenced
 * @param categoryResults Results grouped by category
 * @param paginationState Pagination state for tracking pages
 * @returns Formatted response about locations in the city
 */
export const formatLocationResponse = (
  city: string,
  categoryResults: Record<string, string[]>,
  paginationState: Record<string, number> = {}
): string => {
  const categoryEmojis: Record<string, string> = {
    restaurants: '🍽️',
    dining: '🍽️',
    bars: '🍸',
    nightlife: '🍸',
    events: '🎭',
    attractions: '🏛️',
    sports: '⚽',
    other: '📍'
  };
  
  let response = `Here's what I found in ${city}:\n\n`;
  
  // Process each category and add entries
  Object.entries(categoryResults).forEach(([category, locations]) => {
    if (locations.length > 0) {
      // Get emoji for this category or default to 📍
      const emoji = categoryEmojis[category.toLowerCase()] || '📍';
      
      // Use title case for category names
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      
      // Add the category heading and results
      response += `${emoji} **${formattedCategory}**\n`;
      
      // Calculate pagination for this category if needed
      const currentPage = paginationState[category] || 0;
      const itemsPerPage = 5;
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedLocations = locations.slice(startIndex, endIndex);
      
      // Add each location
      paginatedLocations.forEach(location => {
        response += `• ${location}\n`;
      });
      
      // Add pagination info if there are more items
      if (endIndex < locations.length) {
        response += `\nShowing ${startIndex + 1}-${endIndex} of ${locations.length} results. Say "More ${category}" to see more.\n`;
      }
      
      response += '\n';
    }
  });
  
  // Add a call to action if we found anything
  if (Object.values(categoryResults).some(locations => locations.length > 0)) {
    response += "You can ask for more details about any specific place, or ask about other cities or categories.";
  } else {
    response += `I couldn't find specific venues in ${city}. Try asking for a different city or be more specific about what you're looking for.`;
  }
  
  return response;
};

/**
 * Format a summary of a location's highlights
 * @param location Location object with details
 * @returns Formatted highlights about the location
 */
export const formatLocationHighlights = (location: any): string => {
  let response = `## ${location.name}\n\n`;
  
  if (location.address) {
    response += `**Address:** ${location.address}, ${location.city || ''}\n\n`;
  }
  
  if (location.description) {
    response += `${location.description}\n\n`;
  }
  
  if (location.hours) {
    response += "**Hours:**\n";
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
      if (location.hours[day]) {
        const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);
        response += `- ${formattedDay}: ${location.hours[day]}\n`;
      }
    });
    response += "\n";
  }
  
  if (location.vibes && location.vibes.length > 0) {
    response += `**Vibes:** ${location.vibes.join(', ')}\n\n`;
  }
  
  return response;
};
