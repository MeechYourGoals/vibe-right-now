
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
        console.log("Processing message with Vertex AI:", query.substring(0, 50));
        
        // Format conversation history for Vertex AI
        const history = previousMessages.slice(-5).map(msg => ({
          sender: msg.sender || (msg.direction === 'outgoing' ? 'user' : 'ai'),
          text: msg.content || msg.text || '',
          content: msg.content || msg.text || ''
        }));
        
        // Determine the mode for Vertex AI
        const mode = chatMode === 'venue' ? 'venue' : 'default';
        
        console.log("Calling vertex-ai function with mode:", mode);
        
        // Use Vertex AI via the vertex-ai function
        const { data, error } = await supabase.functions.invoke('vertex-ai', {
          body: { 
            prompt: query,
            mode: mode,
            context: history
          }
        });
        
        console.log("Vertex AI response:", { data, error });
        
        if (error) {
          console.error("Error calling vertex-ai function:", error);
          return "I'm having trouble connecting to my AI services right now. Please try again in a moment.";
        }
        
        if (!data) {
          return "I didn't receive a response from my AI services. Please try again.";
        }
        
        if (!data.text && !data.fallbackResponse) {
          return "I encountered an issue generating a response. Please try rephrasing your question.";
        }
        
        // Check if there's a fallback response
        if (data.fallbackResponse && !data.text) {
          setUsedFallback(true);
          return data.fallbackResponse;
        }
        
        const responseText = data.text || data.fallbackResponse || "I'm having trouble generating a response right now.";
        console.log("Received response from Vertex AI:", responseText.substring(0, 50) + "...");
        return responseText;
        
      } catch (error) {
        console.error('Error processing message with Vertex AI:', error);
        
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
