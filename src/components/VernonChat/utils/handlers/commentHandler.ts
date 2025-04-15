
import { AgentService } from '@/services/AgentService';

export class CommentHandler {
  static async handleAgentCommentsGeneration(query: string) {
    try {
      const result = await AgentService.processQuery(query);
      return result;
    } catch (error) {
      console.error("Error in CommentHandler:", error);
      return "Sorry, I couldn't generate comment suggestions at this time.";
    }
  }
}
