
/**
 * Analyzes text content using Google's Natural Language API
 * @param text The text to analyze
 * @returns Analysis results including sentiment, entities, etc.
 */
export const analyzeText = async (text: string) => {
  console.log('Analyzing text with Google NLP:', text);
  
  // Mock implementation for development/testing
  return {
    sentiment: { score: 0.4, magnitude: 0.7 },
    entities: ['restaurant', 'event', 'location'],
    categories: ['food', 'entertainment', 'travel']
  };
};

/**
 * Extracts entities from text using Google's Natural Language API
 * @param text The text to analyze
 * @returns Array of extracted entities
 */
export const extractEntities = async (text: string): Promise<string[]> => {
  console.log('Extracting entities from text:', text);
  
  // Mock implementation for development/testing
  const keywords = [
    'restaurant', 'bar', 'club', 'museum', 'park',
    'event', 'concert', 'show', 'exhibition', 'performance',
    'comedy', 'music', 'food', 'drink', 'nightlife',
    'family', 'outdoor', 'indoor', 'free', 'paid'
  ];
  
  // Randomly select 3-5 keywords that might be relevant to the text
  const selectedCount = Math.floor(Math.random() * 3) + 3; // 3-5 keywords
  const entities: string[] = [];
  
  for (let i = 0; i < selectedCount; i++) {
    const randomIndex = Math.floor(Math.random() * keywords.length);
    if (text.toLowerCase().includes(keywords[randomIndex].toLowerCase())) {
      entities.push(keywords[randomIndex]);
    } else {
      // If the keyword is not in the text, add it with 50% probability
      if (Math.random() > 0.5) {
        entities.push(keywords[randomIndex]);
      }
    }
  }
  
  // Return unique entities
  return [...new Set(entities)];
};

/**
 * Extracts categories from text
 * @param text The text to extract categories from
 * @returns Array of category names
 */
export const extractCategories = async (text: string): Promise<string[]> => {
  console.log('Extracting categories from text:', text);
  
  // For development/testing, provide mock categories
  const mockCategories = ['restaurant', 'bar', 'entertainment', 'outdoor', 'family-friendly'];
  
  // Simple logic to return relevant categories based on text content
  const result: string[] = [];
  
  if (text.match(/food|eat|dinner|lunch|breakfast|restaurant|cafe|dining/i)) {
    result.push('restaurant', 'dining');
  }
  
  if (text.match(/drink|bar|pub|cocktail|beer|wine|nightlife|club/i)) {
    result.push('bar', 'nightlife');
  }
  
  if (text.match(/show|performance|concert|music|band|artist|stage|theater|venue/i)) {
    result.push('events', 'entertainment');
  }
  
  if (text.match(/park|outdoor|nature|walk|hike|trail|garden|outside/i)) {
    result.push('outdoor', 'attractions');
  }
  
  if (text.match(/museum|gallery|art|exhibit|culture|historic|history/i)) {
    result.push('attractions', 'cultural');
  }
  
  if (text.match(/family|kid|child|children|friendly|fun|play/i)) {
    result.push('family-friendly');
  }
  
  if (text.match(/comedy|laugh|funny|standup|comedian/i)) {
    result.push('comedy');
  }
  
  if (result.length === 0) {
    // If no categories detected, return random subset of mock categories
    return mockCategories.filter(() => Math.random() > 0.5);
  }
  
  return [...new Set(result)];
};
