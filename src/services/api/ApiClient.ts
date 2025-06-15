
import { ApiConfig, ApiResponse, ApiRequestOptions, ApiInterceptor, RequestConfig } from './types';

export class ApiClient {
  private config: Required<ApiConfig>;
  private interceptors: ApiInterceptor[] = [];

  constructor(config: ApiConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || '',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      retryDelay: config.retryDelay || 1000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    };
  }

  // Add interceptor for request/response middleware
  addInterceptor(interceptor: ApiInterceptor): void {
    this.interceptors.push(interceptor);
  }

  // Remove interceptor
  removeInterceptor(interceptor: ApiInterceptor): void {
    const index = this.interceptors.indexOf(interceptor);
    if (index > -1) {
      this.interceptors.splice(index, 1);
    }
  }

  // Main request method with retry logic and interceptors
  async request<T = any>(config: RequestConfig, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    const { url, method, data, params, headers = {} } = config;
    const fullUrl = this.buildUrl(url, params);
    
    let requestConfig: RequestInit = {
      method,
      headers: {
        ...this.config.headers,
        ...headers
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options
    };

    // Apply request interceptors
    for (const interceptor of this.interceptors) {
      if (interceptor.request) {
        requestConfig = await interceptor.request(requestConfig);
      }
    }

    const maxRetries = options.retries ?? this.config.retries;
    const retryDelay = options.retryDelay ?? this.config.retryDelay;
    const timeout = options.timeout ?? this.config.timeout;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(fullUrl, {
          ...requestConfig,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        let apiResponse: ApiResponse<T> = {
          status: response.status,
          success: response.ok,
          retryCount: attempt
        };

        if (response.ok) {
          try {
            const contentType = response.headers.get('content-type');
            if (contentType?.includes('application/json')) {
              apiResponse.data = await response.json();
            } else if (contentType?.includes('text/')) {
              apiResponse.data = await response.text() as any;
            } else {
              apiResponse.data = await response.arrayBuffer() as any;
            }
          } catch (parseError) {
            console.warn('Failed to parse response:', parseError);
            apiResponse.data = null;
          }
        } else {
          try {
            const errorData = await response.json();
            apiResponse.error = errorData.error || errorData.message || `HTTP ${response.status}`;
          } catch {
            apiResponse.error = `HTTP ${response.status}: ${response.statusText}`;
          }
        }

        // Apply response interceptors
        for (const interceptor of this.interceptors) {
          if (interceptor.response) {
            apiResponse = await interceptor.response(apiResponse);
          }
        }

        // Return successful response or non-retryable error
        if (response.ok || !this.shouldRetry(response.status)) {
          return apiResponse;
        }

        // If this was the last attempt, return the error
        if (attempt === maxRetries) {
          return apiResponse;
        }

        // Wait before retrying
        await this.delay(retryDelay * Math.pow(2, attempt));

      } catch (error: any) {
        console.error(`API request attempt ${attempt + 1} failed:`, error);

        // Apply error interceptors
        for (const interceptor of this.interceptors) {
          if (interceptor.error) {
            error = await interceptor.error(error);
          }
        }

        // If this was the last attempt, return the error
        if (attempt === maxRetries) {
          return {
            status: 0,
            success: false,
            error: error.message || 'Network error',
            retryCount: attempt
          };
        }

        // Wait before retrying
        await this.delay(retryDelay * Math.pow(2, attempt));
      }
    }

    return {
      status: 0,
      success: false,
      error: 'Maximum retries exceeded',
      retryCount: maxRetries
    };
  }

  // Convenience methods
  async get<T = any>(url: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'GET' }, options);
  }

  async post<T = any>(url: string, data?: any, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'POST', data }, options);
  }

  async put<T = any>(url: string, data?: any, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'PUT', data }, options);
  }

  async delete<T = any>(url: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'DELETE' }, options);
  }

  async patch<T = any>(url: string, data?: any, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'PATCH', data }, options);
  }

  // Helper methods
  private buildUrl(url: string, params?: Record<string, any>): string {
    const fullUrl = url.startsWith('http') ? url : `${this.config.baseUrl}${url}`;
    
    if (!params) return fullUrl;

    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, String(value));
      }
    });

    const paramString = urlParams.toString();
    return paramString ? `${fullUrl}?${paramString}` : fullUrl;
  }

  private shouldRetry(status: number): boolean {
    // Retry on server errors and rate limiting
    return status >= 500 || status === 429 || status === 408;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Update configuration
  updateConfig(config: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...config };
  }

  // Get current configuration
  getConfig(): ApiConfig {
    return { ...this.config };
  }
}
