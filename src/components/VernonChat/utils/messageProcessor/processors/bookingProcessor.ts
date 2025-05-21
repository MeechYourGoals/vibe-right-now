
import { MessageContext, MessageProcessor } from '../types';
import { Message } from '../../../types';
import { BookingAgent } from '../../bookingAgent';
import { createAIMessage } from '../../messageFactory';
import { AgentService } from '../../services/agentService';

export class BookingProcessor implements MessageProcessor {
  canProcess(context: MessageContext): boolean {
    return this.isBookingRequest(context.query);
  }

  isBookingRequest(query: string): boolean {
    const bookingKeywords = [
      'book', 'reserve', 'ticket', 'reservation', 'table', 'purchase', 
      'buy ticket', 'get ticket', 'make reservation'
    ];
    
    return bookingKeywords.some(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  
  extractBookingType(query: string): 'ticket' | 'reservation' | null {
    const ticketKeywords = ['ticket', 'show', 'concert', 'event', 'game'];
    const reservationKeywords = ['table', 'reservation', 'dinner', 'lunch', 'restaurant'];
    
    if (ticketKeywords.some(keyword => query.toLowerCase().includes(keyword.toLowerCase()))) {
      return 'ticket';
    }
    
    if (reservationKeywords.some(keyword => query.toLowerCase().includes(keyword.toLowerCase()))) {
      return 'reservation';
    }
    
    return null;
  }

  async process(
    context: MessageContext,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ): Promise<boolean> {
    const { query } = context;
    
    // Initial processing message
    const processingMessage = createAIMessage("I'll help you with that booking. Let me look up the details...");
    setMessages(prev => [...prev, processingMessage]);
    
    // Determine if this is a ticket purchase or reservation
    const bookingType = this.extractBookingType(query);
    
    if (!bookingType) {
      // Not enough information to determine booking type
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessage.id ? 
        {...msg, content: "I'd be happy to help you book something. Could you specify if you're looking to buy tickets for an event or make a restaurant reservation?", text: "I'd be happy to help you book something. Could you specify if you're looking to buy tickets for an event or make a restaurant reservation?"} 
        : msg
      ));
      return true;
    }
    
    try {
      if (bookingType === 'ticket') {
        // Process ticket booking
        const bookingDetails = BookingAgent.extractTicketDetails(query);
        if (!bookingDetails || !bookingDetails.eventId) {
          setMessages(prev => prev.map(msg => 
            msg.id === processingMessage.id ? 
            {...msg, content: "I need a bit more information to book tickets. Could you provide details like which event, how many tickets, and what date?", text: "I need a bit more information to book tickets. Could you provide details like which event, how many tickets, and what date?"} 
            : msg
          ));
          return true;
        }
        
        // Process with Mariner
        const result = await AgentService.bookTickets(bookingDetails.eventId, {
          quantity: bookingDetails.quantity || 1,
          section: bookingDetails.section,
          priceLevel: bookingDetails.priceLevel
        });
        
        if (result.success) {
          setMessages(prev => prev.map(msg => 
            msg.id === processingMessage.id ? 
            {...msg, content: `Great news! I've booked ${bookingDetails.quantity || 1} ticket(s) for you. Confirmation code: ${result.details?.confirmationCode}. ${result.details?.additionalInfo || ''}`, text: `Great news! I've booked ${bookingDetails.quantity || 1} ticket(s) for you. Confirmation code: ${result.details?.confirmationCode}. ${result.details?.additionalInfo || ''}`} 
            : msg
          ));
        } else {
          setMessages(prev => prev.map(msg => 
            msg.id === processingMessage.id ? 
            {...msg, content: `I'm sorry, I wasn't able to complete the ticket booking. ${result.error || 'Please try again later.'}`, text: `I'm sorry, I wasn't able to complete the ticket booking. ${result.error || 'Please try again later.'}`} 
            : msg
          ));
        }
        
      } else {
        // Process restaurant reservation
        const reservationDetails = BookingAgent.extractReservationDetails(query);
        if (!reservationDetails || !reservationDetails.venueId) {
          setMessages(prev => prev.map(msg => 
            msg.id === processingMessage.id ? 
            {...msg, content: "I need a bit more information to make a reservation. Could you provide details like which restaurant, how many people, and what date and time?", text: "I need a bit more information to make a reservation. Could you provide details like which restaurant, how many people, and what date and time?"} 
            : msg
          ));
          return true;
        }
        
        // Process with Mariner
        const result = await AgentService.makeReservation(reservationDetails.venueId, {
          date: reservationDetails.date,
          time: reservationDetails.time,
          partySize: reservationDetails.partySize || 2,
          specialRequests: reservationDetails.specialRequests
        });
        
        if (result.success) {
          setMessages(prev => prev.map(msg => 
            msg.id === processingMessage.id ? 
            {...msg, content: `Perfect! I've made a reservation for ${reservationDetails.partySize || 2} at ${reservationDetails.time} on ${reservationDetails.date}. Confirmation code: ${result.details?.confirmationCode}. ${result.details?.additionalInfo || ''}`, text: `Perfect! I've made a reservation for ${reservationDetails.partySize || 2} at ${reservationDetails.time} on ${reservationDetails.date}. Confirmation code: ${result.details?.confirmationCode}. ${result.details?.additionalInfo || ''}`} 
            : msg
          ));
        } else {
          setMessages(prev => prev.map(msg => 
            msg.id === processingMessage.id ? 
            {...msg, content: `I'm sorry, I wasn't able to complete the reservation. ${result.error || 'Please try again later.'}`, text: `I'm sorry, I wasn't able to complete the reservation. ${result.error || 'Please try again later.'}`} 
            : msg
          ));
        }
      }
      
    } catch (error) {
      console.error("Error processing booking:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessage.id ? 
        {...msg, content: "I apologize, but I encountered an error while processing your booking. Please try again later.", text: "I apologize, but I encountered an error while processing your booking. Please try again later."} 
        : msg
      ));
    }
    
    return true;
  }
}
