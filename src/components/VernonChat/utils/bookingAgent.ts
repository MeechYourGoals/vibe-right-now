
import { DeepgramService } from '@/services';
import { toast } from 'sonner';

interface BookingDetails {
  venueName: string;
  date?: string;
  time?: string;
  partySize?: number;
  additionalNotes?: string;
}

interface BookingResult {
  success: boolean;
  message: string;
  bookingReference?: string;
  venueDetails?: {
    name: string;
    address?: string;
    phone?: string;
  };
}

/**
 * Agent for handling venue bookings and reservations
 */
export const BookingAgent = {
  // Check if a query is a booking request
  isBookingRequest(query: string): boolean {
    const bookingKeywords = [
      'book', 'reserve', 'make a reservation', 'get tickets',
      'table for', 'reservation for', 'book a table'
    ];
    
    const lowerQuery = query.toLowerCase();
    return bookingKeywords.some(keyword => lowerQuery.includes(keyword));
  },
  
  // Extract booking details from a user query
  extractBookingDetails(query: string): BookingDetails | null {
    try {
      // Basic extraction of venue name
      const venueMatch = query.match(/(?:at|for|with|in)\s+([A-Za-z0-9\s']+?)(?:\s+on|\s+at|\s+for|\?|\.|\s*$)/i);
      if (!venueMatch) return null;
      
      const venueName = venueMatch[1].trim();
      
      // Extract date if present
      const dateMatch = query.match(/(?:on|for)\s+([A-Za-z]+day|tomorrow|[A-Za-z]+\s+\d{1,2}(?:st|nd|rd|th)?|next\s+week)/) ||
                        query.match(/(\d{1,2}(?:\/|-)\d{1,2}(?:\/|-)\d{2,4})/);
      const date = dateMatch ? dateMatch[1].trim() : undefined;
      
      // Extract time if present
      const timeMatch = query.match(/(?:at|around)\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i);
      const time = timeMatch ? timeMatch[1].trim() : undefined;
      
      // Extract party size if present
      const partySizeMatch = query.match(/(?:for|with)\s+(\d+)\s+(?:people|persons?|guests?)/i);
      const partySize = partySizeMatch ? parseInt(partySizeMatch[1], 10) : undefined;
      
      return {
        venueName,
        date,
        time,
        partySize
      };
    } catch (error) {
      console.error('Error extracting booking details:', error);
      return null;
    }
  },
  
  // Attempt to book a venue
  async bookVenue(details: BookingDetails): Promise<BookingResult> {
    try {
      console.log('Attempting to book venue with details:', details);
      
      // If Deepgram API key is available, try to use agent capabilities
      if (DeepgramService.hasApiKey()) {
        try {
          // This would use the actual Deepgram agent API when available
          // Fix here: The createAgentTask expects an AgentTaskRequest object, not two separate arguments
          const agentResponse = await DeepgramService.createAgentTask({
            task: 'book_venue',
            user_id: 'user_' + Date.now(),
            conversation_id: 'conv_' + Date.now()
          });
          
          if (agentResponse) {
            return {
              success: true,
              message: `I've initiated a booking request for ${details.venueName}. You'll receive confirmation shortly.`,
              bookingReference: `VERN-${Date.now().toString().slice(-6)}`
            };
          }
        } catch (error) {
          console.error('Error using Deepgram agent:', error);
          // Fall back to simulation
        }
      }
      
      // Simulate a booking API call
      const simulatedResponse = await simulateBookingAPI(details);
      return simulatedResponse;
      
    } catch (error) {
      console.error('Error booking venue:', error);
      return {
        success: false,
        message: `I wasn't able to complete your booking for ${details.venueName}. The booking system might be temporarily unavailable. Would you like me to try again or help you with something else?`
      };
    }
  },
  
  // Generate a booking confirmation message
  generateBookingConfirmation(result: BookingResult): string {
    if (!result.success) {
      return result.message;
    }
    
    let message = `Great news! ${result.message}\n\n`;
    
    if (result.bookingReference) {
      message += `Your booking reference is: ${result.bookingReference}\n\n`;
    }
    
    if (result.venueDetails) {
      message += `Venue: ${result.venueDetails.name}\n`;
      
      if (result.venueDetails.address) {
        message += `Address: ${result.venueDetails.address}\n`;
      }
      
      if (result.venueDetails.phone) {
        message += `Phone: ${result.venueDetails.phone}\n`;
      }
    }
    
    message += "\nYou can mention this reference if you need to make any changes to your booking.";
    
    return message;
  }
};

// Simulate a booking API response
async function simulateBookingAPI(details: BookingDetails): Promise<BookingResult> {
  // This function simulates a booking API response
  // In a real app, this would call an actual booking API
  
  return new Promise(resolve => {
    // Simulate API delay
    setTimeout(() => {
      // 80% success rate for demo purposes
      const isSuccessful = Math.random() < 0.8;
      
      if (isSuccessful) {
        // Generate a booking reference
        const bookingReference = `VERN-${Date.now().toString().slice(-6)}`;
        
        // Format booking details message
        let message = `I've successfully booked ${details.venueName} for you`;
        
        if (details.date) {
          message += ` on ${details.date}`;
        }
        
        if (details.time) {
          message += ` at ${details.time}`;
        }
        
        if (details.partySize) {
          message += ` for ${details.partySize} people`;
        }
        
        message += '.';
        
        resolve({
          success: true,
          message,
          bookingReference,
          venueDetails: {
            name: details.venueName,
            address: '123 Main Street, Anytown',
            phone: '(555) 123-4567'
          }
        });
      } else {
        // Failed booking
        resolve({
          success: false,
          message: `I wasn't able to book ${details.venueName} at this time. They might be fully booked or the reservation system may be unavailable. Would you like me to suggest an alternative venue?`
        });
      }
    }, 1500); // Simulate a 1.5 second API call
  });
}
