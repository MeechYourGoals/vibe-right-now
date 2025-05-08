
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';
import { GeminiService } from '@/services/GeminiService';
import { VertexAIService } from '@/services/VertexAIService';
import { createAIMessage } from '../../messageFactory';
import { LocalAIService } from '@/services/LocalAIService';

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
      // Convert contextMessages to format expected by AI services
      const contextMessages = context.messages.slice(-10);
      
      // Analyze sentiment of the query using local AI
      let userSentiment;
      try {
        userSentiment = await LocalAIService.analyzeSentiment(context.query);
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
      
      let responseText = '';
      
      if (context.options.isVenueMode) {
        // For venue mode, use higher quality Vertex AI model for business insights
        try {
          // Create context with sentiment and preferences
          const enhancedPrompt = `[CONTEXT: ${userSentiment?.label || 'neutral'} sentiment detected]
            ${userPreferences.length > 0 ? `[USER INTERESTS: ${userPreferences.join(', ')}]` : ''}
            ${context.query}`;
          
          responseText = await VertexAIService.generateResponse(enhancedPrompt, 'venue', contextMessages);
        } catch (error) {
          console.error('Error with Vertex AI for venue mode:', error);
          // Fall back to Gemini
          responseText = await GeminiService.generateResponse(context.query, 'venue', contextMessages);
        }
      } else {
        // For conversational queries, use standard Gemini model
        try {
          // Create context with sentiment and preferences
          const enhancedPrompt = `[CONTEXT: ${userSentiment?.label || 'neutral'} sentiment detected]
            ${userPreferences.length > 0 ? `[USER INTERESTS: ${userPreferences.join(', ')}]` : ''}
            ${context.query}`;
          
          responseText = await GeminiService.generateResponse(enhancedPrompt, 'user', contextMessages);
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
      console.error('Error in AI with preferences processor:', error);
      // Even though we failed, we handled the message
      return true;
    }
  }
}
