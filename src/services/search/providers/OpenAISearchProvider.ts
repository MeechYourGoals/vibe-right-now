
/**
 * OpenAI search provider implementation
 */
export const OpenAISearchProvider = {
  /**
   * Search using OpenAI's API
   * @param query The search query
   * @returns The search results as text or null if search fails
   */
  async search(query: string): Promise<string | null> {
    try {
      // Check if API key exists in local storage
      const apiKey = localStorage.getItem('openai_api_key');
      if (!apiKey) {
        console.log('No OpenAI API key found, skipping this service');
        return null;
      }
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are an AI assistant that helps users with accurate, current information about places, events, and activities in different cities. Return detailed information based on web searches, including specific venue names, event schedules, and links when possible. Format your response in a clean, readable way. Include specifics about real venues, events, and activities.'
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content;
      }
      return null;
    } catch (error) {
      console.error('Error with OpenAI search:', error);
      return null;
    }
  }
};
