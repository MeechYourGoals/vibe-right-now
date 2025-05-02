
import { parseCityStateFromQuery } from "@/utils/geocodingService";
import { updateSearchUrl } from "@/utils/explore/searchUtils";

/**
 * Simple utility to test search functionality
 * This can be imported and used in the browser console for testing
 */
export const testSearch = {
  /**
   * Test parsing city and state from different queries
   */
  parseCityState() {
    const testCases = [
      "Los Angeles",
      "New York",
      "Chicago, IL",
      "Miami, FL",
      "San Francisco, CA",
      "Denver",
      "Seattle, Washington",
      "Honolulu"
    ];
    
    console.log("=== Testing City/State Parsing ===");
    testCases.forEach(query => {
      const result = parseCityStateFromQuery(query);
      console.log(`Query: "${query}" → City: "${result.city}", State: "${result.state}"`);
    });
    
    return "Test complete. Check console for results.";
  },
  
  /**
   * Test if URL updates correctly with search parameters
   */
  testUrlUpdates() {
    console.log("=== Testing URL Updates ===");
    
    // Mock navigate function that logs instead of changing URL
    const mockNavigate = (url: string) => {
      console.log(`Would navigate to: ${url}`);
      return url;
    };
    
    // Test various combinations
    const testCases = [
      { query: "Los Angeles", vibe: "", tab: "all", dateRange: undefined },
      { query: "Chicago", vibe: "chill", tab: "restaurant", dateRange: { from: new Date(2023, 5, 1), to: new Date(2023, 5, 10) } },
      { query: "New York", vibe: "trendy", tab: "bar", dateRange: { from: new Date(2023, 6, 15), to: undefined } },
      { query: "", vibe: "nightowl", tab: "all", dateRange: undefined }
    ];
    
    testCases.forEach(test => {
      console.log(`Testing: query="${test.query}", vibe="${test.vibe}", tab="${test.tab}"`);
      const url = updateSearchUrl(mockNavigate, test.query, test.vibe, test.tab, test.dateRange);
    });
    
    return "URL update tests complete. Check console for results.";
  }
};

// Make it available in the global window object for testing in the browser console
declare global {
  interface Window {
    testSearch: typeof testSearch;
  }
}

if (typeof window !== 'undefined') {
  window.testSearch = testSearch;
}
