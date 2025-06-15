
import { MessageContext, MessageProcessor, ProcessingResult } from '../types';
import { BookingAgent } from '../../bookingAgent';
import { createAIMessage } from '../../messageFactory';

export class BookingProcessor implements MessageProcessor {
  name = 'booking';
  priority = 100;

  canHandle(context: MessageContext): boolean {
    return BookingAgent.isBookingRequest(context.query);
  }

  async process(context: MessageContext): Promise<ProcessingResult> {
    try {
      const bookingDetails = BookingAgent.extractBookingDetails(context.query);
      
      if (!bookingDetails) {
        return {
          success: false,
          handled: false,
          error: 'Could not extract booking details'
        };
      }

      const processingMessage = createAIMessage("I'm working on your booking request, please wait a moment...");
      context.setMessages(prev => [...prev, processingMessage]);
      
      const bookingResult = await BookingAgent.bookVenue(bookingDetails);
      const confirmationText = BookingAgent.generateBookingConfirmation(bookingResult);
      
      context.setMessages(prev => prev.map(msg => 
        msg.id === processingMessage.id ? {...msg, content: confirmationText, text: confirmationText} : msg
      ));
      
      return {
        success: true,
        handled: true,
        response: confirmationText
      };
    } catch (error) {
      console.error('Booking processor error:', error);
      return {
        success: false,
        handled: false,
        error: error instanceof Error ? error.message : 'Booking failed'
      };
    }
  }
}
