
import { useState, useCallback, useRef } from 'react';
import { useDeepgramSpeech } from './speechSynthesis/useDeepgramSpeech';

export const useEnhancedSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(new Audio());
  const currentlyPlayingText = useRef<string | null>(null);
  
  const stopSpeaking = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setIsSpeaking(false);
    currentlyPlayingText.current = null;
  }, []);

  const { speakWithDeepgram } = useDeepgramSpeech({
    audioElement,
    isSpeaking,
    setIsSpeaking,
    currentlyPlayingText,
    stopSpeaking
  });
  
  const speak = useCallback(async (text: string): Promise<void> => {
    if (!text.trim()) return;
    
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    
    setIsSpeaking(true);
    
    try {
      const success = await speakWithDeepgram(text);
      
      if (!success) {
        console.log('Falling back to browser speech synthesis');
        await fallbackToSpeechSynthesis(text);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
      await fallbackToSpeechSynthesis(text);
    } finally {
      setIsSpeaking(false);
    }
  }, [speakWithDeepgram]);
  
  const fallbackToSpeechSynthesis = useCallback(async (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve();
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(voice => 
        voice.name.includes('Male') || 
        voice.name.includes('David') || 
        voice.name.includes('Daniel') ||
        voice.name.includes('Google UK English Male')
      );
      
      if (maleVoice) {
        utterance.voice = maleVoice;
      }
      
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      
      window.speechSynthesis.speak(utterance);
    });
  }, []);
  
  return {
    speak,
    stopSpeaking,
    isSpeaking
  };
};
