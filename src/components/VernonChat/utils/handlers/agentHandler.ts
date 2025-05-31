
import { AgentService } from "../services/agentService";
import { MessageFactory } from "../messageFactory";

export class AgentHandler {
  static async handleAgentQuery(query: string, setMessages: any, isVenueMode = false): Promise<boolean> {
    console.log("Handling agent query:", query, "Venue mode:", isVenueMode);
    
    try {
      // Add user message to chat
      setMessages((prev: any) => [...prev, MessageFactory.createUserMessage(query)]);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add assistant response
      setMessages((prev: any) => [
        ...prev, 
        MessageFactory.createAssistantMessage("I'm processing your query about: " + query)
      ]);
      
      return true;
    } catch (error) {
      console.error("Error handling agent query:", error);
      setMessages((prev: any) => [
        ...prev, 
        MessageFactory.createAssistantMessage("Sorry, I had trouble processing that request.")
      ]);
      return false;
    }
  }
  
  static shouldUseAgent(query: string): boolean {
    // Simple logic to determine if query should be handled by agent
    const agentTriggers = [
      "find", "search", "locate", "show me", "where is", "when is",
      "events", "what's happening", "nearby", "restaurant", "bar", "cafe"
    ];
    
    return agentTriggers.some(trigger => 
      query.toLowerCase().includes(trigger.toLowerCase())
    );
  }
  
  static isVenueRelatedAgentQuery(query: string): boolean {
    const venueKeywords = [
      "menu", "hours", "open", "reservation", "book", "table",
      "special", "event", "deal", "discount", "offer", "promotion"
    ];
    
    return venueKeywords.some(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
