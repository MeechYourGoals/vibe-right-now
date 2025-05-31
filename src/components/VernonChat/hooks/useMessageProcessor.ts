
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
        console.log("Processing message with Gemini AI:", query.substring(0, 50));
        
        // Format conversation history for Gemini
        const history = previousMessages.slice(-5).map(msg => ({
          sender: msg.sender || (msg.direction === 'outgoing' ? 'user' : 'ai'),
          text: msg.content || msg.text || ''
        }));
        
        // Determine the mode for Gemini
        const mode = chatMode === 'venue' ? 'venue' : 'default';
        
        // Use Gemini AI via vertex-ai function
        const { data, error } = await supabase.functions.invoke('vertex-ai', {
          body: { 
            prompt: query,
            mode: mode,
            context: history
          }
        });
        
        if (error) {
          console.error("Error calling vertex-ai function:", error);
          throw new Error(error.message);
        }
        
        if (!data) {
          throw new Error("No response received from Gemini AI");
        }
        
        if (!data.text) {
          // Check if there's a fallback response
          if (data.fallbackResponse) {
            setUsedFallback(true);
            return data.fallbackResponse;
          }
          throw new Error("No text in response from Gemini AI");
        }
        
        console.log("Received response from Gemini AI:", data.text.substring(0, 50) + "...");
        return data.text;
      } catch (error) {
        console.error('Error processing message with Gemini:', error);
        
        // Enhanced error handling with user-friendly messages
        let errorMessage = "I'm having trouble connecting to my AI services right now. Please try again later.";
        
        if (error.message?.includes('429') || error.message?.includes('quota')) {
          errorMessage = "I've reached my usage limit for the moment. Please try again in a minute or two.";
        } else if (error.message?.includes('401') || error.message?.includes('403')) {
          errorMessage = "I'm having authentication issues with my AI services. Please try again later.";
        } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
          errorMessage = "I'm having network connectivity issues. Please check your connection and try again.";
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
