
import { AgentService } from "../../services/agentService";
import { MessageFactory } from "../../messageFactory";

export class EventAgentHandler {
  static async handleEventQuery(query: string, setMessages: any): Promise<boolean> {
    console.log("Handling event query:", query);
    
    try {
      // Add user message to chat
      setMessages((prev: any) => [...prev, MessageFactory.createUserMessage(query)]);
      
      // Search for events
      const events = await AgentService.searchEvents(query);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add assistant response
      if (events && events.length > 0) {
        setMessages((prev: any) => [
          ...prev, 
          MessageFactory.createAssistantMessage(`I found these events for you: ${JSON.stringify(events)}`)
        ]);
      } else {
        setMessages((prev: any) => [
          ...prev, 
          MessageFactory.createAssistantMessage("I couldn't find any events matching your criteria.")
        ]);
      }
      
      return true;
    } catch (error) {
      console.error("Error handling event query:", error);
      setMessages((prev: any) => [
        ...prev, 
        MessageFactory.createAssistantMessage("Sorry, I had trouble searching for events.")
      ]);
      return false;
    }
  }
}
