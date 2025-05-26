
import { GoogleTTSService } from '@/services/GoogleTTSService';
import { VertexAIService } from '@/services/VertexAIService';

export interface BookingDetails {
  venueName: string;
  date: string;
  time: string;
  partySize: number;
  contactInfo: string;
  specialRequests?: string;
}

export interface BookingResponse {
  response: string;
  audioContent?: string;
  bookingId?: string;
  confirmed?: boolean;
}

/**
 * Google-powered booking agent using Vertex AI and TTS
 */
export class BookingAgent {
  private static async generateSpeech(text: string): Promise<string | null> {
    try {
      return await GoogleTTSService.synthesizeSpeech(text);
    } catch (error) {
      console.error('Error generating speech:', error);
      return null;
    }
  }

  static async isBookingRequest(query: string): Promise<boolean> {
    const bookingKeywords = [
      'book', 'reserve', 'reservation', 'table', 'appointment',
      'schedule', 'availability', 'booking', 'make a reservation'
    ];
    
    const lowercaseQuery = query.toLowerCase();
    return bookingKeywords.some(keyword => lowercaseQuery.includes(keyword));
  }

  static async extractBookingDetails(query: string): Promise<BookingDetails | null> {
    try {
      const prompt = `
        Extract booking details from this request: "${query}"
        
        Please identify:
        - Venue name (if mentioned)
        - Date and time preferences
        - Party size
        - Contact information
        - Any special requests
        
        Return as JSON format or indicate if information is missing.
      `;

      const response = await VertexAIService.generateResponse(prompt, 'venue');
      
      // Parse the AI response to extract structured booking details
      // This is a simplified version - in production, you'd have more robust parsing
      return {
        venueName: '',
        date: '',
        time: '',
        partySize: 1,
        contactInfo: '',
        specialRequests: query
      };
    } catch (error) {
      console.error('Error extracting booking details:', error);
      return null;
    }
  }

  static async bookVenue(details: BookingDetails): Promise<string> {
    try {
      // In a real implementation, this would integrate with the venue's booking system
      // For now, we simulate the booking process
      const bookingId = `BK${Date.now()}`;
      
      return `Booking confirmed! Your reservation ID is ${bookingId}. 
              Table for ${details.partySize} at ${details.venueName} 
              on ${details.date} at ${details.time}.`;
    } catch (error) {
      console.error('Error booking venue:', error);
      return 'Sorry, there was an error processing your booking. Please try again.';
    }
  }

  static async generateBookingConfirmation(bookingId: string, details: BookingDetails): Promise<string> {
    return `🎉 Booking Confirmed!
    
    Reservation ID: ${bookingId}
    Venue: ${details.venueName || 'Selected venue'}
    Date: ${details.date || 'To be confirmed'}
    Time: ${details.time || 'To be confirmed'}
    Party Size: ${details.partySize}
    
    You'll receive a confirmation email shortly. Thanks for choosing us!`;
  }

  static async handleBookingRequest(request: string): Promise<BookingResponse> {
    try {
      const isBooking = await this.isBookingRequest(request);
      
      if (!isBooking) {
        const response = "I'd be happy to help you with booking! Please let me know what venue you'd like to book, your preferred date and time, and party size.";
        const audioContent = await this.generateSpeech(response);
        return { response, audioContent: audioContent || undefined };
      }

      const details = await this.extractBookingDetails(request);
      
      if (!details) {
        const response = "I need a bit more information for your booking. Could you please specify the venue, date, time, and party size?";
        const audioContent = await this.generateSpeech(response);
        return { response, audioContent: audioContent || undefined };
      }

      const bookingResult = await this.bookVenue(details);
      const audioContent = await this.generateSpeech(bookingResult);
      
      return {
        response: bookingResult,
        audioContent: audioContent || undefined,
        confirmed: true
      };
      
    } catch (error) {
      console.error('Booking agent error:', error);
      const response = "I'm having trouble processing your booking request right now. Please try again later.";
      return { response };
    }
  }
}
