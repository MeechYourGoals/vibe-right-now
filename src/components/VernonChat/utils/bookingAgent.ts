// Enhanced BookingAgent with Project Mariner support
export const BookingAgent = {
  isBookingRequest(query: string): boolean {
    const bookingKeywords = [
      'book', 'reserve', 'ticket', 'reservation', 'table',
      'buy ticket', 'get ticket', 'make reservation'
    ];
    
    return bookingKeywords.some(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    );
  },
  
  extractBookingDetails(query: string): any {
    // Determine if it's a ticket booking or restaurant reservation
    if (this.isTicketRequest(query)) {
      return this.extractTicketDetails(query);
    } else {
      return this.extractReservationDetails(query);
    }
  },
  
  isTicketRequest(query: string): boolean {
    const ticketKeywords = ['ticket', 'show', 'concert', 'event', 'game'];
    return ticketKeywords.some(keyword => query.toLowerCase().includes(keyword.toLowerCase()));
  },
  
  // Extract details for ticket bookings
  extractTicketDetails(query: string): any {
    const lowerQuery = query.toLowerCase();
    
    // Mock event extraction (in production, would use NLP)
    let eventId = '';
    let quantity = 1;
    let section = '';
    let priceLevel = '';
    
    // Extract event
    const events = {
      'lakers': 'event-lakers-123',
      'concert': 'event-concert-456',
      'comedy': 'event-comedy-789',
      'game': 'event-game-101',
      'show': 'event-show-112',
    };
    
    Object.entries(events).forEach(([keyword, id]) => {
      if (lowerQuery.includes(keyword)) {
        eventId = id;
      }
    });
    
    // Extract quantity
    const quantityMatch = lowerQuery.match(/(\d+)\s+(ticket|tickets)/);
    if (quantityMatch) {
      quantity = parseInt(quantityMatch[1]);
    }
    
    // Extract section (if specified)
    const sectionMatch = lowerQuery.match(/section\s+([a-z0-9]+)/i);
    if (sectionMatch) {
      section = sectionMatch[1];
    }
    
    // Extract price level
    if (lowerQuery.includes('vip')) {
      priceLevel = 'vip';
    } else if (lowerQuery.includes('premium')) {
      priceLevel = 'premium';
    } else if (lowerQuery.includes('standard')) {
      priceLevel = 'standard';
    } else if (lowerQuery.includes('budget')) {
      priceLevel = 'budget';
    }
    
    return {
      type: 'ticket',
      eventId,
      quantity,
      section,
      priceLevel
    };
  },
  
  // Extract details for restaurant reservations
  extractReservationDetails(query: string): any {
    const lowerQuery = query.toLowerCase();
    
    // Mock venue extraction (in production, would use NLP)
    let venueId = '';
    let date = new Date().toISOString().split('T')[0]; // default to today
    let time = '19:00'; // default to 7 PM
    let partySize = 2; // default to 2 people
    let specialRequests = '';
    
    // Extract venue
    const venues = {
      'steakhouse': 'venue-steakhouse-123',
      'italian': 'venue-italian-456',
      'seafood': 'venue-seafood-789',
      'sushi': 'venue-sushi-101',
      'restaurant': 'venue-restaurant-112',
    };
    
    Object.entries(venues).forEach(([keyword, id]) => {
      if (lowerQuery.includes(keyword)) {
        venueId = id;
      }
    });
    
    // Extract party size
    const partySizeMatches = [
      lowerQuery.match(/(\d+)\s+people/),
      lowerQuery.match(/for\s+(\d+)/),
      lowerQuery.match(/party\s+of\s+(\d+)/)
    ];
    
    for (const match of partySizeMatches) {
      if (match) {
        partySize = parseInt(match[1]);
        break;
      }
    }
    
    // Extract date
    const dateMatches = [
      lowerQuery.match(/(?:on|for)\s+(\w+day)/i), // e.g., "on Monday"
      lowerQuery.match(/(?:on|for)\s+(\w+\s+\d+)/i), // e.g., "on June 15"
      lowerQuery.match(/(\d{1,2}[-/]\d{1,2}(?:[-/]\d{2,4})?)/i) // e.g., "on 06/15"
    ];
    
    for (const match of dateMatches) {
      if (match) {
        // In production, would convert this to ISO date format
        // For mock, we'll keep using today's date
        break;
      }
    }
    
    // Extract time
    const timeMatches = [
      lowerQuery.match(/at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i), // e.g., "at 7pm"
      lowerQuery.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i) // e.g., "7pm"
    ];
    
    for (const match of timeMatches) {
      if (match) {
        // In production, would convert this to 24h time format
        // For mock, we'll keep using 7 PM
        break;
      }
    }
    
    // Extract special requests
    if (lowerQuery.includes('window')) {
      specialRequests += 'Window seat preferred. ';
    }
    if (lowerQuery.includes('birthday') || lowerQuery.includes('celebration')) {
      specialRequests += 'Celebrating a special occasion. ';
    }
    if (lowerQuery.includes('allergic') || lowerQuery.includes('allergy')) {
      specialRequests += 'Food allergies noted - please check with party. ';
    }
    
    return {
      type: 'reservation',
      venueId,
      date,
      time,
      partySize,
      specialRequests: specialRequests.trim()
    };
  },
  
  async bookVenue(details: any): Promise<any> {
    try {
      console.log("Booking venue with details:", details);
      
      // Delegate to the appropriate Mariner function based on booking type
      const { AgentService } = await import('./services/agentService');
      
      if (details.type === 'ticket') {
        return await AgentService.bookTickets(details.eventId, {
          quantity: details.quantity,
          section: details.section,
          priceLevel: details.priceLevel
        });
      } else {
        return await AgentService.makeReservation(details.venueId, {
          date: details.date,
          time: details.time,
          partySize: details.partySize,
          specialRequests: details.specialRequests
        });
      }
    } catch (error) {
      console.error("Error in bookVenue:", error);
      return { success: false, error: "Failed to process booking" };
    }
  },
  
  generateBookingConfirmation(result: any): string {
    if (!result || !result.success) {
      return "I'm sorry, I wasn't able to complete your booking. Please try again later.";
    }
    
    // Different confirmation messages based on booking type
    if (result.details?.event) {
      // Ticket booking confirmation
      return `Great news! I've secured ${result.details.ticketCount || 1} ticket(s) for you.
      
Confirmation code: ${result.details.confirmationCode}
Event: ${result.details.event}
Venue: ${result.details.venue}
${result.details.seats ? `Seats: ${result.details.seats.join(', ')}` : ''}
Total price: ${result.details.totalPrice}

${result.details.additionalInfo || ''}`;
    } else {
      // Restaurant reservation confirmation
      return `Perfect! Your reservation is confirmed.
      
Confirmation code: ${result.details.confirmationCode}
Restaurant: ${result.details.venue}
Date: ${result.details.date}
Time: ${result.details.time}
Party size: ${result.details.partySize}
${result.details.specialRequests ? `Special requests: ${result.details.specialRequests}` : ''}

${result.details.additionalInfo || ''}`;
    }
  }
};

export default BookingAgent;
