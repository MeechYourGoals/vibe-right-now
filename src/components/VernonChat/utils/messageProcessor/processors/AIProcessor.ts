
import { MessageContext, MessageProcessor, ProcessingResult } from '../types';
import { PerplexityService } from '@/services/PerplexityService';
import { createAIMessage } from '../../messageFactory';

export class AIProcessor implements MessageProcessor {
  name = 'ai';
  priority = 10; // Lowest priority - fallback

  canHandle(): boolean {
    return true; // Always can handle as fallback
  }

  async process(context: MessageContext): Promise<ProcessingResult> {
    try {
      const contextMessages = context.messages.slice(-10);
      
      let responseText = '';
      
      try {
        responseText = await PerplexityService.generateResponse(context.query);
        console.log('Got response from Perplexity:', responseText.substring(0, 50) + '...');
      } catch (error) {
        console.error('Error with Perplexity:', error);
        responseText = "I'm having trouble connecting to my AI services right now. Please try again later.";
      }
      
      const aiMessage = createAIMessage(responseText);
      context.setMessages(prev => [...prev, aiMessage]);
      
      return {
        success: true,
        handled: true,
        response: responseText
      };
    } catch (error) {
      console.error('AI processor error:', error);
      return {
        success: false,
        handled: false,
        error: error instanceof Error ? error.message : 'AI processing failed'
      };
    }
  }
}
