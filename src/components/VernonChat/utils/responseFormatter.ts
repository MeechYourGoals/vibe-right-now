
/**
 * Format the text response for better readability
 * @param text The raw text response
 * @returns Formatted text
 */
export const cleanResponseText = (text: string): string => {
  // Remove any system prompts or formatting tokens
  let cleaned = text.replace(/\[CONTEXT:.*?\]/g, '')
    .replace(/\[USER INTERESTS:.*?\]/g, '')
    .replace(/\<ASSISTANT\>|\<\/ASSISTANT\>/g, '')
    .replace(/\[ASSISTANT\]|\[\/ASSISTANT\]/g, '');
  
  // Trim any excess whitespace
  cleaned = cleaned.trim();
  
  return cleaned;
};

/**
 * Format a location response for the chat
 * @param city The city being searched
 * @param categoryResults The results grouped by category
 * @param paginationState Pagination state for paginated results
 * @returns Formatted response text
 */
export const formatLocationResponse = (city: string, categoryResults: Record<string, string[]>, paginationState: any = {}): string => {
  const categories = Object.keys(categoryResults);
  
  if (categories.length === 0) {
    return `I couldn't find any locations in ${city} matching your search. Would you like me to expand the search to nearby areas?`;
  }

  // Start building the response
  let response = `Here are some places to check out in ${city}:\n\n`;

  // Get the current page for each category
  const currentPages: Record<string, number> = {};
  for (const category of categories) {
    currentPages[category] = paginationState[category] || 0;
  }

  // Get items per page
  const itemsPerPage = 5;

  // Add each category and its locations
  for (const category of categories) {
    const locations = categoryResults[category];
    if (locations && locations.length > 0) {
      // Calculate start and end indices for pagination
      const start = currentPages[category] * itemsPerPage;
      const end = start + itemsPerPage;
      
      // Get locations for current page
      const pagedLocations = locations.slice(start, end);
      
      if (pagedLocations.length > 0) {
        // Capitalize category
        const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
        
        response += `**${displayCategory}**\n`;
        pagedLocations.forEach(location => {
          response += `- ${location}\n`;
        });
        
        // Add pagination info if there are more pages
        if (end < locations.length) {
          const nextPage = currentPages[category] + 1;
          response += `\n*For more ${category}, ask for "more ${category}"*\n`;
        }
        
        response += '\n';
      }
    }
  }

  // Add more helpful information
  response += `You can ask me for more details about any of these places, such as opening hours, prices, or reviews. Or you can say "show me nightlife in ${city}" or "find restaurants in downtown ${city}" to refine your search.`;
  
  return response;
};
