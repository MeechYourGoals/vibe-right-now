
import { useCallback } from 'react';
import { Message, ChatMode } from '../types';
import { OpenAIService } from '@/services/OpenAIService';

export const useMessageProcessor = () => {
  const processMessage = useCallback(async (
    prompt: string, 
    messageHistory: Message[], 
    chatMode: ChatMode
  ): Promise<string> => {
    try {
      // Convert message history to the format expected by OpenAI service
      const context = messageHistory.slice(-5).map(msg => ({
        sender: msg.direction === 'outgoing' ? 'user' : 'assistant',
        text: msg.content || msg.text || ''
      }));

      const response = await OpenAIService.generateResponse(
        prompt,
        context,
        chatMode
      );

      return response;
    } catch (error) {
      console.error('Message processing error:', error);
      throw new Error('Failed to process message with OpenAI');
    }
  }, []);

  return { processMessage };
};
