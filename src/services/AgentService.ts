
// AgentService.ts - Handles API calls to our Agent2Agent protocol

import { supabase } from '@/integrations/supabase/client';

interface AgentRequest {
  query: string;
  task: 'search' | 'browse' | 'extract' | 'analyze';
  context?: Record<string, any>;
}

interface SearchResults {
  results: any[];
  source: string;
  metadata?: Record<string, any>;
}

export const AgentService = {
  /**
   * Performs a search task using the Agent2Agent protocol
   */
  async search(query: string, context?: Record<string, any>): Promise<SearchResults> {
    try {
      console.log(`Searching for: ${query}`);
      
      const { data, error } = await supabase.functions.invoke('agent-protocol', {
        body: {
          query,
          task: 'search',
          context
        }
      });
      
      if (error) {
        console.error('Error in agent search:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in AgentService.search:', error);
      return { 
        results: [], 
        source: 'error',
        metadata: { error: error.message }
      };
    }
  },

  /**
   * Browses a website to extract information
   */
  async browse(url: string, context?: Record<string, any>): Promise<any> {
    try {
      console.log(`Browsing: ${url}`);
      
      const { data, error } = await supabase.functions.invoke('agent-protocol', {
        body: {
          query: url,
          task: 'browse',
          context
        }
      });
      
      if (error) {
        console.error('Error in agent browse:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in AgentService.browse:', error);
      return { error: error.message };
    }
  },

  /**
   * Extracts specific information from content
   */
  async extract(content: string, extractionType: string = 'general'): Promise<any> {
    try {
      console.log(`Extracting ${extractionType} information`);
      
      const { data, error } = await supabase.functions.invoke('agent-protocol', {
        body: {
          query: content,
          task: 'extract',
          context: { extractionType }
        }
      });
      
      if (error) {
        console.error('Error in agent extract:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in AgentService.extract:', error);
      return { error: error.message };
    }
  },

  /**
   * Analyzes content for insights
   */
  async analyze(content: string, analysisType: string = 'general'): Promise<any> {
    try {
      console.log(`Analyzing content with ${analysisType} analysis`);
      
      const { data, error } = await supabase.functions.invoke('agent-protocol', {
        body: {
          query: content,
          task: 'analyze',
          context: { analysisType }
        }
      });
      
      if (error) {
        console.error('Error in agent analyze:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in AgentService.analyze:', error);
      return { error: error.message };
    }
  },
  
  /**
   * Searches for events based on parameters
   */
  async searchEvents(location: string, eventType: string, date?: string): Promise<any[]> {
    try {
      console.log(`Searching for ${eventType} events in ${location}`);
      
      const query = `${eventType} events in ${location}${date ? ` on ${date}` : ''}`;
      const context = {
        eventType,
        location,
        date,
        extractStructured: true
      };
      
      const result = await this.search(query, context);
      return result.results || [];
    } catch (error) {
      console.error('Error searching for events:', error);
      return [];
    }
  },
  
  /**
   * Gets venue information by scraping websites
   */
  async getVenueInfo(venueName: string, location?: string): Promise<any> {
    try {
      console.log(`Getting venue info for ${venueName}`);
      
      const searchQuery = `${venueName} ${location || ''}`;
      const searchResults = await this.search(searchQuery, { 
        focus: 'venue',
        includeDetails: true 
      });
      
      if (searchResults.results && searchResults.results.length > 0) {
        // Use the first result as the most relevant
        const venueData = searchResults.results[0];
        
        // If there's a website URL in the search results, scrape it for more data
        if (venueData.website) {
          const websiteData = await this.browse(venueData.website, { extractType: 'venue' });
          
          // Merge website data with search data, prioritizing website data
          return { ...venueData, ...websiteData };
        }
        
        return venueData;
      }
      
      return { error: 'No venue information found' };
    } catch (error) {
      console.error('Error getting venue info:', error);
      return { error: error.message };
    }
  }
};
