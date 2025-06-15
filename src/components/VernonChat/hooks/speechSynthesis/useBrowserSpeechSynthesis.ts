
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { configureSpeechSynthesis, createUtterance, handleSynthesisError } from './speechSynthesisUtils';

export const useBrowserSpeechSynthesis = () => {
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const speechSynth = configureSpeechSynthesis();
    setSynth(speechSynth);

    if (speechSynth) {
      const updateVoices = () => {
        const availableVoices = speechSynth.getVoices();
        setVoices(availableVoices);
      };

      updateVoices();
      speechSynth.onvoiceschanged = updateVoices;
    }
  }, []);

  const speak = useCallback((text: string, voice?: SpeechSynthesisVoice) => {
    if (!synth) {
      handleSynthesisError('Speech synthesis not available');
      return;
    }

    const utterance = createUtterance(text);
    
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      handleSynthesisError(event.error);
    };

    synth.speak(utterance);
  }, [synth]);

  const stop = useCallback(() => {
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  }, [synth]);

  return {
    speak,
    stop,
    voices,
    isSpeaking,
    isSupported: !!synth
  };
};
