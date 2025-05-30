
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
  const isBooking = await BookingAgent.isBookingRequest(inputValue);
  
  if (isBooking) {
    const processingMessage = createAIMessage("I'm working on your booking request, please wait a moment...");
    setMessages(prev => [...prev, processingMessage]);
    
    try {
      const bookingDetails = await BookingAgent.extractBookingDetails(inputValue);
      
      if (bookingDetails) {
        const bookingResult = await BookingAgent.bookVenue(bookingDetails);
        const confirmationText = await BookingAgent.generateBookingConfirmation('BK' + Date.now(), bookingDetails);
        
        setMessages(prev => prev.map(msg => 
          msg.id === processingMessage.id ? {...msg, content: confirmationText, text: confirmationText} : msg
        ));
      } else {
        setMessages(prev => prev.map(msg => 
          msg.id === processingMessage.id ? {
            ...msg, 
            content: "I need more information for your booking. Please specify the venue, date, time, and party size.",
            text: "I need more information for your booking. Please specify the venue, date, time, and party size."
          } : msg
        ));
      }
      
      return true;
    } catch (error) {
      console.error('Booking error:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessage.id ? {
          ...msg, 
          content: "Sorry, I encountered an error processing your booking request.",
          text: "Sorry, I encountered an error processing your booking request."
        } : msg
      ));
      return true;
    }
  }
  
  return false;
};
