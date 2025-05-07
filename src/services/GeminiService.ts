
/**
 * Service for interacting with Google's Gemini API
 */
export class GeminiService {
  /**
   * Generates a response using Gemini API via our Supabase edge function
   */
  static async generateResponse(
    query: string,
    context: 'user' | 'venue' = 'user',
    previousMessages: any[] = []
  ): Promise<string> {
    try {
      console.log(`Generating ${context} response with Gemini for: ${query}`);
      
      // Convert previous messages to the format expected by Gemini
      const formattedMessages = previousMessages.map(msg => ({
        role: msg.sender === 'user' || msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content || msg.text || '' }]
      }));
      
      // Add the user's query as the last message
      formattedMessages.push({
        role: 'user',
        parts: [{ text: query }]
      });
      
      // Get system prompt based on context
      const systemPrompt = context === 'venue' 
        ? 'You are Vernon, a helpful AI assistant for venue owners. Provide insightful business analysis and actionable recommendations based on venue data. Use real-world information and data.'
        : 'You are Vernon, a helpful AI assistant for the Vibe Right Now app. Your primary goal is to help users discover great places to go and things to do based on their requests. Always try to provide real information about actual places and events. If you\'re not sure about specific details, be transparent about it.';
      
      // Prepare messages with system prompt first
      const messages = [
        { role: 'user', parts: [{ text: `System instruction: ${systemPrompt}` }] },
        ...formattedMessages
      ];
      
      // Call the Gemini API via our Supabase edge function
      const response = await fetch('https://yiitqkjrbskxumriujrh.functions.supabase.co/functions/v1/gemini-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages,
          model: context === 'venue' ? 'gemini-1.5-pro' : 'gemini-1.5-flash',
          temperature: 0.7,
          maxTokens: 1000,
          searchMode: true // Enable web search capability
        })
      });
      
      if (!response.ok) {
        console.error(`Gemini API error: ${response.status} - ${response.statusText}`);
        throw new Error(`Gemini API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Gemini API returned an error:', data.error);
        throw new Error(data.error);
      }
      
      return data.text || 'I could not generate a response at this time. Please try again later.';
    } catch (error) {
      console.error('Error in Gemini service:', error);
      throw new Error('Failed to generate response with Gemini');
    }
  }
  
  /**
   * Analyzes sentiment using Gemini API
   */
  static async analyzeSentiment(text: string): Promise<{label: string, score: number}> {
    try {
      const response = await fetch('https://yiitqkjrbskxumriujrh.functions.supabase.co/functions/v1/gemini-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { 
              role: 'user', 
              parts: [{ 
                text: `Analyze the sentiment of the following text and respond with ONLY a JSON object with 'label' (one of: positive, negative, neutral) and 'score' (number between 0 and 1): "${text}"` 
              }] 
            }
          ],
          model: 'gemini-1.5-flash'
        })
      });
      
      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      try {
        // Try to parse the response as JSON
        const parsedResponse = JSON.parse(data.text);
        return {
          label: parsedResponse.label || 'neutral',
          score: parsedResponse.score || 0.5
        };
      } catch (e) {
        // If parsing fails, use a default response
        return {
          label: 'neutral',
          score: 0.5
        };
      }
    } catch (error) {
      console.error('Error in Gemini sentiment analysis:', error);
      return {
        label: 'neutral',
        score: 0.5
      };
    }
  }

  /**
   * Search for information using Gemini's web browsing capabilities
   */
  static async searchWeb(query: string): Promise<string> {
    try {
      // Enhanced prompt for web search
      const searchPrompt = `
        Search for real information about: "${query}"
        Please include specific details about real places, events, or activities related to this query.
        Include names, addresses, times, prices, and other relevant information when available.
        Format your response clearly and cite your sources if possible.
      `;
      
      const response = await fetch('https://yiitqkjrbskxumriujrh.functions.supabase.co/functions/v1/gemini-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', parts: [{ text: searchPrompt }] }
          ],
          model: 'gemini-1.5-pro',
          temperature: 0.3, // Lower temperature for more factual responses
          maxTokens: 1500,
          searchMode: true
        })
      });
      
      if (!response.ok) {
        throw new Error(`Gemini web search error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.text || 'I could not find any information about that.';
    } catch (error) {
      console.error('Error in Gemini web search:', error);
      throw new Error('Failed to search the web with Gemini');
    }
  }
}
