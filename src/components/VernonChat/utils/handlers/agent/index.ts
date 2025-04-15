
import { EventAgentHandler } from './eventAgentHandler';
import { VenueAgentHandler } from './venueAgentHandler';

/**
 * Aggregates agent handlers with utility functions for determining which handler to use
 */
export class AgentHandler {
  /**
   * Determines if a query should be handled by the agent system
   */
  static shouldUseAgent(query: string): boolean {
    // Check if this is a query about events, venues, or requires real-time data
    const eventKeywords = ['event', 'show', 'concert', 'festival', 'performance', 'gig', 'tour'];
    const venueKeywords = ['venue', 'club', 'bar', 'nightclub', 'theater', 'theatre', 'arena'];
    const timeKeywords = ['tonight', 'tomorrow', 'this week', 'this weekend', 'upcoming'];
    
    const eventMatches = eventKeywords.some(keyword => query.toLowerCase().includes(keyword));
    const venueMatches = venueKeywords.some(keyword => query.toLowerCase().includes(keyword));
    const timeMatches = timeKeywords.some(keyword => query.toLowerCase().includes(keyword));
    
    // If the query is about events/venues AND has a time component, use the agent system
    return (eventMatches || venueMatches) && timeMatches;
  }
  
  /**
   * Handle queries using Agent2Agent protocol
   */
  static async handleAgentQuery(
    query: string,
    setMessages: React.Dispatch<React.SetStateAction<any[]>>,
    isVenueMode: boolean
  ): Promise<boolean> {
    try {
      console.log('Handling query with Agent system:', query);
      
      // Determine what type of agent query this is
      const isEventQuery = /what.*happening|events|shows|concerts|comedy|nightlife/i.test(query);
      const isVenueQuery = /tell me about|information on|details for|hours for|address of/i.test(query);
      
      // Extract potential location information
      const locationMatch = query.match(/in\s+([A-Za-z\s]+)(?:,\s*([A-Za-z\s]+))?/i);
      const location = locationMatch ? locationMatch[0].replace('in ', '') : '';
      
      // Route to the appropriate handler
      if (isEventQuery) {
        return await EventAgentHandler.handleEventQuery(query, setMessages, location);
      } 
      else if (isVenueQuery) {
        return await VenueAgentHandler.handleVenueQuery(query, setMessages, location);
      }
      
      // If we reach here, the agent couldn't handle the query effectively
      return false;
    } catch (error) {
      console.error('Error in agent handler:', error);
      const { createErrorMessage } = await import('../../messageFactory');
      const errorMessage = createErrorMessage('I encountered an error while retrieving that information. Please try again or rephrase your question.');
      setMessages(prev => [...prev, errorMessage]);
      return true; // Handled with an error message
    }
  }
}
