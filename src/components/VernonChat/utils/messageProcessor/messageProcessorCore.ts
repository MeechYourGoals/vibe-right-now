
import { MessageContext, Message } from "@/types";
import { MessageProcessor } from "./types";

export class MessageProcessorCore {
  private processors: MessageProcessor[] = [];

  addProcessor(processor: MessageProcessor) {
    this.processors.push(processor);
  }

  async processMessage(context: MessageContext): Promise<Message> {
    // Set typing state if available
    if (context.options?.setIsTyping) {
      context.options.setIsTyping(true);
    }
    
    if (context.options?.setIsSearching) {
      context.options.setIsSearching(true);
    }

    try {
      // Find the first processor that can handle this message
      for (const processor of this.processors) {
        if (processor.canHandle(context)) {
          const result = await processor.process(context);
          
          // Update pagination state if available
          if (context.options?.updatePaginationState && result.data?.pagination) {
            context.options.updatePaginationState(result.data.pagination);
          }

          // Create enhanced context with query for other processors
          const enhancedContext: MessageContext = {
            ...context,
            query: context.messages[context.messages.length - 1]?.text || ''
          };

          return result;
        }
      }

      // Default response if no processor can handle the message
      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: "I'm not sure how to help with that. Could you try rephrasing your question?",
        timestamp: new Date(),
        type: 'text'
      };
    } finally {
      // Clear typing/searching states
      if (context.options?.setIsTyping) {
        context.options.setIsTyping(false);
      }
      if (context.options?.setIsSearching) {
        context.options.setIsSearching(false);
      }
    }
  }
}

export const messageProcessorCore = new MessageProcessorCore();
