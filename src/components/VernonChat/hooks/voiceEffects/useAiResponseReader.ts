
import { useEffect, useRef } from 'react';
import { Message } from '../../types';

interface UseAiResponseReaderProps {
  messages: Message[];
  isTyping: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  speakResponse: (text: string) => Promise<void>;
}

export const useAiResponseReader = ({
  messages,
  isTyping,
  isSpeaking,
  isListening,
  speakResponse
}: UseAiResponseReaderProps) => {
  const lastProcessedMessageRef = useRef<string | null>(null);

  // Effect to read AI responses in voice mode (except the intro which is handled separately)
  useEffect(() => {
    if (messages.length > 0 && !isTyping && !isSpeaking && isListening) {
      const lastMessage = messages[messages.length - 1];
      const isAiMessage = lastMessage.direction === 'incoming' || lastMessage.sender === 'ai';
      
      // Skip the intro message which is handled separately
      if (isAiMessage && lastMessage.id !== messages[0].id) {
        // Check if we've already processed this message to avoid repetition
        if (lastProcessedMessageRef.current !== lastMessage.id) {
          lastProcessedMessageRef.current = lastMessage.id;
          const messageText = lastMessage.content || lastMessage.text || '';
          speakResponse(messageText);
        }
      }
    }
  }, [messages, isTyping, isSpeaking, isListening, speakResponse]);
};
