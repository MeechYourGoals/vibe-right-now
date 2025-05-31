
import { VertexAIService } from './VertexAIService'; // Import VertexAIService

export class OpenAIService {
  /**
   * Send a chat request, now proxied to VertexAIService.
   * Note: OpenAI-specific options like model, stream, maxTokens, useOpenRouter are ignored.
   */
  static async sendChatRequest(
    messages: { role: string; content: string }[],
    options: { 
      model?: string; // Will be ignored
      context?: string; // Will be mapped to VertexAI 'mode'
      stream?: boolean; // Will be ignored, VertexAI does not stream in this implementation
      maxTokens?: number; // Will be ignored
      useOpenRouter?: boolean; // Will be ignored
    } = {}
  ): Promise<string> {
    try {
      if (!messages || messages.length === 0) {
        throw new Error("Messages array cannot be empty.");
      }

      const currentMessage = messages[messages.length - 1];
      const prompt = currentMessage.content;

      const transformedContext = messages.slice(0, -1).map(msg => ({
        sender: msg.role === 'user' ? 'user' : 'ai', // Map 'user' to 'user', others to 'ai'
        text: msg.content
      }));

      let mode: 'default' | 'search' | 'venue' = 'default';
      if (options.context === 'venue') {
        mode = 'venue';
      } else if (options.context === 'search') { // Assuming 'search' might be a context from OpenAI options
        mode = 'search';
      }
      // Other options.context values will use 'default'

      console.log(`OpenAIService.sendChatRequest redirecting to VertexAIService.generateResponse. Prompt: ${prompt.substring(0,30)}... Mode: ${mode}`);
      // OpenAI-specific options (model, stream, maxTokens, useOpenRouter) are not directly applicable to VertexAIService.generateResponse
      // The stream option specifically: VertexAIService.generateResponse returns a Promise<string>, not a stream.
      // The original OpenAIService returned `data?.response?.choices?.[0]?.message?.content || ''` for non-streamed, which is a string.
      const responseText = await VertexAIService.generateResponse(prompt, mode, transformedContext);
      return responseText; // This is already a string
    } catch (error) {
      console.error('Error in OpenAIService.sendChatRequest (proxied to VertexAI):', error);
      // Re-throw to allow calling code to handle, or return a generic error string
      throw error;
    }
  }

  /**
   * Convert speech to text, now proxied to VertexAIService.
   */
  static async speechToText(audioBase64: string): Promise<string> {
    try {
      console.log('OpenAIService.speechToText redirecting to VertexAIService.speechToText');
      // VertexAIService.speechToText expects options for encoding, lang, etc.
      // Since original OpenAI S2T here didn't have them, pass empty options for Vertex defaults.
      const transcript = await VertexAIService.speechToText(audioBase64, {});
      return transcript || ''; // Match original return type (empty string for null)
    } catch (error) {
      console.error('Error in OpenAIService.speechToText (proxied to VertexAI):', error);
      throw error;
    }
  }

  /**
   * Convert text to speech, now proxied to VertexAIService.
   */
  static async textToSpeech(text: string): Promise<string> {
    try {
      console.log('OpenAIService.textToSpeech redirecting to VertexAIService.textToSpeech');
      // VertexAIService.textToSpeech expects options for voice, rate, pitch.
      // Pass empty options for Vertex defaults.
      const audioBase64 = await VertexAIService.textToSpeech(text, {});
      return audioBase64 || ''; // Match original return type (empty string if Vertex returns null, though it throws on error)
    } catch (error) {
      console.error('Error in OpenAIService.textToSpeech (proxied to VertexAI):', error);
      throw error;
    }
  }
}
