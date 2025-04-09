
/**
 * Wikipedia search provider implementation
 */
export const WikipediaSearchProvider = {
  /**
   * Search using Wikipedia's API
   * @param query The search query
   * @returns The search results as text or null if search fails
   */
  async search(query: string): Promise<string | null> {
    try {
      const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`, {
        method: 'GET',
      });
      
      if (wikiResponse.ok) {
        const data = await wikiResponse.json();
        if (data.extract && data.extract.length > 0) {
          return `Here's what I found about "${query}":\n\n${data.extract}`;
        }
      }
      return null;
    } catch (error) {
      console.error('Error with Wikipedia search:', error);
      return null;
    }
  }
};
