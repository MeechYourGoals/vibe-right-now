
import { AgentService } from '@/services/AgentService';
import { Message } from '../../types';
import { createAIMessage, createErrorMessage } from '../messageFactory';

/**
 * Handles agent-based operations for the chat interface
 */
export const AgentHandler = {
  /**
   * Determines if a query should be handled by the agent system
   */
  shouldUseAgent(query: string): boolean {
    // Check if this is a query about events, venues, or requires real-time data
    const eventKeywords = ['event', 'show', 'concert', 'festival', 'performance', 'gig', 'tour'];
    const venueKeywords = ['venue', 'club', 'bar', 'nightclub', 'theater', 'theatre', 'arena'];
    const timeKeywords = ['tonight', 'tomorrow', 'this week', 'this weekend', 'upcoming'];
    
    const eventMatches = eventKeywords.some(keyword => query.toLowerCase().includes(keyword));
    const venueMatches = venueKeywords.some(keyword => query.toLowerCase().includes(keyword));
    const timeMatches = timeKeywords.some(keyword => query.toLowerCase().includes(keyword));
    
    // If the query is about events/venues AND has a time component, use the agent system
    return (eventMatches || venueMatches) && timeMatches;
  },
  
  /**
   * Handle queries using Agent2Agent protocol
   */
  async handleAgentQuery(
    query: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
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
      
      let results;
      
      if (isEventQuery) {
        // Determine event type
        let eventType = 'general';
        if (/music|concert|band|show|performance|gig/i.test(query)) {
          eventType = 'music';
        } else if (/comedy|standup|comedian/i.test(query)) {
          eventType = 'comedy';
        } else if (/club|nightlife|party|dancing/i.test(query)) {
          eventType = 'nightlife';
        }
        
        // Extract date information
        const dateMatch = query.match(/tonight|tomorrow|this week|this weekend|next week|on ([A-Za-z]+day)/i);
        const dateInfo = dateMatch ? dateMatch[0] : '';
        
        results = await AgentService.searchEvents(location || 'nearby', eventType, dateInfo);
        
        // Format the results into a readable message
        let responseText = '';
        if (results && results.length > 0) {
          responseText = `Here are ${eventType} events ${location ? 'in ' + location : 'nearby'} ${dateInfo}:\n\n`;
          
          results.forEach((event, index) => {
            responseText += `${index + 1}. **${event.name || event.title}**\n`;
            if (event.venue || event.location) responseText += `   Venue: ${event.venue || event.location}\n`;
            if (event.date || event.time) responseText += `   When: ${event.date || ''} ${event.time || ''}\n`;
            if (event.price) responseText += `   Price: ${event.price}\n`;
            if (event.description) responseText += `   Details: ${event.description.substring(0, 100)}...\n`;
            responseText += '\n';
          });
        } else {
          responseText = `I couldn't find any ${eventType} events ${location ? 'in ' + location : 'nearby'} ${dateInfo}. Would you like me to search for events in a different area or category?`;
        }
        
        const message = createAIMessage(responseText);
        setMessages(prev => [...prev, message]);
        return true;
      } 
      else if (isVenueQuery) {
        // Extract venue name - this is a simplistic extraction, could be improved
        const venueName = query.replace(/tell me about|information on|details for|hours for|address of/ig, '').trim();
        
        results = await AgentService.getVenueInfo(venueName, location);
        
        if (results && !results.error) {
          let responseText = `Here's what I found about ${venueName}:\n\n`;
          
          if (results.name) responseText += `**${results.name}**\n`;
          if (results.address) responseText += `Address: ${results.address}\n`;
          if (results.hours) responseText += `Hours: ${results.hours}\n`;
          if (results.phone) responseText += `Phone: ${results.phone}\n`;
          if (results.website) responseText += `Website: ${results.website}\n`;
          if (results.rating) responseText += `Rating: ${results.rating}/5\n`;
          if (results.description) responseText += `\n${results.description}\n`;
          if (results.events && results.events.length > 0) {
            responseText += `\nUpcoming events:\n`;
            results.events.slice(0, 3).forEach((event, index) => {
              responseText += `- ${event.name || event.title} (${event.date || 'Date TBA'})\n`;
            });
          }
          
          const message = createAIMessage(responseText);
          setMessages(prev => [...prev, message]);
          return true;
        }
      }
      
      // If we reach here, the agent couldn't handle the query effectively
      return false;
    } catch (error) {
      console.error('Error in agent handler:', error);
      const errorMessage = createErrorMessage('I encountered an error while retrieving that information. Please try again or rephrase your question.');
      setMessages(prev => [...prev, errorMessage]);
      return true; // Handled with an error message
    }
  }
};
