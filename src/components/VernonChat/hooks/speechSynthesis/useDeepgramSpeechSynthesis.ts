import { useState, useRef, useCallback, useEffect } from 'react';
import { DeepgramService } from '@/services';

export const useDeepgramSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDeepgramReady, setIsDeepgramReady] = useState<boolean>(DeepgramService.hasApiKey());
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const promptForDeepgramKey = useCallback(() => {
    const apiKey = prompt('Enter your Deepgram API key for improved voice quality:');
    if (apiKey) {
      DeepgramService.setApiKey(apiKey);
      setIsDeepgramReady(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (currentUtterance.current) {
      window.speechSynthesis.cancel();
      currentUtterance.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(async (text: string): Promise<boolean> => {
    if (!text || text.trim() === '') return false;
    stop();

    try {
      setIsSpeaking(true);
      const audioData = await DeepgramService.textToSpeech(text);
      if (audioData) {
        const blob = new Blob([audioData], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        return await new Promise<boolean>((resolve) => {
          audio.onended = () => {
            URL.revokeObjectURL(url);
            setIsSpeaking(false);
            resolve(true);
          };
          audio.onerror = () => {
            URL.revokeObjectURL(url);
            setIsSpeaking(false);
            resolve(false);
          };
          audio.play().catch(() => {
            URL.revokeObjectURL(url);
            setIsSpeaking(false);
            resolve(false);
          });
        });
      }

      const utterance = new SpeechSynthesisUtterance(text);
      currentUtterance.current = utterance;
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice =>
        voice.lang.includes('en') &&
        (voice.name.includes('Male') ||
         voice.name.includes('David') ||
         voice.name.includes('Daniel') ||
         voice.name.includes('Google UK English Male'))
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      utterance.onend = () => {
        setIsSpeaking(false);
        currentUtterance.current = null;
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        currentUtterance.current = null;
      };
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
      return false;
    }
  }, [stop]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    speak,
    stop,
    isSpeaking,
    isDeepgramReady,
    promptForDeepgramKey
  };
};
