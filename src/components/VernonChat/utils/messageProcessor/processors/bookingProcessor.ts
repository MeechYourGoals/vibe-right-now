
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
      // Add a processing message with Project Mariner attribution
      const processingMessage = createAIMessage(
        "I'm working on your booking request using Google's Project Mariner for hands-off reservation processing. Please wait a moment..."
      );
      setMessages(prev => [...prev, processingMessage]);
      
      const bookingResult = await BookingAgent.bookVenue(bookingDetails);
      const confirmationText = BookingAgent.generateBookingConfirmation(bookingResult);
      
      // Update the message with booking confirmation
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessage.id ? {
          ...msg, 
          text: confirmationText + "\n\n(Powered by Google's Project Mariner agent technology)"
        } : msg
      ));
      
      return true;
    }
    
    return false;
  }
}
