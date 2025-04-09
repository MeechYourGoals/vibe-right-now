
import { useEffect, useRef } from 'react';
import { Message } from '../types';

interface UseVoiceEffectsProps {
  messages: Message[];
  isTyping: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  isFirstInteraction: boolean;
  introMessageSpoken: boolean;
  setIntroMessageSpoken: (value: boolean) => void;
  speakIntroOnce: (text: string) => Promise<void>;
  markIntroAsSpoken: () => void;
  speakResponse: (text: string) => Promise<void>;
  stopSpeaking: () => void;
  stopListening: () => void;
  processTranscript: () => string;
  onSendMessage: (message: string) => void;
  isOpen: boolean;
}

export const useVoiceEffects = ({
  messages,
  isTyping,
  isSpeaking,
  isListening,
  isProcessing,
  setIsProcessing,
  isFirstInteraction,
  introMessageSpoken,
  setIntroMessageSpoken,
  speakIntroOnce,
  markIntroAsSpoken,
  speakResponse,
  stopSpeaking,
  stopListening,
  processTranscript,
  onSendMessage,
  isOpen
}: UseVoiceEffectsProps) => {
  const lastProcessedMessageRef = useRef<string | null>(null);
  const introMessageSpeaking = useRef(false);

  // Effect to handle intro message speech only once when user activates voice mode
  useEffect(() => {
    if (messages.length > 0 && !introMessageSpoken && isListening && isFirstInteraction && !introMessageSpeaking.current) {
      const introMessage = messages[0];
      
      // Make sure this is only triggered once
      introMessageSpeaking.current = true;
      
      // Speak the intro message
      speakIntroOnce(introMessage.text).then(() => {
        markIntroAsSpoken();
        setIntroMessageSpoken(true);
        introMessageSpeaking.current = false;
      });
    }
  }, [messages, isListening, isFirstInteraction, speakIntroOnce, markIntroAsSpoken, introMessageSpoken, setIntroMessageSpoken]);

  // Effect to read AI responses in voice mode (except the intro which is handled separately)
  useEffect(() => {
    if (messages.length > 0 && !isTyping && !isSpeaking && isListening) {
      const lastMessage = messages[messages.length - 1];
      
      // Skip the intro message which is handled separately
      if (lastMessage.sender === 'ai' && lastMessage.id !== messages[0].id) {
        // Check if we've already processed this message to avoid repetition
        if (lastProcessedMessageRef.current !== lastMessage.id) {
          lastProcessedMessageRef.current = lastMessage.id;
          speakResponse(lastMessage.text);
        }
      }
    }
  }, [messages, isTyping, isSpeaking, isListening, speakResponse]);

  // Effect to stop speaking when chat is closed
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      stopListening();
    }
  }, [isOpen, stopSpeaking, stopListening]);

  // Handle sending voice transcript as a message
  useEffect(() => {
    if (!isListening && isProcessing && !isTyping) {
      const transcriptText = processTranscript();
      if (transcriptText) {
        // Small delay to show processing state
        setTimeout(() => {
          onSendMessage(transcriptText);
          setIsProcessing(false);
        }, 300);
      } else {
        setIsProcessing(false);
      }
    }
  }, [isListening, isProcessing, processTranscript, onSendMessage, setIsProcessing, isTyping]);
};
