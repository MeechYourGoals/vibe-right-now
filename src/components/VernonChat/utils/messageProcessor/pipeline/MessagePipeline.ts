
import { MessageContext, MessageProcessor, Middleware, ProcessingResult } from '../types';

export class MessagePipeline {
  private processors: MessageProcessor[] = [];
  private middleware: Middleware[] = [];

  addProcessor(processor: MessageProcessor): void {
    this.processors.push(processor);
    this.processors.sort((a, b) => b.priority - a.priority);
  }

  addMiddleware(middleware: Middleware): void {
    this.middleware.push(middleware);
  }

  async process(context: MessageContext): Promise<ProcessingResult> {
    try {
      // Find the appropriate processor
      const processor = this.processors.find(p => p.canHandle(context));
      
      if (!processor) {
        return {
          success: false,
          handled: false,
          error: 'No suitable processor found'
        };
      }

      // Execute middleware chain
      return await this.executeMiddleware(context, processor, 0);
    } catch (error) {
      console.error('Pipeline error:', error);
      return {
        success: false,
        handled: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async executeMiddleware(
    context: MessageContext, 
    processor: MessageProcessor, 
    index: number
  ): Promise<ProcessingResult> {
    if (index >= this.middleware.length) {
      // Execute the actual processor
      return await processor.process(context);
    }

    const middleware = this.middleware[index];
    return await middleware.execute(context, () => 
      this.executeMiddleware(context, processor, index + 1)
    );
  }
}
