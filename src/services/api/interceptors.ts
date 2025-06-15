
import { ApiInterceptor, ApiResponse } from './types';

// Logging interceptor
export const loggingInterceptor: ApiInterceptor = {
  request: (config) => {
    console.log('🚀 API Request:', {
      method: config.method,
      url: config.url || 'Unknown URL',
      headers: config.headers
    });
    return config;
  },
  response: <T>(response: ApiResponse<T>) => {
    console.log('✅ API Response:', {
      status: response.status,
      success: response.success,
      retryCount: response.retryCount
    });
    return response;
  },
  error: (error) => {
    console.error('❌ API Error:', error);
    return error;
  }
};

// Auth interceptor for adding authorization headers
export const authInterceptor: ApiInterceptor = {
  request: (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
};

// Error handling interceptor
export const errorHandlingInterceptor: ApiInterceptor = {
  response: <T>(response: ApiResponse<T>) => {
    if (!response.success && response.status === 401) {
      // Handle unauthorized - could trigger logout
      console.warn('Unauthorized request detected');
      // Could dispatch logout action here
    }
    return response;
  },
  error: (error) => {
    // Transform network errors to user-friendly messages
    if (error.name === 'AbortError') {
      error.message = 'Request timed out. Please try again.';
    } else if (!navigator.onLine) {
      error.message = 'No internet connection. Please check your network.';
    }
    return error;
  }
};

// Rate limiting interceptor
export const rateLimitInterceptor: ApiInterceptor = {
  response: <T>(response: ApiResponse<T>) => {
    if (response.status === 429) {
      console.warn('Rate limit exceeded. Request will be retried automatically.');
    }
    return response;
  }
};
