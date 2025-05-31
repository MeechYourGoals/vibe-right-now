
import { useState, useCallback } from 'react';
import { Message, ChatMode } from '../types';
import { supabase } from '@/integrations/supabase/client';

export const useMessageProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const processMessage = useCallback(
    async (query: string, previousMessages: Message[], chatMode: ChatMode): Promise<string> => {
      setIsProcessing(true);
      setUsedFallback(false);
      
      try {
        console.log("Calling vertex-ai function with:", query.substring(0, 50));
        
        // Prepare context from previous messages for better conversation flow
        const context = previousMessages.slice(-5).map(msg => ({
          sender: msg.direction === 'outgoing' || msg.sender === 'user' ? 'user' : 'ai',
          text: msg.content || msg.text || ''
        }));
        
        // Use Vertex AI (Google Gemini) for intelligent responses
        const { data, error } = await supabase.functions.invoke('vertex-ai', {
          body: { 
            prompt: query,
            mode: chatMode === 'venue' ? 'venue' : 'search',
            context: context
          }
        });
        
        if (error) {
          console.error("Error calling vertex-ai function:", error);
          throw new Error(error.message);
        }
        
        if (!data) {
          throw new Error("No response received from Vertex AI");
        }
        
        if (!data.text) {
          throw new Error("No text in response from Vertex AI");
        }
        
        console.log("Received response from vertex-ai:", data.text.substring(0, 50) + "...");
        return data.text;
      } catch (error) {
        console.error('Error processing message:', error);
        
        // Try to extract meaningful error message
        let errorMessage = "I'm having trouble connecting to my AI services right now. Please try again later.";
        
        // If we can identify specific errors, provide better messages
        if (error.message?.includes('429') || error.message?.includes('quota')) {
          errorMessage = "I've reached my usage limit for the moment. Please try again in a minute or two.";
        } else if (error.message?.includes('401') || error.message?.includes('403')) {
          errorMessage = "I'm having authentication issues with my AI services. Please try again later.";
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
