
import { AgentService } from '@/services/AgentService';

export class CommentHandler {
  static async handleAgentCommentsGeneration(query: string) {
    try {
      // Use the search method instead of processQuery which doesn't exist
      const result = await AgentService.search(query);
      return result;
    } catch (error) {
      console.error("Error in CommentHandler:", error);
      return "Sorry, I couldn't generate comment suggestions at this time.";
    }
  }
}
