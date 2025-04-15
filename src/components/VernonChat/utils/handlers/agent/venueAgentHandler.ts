
import { AgentService } from '@/services/AgentService';
import { Message } from '../../../types';
import { createAIMessage } from '../../messageFactory';

/**
 * Handles venue-related agent operations
 */
export class VenueAgentHandler {
  /**
   * Handle venue-related queries
   */
  static async handleVenueQuery(
    query: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    location: string
  ): Promise<boolean> {
    try {
      // Extract venue name - this is a simplistic extraction, could be improved
      const venueName = query.replace(/tell me about|information on|details for|hours for|address of/ig, '').trim();
      
      const results = await AgentService.getVenueInfo(venueName, location);
      
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
      
      return false;
    } catch (error) {
      console.error('Error handling venue query:', error);
      return false; // Let the main error handler deal with it
    }
  }
}
