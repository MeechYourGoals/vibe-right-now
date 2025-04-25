
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';
import { OpenAIService } from '@/services/OpenAIService';
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
      // Convert contextMessages to format expected by OpenAI
      const contextMessages = context.messages.slice(-10);
      const openAIMessages = contextMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      
      // Add the new user message
      openAIMessages.push({
        role: 'user',
        content: context.query
      });
      
      let responseText = '';
      
      if (context.options.isVenueMode) {
        // For venue mode, use higher quality model for business insights
        try {
          responseText = await OpenAIService.sendChatRequest(openAIMessages, {
            model: 'gpt-4o',
            context: 'venue'
          });
        } catch (error) {
          console.error('Error with OpenAI for venue mode:', error);
          // Fall back to Vertex AI
          responseText = await VertexAIService.generateResponse(context.query, 'venue', contextMessages);
        }
      } else {
        // For conversational queries, use standard model
        try {
          responseText = await OpenAIService.sendChatRequest(openAIMessages, {
            model: 'gpt-4o-mini',
            context: 'user'
          });
        } catch (error) {
          console.error('Error with OpenAI for conversational mode:', error);
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
