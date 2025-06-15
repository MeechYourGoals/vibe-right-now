
import { handleCorsPreflightRequest } from './cors.ts';
import { createErrorResponse } from './response.ts';
import { logError, LogContext } from './logging.ts';

export type RequestHandler = (req: Request) => Promise<Response>;

export function withErrorHandling(
  handler: RequestHandler,
  functionName: string
): RequestHandler {
  return async (req: Request): Promise<Response> => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return handleCorsPreflightRequest();
    }

    const context: LogContext = {
      functionName,
      method: req.method,
      url: req.url
    };

    try {
      return await handler(req);
    } catch (error) {
      logError(error as Error, context);
      
      if (error instanceof Error) {
        // Handle specific error types
        if (error.message.includes('API key')) {
          return createErrorResponse('Authentication configuration error', 500);
        }
        if (error.message.includes('required')) {
          return createErrorResponse(error.message, 400);
        }
        if (error.message.includes('Invalid')) {
          return createErrorResponse(error.message, 400);
        }
      }
      
      return createErrorResponse('Internal server error', 500);
    }
  };
}
