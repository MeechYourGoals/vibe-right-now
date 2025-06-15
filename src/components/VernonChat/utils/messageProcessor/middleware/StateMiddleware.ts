
import { MessageContext, Middleware, ProcessingResult } from '../types';

export class StateMiddleware implements Middleware {
  name = 'state';

  async execute(
    context: MessageContext, 
    next: () => Promise<ProcessingResult>
  ): Promise<ProcessingResult> {
    // Set initial state
    context.setIsTyping(true);
    context.setIsSearching(true);

    try {
      const result = await next();
      return result;
    } finally {
      // Cleanup state
      context.setIsTyping(false);
      context.setIsSearching(false);
    }
  }
}
