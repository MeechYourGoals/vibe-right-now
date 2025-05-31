
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
        console.log("Processing query with Gemini:", query.substring(0, 50));
        
        // Format conversation history for Gemini
        const context = previousMessages.slice(-10).map(msg => ({
          role: msg.direction === 'outgoing' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));

        // Use Gemini via vertex-ai function
        const { data, error } = await supabase.functions.invoke('vertex-ai', {
          body: { 
            prompt: query,
            mode: chatMode === 'venue' ? 'venue' : 'default',
            context: context,
            model: 'gemini-1.5-pro'
          }
        });
        
        if (error) {
          console.error("Error calling vertex-ai function:", error);
          throw new Error(error.message);
        }
        
        if (!data || !data.text) {
          throw new Error("No response received from Gemini");
        }
        
        console.log("Received response from Gemini:", data.text.substring(0, 100) + "...");
        return data.text;
      } catch (error) {
        console.error('Error processing message with Gemini:', error);
        
        // Provide more specific error messages
        let errorMessage = "I'm having trouble connecting to Google's AI services right now. Please try again in a moment.";
        
        if (error.message?.includes('429') || error.message?.includes('quota')) {
          errorMessage = "I've reached my usage limit for the moment. Please try again in a minute or two.";
        } else if (error.message?.includes('401') || error.message?.includes('403')) {
          errorMessage = "I'm having authentication issues with Google's services. Please check the API configuration.";
        } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
          errorMessage = "I'm having network connectivity issues. Please check your internet connection and try again.";
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
