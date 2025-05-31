
import { useEffect, useRef } from 'react';
import { Message } from '../../types';

interface UseIntroMessagesProps {
  messages: Message[];
  isListening: boolean;
  isFirstInteraction: boolean;
  introMessageSpoken: boolean;
  setIntroMessageSpoken: (value: boolean) => void;
  speakIntroOnce: (text: string) => Promise<void>;
  markIntroAsSpoken: () => void;
}

export const useIntroMessages = ({
  messages,
  isListening,
  isFirstInteraction,
  introMessageSpoken,
  setIntroMessageSpoken,
  speakIntroOnce,
  markIntroAsSpoken
}: UseIntroMessagesProps) => {
  const introMessageSpeaking = useRef(false);

  // Effect to handle intro message speech only once when user activates voice mode
  useEffect(() => {
    if (messages.length > 0 && !introMessageSpoken && isListening && isFirstInteraction && !introMessageSpeaking.current) {
      const introMessage = messages[0];
      const messageText = introMessage.content || introMessage.text || '';
      
      // Make sure this is only triggered once
      introMessageSpeaking.current = true;
      
      // Speak the intro message
      speakIntroOnce(messageText).then(() => {
        markIntroAsSpoken();
        setIntroMessageSpoken(true);
        introMessageSpeaking.current = false;
      });
    }
  }, [messages, isListening, isFirstInteraction, speakIntroOnce, markIntroAsSpoken, introMessageSpoken, setIntroMessageSpoken]);
};
