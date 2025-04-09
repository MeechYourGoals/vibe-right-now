
/**
 * Utilities for formatting and cleaning responses
 */

// Clean response text to remove markdown formatting
export const cleanResponseText = (text: string): string => {
  // Remove category headers like "<strong>Category</strong>: " or "**Category**: "
  const categories = ['Live Entertainment', 'Nightlife', 'Food', 'Restaurants', 'Events', 'Attractions'];
  let cleanedText = text;
  
  categories.forEach(category => {
    // Remove patterns like "<strong>Category</strong>: " or "**Category**: "
    const patternWithHtmlTags = new RegExp(`<strong>${category}<\/strong>:\\s*`, 'gi');
    const patternWithMarkdown = new RegExp(`\\*\\*${category}\\*\\*:\\s*`, 'gi');
    
    cleanedText = cleanedText.replace(patternWithHtmlTags, '');
    cleanedText = cleanedText.replace(patternWithMarkdown, '');
  });
  
  return cleanedText;
};
