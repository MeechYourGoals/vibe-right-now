
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';
import { GeminiService } from '@/services/GeminiService';
import { VertexAIService } from '@/services/VertexAIService';
import { createAIMessage } from '../../messageFactory';
import { localAI } from '@/services/LocalAIService';
import { SearchCoordinator } from '../../handlers/search';

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
        userSentiment = await localAI.analyzeSentiment(context.query);
        console.log('Query sentiment analysis:', userSentiment);
      } catch (err) {
        console.error('Error analyzing sentiment:', err);
        // Continue without sentiment if there's an error
      }
      
      // Extract keywords to improve search results
      let keywords = [];
      try {
        keywords = await localAI.extractKeywords(context.query);
        console.log('Extracted keywords:', keywords);
      } catch (err) {
        console.error('Error extracting keywords:', err);
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
      
      // First determine if this is a search query that should use web search
      const isSearchQuery = this.isSearchQuery(context.query);
      console.log('Is search query:', isSearchQuery);
      
      let responseText = '';
      
      // Handle based on query type and context
      if (isSearchQuery) {
        try {
          // For search queries, try to use the SearchCoordinator first
          console.log('Using SearchCoordinator for real-time data');
          responseText = await SearchCoordinator.processSearchQuery(context.query, context.paginationState, keywords);
          
          // If the search coordinator didn't return useful results, fall back to Gemini web search
          if (!responseText || responseText.length < 100) {
            console.log('SearchCoordinator returned limited results, using Gemini web search');
            responseText = await GeminiService.searchWeb(context.query);
          }
        } catch (error) {
          console.error('Error with search services, falling back to standard AI:', error);
          // Fall back to standard AI response if search fails
          responseText = await this.getStandardResponse(context, contextMessages, userSentiment, userPreferences);
        }
      } else {
        // For conversational queries, use standard AI response
        responseText = await this.getStandardResponse(context, contextMessages, userSentiment, userPreferences);
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

  /**
   * Determine if a query is a search query versus a conversational query
   */
  private isSearchQuery(query: string): boolean {
    const searchTerms = [
      'find', 'search', 'look for', 'where', 'how to get to',
      'nearby', 'closest', 'around', 'show me', 'what are', 'recommend',
      'best', 'top', 'popular', 'places', 'things to do', 'events'
    ];
    
    return searchTerms.some(term => query.toLowerCase().includes(term.toLowerCase()));
  }

  /**
   * Get a standard AI response using Gemini or Vertex AI
   */
  private async getStandardResponse(
    context: MessageContext, 
    contextMessages: any[], 
    userSentiment: any, 
    userPreferences: string[]
  ): Promise<string> {
    if (context.options.isVenueMode) {
      // For venue mode, use higher quality Vertex AI model for business insights
      try {
        // Create context with sentiment and preferences
        const enhancedPrompt = `[CONTEXT: ${userSentiment?.label || 'neutral'} sentiment detected]
          ${userPreferences.length > 0 ? `[USER INTERESTS: ${userPreferences.join(', ')}]` : ''}
          ${context.query}`;
        
        return await VertexAIService.generateResponse(enhancedPrompt, 'venue', contextMessages);
      } catch (error) {
        console.error('Error with Vertex AI for venue mode:', error);
        // Fall back to Gemini
        return await GeminiService.generateResponse(context.query, 'venue', contextMessages);
      }
    } else {
      // For conversational queries, use standard Gemini model
      try {
        // Create context with sentiment and preferences
        const enhancedPrompt = `[CONTEXT: ${userSentiment?.label || 'neutral'} sentiment detected]
          ${userPreferences.length > 0 ? `[USER INTERESTS: ${userPreferences.join(', ')}]` : ''}
          ${context.query}`;
        
        return await GeminiService.generateResponse(enhancedPrompt, 'user', contextMessages);
      } catch (error) {
        console.error('Error with Gemini for conversational mode:', error);
        // Fall back to Vertex AI
        return await VertexAIService.generateResponse(context.query, 'default', contextMessages);
      }
    }
  }
}
