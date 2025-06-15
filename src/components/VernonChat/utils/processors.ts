import { MessageContext, MessageProcessor } from './messageProcessor/types';
import { PerplexityService } from '@/services/PerplexityService';
import { GeminiService } from '@/services/GeminiService';
import { Message } from '../types';
import { AgentHandler } from './handlers';
import { BookingAgent } from './bookingAgent';
import { createAIMessage } from './messageFactory';
import { handleSearchQuery } from './searchHandler';
import { VertexAIService } from '@/services/VertexAIService';

export class BookingProcessor implements MessageProcessor {
  canProcess(context: MessageContext): boolean {
    return BookingAgent.isBookingRequest(context.query);
  }

  async process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ): Promise<boolean> {
    const bookingDetails = BookingAgent.extractBookingDetails(context.query);
    
    if (bookingDetails) {
      const processingMessage = createAIMessage("I'm working on your booking request, please wait a moment...");
      setMessages(prev => [...prev, processingMessage]);
      
      const bookingResult = await BookingAgent.bookVenue(bookingDetails);
      const confirmationText = BookingAgent.generateBookingConfirmation(bookingResult);
      
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessage.id ? {...msg, text: confirmationText} : msg
      ));
      
      return true;
    }
    
    return false;
  }
}

export class AgentProcessor implements MessageProcessor {
  canProcess(context: MessageContext): boolean {
    return AgentHandler.shouldUseAgent(context.query);
  }

  async process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ): Promise<boolean> {
    return await AgentHandler.handleAgentQuery(
      context.query, 
      setMessages,
      context.options.isVenueMode
    );
  }
}

export class LocationProcessor implements MessageProcessor {
  canProcess(context: MessageContext): boolean {
    const { query } = context;
    const isLocationQuery = /what|where|when|how|things to do|events|places|restaurants|bars|attractions|activities|visit|in|at|near|around/i.test(query);
    const hasCityName = /miami|new york|los angeles|chicago|san francisco|boston|seattle|austin|denver|nashville|atlanta|portland|dallas|houston|phoenix|philadelphia|san diego|las vegas|orlando|washington|dc/i.test(query);
    
    return isLocationQuery || hasCityName;
  }

  async process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ): Promise<boolean> {
    try {
      console.log('Location/city query detected, using search pipeline');
      
      const responseText = await handleSearchQuery(context.query, context.paginationState);
      console.log('Search query handler returned response of length:', responseText.length);
      
      const aiMessage = createAIMessage(responseText);
      setMessages(prev => [...prev, aiMessage]);
      
      return true;
    } catch (error) {
      console.error('Error in search pipeline:', error);
      return false;
    }
  }
}

export class AIServiceProcessor implements MessageProcessor {
  canProcess(): boolean {
    return true; // Fallback processor
  }

  async process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ): Promise<boolean> {
    try {
      const contextMessages = context.messages.slice(-10);
      
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
      
      const aiMessage = createAIMessage(responseText);
      setMessages(prev => [...prev, aiMessage]);
      
      return true;
    } catch (error) {
      console.error('Error in AI service processor:', error);
      return true;
    }
  }
}
