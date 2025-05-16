
import { useState, useCallback } from 'react';
import { Message, ChatMode } from '../types';
import { VertexAIService } from '@/services/VertexAIService'; 

export const useMessageProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processMessage = useCallback(
    async (query: string, previousMessages: Message[], chatMode: ChatMode): Promise<string> => {
      setIsProcessing(true);
      
      try {
        // Convert messages to format expected by Vertex AI
        const contextMessages = previousMessages
          .slice(-5)
          .map(msg => ({
            sender: msg.direction === 'outgoing' ? 'user' : 'ai',
            text: msg.content
          }));
        
        // Map chatMode to the mode expected by VertexAIService
        const vertexMode = chatMode === 'venue' ? 'venue' : 'default';
        
        // Use Google Vertex AI for all text generation
        const response = await VertexAIService.generateResponse(
          query,
          vertexMode,
          contextMessages
        );
        
        return response;
      } catch (error) {
        console.error('Error processing message:', error);
        return "I'm having trouble connecting to my AI services right now. Please try again later.";
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  return {
    processMessage,
    isProcessing
  };
};
