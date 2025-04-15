
import { AgentService } from '@/services/AgentService';
import { Message } from '../../../types';
import { createAIMessage } from '../../messageFactory';

/**
 * Handles event-related agent operations
 */
export class EventAgentHandler {
  /**
   * Handle event-related queries
   */
  static async handleEventQuery(
    query: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    location: string
  ): Promise<boolean> {
    try {
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
      
      const results = await AgentService.searchEvents(location || 'nearby', eventType, dateInfo);
      
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
    } catch (error) {
      console.error('Error handling event query:', error);
      return false; // Let the main error handler deal with it
    }
  }
}
