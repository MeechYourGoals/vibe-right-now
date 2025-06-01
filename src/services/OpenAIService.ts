
import { VertexAIService } from './VertexAIService';

/**
 * OpenAI Service that proxies through Google Vertex AI
 * Maintains backward compatibility while using Google ecosystem
 */
export class OpenAIService {
  /**
   * Send a chat request (proxied to Vertex AI)
   */
  static async sendChatRequest(
    messages: { role: string; content: string }[],
    options: { 
      model?: string; 
      context?: string;
      stream?: boolean;
      maxTokens?: number;
      useOpenRouter?: boolean;
    } = {}
  ) {
    try {
      // Convert messages to context format for Vertex AI
      const context = messages.slice(0, -1).map(msg => ({
        sender: msg.role === 'user' ? 'user' : 'ai',
        text: msg.content
      }));
      
      // Get the latest user message
      const latestMessage = messages[messages.length - 1];
      const prompt = latestMessage?.content || '';
      
      // Determine mode based on context
      const mode = options.context === 'venue' ? 'venue' : 'default';
      
      // Call Vertex AI
      const response = await VertexAIService.generateResponse(prompt, mode, context);
      
      // Return in OpenAI-compatible format
      return {
        choices: [{
          message: {
            content: response,
            role: 'assistant'
          }
        }]
      };
    } catch (error) {
      console.error('Error in OpenAI proxy service:', error);
      throw error;
    }
  }

  /**
   * Convert speech to text (proxied to Vertex AI)
   */
  static async speechToText(audioBase64: string) {
    try {
      const result = await VertexAIService.speechToText(audioBase64);
      return { text: result || '' };
    } catch (error) {
      console.error('Error in speech-to-text proxy:', error);
      throw error;
    }
  }

  /**
   * Convert text to speech (proxied to Vertex AI)
   */
  static async textToSpeech(text: string) {
    try {
      const result = await VertexAIService.textToSpeech(text);
      return { audio: result };
    } catch (error) {
      console.error('Error in text-to-speech proxy:', error);
      throw error;
    }
  }
}
