
/**
 * Utility functions for managing paginated search results
 */

// Function to paginate an array of items (like restaurants, events, etc.)
export function paginateItems(items: string[], page: number = 1, itemsPerPage: number = 3): string[] {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
}

// Function to create pagination links (for use in response text)
export function createPaginationLinks(
  category: string, 
  currentPage: number, 
  totalItems: number,
  itemsPerPage: number = 3
): string {
  if (totalItems <= itemsPerPage) {
    return ""; // No pagination needed
  }
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let paginationText = "\n\n";
  
  // Previous button
  if (currentPage > 1) {
    paginationText += `[« Previous](/search?category=${category}&page=${currentPage - 1}) | `;
  } else {
    paginationText += "« Previous | ";
  }
  
  // Page indicator
  paginationText += `Page ${currentPage} of ${totalPages}`;
  
  // Next button
  if (currentPage < totalPages) {
    paginationText += ` | [Next »](/search?category=${category}&page=${currentPage + 1})`;
  } else {
    paginationText += " | Next »";
  }
  
  return paginationText;
}

// Format a set of results with pagination for a single category
export function formatPaginatedCategoryResults(
  category: string,
  items: string[],
  page: number = 1,
  itemsPerPage: number = 3
): string {
  const paginatedItems = paginateItems(items, page, itemsPerPage);
  let result = "";
  
  // Add items
  paginatedItems.forEach((item, index) => {
    result += `${index + 1 + ((page - 1) * itemsPerPage)}. ${item}\n\n`;
  });
  
  // Add pagination links
  result += createPaginationLinks(category, page, items.length, itemsPerPage);
  
  return result;
}
