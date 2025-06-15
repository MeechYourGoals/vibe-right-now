
import { MessageContext, Middleware, ProcessingResult } from '../types';

export class LoggingMiddleware implements Middleware {
  name = 'logging';

  async execute(
    context: MessageContext, 
    next: () => Promise<ProcessingResult>
  ): Promise<ProcessingResult> {
    const startTime = Date.now();
    console.log(`[MessageProcessor] Starting processing: "${context.query.substring(0, 50)}..."`);
    
    try {
      const result = await next();
      const duration = Date.now() - startTime;
      
      console.log(`[MessageProcessor] Completed in ${duration}ms:`, {
        success: result.success,
        handled: result.handled,
        hasResponse: !!result.response
      });
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[MessageProcessor] Failed after ${duration}ms:`, error);
      throw error;
    }
  }
}
