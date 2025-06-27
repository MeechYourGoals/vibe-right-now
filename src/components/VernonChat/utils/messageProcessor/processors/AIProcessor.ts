
import { MessageContext, MessageProcessor, ProcessingResult } from '../types';
import { OpenAIService } from '@/services/OpenAIService';
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
      
      // Convert messages to the format expected by OpenAI service
      const conversationContext = contextMessages.map(msg => ({
        sender: msg.direction === 'outgoing' ? 'user' : 'assistant',
        text: msg.content || msg.text || ''
      }));
      
      let responseText = '';
      
      try {
        responseText = await OpenAIService.generateResponse(
          context.query,
          conversationContext,
          context.isVenueMode ? 'venue' : 'user'
        );
        console.log('Got response from OpenAI:', responseText.substring(0, 50) + '...');
      } catch (error) {
        console.error('Error with OpenAI:', error);
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
