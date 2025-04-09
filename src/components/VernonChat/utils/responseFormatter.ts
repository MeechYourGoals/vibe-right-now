
import { paginateItems, createPaginationLinks, formatPaginatedCategoryResults } from '@/services/search/paginationUtils';

/**
 * Formats the response from location data into a readable format with categories
 */
export const formatLocationResponse = (
  cityName: string, 
  categoryResults: Record<string, string[]>,
  paginationParams: Record<string, number> = {}
): string => {
  if (Object.keys(categoryResults).length === 0) return "";
  
  let response = `Here's what's happening in ${cityName}:\n\n`;
  
  // Loop through each category
  Object.keys(categoryResults).forEach(category => {
    const items = categoryResults[category];
    if (items && items.length > 0) {
      // Get the current page for this category (default to 1)
      const currentPage = paginationParams[category] || 1;
      
      // Add category header with total count
      let displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
      response += `**${displayCategory}** (${items.length} options)\n\n`;
      
      // Format the paginated results for this category
      response += formatPaginatedCategoryResults(category, items, currentPage);
      
      response += '\n\n';
    }
  });
  
  return response;
};

/**
 * Clean response text by removing certain markdown formatting
 */
export const cleanResponseText = (text: string): string => {
  // Clean any double line breaks or excessive spacing
  return text
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};
