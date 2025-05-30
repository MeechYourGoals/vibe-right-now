
import { MessageContext, Message } from "@/types";
import { MessageProcessor } from "../types";

export const bookingProcessor: MessageProcessor = {
  canHandle: (context: MessageContext) => {
    const lastMessage = context.messages[context.messages.length - 1];
    const text = lastMessage?.text?.toLowerCase() || '';
    
    return text.includes('book') || text.includes('reserve') || text.includes('table');
  },

  async process(context: MessageContext): Promise<Message> {
    const lastMessage = context.messages[context.messages.length - 1];
    const query = lastMessage?.text || '';

    // Mock booking processing
    const mockBookingResult = {
      venue: 'Sample Restaurant',
      time: '7:00 PM',
      date: 'Today',
      party: 2
    };

    const bookingText = `I can help you make a reservation! For "${query}", I found availability at ${mockBookingResult.venue} for ${mockBookingResult.party} people at ${mockBookingResult.time} on ${mockBookingResult.date}. Would you like me to proceed with this booking?`;

    return {
      id: Date.now().toString(),
      sender: 'ai',
      text: bookingText,
      timestamp: new Date(),
      type: 'text',
      data: {
        query,
        booking: mockBookingResult
      }
    };
  }
};
