
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';
import { handleSearchQuery } from '../../handlers/searchQueryHandler';
import { createAIMessage } from '../../messageFactory';

export class LocationProcessor implements MessageProcessor {
  canProcess(context: MessageContext): boolean {
    const { query } = context;
    // Detect if this is likely a location/venue search query
    const isLocationQuery = /what|where|when|how|things to do|events|places|restaurants|bars|attractions|activities|visit|in|at|near|around/i.test(query);
    const hasCityName = /miami|new york|los angeles|chicago|san francisco|boston|seattle|austin|denver|nashville|atlanta|portland|dallas|houston|phoenix|philadelphia|san diego|las vegas|orlando|washington|dc/i.test(query);
    
    return isLocationQuery || hasCityName;
  }

  async process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ): Promise<boolean> {
    try {
      console.log('Location/city query detected, using search pipeline with OpenAI');
      
      // Extract any categories from the query to help with search relevance
      const responseText = await handleSearchQuery(context.query, context.paginationState);
      console.log('Search query handler returned response of length:', responseText.length);
      
      // Create and add the AI message with the response
      const aiMessage = createAIMessage(responseText);
      setMessages(prev => [...prev, aiMessage]);
      
      return true;
    } catch (error) {
      console.error('Error in search pipeline:', error);
      return false; // Let the next processor handle it
    }
  }
}
