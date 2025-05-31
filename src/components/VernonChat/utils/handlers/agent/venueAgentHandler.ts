
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
  
  static async handleAuthenticationQuery(token: string, query: string, setMessages: any): Promise<boolean> {
    console.log("Handling authentication query with token:", token, "Query:", query);
    
    try {
      // Add user message to chat
      setMessages((prev: any) => [...prev, MessageFactory.createUserMessage(query)]);
      
      // Verify authentication
      const authResult = await AgentService.verifyAuth(token);
      
      if (authResult.valid) {
        // Get user profile
        const userProfile = await AgentService.getUserProfile(authResult.userId);
        
        // Add assistant response
        setMessages((prev: any) => [
          ...prev, 
          MessageFactory.createAssistantMessage(`Welcome back, ${userProfile.name}! How can I help you today?`)
        ]);
        
        return true;
      } else {
        // Authentication failed
        setMessages((prev: any) => [
          ...prev, 
          MessageFactory.createAssistantMessage("I'm having trouble verifying your identity. Please try signing in again.")
        ]);
        
        return false;
      }
    } catch (error) {
      console.error("Error handling authentication query:", error);
      setMessages((prev: any) => [
        ...prev, 
        MessageFactory.createAssistantMessage("Sorry, I encountered an issue with authentication.")
      ]);
      return false;
    }
  }
}
