
import { MessageContext, Message } from "@/types";
import { MessageProcessor } from "../types";

export const aiServiceProcessor: MessageProcessor = {
  canHandle: (context: MessageContext) => {
    const lastMessage = context.messages[context.messages.length - 1];
    const text = lastMessage?.text?.toLowerCase() || '';
    
    return text.includes('recommend') || text.includes('suggest') || text.includes('find');
  },

  async process(context: MessageContext): Promise<Message> => {
    const lastMessage = context.messages[context.messages.length - 1];
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const query = lastMessage?.text || '';
    const isVenueMode = context.options?.isVenueMode || false;

    return {
      id: Date.now().toString(),
      sender: 'ai',
      text: `Based on your request "${query}", I ${isVenueMode ? 'suggest focusing on your venue analytics' : 'recommend checking out the trending spots in your area'}. Would you like me to show you some options?`,
      timestamp: new Date(),
      type: 'recommendation',
      data: {
        query,
        isVenueMode,
        recommendations: []
      }
    };
  }
};
