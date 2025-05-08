
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

// Add these missing methods that are referenced in the code
export const analyzeText = async (text: string): Promise<any> => {
  try {
    // Simple implementation for now
    return { sentiment: 0, entities: [], categories: await extractCategories(text) };
  } catch (error) {
    console.error('Error analyzing text:', error);
    return { sentiment: 0, entities: [], categories: [] };
  }
};

export const extractEntities = async (text: string): Promise<string[]> => {
  try {
    // Simple implementation for now
    const entities: string[] = [];
    
    // Look for cities
    const cityRegex = /\b(?:chicago|new york|los angeles|san francisco|miami|austin|seattle|boston|portland|nashville|denver|dallas|atlanta)\b/gi;
    const cityMatches = text.match(cityRegex);
    if (cityMatches) {
      cityMatches.forEach(city => entities.push(city));
    }
    
    // Look for venue types
    const venueRegex = /\b(?:club|theater|venue|bar|restaurant|cafe|stadium|arena|gallery|museum)\b/gi;
    const venueMatches = text.match(venueRegex);
    if (venueMatches) {
      venueMatches.forEach(venue => entities.push(venue));
    }
    
    return entities;
  } catch (error) {
    console.error('Error extracting entities:', error);
    return [];
  }
};
