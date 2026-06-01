import { invokeEdgeWithFallback } from '@/services/edge/invokeEdge';

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

interface ChatRequestOptions {
  context?: 'user' | 'venue';
  temperature?: number;
  maxTokens?: number;
}

export class OpenAIService {
  private static readonly API_URL = 'https://api.openai.com/v1/chat/completions';
  private static readonly TTS_URL = 'https://api.openai.com/v1/audio/speech';
  private static readonly DEFAULT_MODEL = 'gpt-4o-mini';

  /**
   * Generate a chat completion. Routing order:
   *   1. `vertex-ai` edge function (primary)
   *   2. `openai-chat` edge function (fallback)
   *   3. Direct OpenAI/OpenRouter fetch when a browser key is present
   *   4. Canned local response so the chat ALWAYS replies (zero keys)
   */
  static async generateResponse(
    prompt: string,
    context: Array<{ sender: string; text: string }> = [],
    chatMode: 'user' | 'venue' = 'user'
  ): Promise<string> {
    const history = context.map((msg) => ({
      sender: msg.sender === 'user' ? 'user' : 'ai',
      text: msg.text,
    }));

    // 1) Primary: vertex-ai edge -> 2) openai-chat edge -> 3) direct fetch -> 4) canned
    return invokeEdgeWithFallback<string>(
      'vertex-ai',
      {
        prompt,
        history,
        mode: chatMode === 'venue' ? 'venue' : 'default',
        systemPrompt: this.getSystemMessage(chatMode),
        temperature: 0.7,
        maxTokens: 1000,
      },
      async () =>
        invokeEdgeWithFallback<string>(
          'openai-chat',
          {
            prompt,
            messages: [
              { role: 'system', content: this.getSystemMessage(chatMode) },
              ...context.slice(-5).map((msg) => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text,
              })),
              { role: 'user', content: prompt },
            ],
            chatMode,
          },
          async () => {
            try {
              return await this.directFetchResponse(prompt, context, chatMode);
            } catch (error) {
              console.warn('OpenAI direct fetch unavailable, using canned response:', error);
              return this.getCannedResponse(prompt, chatMode);
            }
          }
        )
    ).then((data) => this.extractText(data, prompt, chatMode));
  }

  /** Normalize whatever shape an edge function returns into a string. */
  private static extractText(
    data: unknown,
    prompt: string,
    chatMode: 'user' | 'venue'
  ): string {
    if (typeof data === 'string' && data.trim()) return data;
    if (data && typeof data === 'object') {
      const obj = data as Record<string, any>;
      const text =
        obj.text ||
        obj.response ||
        obj.content ||
        obj.message ||
        obj.choices?.[0]?.message?.content;
      if (typeof text === 'string' && text.trim()) return text;
    }
    return this.getCannedResponse(prompt, chatMode);
  }

  /** Direct browser-side OpenAI/OpenRouter call (only when a key exists). */
  private static async directFetchResponse(
    prompt: string,
    context: Array<{ sender: string; text: string }> = [],
    chatMode: 'user' | 'venue' = 'user'
  ): Promise<string> {
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENROUTER_API_KEY;
      const baseURL = import.meta.env.VITE_OPENAI_API_KEY 
        ? 'https://api.openai.com/v1' 
        : 'https://openrouter.ai/api/v1';
      
      if (!apiKey) {
        throw new Error('No API key available');
      }

      const systemMessage = this.getSystemMessage(chatMode);
      
      const messages: OpenAIMessage[] = [
        { role: 'system', content: systemMessage }
      ];
      
      const recentContext = context.slice(-5);
      for (const msg of recentContext) {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      }
      
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

  // Legacy compatibility method for existing code
  static async sendChatRequest(
    messages: Array<{ role: string; content: string }>,
    options: ChatRequestOptions = {}
  ): Promise<string> {
    const context = messages.slice(0, -1).map(msg => ({
      sender: msg.role === 'user' ? 'user' : 'assistant',
      text: msg.content
    }));
    
    const lastMessage = messages[messages.length - 1];
    const chatMode = options.context === 'venue' ? 'venue' : 'user';
    
    return this.generateResponse(lastMessage.content, context, chatMode);
  }

  // Text-to-speech method for voice functionality
  /**
   * Text-to-speech. Routes through the `eleven-labs-tts` edge function (then
   * `google-tts`) and DEGRADES to an empty string silently when no audio
   * backend is available so the caller can fall back to text-only.
   */
  static async textToSpeech(text: string): Promise<string> {
    return invokeEdgeWithFallback<string>(
      'eleven-labs-tts',
      { text },
      async () =>
        invokeEdgeWithFallback<string>(
          'google-tts',
          { text },
          async () => {
            // Last resort: direct OpenAI TTS only when a browser key exists.
            try {
              const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
              if (!apiKey) return '';

              const response = await fetch(this.TTS_URL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                  model: 'tts-1',
                  input: text,
                  voice: 'alloy',
                  response_format: 'mp3',
                }),
              });

              if (!response.ok) return '';

              const audioBuffer = await response.arrayBuffer();
              return btoa(
                new Uint8Array(audioBuffer).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              );
            } catch (error) {
              console.warn('TTS unavailable, degrading to text-only:', error);
              return '';
            }
          }
        )
    ).then((data) => {
      if (typeof data === 'string') return data;
      if (data && typeof data === 'object') {
        const obj = data as Record<string, any>;
        return obj.audioContent || obj.audio || obj.base64 || '';
      }
      return '';
    });
  }

  /**
   * Local canned response used when no edge function and no browser key are
   * available, so Vernon always replies.
   */
  private static getCannedResponse(prompt: string, chatMode: 'user' | 'venue'): string {
    const q = prompt.toLowerCase();
    if (chatMode === 'venue') {
      return "Here's a quick take: focus on your peak nights (Thu-Sat), lean into your standout vibe, and keep your social posts consistent. I can dig into specific metrics whenever you connect your venue data.";
    }
    if (/restaurant|food|eat|dinner|lunch|brunch/.test(q)) {
      return "I'd start with a couple of well-rated local spots — tell me a city or neighborhood and I'll pull up real venues for you.";
    }
    if (/bar|drink|nightlife|club/.test(q)) {
      return "For a good night out, give me a city and I'll surface bars and lounges that match your vibe.";
    }
    if (/coffee|cafe/.test(q)) {
      return "Looking for coffee? Let me know where you are and I'll find cozy cafes nearby.";
    }
    return "I'm Vernon, your guide to great places and things to do. Tell me what you're in the mood for and where, and I'll find real venues for you.";
  }

  private static getSystemMessage(chatMode: 'user' | 'venue'): string {
    if (chatMode === 'venue') {
      return `You are Vernon, a helpful AI assistant for venue owners. Provide insightful business analysis and actionable recommendations based on venue data. Focus on helping with venue management, customer insights, and business optimization.`;
    }
    
    return `You are Vernon, a helpful and friendly AI assistant within the 'Vibe Right Now' app. Your primary goal is to help users discover great places to go and things to do based on their requests.

You are a knowledgeable guide within 'VRN' designed to provide personalized suggestions for places and activities based on user preferences and the 'VRN' community's insights.

Respond in a concise, informative, and enthusiastic tone. Be friendly, approachable, and helpful. Offer creative and interesting suggestions. Focus on venues, restaurants, bars, clubs, events, and activities.

Maintain a conversational style that is engaging and encourages users to explore. Avoid being overly verbose. Get straight to the point while still being helpful.

When providing suggestions, briefly explain why you are recommending them based on potential user interests.

If the user asks for something specific that isn't readily available, acknowledge it and offer alternative suggestions.

Do not express personal opinions or beliefs. Focus solely on providing information relevant to places and activities.`;
  }
}
