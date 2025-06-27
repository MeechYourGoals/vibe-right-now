
interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIService {
  private static readonly API_URL = 'https://api.openai.com/v1/chat/completions';
  private static readonly DEFAULT_MODEL = 'gpt-4o-mini';

  static async generateResponse(
    prompt: string,
    context: Array<{ sender: string; text: string }> = [],
    chatMode: 'user' | 'venue' = 'user'
  ): Promise<string> {
    try {
      // Get API key from environment or use OpenRouter fallback
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENROUTER_API_KEY;
      const baseURL = import.meta.env.VITE_OPENAI_API_KEY 
        ? 'https://api.openai.com/v1' 
        : 'https://openrouter.ai/api/v1';
      
      if (!apiKey) {
        throw new Error('No API key available');
      }

      // Prepare system message based on context
      const systemMessage = this.getSystemMessage(chatMode);
      
      // Convert context to OpenAI message format
      const messages: OpenAIMessage[] = [
        { role: 'system', content: systemMessage }
      ];
      
      // Add conversation context (last 5 messages)
      const recentContext = context.slice(-5);
      for (const msg of recentContext) {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      }
      
      // Add current user message
      messages.push({
        role: 'user',
        content: prompt
      });

      console.log('Sending request to OpenAI:', { 
        model: this.DEFAULT_MODEL, 
        messagesCount: messages.length,
        usingOpenRouter: !import.meta.env.VITE_OPENAI_API_KEY
      });

      const response = await fetch(`${baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          ...(baseURL.includes('openrouter') && {
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Vibe Right Now - Vernon Chat'
          })
        },
        body: JSON.stringify({
          model: this.DEFAULT_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenAI API error:', response.status, errorData);
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      const responseText = data.choices[0]?.message?.content;
      
      if (!responseText) {
        throw new Error('No response content from OpenAI');
      }

      console.log('OpenAI response received:', responseText.substring(0, 100) + '...');
      return responseText;

    } catch (error) {
      console.error('Error calling OpenAI:', error);
      throw error;
    }
  }

  private static getSystemMessage(chatMode: 'user' | 'venue'): string {
    if (chatMode === 'venue') {
      return `You are Vernon, a helpful AI assistant for venue owners. Provide insightful business analysis and actionable recommendations based on venue data. Focus on helping with venue management, customer insights, and business optimization.`;
    }
    
    // Default user context
    return `You are Vernon, a helpful and friendly AI assistant within the 'Vibe Right Now' app. Your primary goal is to help users discover great places to go and things to do based on their requests.

You are a knowledgeable guide within 'VRN' designed to provide personalized suggestions for places and activities based on user preferences and the 'VRN' community's insights.

Respond in a concise, informative, and enthusiastic tone. Be friendly, approachable, and helpful. Offer creative and interesting suggestions. Focus on venues, restaurants, bars, clubs, events, and activities.

Maintain a conversational style that is engaging and encourages users to explore. Avoid being overly verbose. Get straight to the point while still being helpful.

When providing suggestions, briefly explain why you are recommending them based on potential user interests.

If the user asks for something specific that isn't readily available, acknowledge it and offer alternative suggestions.

Do not express personal opinions or beliefs. Focus solely on providing information relevant to places and activities.`;
  }
}
