
import { useState, useCallback } from 'react';
import { Message, ChatMode } from '../types';
import { supabase } from '@/integrations/supabase/client';

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
        
        console.log("Calling vertex-ai function with:", query.substring(0, 50), vertexMode);
        
        // Direct call to Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('vertex-ai', {
          body: { 
            prompt: query,
            mode: vertexMode,
            context: contextMessages,
            model: 'gemini-1.5-pro'
          }
        });
        
        if (error) {
          console.error("Error calling vertex-ai function:", error);
          throw new Error(error.message);
        }
        
        if (!data || !data.text) {
          throw new Error("No response received from Vertex AI");
        }
        
        console.log("Received response from vertex-ai:", data.text.substring(0, 50) + "...");
        return data.text;
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
