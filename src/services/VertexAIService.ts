
/**
 * Service for interacting with Google's Vertex AI 
 */
export class VertexAIService {
  /**
   * Generates a response using Vertex AI via our Supabase edge function
   */
  static async generateResponse(
    query: string,
    context: 'default' | 'venue',
    previousMessages: any[] = []
  ): Promise<string> {
    try {
      console.log(`Generating ${context} response with Vertex AI for: ${query}`);
      
      // Format messages for Vertex AI
      const formattedMessages = previousMessages.map(msg => {
        const role = msg.sender === 'user' || msg.role === 'user' ? 'user' : 'model';
        const content = msg.content || msg.text || '';
        return { role, parts: [{ text: content }] };
      });
      
      // Add system message based on context
      let systemMessage = '';
      
      if (context === 'venue') {
        systemMessage = 'You are Vernon, a helpful AI assistant for venue owners. Provide insightful business analysis and actionable recommendations based on venue data.';
      } else {
        systemMessage = 'You are Vernon, a helpful AI assistant for the Vibe Right Now app. Your primary goal is to help users discover great places to go and things to do based on their requests.';
      }
      
      // Add system message and user query
      const messages = [
        { role: 'user', parts: [{ text: `System instruction: ${systemMessage}` }] },
        ...formattedMessages,
        { role: 'user', parts: [{ text: query }] }
      ];
      
      // Call the Vertex AI API via our Supabase edge function
      const response = await fetch('https://yiitqkjrbskxumriujrh.functions.supabase.co/functions/v1/vertex-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          model: context === 'venue' ? 'gemini-1.0-pro' : 'gemini-1.0-pro',
          temperature: 0.7,
          maxTokens: 800
        })
      });
      
      if (!response.ok) {
        throw new Error(`Vertex AI API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.text || 'I could not generate a response at this time. Please try again later.';
    } catch (error) {
      console.error('Error in Vertex AI service:', error);
      throw new Error('Failed to generate response with Vertex AI');
    }
  }
  
  /**
   * Uses Vertex AI for search-related queries
   */
  static async searchWithVertex(query: string): Promise<string> {
    try {
      const systemPrompt = `You are a search assistant for the Vibe Right Now app. 
      Provide helpful information about places, venues, events, and activities based on the user's query.
      Include specific details like addresses, opening hours, and prices when available.`;
      
      const response = await fetch('https://yiitqkjrbskxumriujrh.functions.supabase.co/functions/v1/vertex-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', parts: [{ text: `System instruction: ${systemPrompt}` }] },
            { role: 'user', parts: [{ text: query }] }
          ],
          model: 'gemini-1.0-pro',
          temperature: 0.3,
          maxTokens: 1500
        })
      });
      
      if (!response.ok) {
        throw new Error(`Vertex AI search error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.text || '';
    } catch (error) {
      console.error('Error in Vertex AI search:', error);
      throw error;
    }
  }
}

/**
 * Extract categories from text using Cloud Natural Language API
 */
export const extractCategories = async (text: string): Promise<string[]> => {
  try {
    const response = await fetch('https://yiitqkjrbskxumriujrh.functions.supabase.co/functions/v1/google-nlp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });
    
    if (!response.ok) {
      throw new Error(`Google NLP API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error extracting categories with Google NLP:', error);
    return [];
  }
};
