
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { getGoogleTTS, playAudioBase64, processTextForNaturalSpeech } from '../../utils/speechUtils';

export const useSpeakResponse = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const speakResponse = useCallback(async (text: string, useGoogleTTS: boolean = true) => {
    if (!text || text.trim() === '') return;

    setIsSpeaking(true);

    try {
      if (useGoogleTTS) {
        const processedText = processTextForNaturalSpeech(text);
        const audioBase64 = await getGoogleTTS(processedText);
        
        if (audioBase64) {
          const audio = playAudioBase64(audioBase64);
          if (audio) {
            setCurrentAudio(audio);
            audio.onended = () => {
              setIsSpeaking(false);
              setCurrentAudio(null);
            };
            return;
          }
        }
      }

      // Fallback to browser TTS
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => {
          setIsSpeaking(false);
          toast.error('Error with speech synthesis');
        };
        
        window.speechSynthesis.speak(utterance);
      } else {
        setIsSpeaking(false);
        toast.error('Speech synthesis not supported');
      }
    } catch (error) {
      console.error('Error in speakResponse:', error);
      setIsSpeaking(false);
      toast.error('Error generating speech');
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    setIsSpeaking(false);
  }, [currentAudio]);

  return {
    speakResponse,
    stopSpeaking,
    isSpeaking
  };
};
