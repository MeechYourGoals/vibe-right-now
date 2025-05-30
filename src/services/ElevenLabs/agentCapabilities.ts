
import { ElevenLabsBase } from './base';

// Interface for Agent API request
export interface AgentTaskRequest {
  task: string;
  agent_id?: string;
  user_id?: string;
  conversation_id?: string;
}

// Interface for Agent API response
export interface AgentTaskResponse {
  conversation_id: string;
  message?: string;
  status: string;
  url?: string;
}

export class ElevenLabsAgentCapabilities {
  /**
   * Create a new agent task for conversational AI
   */
  public static async createAgentTask(
    request: AgentTaskRequest
  ): Promise<AgentTaskResponse | null> {
    const apiKey = ElevenLabsBase.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return null;
    }
    
    try {
      console.log('Creating agent task with Eleven Labs', request);
      
      const url = 'https://api.elevenlabs.io/v1/agents/tasks';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify(request)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Eleven Labs API error: ${errorData.detail || response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating Eleven Labs agent task:', error);
      return null;
    }
  }
  
  /**
   * Get a signed URL for direct websocket connection to the agent
   */
  public static async getSignedUrl(agentId: string): Promise<string | null> {
    const apiKey = ElevenLabsBase.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return null;
    }
    
    try {
      const url = `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Eleven Labs API error: ${errorData.detail || response.statusText}`);
      }
      
      const data = await response.json();
      return data.signed_url;
    } catch (error) {
      console.error('Error getting signed URL for Eleven Labs agent:', error);
      return null;
    }
  }
  
  /**
   * Get information about a specific agent
   */
  public static async getAgentInfo(agentId: string) {
    const apiKey = ElevenLabsBase.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return null;
    }
    
    try {
      const url = `https://api.elevenlabs.io/v1/agents/${agentId}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Eleven Labs API error: ${errorData.detail || response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting Eleven Labs agent info:', error);
      return null;
    }
  }
}
