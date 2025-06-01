
import { useState, useCallback } from 'react';
import { Message, ChatMode } from '../types';
import { VertexAIService } from '@/services/VertexAIService';

export const useMessageProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processMessage = useCallback(
    async (query: string, previousMessages: Message[], chatMode: ChatMode): Promise<string> => {
      setIsProcessing(true);
      
      const mappedMode = chatMode === 'venue' ? 'venue' : 'default';
      const context = previousMessages.map(msg => ({
        sender: msg.direction === 'outgoing' ? 'user' : 'ai',
        text: msg.content
      }));

      console.log(`Calling VertexAIService.generateResponse with mode: ${mappedMode}, query: ${query.substring(0,50)}...`);
      console.log("Context being sent:", JSON.stringify(context.slice(-2), null, 2)); // Log last 2 messages for brevity

      try {
        const responseText = await VertexAIService.generateResponse(query, mappedMode, context);
        
        console.log("Received response from VertexAIService:", responseText.substring(0, 50) + "...");
        return responseText;
      } catch (error) {
        console.error('Error processing message with VertexAIService:', error);
        // VertexAIService.generateResponse already returns a user-friendly error message.
        // If it throws an error, it's likely an unexpected issue, so we return its message or a generic one.
        return error.message || "An unexpected error occurred while processing your message.";
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
