
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
        // Convert messages to format expected by Vertex AI
        const contextMessages = previousMessages
          .slice(-5)
          .map(msg => ({
            sender: msg.direction === 'outgoing' ? 'user' : 'ai',
            text: msg.content,
            // Include additional fields that might be needed
            direction: msg.direction,
            timestamp: msg.timestamp?.toISOString?.() || new Date().toISOString()
          }));
        
        // Map chatMode to the mode expected by VertexAIService
        const vertexMode = chatMode === 'venue' ? 'venue' : 'default';
        
        console.log("Calling vertex-ai function with:", query.substring(0, 50), vertexMode);
        console.log("Context messages:", JSON.stringify(contextMessages));
        
        // Direct call to Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('vertex-ai', {
          body: { 
            prompt: query,
            mode: vertexMode,
            context: contextMessages,
            model: 'gemini-1.5-pro',
            // Include additional parameters for better handling
            options: {
              temperature: 0.7,
              maxTokens: 1024,
              safetySettings: {
                harassment: "block_none",
                hateSpeech: "block_none",
                sexualContent: "block_none",
                dangerousContent: "block_none"
              }
            }
          }
        });
        
        if (error) {
          console.error("Error calling vertex-ai function:", error);
          throw new Error(error.message);
        }
        
        if (!data) {
          throw new Error("No response received from Vertex AI");
        }

        // Check if we used the fallback model
        if (data.usedFallbackModel) {
          setUsedFallback(true);
          console.log("Used fallback model due to rate limiting");
        }
        
        if (!data.text) {
          // If there's no text but we have a fallbackResponse, use that
          if (data.fallbackResponse) {
            console.log("Using fallback response:", data.fallbackResponse);
            return data.fallbackResponse;
          }
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
