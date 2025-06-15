
import { corsHeaders } from './cors.ts';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function createSuccessResponse<T>(data: T, message?: string): Response {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message
  };
  
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

export function createErrorResponse(error: string, status: number = 500): Response {
  const response: ApiResponse = {
    success: false,
    error
  };
  
  return new Response(JSON.stringify(response), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

export function createValidationErrorResponse(error: string): Response {
  return createErrorResponse(error, 400);
}
