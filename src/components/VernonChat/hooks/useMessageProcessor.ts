
import { useState, useCallback } from 'react';
import { Message, ChatMode } from '../types';
import { PerplexityService } from '@/services/PerplexityService';

export const useMessageProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const processMessage = useCallback(
    async (query: string, previousMessages: Message[], chatMode: ChatMode): Promise<string> => {
      setIsProcessing(true);
      setUsedFallback(false);
      
      try {
        console.log("Processing message with VertexAI:", query.substring(0, 50));
        
        // Convert previous messages to context format
        const context = previousMessages.slice(-5).map(msg => ({
          sender: msg.sender || (msg.direction === 'outgoing' ? 'user' : 'ai'),
          text: msg.content || msg.text || ''
        }));
        
        // Use Perplexity for message processing
        const response = await PerplexityService.generateResponse(query);

        console.log("Received response from Perplexity:", response.substring(0, 50) + "...");
        return response;
      } catch (error) {
        console.error('Error processing message:', error);
        
        // Try to extract meaningful error message
        let errorMessage = "I'm having trouble connecting to my AI services right now. Please try again later.";
        
        // If we can identify specific errors, provide better messages
        if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('rate limit')) {
          errorMessage = "I'm experiencing high demand right now. Please wait a moment and try again.";
        } else if (error.message?.includes('401') || error.message?.includes('403')) {
          errorMessage = "I'm having authentication issues with my AI services. Please try again later.";
        } else if (error.message?.includes('404')) {
          errorMessage = "There seems to be a temporary service issue. Please try again in a moment.";
        }
        
        return errorMessage;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  return {
    processMessage,
    isProcessing,
    usedFallback
  };
};
