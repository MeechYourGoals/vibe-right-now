
import { MessageContext, MessageProcessor, ProcessingResult } from '../types';
import { OpenAIService } from '@/services/OpenAIService';
import { createAIMessage } from '../../messageFactory';
import { getVenueRecommendations, isVenueRecommendationQuery } from '../../venueRecommendations';

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

      // If the user is asking for venue recommendations ("X near me", "places in
      // <city>"), answer with REAL venue links from locationsRepo first.
      if (!context.isVenueMode && isVenueRecommendationQuery(context.query)) {
        try {
          const recommendation = await getVenueRecommendations(context.query);
          if (recommendation) {
            responseText = recommendation.text;
          }
        } catch (error) {
          console.error('Venue recommendation lookup failed:', error);
        }
      }

      if (!responseText) {
        try {
          responseText = await OpenAIService.generateResponse(
            context.query,
            conversationContext,
            context.isVenueMode ? 'venue' : 'user'
          );
          console.log('Got response from AI:', responseText.substring(0, 50) + '...');
        } catch (error) {
          console.error('Error with AI service:', error);
          responseText = "I'm having trouble connecting to my AI services right now. Please try again later.";
        }
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
