
/**
 * DuckDuckGo search provider implementation
 */
export const DuckDuckGoSearchProvider = {
  /**
   * Search using DuckDuckGo's services
   * @param query The search query
   * @returns The search results as text or null if search fails
   */
  async search(query: string): Promise<string | null> {
    try {
      const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&callback=&pretty=1`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const text = await response.text();
        // Strip JSONP callback if present
        const jsonStr = text.replace(/^[^{]*/, '').replace(/[^}]*$/, '');
        
        try {
          const data = JSON.parse(jsonStr);
          
          if (data.Abstract && data.Abstract.length > 10) {
            return `Here's what I found about "${query}":\n\n${data.Abstract}`;
          } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
            let resultText = `Here's what I found about "${query}":\n\n`;
            
            // Extract information from related topics
            for (let i = 0; i < Math.min(3, data.RelatedTopics.length); i++) {
              const topic = data.RelatedTopics[i];
              if (topic.Text) {
                resultText += `${topic.Text}\n\n`;
              }
            }
            
            return resultText;
          }
        } catch (err) {
          console.error('Error parsing DuckDuckGo response:', err);
        }
      }
      return null;
    } catch (error) {
      console.error('Error with DuckDuckGo search:', error);
      return null;
    }
  }
};
