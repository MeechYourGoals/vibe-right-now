
/**
 * Extract categories from text using Google Cloud Natural Language API
 * @param text Text to analyze
 * @returns Array of detected categories
 */
export const extractCategories = async (text: string): Promise<string[]> => {
  try {
    // For now, we'll use a simple rule-based approach without calling the actual API
    const categories: string[] = [];
    
    // Food and dining
    if (/restaurant|food|dining|eat|cuisine|breakfast|lunch|dinner|cafe|bar|pub|coffee|drink/i.test(text)) {
      categories.push('Food & Dining');
    }
    
    // Entertainment
    if (/movie|theater|cinema|show|concert|music|performance|play|entertainment|museum|gallery|art|exhibit/i.test(text)) {
      categories.push('Entertainment');
    }
    
    // Nightlife
    if (/club|nightlife|bar|pub|lounge|party|dance|dj|nightclub/i.test(text)) {
      categories.push('Nightlife');
    }
    
    // Sports
    if (/sport|game|match|basketball|football|soccer|baseball|hockey|tennis|golf|stadium|arena|athletic/i.test(text)) {
      categories.push('Sports');
    }
    
    // Comedy
    if (/comedy|comedian|standup|stand-up|improv|laugh|joke|funny/i.test(text)) {
      categories.push('Comedy');
    }
    
    console.log('Extracted categories:', categories);
    return categories;
  } catch (error) {
    console.error('Error extracting categories:', error);
    return [];
  }
};
