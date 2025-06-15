
import { MessagePipeline } from './pipeline/MessagePipeline';
import { LoggingMiddleware } from './middleware/LoggingMiddleware';
import { ValidationMiddleware } from './middleware/ValidationMiddleware';
import { StateMiddleware } from './middleware/StateMiddleware';
import { BookingProcessor } from './processors/BookingProcessor';
import { SearchProcessor } from './processors/SearchProcessor';
import { AIProcessor } from './processors/AIProcessor';
import { MessageContext, ProcessingResult } from './types';

export class MessageProcessorService {
  private pipeline: MessagePipeline;

  constructor() {
    this.pipeline = new MessagePipeline();
    this.setupPipeline();
  }

  private setupPipeline(): void {
    // Add middleware
    this.pipeline.addMiddleware(new ValidationMiddleware());
    this.pipeline.addMiddleware(new LoggingMiddleware());
    this.pipeline.addMiddleware(new StateMiddleware());

    // Add processors
    this.pipeline.addProcessor(new BookingProcessor());
    this.pipeline.addProcessor(new SearchProcessor());
    this.pipeline.addProcessor(new AIProcessor());
  }

  async processMessage(context: MessageContext): Promise<ProcessingResult> {
    return await this.pipeline.process(context);
  }
}

// Export singleton instance
export const messageProcessorService = new MessageProcessorService();
