
/**
 * Utility functions for formatting responses from various services
 */

/**
 * Formats a search query response for display
 */
export const formatSearchResponse = (response: any, query: string = "", category: string = "") => {
  if (!response) return { results: [], message: "No results found" };
  
  return {
    results: response,
    message: `Found ${response.length} results${query ? ` for "${query}"` : ""}${category ? ` in ${category}` : ""}`
  };
};

/**
 * Formats categories for display
 */
export const formatCategories = (categories: string[]) => {
  return categories.map(category => ({
    id: category.toLowerCase().replace(/\s+/g, "-"),
    name: category.charAt(0).toUpperCase() + category.slice(1),
  }));
};

/**
 * Formats location data for display
 */
export const formatLocationData = (location: any) => {
  if (!location) return null;
  
  return {
    ...location,
    formattedAddress: location.address ? 
      `${location.address}, ${location.city}${location.state ? `, ${location.state}` : ""}` : 
      `${location.city}${location.state ? `, ${location.state}` : ""}`
  };
};

export default {
  formatSearchResponse,
  formatCategories,
  formatLocationData
};
