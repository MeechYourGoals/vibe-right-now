
/**
 * Service for interacting with Google's Gemini API
 */
export class GeminiService {
  /**
   * Generates a response using Gemini API via our Supabase edge function
   */
  static async generateResponse(
    query: string,
    context: 'user' | 'venue',
    previousMessages: any[] = []
  ): Promise<string> {
    try {
      console.log(`Generating ${context} response with Gemini for: ${query}`);
      
      // Convert previous messages to the format expected by Gemini
      const formattedMessages = previousMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content || msg.text || '' }]
      }));
      
      // Add the user's query as the last message
      formattedMessages.push({
        role: 'user',
        parts: [{ text: query }]
      });
      
      // Get system prompt based on context
      const systemPrompt = context === 'venue' 
        ? 'You are Vernon, a helpful AI assistant for venue owners. Provide insightful business analysis and actionable recommendations based on venue data.'
        : 'You are Vernon, a helpful AI assistant for the Vibe Right Now app. Your primary goal is to help users discover great places to go and things to do based on their requests.';

      // Call the Gemini API via our Supabase edge function
      const response = await fetch('https://yiitqkjrbskxumriujrh.functions.supabase.co/functions/v1/gemini-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', parts: [{ text: `System instruction: ${systemPrompt}` }] },
            ...formattedMessages
          ],
          model: context === 'venue' ? 'gemini-1.5-pro' : 'gemini-1.5-flash'
        })
      });
      
      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }
      
      const data = await response.json();
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
}
