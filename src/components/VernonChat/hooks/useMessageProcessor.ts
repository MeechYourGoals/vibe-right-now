
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
        console.log("Calling openrouter-search function with:", query.substring(0, 50));
        
        // Use OpenRouter for real-world search results
        const { data, error } = await supabase.functions.invoke('openrouter-search', {
          body: { 
            query: query
          }
        });
        
        if (error) {
          console.error("Error calling openrouter-search function:", error);
          throw new Error(error.message);
        }
        
        if (!data) {
          throw new Error("No response received from OpenRouter");
        }
        
        if (!data.text) {
          throw new Error("No text in response from OpenRouter");
        }
        
        console.log("Received response from openrouter-search:", data.text.substring(0, 50) + "...");
        return data.text;
      } catch (error) {
        console.error('Error processing message:', error);
        
        // Try to extract meaningful error message
        let errorMessage = "I'm having trouble connecting to my search services right now. Please try again later.";
        
        // If we can identify specific errors, provide better messages
        if (error.message?.includes('429') || error.message?.includes('quota')) {
          errorMessage = "I've reached my usage limit for the moment. Please try again in a minute or two.";
        } else if (error.message?.includes('401') || error.message?.includes('403')) {
          errorMessage = "I'm having authentication issues with my search services. Please try again later.";
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
