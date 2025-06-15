
import { AgentService } from "./services/agentService";
import { MessageFactory } from "./messageFactory";

export class AgentHandler {
  static async handleAgentQuery(query: string, setMessages: any, isVenueMode = false): Promise<boolean> {
    console.log("Handling agent query:", query, "Venue mode:", isVenueMode);
    
    try {
      setMessages((prev: any) => [...prev, MessageFactory.createUserMessage(query)]);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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

export const handleBookingQuery = async (
  inputValue: string,
  setMessages: React.Dispatch<React.SetStateAction<any[]>>
): Promise<boolean> => {
  // Implementation moved to BookingProcessor
  return false;
};

export const handleVenueQuery = async (
  inputValue: string, 
  isProPlan: boolean
): Promise<string> => {
  const { processVenueQuery } = await import('./venueQueryProcessor');
  return await processVenueQuery(inputValue, isProPlan);
};
