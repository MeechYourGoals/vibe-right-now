
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';
import { OpenAIService } from '@/services/OpenAIService';
import { VertexAIService } from '@/services/VertexAIService';
import { createAIMessage } from '../../messageFactory';
import { localAI } from '@/services/LocalAIService';

export class AIWithPreferencesProcessor implements MessageProcessor {
  // This processor can always handle messages
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
      
      // Analyze sentiment of the query
      let userSentiment;
      try {
        userSentiment = await localAI.analyzeSentiment(context.query);
        console.log('Query sentiment analysis:', userSentiment);
      } catch (err) {
        console.error('Error analyzing sentiment:', err);
        // Continue without sentiment if there's an error
      }
      
      // Try to get user preferences
      let userPreferences: string[] = [];
      try {
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
          const prefs = JSON.parse(savedPrefs);
          userPreferences = [
            ...(prefs.vibes || []),
            ...(prefs.categories || []),
            ...(prefs.interests || [])
          ];
        }
      } catch (error) {
        console.error('Error loading user preferences:', error);
      }
      
      // Add sentiment and preferences to system message if available
      let systemMessage = 'You are a helpful assistant.';
      
      if (userSentiment && userSentiment.label) {
        systemMessage += ` The user's current sentiment appears to be ${userSentiment.label}.`;
      }
      
      if (userPreferences.length > 0) {
        systemMessage += ` The user has expressed interest in these topics: ${userPreferences.join(', ')}.`;
        systemMessage += ` When appropriate, tailor your responses to include these interests.`;
      }
      
      let responseText = '';
      
      if (context.options.isVenueMode) {
        // For venue mode, use higher quality model for business insights
        try {
          // Add system message with sentiment and preferences
          openAIMessages.unshift({
            role: 'system',
            content: systemMessage
          });
          
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
          // Add system message with sentiment and preferences
          openAIMessages.unshift({
            role: 'system',
            content: systemMessage
          });
          
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
      console.error('Error in AI with preferences processor:', error);
      // Even though we failed, we handled the message
      return true;
    }
  }
}
