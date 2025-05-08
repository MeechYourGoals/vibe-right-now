
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';
import { VertexAIService } from '@/services/VertexAIService';
import { createAIMessage } from '../../messageFactory';

export class AIServiceProcessor implements MessageProcessor {
  // This is our fallback processor, so it always can process
  canProcess(): boolean {
    return true;
  }

  async process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ): Promise<boolean> {
    try {
      // Convert contextMessages to format expected by Vertex AI
      const contextMessages = context.messages.slice(-10);
      
      // Generate response using VertexAIService
      let responseText = '';
      
      try {
        responseText = await VertexAIService.generateResponse(
          context.query, 
          context.options.isVenueMode ? 'venue' : 'default',
          contextMessages
        );
        console.log('Got response from Vertex AI:', responseText.substring(0, 50) + '...');
      } catch (error) {
        console.error('Error with Vertex AI:', error);
        responseText = "I'm having trouble connecting to my AI services right now. Please try again later.";
      }
      
      // Create and add the AI message with the response
      const aiMessage = createAIMessage(responseText);
      setMessages(prev => [...prev, aiMessage]);
      
      return true;
    } catch (error) {
      console.error('Error in AI service processor:', error);
      // Even though we failed, we handled the message
      return true;
    }
  }
}
