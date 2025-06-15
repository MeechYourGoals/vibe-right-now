
import { MessageContext, Middleware, ProcessingResult } from '../types';

export class ValidationMiddleware implements Middleware {
  name = 'validation';

  async execute(
    context: MessageContext, 
    next: () => Promise<ProcessingResult>
  ): Promise<ProcessingResult> {
    // Validate input
    if (!context.query || context.query.trim().length === 0) {
      return {
        success: false,
        handled: false,
        error: 'Empty query provided'
      };
    }

    if (context.query.trim().length > 5000) {
      return {
        success: false,
        handled: false,
        error: 'Query too long'
      };
    }

    return await next();
  }
}
