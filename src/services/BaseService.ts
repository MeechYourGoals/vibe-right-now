
// Base service interface for standardization
export interface BaseServiceConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
}

export interface ServiceResponse<T = any> {
  data?: T;
  error?: string;
  status: 'success' | 'error';
}

export abstract class BaseService {
  protected config: BaseServiceConfig;
  
  constructor(config: BaseServiceConfig = {}) {
    this.config = {
      timeout: 10000,
      ...config
    };
  }
  
  protected async makeRequest<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<ServiceResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        return {
          status: 'error',
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }
      
      const data = await response.json();
      return {
        status: 'success',
        data
      };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  protected handleError(error: any): ServiceResponse {
    console.error('Service error:', error);
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Service error occurred'
    };
  }
}
