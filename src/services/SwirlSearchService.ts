
/**
 * Service for interacting with the Swirl search engine
 */
export const SwirlSearchService = {
  /**
   * Base URL for the Swirl API
   * Default is localhost:8000 but can be configured
   */
  baseUrl: 'http://localhost:8000',

  /**
   * Configure the service with custom settings
   * @param config Configuration options
   */
  configure(config: { baseUrl?: string }): void {
    if (config.baseUrl) {
      this.baseUrl = config.baseUrl;
    }
  },

  /**
   * Check if the Swirl service is available
   * @returns A promise that resolves to a boolean indicating availability
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/swirl/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error checking Swirl availability:', error);
      return false;
    }
  },

  /**
   * Perform a search using Swirl
   * @param query The search query
   * @returns The search results as text
   */
  async search(query: string): Promise<string> {
    try {
      console.log('Searching with Swirl:', query);
      
      // Step 1: Create a search
      const searchResponse = await fetch(`${this.baseUrl}/swirl/search/?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!searchResponse.ok) {
        throw new Error(`Swirl search failed with status: ${searchResponse.status}`);
      }
      
      const searchData = await searchResponse.json();
      const searchId = searchData.id;
      
      if (!searchId) {
        throw new Error('No search ID returned from Swirl');
      }
      
      // Step 2: Get search results
      const resultsResponse = await fetch(`${this.baseUrl}/swirl/results/?search_id=${searchId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!resultsResponse.ok) {
        throw new Error(`Swirl results fetch failed with status: ${resultsResponse.status}`);
      }
      
      const resultsData = await resultsResponse.json();
      
      // Process results into a readable text format
      return this.formatSearchResults(resultsData, query);
    } catch (error) {
      console.error('Error searching with Swirl:', error);
      throw error;
    }
  },
  
  /**
   * Format search results into readable text
   * @param results The raw search results
   * @param query The original query
   * @returns Formatted text response
   */
  formatSearchResults(results: any, query: string): string {
    if (!results || !results.hits || results.hits.length === 0) {
      return `I couldn't find any information about "${query}". Would you like to try a different search?`;
    }
    
    // Extract relevant information from top results
    let formattedResponse = `Here's what I found about "${query}":\n\n`;
    
    // Take top 3-5 results
    const topResults = results.hits.slice(0, 5);
    
    topResults.forEach((hit: any, index: number) => {
      formattedResponse += `${index + 1}. `;
      
      if (hit.title) {
        formattedResponse += `**${hit.title}**\n`;
      }
      
      if (hit.snippet) {
        formattedResponse += `${hit.snippet}\n`;
      } else if (hit.text || hit.body) {
        const text = hit.text || hit.body;
        // Limit text to a reasonable length
        formattedResponse += `${text.substring(0, 200)}${text.length > 200 ? '...' : ''}\n`;
      }
      
      if (hit.url) {
        formattedResponse += `Source: ${hit.url}\n`;
      }
      
      formattedResponse += '\n';
    });
    
    return formattedResponse;
  }
};
