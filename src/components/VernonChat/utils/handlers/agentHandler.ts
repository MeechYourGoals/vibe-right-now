
import { Message } from "../../types";
import { MessageFactory } from "../messageFactory";
import { AgentService } from "../../../../services/AgentService";

// Common patterns that indicate a query should be handled by an agent
const AGENT_QUERY_PATTERNS = [
  /plan a (trip|vacation|journey|adventure|getaway)/i,
  /best (time|season|month) to visit/i,
  /compare .+ and .+/i,
  /find .+ events/i,
  /what's happening (in|at|near)/i,
  /(create|build|make) (an )?(itinerary|schedule|plan)/i,
  /recommend .+ for (a|my) (family|kids|group|team|partner)/i,
  /(help|assist) (me )?(plan|schedule|organize)/i,
  /(discover|find|show) .+ near me/i,
  /suggest (activities|things to do|attractions)/i
];

// Venue-specific patterns
const VENUE_AGENT_PATTERNS = [
  /(how|what|where) (can|should) I (market|advertise|promote)/i,
  /increase (foot traffic|visits|customers|sales|revenue)/i,
  /(attract|target) (more|new) (customers|visitors|clients|patrons)/i,
  /tips for (promoting|marketing|advertising)/i,
  /best (promotional|marketing|advertising) (strategy|approach|method)/i,
  /improve (my |our )?(social media|online presence|visibility)/i,
  /competitive (analysis|advantage|edge)/i,
  /analyze (my|our) (competition|competitors)/i,
  /optimize (pricing|menu|offerings|services)/i,
  /best (time|day|month) to (run|do) (promotion|special|event)/i,
  /customer (retention|loyalty|satisfaction) (strategies|programs|ideas)/i,
  /improve (ratings|reviews|feedback)/i,
  /(predict|forecast) (busy|slow) (periods|times|seasons)/i,
  /seasonal (trends|patterns|fluctuations)/i,
  /how (can|should|do) I (respond|react) to (negative|bad) (reviews|feedback)/i
];

export class AgentHandler {
  public static shouldUseAgent(query: string): boolean {
    // Check if the query matches any of the agent patterns
    return AGENT_QUERY_PATTERNS.some(pattern => pattern.test(query));
  }

  public static isVenueRelatedAgentQuery(query: string): boolean {
    return VENUE_AGENT_PATTERNS.some(pattern => pattern.test(query));
  }

  public static async handleAgentQuery(
    query: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    isVenueMode: boolean = false
  ): Promise<boolean> {
    // Add thinking message
    const thinkingMessage = MessageFactory.createThinkingMessage();
    setMessages(prev => [...prev, thinkingMessage]);

    try {
      // Determine if we should use venue-specific handling
      const useVenueAgent = isVenueMode || this.isVenueRelatedAgentQuery(query);
      
      // Start timer for response generation
      const startTime = performance.now();
      console.log(`[AgentHandler] Processing ${useVenueAgent ? 'venue' : 'event'} agent query: ${query}`);

      // Get agent response
      const response = await AgentService.generateAgentResponse(query, useVenueAgent);
      
      // Calculate response time
      const responseTime = ((performance.now() - startTime) / 1000).toFixed(2);
      console.log(`[AgentHandler] Agent response generated in ${responseTime}s`);

      // Replace thinking message with actual response
      const responseMessage = MessageFactory.createAssistantMessage(response);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === thinkingMessage.id ? responseMessage : msg
        )
      );

      return true;
    } catch (error) {
      console.error("[AgentHandler] Error generating agent response:", error);
      
      // Replace thinking message with error message
      const errorMessage = MessageFactory.createAssistantMessage(
        "I'm having trouble connecting to my intelligence services right now. Could you try asking me in a different way or try again later?"
      );
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === thinkingMessage.id ? errorMessage : msg
        )
      );
      
      return false;
    }
  }
}
