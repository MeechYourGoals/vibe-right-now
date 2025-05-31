
/**
 * Extract basic categories from a query to help with search relevance
 */
export function extractCategoriesFromQuery(query: string): string[] {
  const categories = [];
  
  // Check for food-related terms
  if (/restaurant|food|eat|dining|breakfast|lunch|dinner|brunch|cafe|bar|pub|coffee/i.test(query)) {
    categories.push('food');
  }
  
  // Check for entertainment-related terms
  if (/movie|theater|theatre|concert|show|performance|music|live|entertainment/i.test(query)) {
    categories.push('entertainment');
  }
  
  // Check for outdoor activities
  if (/park|hike|hiking|trail|beach|outdoor|nature|walk|walking/i.test(query)) {
    categories.push('outdoors');
  }
  
  // Check for nightlife
  if (/club|nightlife|party|dancing|dance|nightclub|bar/i.test(query)) {
    categories.push('nightlife');
  }
  
  // Check for family-friendly
  if (/family|kid|child|children|family-friendly/i.test(query)) {
    categories.push('family');
  }
  
  return categories;
}
