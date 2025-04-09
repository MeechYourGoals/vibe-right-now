
import { useState, useEffect, useCallback } from 'react';
import { useSpeechSynthesisVoices } from './useSpeechSynthesisVoices';
import { useElevenLabsVoice } from './useElevenLabsVoice';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [useElevenLabs, setUseElevenLabs] = useState(true);
  const { voices } = useSpeechSynthesisVoices();
  const { 
    speakWithElevenLabs, 
    isElevenLabsReady, 
    promptForElevenLabsKey,
    cancelElevenLabsSpeech
  } = useElevenLabsVoice();
  
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  
  // Function to speak text using Web Speech API
  const speakWithWebSpeech = useCallback(async (text: string): Promise<void> => {
    if (!synth) return;
    
    // Cancel any ongoing speech
    stopSpeaking();
    
    console.log('Speaking with Web Speech API:', text);
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find a good voice
    let chosenVoice;
    if (voices && voices.length > 0) {
      // Try to find a US English voice
      chosenVoice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Google'));
      
      // Fall back to any English voice
      if (!chosenVoice) {
        chosenVoice = voices.find(voice => voice.lang.startsWith('en'));
      }
      
      // Fall back to first available voice
      if (!chosenVoice) {
        chosenVoice = voices[0];
      }
    }
    
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }
    
    // Configure voice
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Set up event handlers
    utterance.onstart = () => {
      console.log('Speech started');
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      console.log('Speech ended');
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      setIsSpeaking(false);
    };
    
    // Speak the utterance
    synth.speak(utterance);
  }, [synth, voices]);
  
  // Main speech function that chooses between providers
  const speakResponse = async (text: string): Promise<void> => {
    try {
      if (useElevenLabs && isElevenLabsReady) {
        console.log('Speaking with ElevenLabs');
        setIsSpeaking(true);
        await speakWithElevenLabs(text);
      } else {
        await speakWithWebSpeech(text);
      }
    } catch (error) {
      console.error('Error in speakResponse:', error);
      // If ElevenLabs fails, fall back to Web Speech API
      if (useElevenLabs) {
        console.log('Falling back to Web Speech API');
        try {
          await speakWithWebSpeech(text);
        } catch (err) {
          console.error('Web Speech fallback also failed:', err);
          setIsSpeaking(false);
        }
      } else {
        setIsSpeaking(false);
      }
    }
  };
  
  // Stop speech
  const stopSpeaking = useCallback(() => {
    console.log('Stopping speech');
    
    if (useElevenLabs) {
      cancelElevenLabsSpeech();
    }
    
    if (synth) {
      synth.cancel();
    }
    
    setIsSpeaking(false);
  }, [synth, useElevenLabs, cancelElevenLabsSpeech]);
  
  // Toggle ElevenLabs usage
  const toggleElevenLabs = () => {
    setUseElevenLabs(!useElevenLabs);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (synth) {
        synth.cancel();
      }
    };
  }, [synth]);
  
  return {
    isSpeaking,
    speakResponse,
    stopSpeaking,
    useElevenLabs,
    toggleElevenLabs,
    promptForElevenLabsKey
  };
};
