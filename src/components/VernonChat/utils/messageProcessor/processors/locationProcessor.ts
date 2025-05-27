
import { MessageContext, Message } from "@/types";
import { MessageProcessor } from "../types";

export const locationProcessor: MessageProcessor = {
  canHandle: (context: MessageContext) => {
    const lastMessage = context.messages[context.messages.length - 1];
    const text = lastMessage?.text?.toLowerCase() || '';
    
    return text.includes('where') || text.includes('location') || text.includes('address') || text.includes('near');
  },

  async process(context: MessageContext): Promise<Message> => {
    const lastMessage = context.messages[context.messages.length - 1];
    
    // Mock location data
    const mockLocation = {
      name: 'Trendy Spot',
      address: '123 Main St, Los Angeles, CA',
      distance: '0.5 miles away'
    };

    const locationText = `I found ${mockLocation.name} at ${mockLocation.address}, which is ${mockLocation.distance}. Would you like directions or more information about this place?`;

    return {
      id: Date.now().toString(),
      sender: 'ai',
      text: locationText,
      timestamp: new Date(),
      type: 'location',
      data: {
        query: lastMessage?.text || '',
        location: mockLocation
      }
    };
  }
};
