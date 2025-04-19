
import { Message } from '../../types';
import { BookingAgent } from '../bookingAgent';
import { createAIMessage } from '../messageFactory';

/**
 * Handle booking-related queries
 */
export const handleBookingQuery = async (
  inputValue: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
): Promise<boolean> => {
  if (BookingAgent.isBookingRequest(inputValue)) {
    const bookingDetails = BookingAgent.extractBookingDetails(inputValue);
    
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
  }
  
  return false;
};
