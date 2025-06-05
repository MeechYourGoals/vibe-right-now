
import { supabase } from '@/integrations/supabase/client';

export interface SquareInsights {
  revenue: {
    total: string;
    growth: string;
    trend: string;
  };
  customers: {
    total: string;
    newCustomers: string;
    retention: string;
  };
  topProducts: Array<{
    name: string;
    revenue: string;
    growth: string;
  }>;
  recommendations: string[];
}

export class SquareAIService {
  /**
   * Connect to Square API and validate credentials
   */
  static async connectSquareAccount(accessToken: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke('square-ai', {
        body: { 
          action: 'connect',
          accessToken 
        }
      });
      
      if (error) {
        console.error('Error connecting to Square:', error);
        return false;
      }
      
      return data?.success || false;
    } catch (error) {
      console.error('Error in Square connection:', error);
      return false;
    }
  }

  /**
   * Generate AI-powered business insights using Square data
   */
  static async generateInsights(accessToken: string): Promise<SquareInsights | null> {
    try {
      const { data, error } = await supabase.functions.invoke('square-ai', {
        body: { 
          action: 'generate-insights',
          accessToken 
        }
      });
      
      if (error) {
        console.error('Error generating Square insights:', error);
        return null;
      }
      
      return data?.insights || null;
    } catch (error) {
      console.error('Error in Square insights generation:', error);
      return null;
    }
  }

  /**
   * Get Square payment analytics
   */
  static async getPaymentAnalytics(accessToken: string, dateRange?: { start: string; end: string }): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('square-ai', {
        body: { 
          action: 'payment-analytics',
          accessToken,
          dateRange 
        }
      });
      
      if (error) {
        console.error('Error fetching Square payment analytics:', error);
        return null;
      }
      
      return data?.analytics || null;
    } catch (error) {
      console.error('Error in Square payment analytics:', error);
      return null;
    }
  }

  /**
   * Get customer insights from Square
   */
  static async getCustomerInsights(accessToken: string): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('square-ai', {
        body: { 
          action: 'customer-insights',
          accessToken 
        }
      });
      
      if (error) {
        console.error('Error fetching Square customer insights:', error);
        return null;
      }
      
      return data?.insights || null;
    } catch (error) {
      console.error('Error in Square customer insights:', error);
      return null;
    }
  }
}
