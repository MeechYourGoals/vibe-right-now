
import { MessageContext, Message } from "@/types";
import { MessageProcessor } from "./types";
import { aiServiceProcessor } from "./processors/aiServiceProcessor";
import { agentProcessor } from "./processors/agentProcessor";
import { locationProcessor } from "./processors/locationProcessor";
import { bookingProcessor } from "./processors/bookingProcessor";

const processors: MessageProcessor[] = [
  aiServiceProcessor,
  agentProcessor,
  locationProcessor,
  bookingProcessor
];

export const processMessage = async (context: MessageContext): Promise<Message> => {
  for (const processor of processors) {
    if (processor.canHandle(context)) {
      return await processor.process(context);
    }
  }

  // Default fallback processor
  return {
    id: Date.now().toString(),
    sender: 'ai',
    text: "I'm here to help! Ask me about venues, recommendations, or anything else.",
    timestamp: new Date(),
    type: 'text',
    data: {}
  };
};

export default processMessage;
