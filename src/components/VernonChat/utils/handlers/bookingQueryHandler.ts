
import { Message } from '../../types';
import { BookingAgent } from '../bookingAgent';
import { createAssistantMessage } from '../messageFactory';

/**
 * Handle booking-related queries
 */
export const handleBookingQuery = async (
  inputValue: string,
  isProPlan: boolean
): Promise<{ responseText: string, paginationData: any | null }> => {
  if (BookingAgent.isBookingRequest(inputValue)) {
    const bookingDetails = BookingAgent.extractBookingDetails(inputValue);
    
    if (bookingDetails) {
      const bookingResult = await BookingAgent.bookVenue(bookingDetails);
      const confirmationText = BookingAgent.generateBookingConfirmation(bookingResult);
      
      return { responseText: confirmationText, paginationData: null };
    }
  }
  
  return { 
    responseText: "I couldn't process your booking request. Could you provide more details?",
    paginationData: null
  };
};
