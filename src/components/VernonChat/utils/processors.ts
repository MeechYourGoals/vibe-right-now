
import { MessageContext, ProcessingResult } from './messageProcessor/types';
import { SearchProcessor } from './messageProcessor/processors/SearchProcessor';
import { BookingProcessor } from './messageProcessor/processors/BookingProcessor';
import { AIProcessor } from './messageProcessor/processors/AIProcessor';

// Legacy interface for backwards compatibility
export interface MessageProcessor {
  process(context: MessageContext): Promise<ProcessingResult>;
}

// Legacy processors that delegate to new architecture
export class LegacyBookingProcessor implements MessageProcessor {
  private bookingProcessor = new BookingProcessor();

  async process(context: MessageContext): Promise<ProcessingResult> {
    return this.bookingProcessor.process(context);
  }
}

export class LegacyAgentProcessor implements MessageProcessor {
  private aiProcessor = new AIProcessor();

  async process(context: MessageContext): Promise<ProcessingResult> {
    return this.aiProcessor.process(context);
  }
}

export class LegacyLocationProcessor implements MessageProcessor {
  private searchProcessor = new SearchProcessor();

  async process(context: MessageContext): Promise<ProcessingResult> {
    return this.searchProcessor.process(context);
  }
}

export class LegacyAIServiceProcessor implements MessageProcessor {
  private aiProcessor = new AIProcessor();

  async process(context: MessageContext): Promise<ProcessingResult> {
    return this.aiProcessor.process(context);
  }
}

// Export instances for backwards compatibility
export const bookingProcessor = new LegacyBookingProcessor();
export const agentProcessor = new LegacyAgentProcessor();
export const locationProcessor = new LegacyLocationProcessor();
export const aiServiceProcessor = new LegacyAIServiceProcessor();
