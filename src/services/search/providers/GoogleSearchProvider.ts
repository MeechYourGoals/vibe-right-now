
/**
 * Google Search provider implementation
 */
export const GoogleSearchProvider = {
  /**
   * Search using Google's services
   * @param query The search query
   * @returns The search results as text or null if search fails
   */
  async search(query: string): Promise<string | null> {
    try {
      // Use a CORS proxy for Google Search to avoid CORS issues
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=nws`;
      const googleResponse = await fetch(proxyUrl + encodeURIComponent(googleUrl));
      
      if (googleResponse.ok) {
        const proxyData = await googleResponse.json();
        if (proxyData.contents) {
          // Extract useful information from HTML using simple regex patterns
          const titleRegex = /<h3[^>]*>(.*?)<\/h3>/g;
          const titles = [...proxyData.contents.matchAll(titleRegex)].map(m => m[1]).slice(0, 3);
          
          if (titles.length > 0) {
            let resultText = `Here's what I found about "${query}":\n\n`;
            titles.forEach((title, index) => {
              // Clean the title of HTML tags
              const cleanTitle = title.replace(/<[^>]*>/g, '');
              resultText += `${index + 1}. ${cleanTitle}\n\n`;
            });
            return resultText;
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error with Google search:', error);
      return null;
    }
  }
};
