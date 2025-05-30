
import { MessageContext, Message } from "@/types";
import { MessageProcessor } from "../types";

export const agentProcessor: MessageProcessor = {
  canHandle: (context: MessageContext) => {
    const lastMessage = context.messages[context.messages.length - 1];
    const query = lastMessage?.text?.toLowerCase() || '';
    
    return query.includes('agent') || query.includes('help') || query.includes('support');
  },

  async process(context: MessageContext): Promise<Message> {
    const lastMessage = context.messages[context.messages.length - 1];
    const query = lastMessage?.text || '';

    // Check if we're in venue mode
    const isVenueMode = context.options?.isVenueMode || false;

    return {
      id: Date.now().toString(),
      sender: 'ai',
      text: `I'm Vernon, your AI assistant! I'm here to help you ${isVenueMode ? 'manage your venue' : 'discover amazing places'}. What would you like to know?`,
      timestamp: new Date(),
      type: 'text',
      data: { 
        query,
        isVenueMode 
      }
    };
  }
};
