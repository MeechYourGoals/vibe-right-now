
import { ApiClient } from './ApiClient';
import { SupabaseApiClient, supabaseApiClient } from './clients/SupabaseApiClient';
import { OpenAIApiClient } from './clients/OpenAIApiClient';
import { ElevenLabsApiClient } from './clients/ElevenLabsApiClient';
import {
  loggingInterceptor,
  authInterceptor,
  errorHandlingInterceptor,
  rateLimitInterceptor
} from './interceptors';

// Export main classes
export {
  ApiClient,
  SupabaseApiClient,
  OpenAIApiClient,
  ElevenLabsApiClient
};

// Export singleton instances
export { supabaseApiClient };

// Export interceptors
export {
  loggingInterceptor,
  authInterceptor,
  errorHandlingInterceptor,
  rateLimitInterceptor
};

// Export types
export type * from './types';

// Factory function for creating configured API clients
export const createApiClient = (config: any = {}) => {
  const client = new ApiClient(config);
  
  // Add default interceptors
  client.addInterceptor(loggingInterceptor);
  client.addInterceptor(errorHandlingInterceptor);
  
  return client;
};

// Convenience factory functions
export const createOpenAIClient = (apiKey?: string) => {
  return new OpenAIApiClient(apiKey);
};

export const createElevenLabsClient = (apiKey?: string) => {
  return new ElevenLabsApiClient(apiKey);
};
