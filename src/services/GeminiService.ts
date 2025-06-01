
import { VertexAIService } from './VertexAIService';

/**
 * Gemini Service that proxies through VertexAIService
 * Maintains backward compatibility
 */
export const GeminiService = {
  /**
   * Generate a text response using Gemini (via VertexAI)
   */
  async generateResponse(prompt: string, mode: 'venue' | 'user' = 'user', history: any[] = []): Promise<string> {
    try {
      console.log(`GeminiService proxy: Calling VertexAI with prompt: "${prompt.substring(0, 50)}..."`);
      
      const mappedMode = mode === 'venue' ? 'venue' : 'default';
      return await VertexAIService.generateResponse(prompt, mappedMode, history);
    } catch (error) {
      console.error('Error in GeminiService proxy:', error);
      return "I'm having trouble connecting to my AI services right now. Please try again later.";
    }
  },
  
  /**
   * Generate an image (not supported in current Google setup)
   */
  async generateImage(prompt: string): Promise<string> {
    console.warn('Image generation not implemented in Google proxy');
    throw new Error('Image generation not available in current setup');
  }
};
