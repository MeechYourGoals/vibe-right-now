
import { AgentService } from "../../services/agentService";
import { MessageFactory } from "../../messageFactory";

export class VenueAgentHandler {
  static async handleVenueQuery(venueId: string, query: string, setMessages: any): Promise<boolean> {
    console.log("Handling venue query for venue:", venueId, "Query:", query);
    
    try {
      // Add user message to chat
      setMessages((prev: any) => [...prev, MessageFactory.createUserMessage(query)]);
      
      // Get venue information
      const venueInfo = await AgentService.getVenueInfo(venueId);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add assistant response
      setMessages((prev: any) => [
        ...prev, 
        MessageFactory.createAssistantMessage(`Here's information about ${venueInfo.name}: ${JSON.stringify(venueInfo)}`)
      ]);
      
      return true;
    } catch (error) {
      console.error("Error handling venue query:", error);
      setMessages((prev: any) => [
        ...prev, 
        MessageFactory.createAssistantMessage("Sorry, I had trouble getting information about this venue.")
      ]);
      return false;
    }
  }
}
