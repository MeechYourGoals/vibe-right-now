
import { MessageContext, MessageProcessor, ProcessingResult } from '../types';
import { handleSearchQuery } from '../../searchHandler';
import { createAIMessage } from '../../messageFactory';

export class SearchProcessor implements MessageProcessor {
  name = 'search';
  priority = 80;

  canHandle(context: MessageContext): boolean {
    const { query } = context;
    const isLocationQuery = /what|where|when|how|things to do|events|places|restaurants|bars|attractions|activities|visit|in|at|near|around/i.test(query);
    const hasCityName = /miami|new york|los angeles|chicago|san francisco|boston|seattle|austin|denver|nashville|atlanta|portland|dallas|houston|phoenix|philadelphia|san diego|las vegas|orlando|washington|dc/i.test(query);
    
    return isLocationQuery || hasCityName;
  }

  async process(context: MessageContext): Promise<ProcessingResult> {
    try {
      console.log('Location/city query detected, using search pipeline');
      
      const responseText = await handleSearchQuery(context.query, context.paginationState);
      console.log('Search query handler returned response of length:', responseText.length);
      
      const aiMessage = createAIMessage(responseText);
      context.setMessages(prev => [...prev, aiMessage]);
      
      return {
        success: true,
        handled: true,
        response: responseText
      };
    } catch (error) {
      console.error('Error in search pipeline:', error);
      return {
        success: false,
        handled: false,
        error: error instanceof Error ? error.message : 'Search failed'
      };
    }
  }
}
