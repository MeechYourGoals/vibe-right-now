
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';
import { GeminiService } from '@/services/GeminiService';
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
      // Convert contextMessages to format expected by AI services
      const contextMessages = context.messages.slice(-10);
      
      let responseText = '';
      
      if (context.options.isVenueMode) {
        // For venue mode, use Vertex AI for business insights
        try {
          responseText = await VertexAIService.generateResponse(
            context.query,
            'venue',
            contextMessages
          );
        } catch (error) {
          console.error('Error with Vertex AI for venue mode:', error);
          // Fall back to Gemini
          responseText = await GeminiService.generateResponse(context.query, 'venue', contextMessages);
        }
      } else {
        // For conversational queries, use Gemini as primary
        try {
          responseText = await GeminiService.generateResponse(
            context.query,
            'user',
            contextMessages
          );
        } catch (error) {
          console.error('Error with Gemini for conversational mode:', error);
          // Fall back to Vertex AI
          responseText = await VertexAIService.generateResponse(context.query, 'default', contextMessages);
        }
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
