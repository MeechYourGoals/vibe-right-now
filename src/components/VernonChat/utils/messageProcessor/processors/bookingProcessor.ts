
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';
import { BookingAgent } from '../../bookingAgent';
import { createAIMessage } from '../../messageFactory';

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
