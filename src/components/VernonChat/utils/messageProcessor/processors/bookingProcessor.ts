
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';
import { BookingAgent } from '../../bookingAgent';
import { createAIMessage } from '../../messageFactory';

export class BookingProcessor implements MessageProcessor {
  async canProcess(context: MessageContext): Promise<boolean> {
    return await BookingAgent.isBookingRequest(context.query);
  }

  async process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ): Promise<boolean> {
    try {
      const bookingDetails = await BookingAgent.extractBookingDetails(context.query);
      
      if (bookingDetails) {
        const processingMessage = createAIMessage("I'm processing your booking request with Project Mariner agentic AI, please wait a moment...");
        setMessages(prev => [...prev, processingMessage]);
        
        const bookingResult = await BookingAgent.bookVenue(bookingDetails);
        const confirmationText = `✅ Project Mariner has successfully processed your booking request!\n\n${await BookingAgent.generateBookingConfirmation('BK' + Date.now(), bookingDetails)}`;
        
        setMessages(prev => prev.map(msg => 
          msg.id === processingMessage.id ? {...msg, content: confirmationText, text: confirmationText} : msg
        ));
        
        return true;
      }
    } catch (error) {
      console.error('Booking processor error:', error);
    }
    
    return false;
  }
}
