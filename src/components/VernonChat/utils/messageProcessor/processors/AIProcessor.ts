
import { MessageContext, MessageProcessor, ProcessingResult } from '../types';
import { EnhancedVertexAIService } from '@/services/EnhancedVertexAIService';
import { createAIMessage } from '../../messageFactory';
import { useUserMemory } from '@/hooks/useUserMemory';

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
        // Get current user ID (in a real app, this would come from auth context)
        const userId = 'current-user-id'; // This should be passed through context
        
        // For now, we'll use the enhanced service without user memory
        // In a real implementation, you'd get user memory from the hook
        responseText = await EnhancedVertexAIService.generatePersonalizedResponse(
          context.query, 
          null, // User memory would be passed here
          context.isVenueMode ? 'venue' : 'default',
          contextMessages
        );
        
        console.log('Got response from Enhanced Vertex AI:', responseText.substring(0, 50) + '...');
      } catch (error) {
        console.error('Error with Enhanced Vertex AI:', error);
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
