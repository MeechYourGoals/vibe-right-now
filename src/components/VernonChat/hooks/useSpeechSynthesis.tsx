
import { useState, useRef, useEffect } from 'react';
import { 
  getPreferredVoice, 
  processTextForNaturalSpeech, 
  configureUtteranceForNaturalSpeech,
  initializeSpeechSynthesis
} from '../utils/speechUtils';
import { ElevenLabsService } from '@/services/ElevenLabsService';
import { toast } from 'sonner';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [useElevenLabs, setUseElevenLabs] = useState(false);
  
  const speechSynthesis = useRef<SpeechSynthesis | null>(initializeSpeechSynthesis());
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const currentlyPlayingText = useRef<string | null>(null);
  
  // Initialize audio element for Eleven Labs playback
  useEffect(() => {
    audioElement.current = new Audio();
    
    // Set up event handlers
    audioElement.current.onplay = () => setIsSpeaking(true);
    audioElement.current.onended = () => {
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    };
    audioElement.current.onerror = () => {
      console.error('Audio playback error');
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    };
    
    // Check if Eleven Labs API key is available
    const hasElevenLabsKey = ElevenLabsService.hasApiKey();
    setUseElevenLabs(hasElevenLabsKey);
    
    return () => {
      if (audioElement.current) {
        audioElement.current.onplay = null;
        audioElement.current.onended = null;
        audioElement.current.onerror = null;
      }
    };
  }, []);
  
  // Effect to load voices when available
  useEffect(() => {
    // Function to set available voices
    const setAvailableVoices = () => {
      if (speechSynthesis.current) {
        const availableVoices = speechSynthesis.current.getVoices();
        setVoices(availableVoices);
      }
    };
    
    // Set voices right away if already loaded
    setAvailableVoices();
    
    // Set up event listener for when voices are loaded asynchronously
    if (speechSynthesis.current) {
      speechSynthesis.current.onvoiceschanged = setAvailableVoices;
    }
    
    // Cleanup
    return () => {
      if (speechSynthesis.current) {
        speechSynthesis.current.onvoiceschanged = null;
      }
    };
  }, []);
  
  const stopSpeaking = (): void => {
    if (useElevenLabs && audioElement.current) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    } else if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
      setIsSpeaking(false);
      if (currentUtterance.current) {
        currentUtterance.current = null;
      }
      currentlyPlayingText.current = null;
    }
  };
  
  const speakWithElevenLabs = async (text: string): Promise<boolean> => {
    try {
      // Don't repeat the same text if it's already playing
      if (isSpeaking && currentlyPlayingText.current === text) {
        console.log('This text is already being spoken, skipping duplicate');
        return true;
      }
      
      // Stop any currently playing speech first
      stopSpeaking();
      
      setIsSpeaking(true);
      currentlyPlayingText.current = text;
      
      // Request to convert text to speech
      const audioData = await ElevenLabsService.textToSpeech(text);
      
      if (!audioData) {
        console.error('Failed to get audio from Eleven Labs');
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
        return false;
      }
      
      // Create blob from array buffer
      const blob = new Blob([audioData], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      
      // Set audio source and play
      if (audioElement.current) {
        audioElement.current.src = url;
        await audioElement.current.play();
        
        // Clean up blob URL after playback
        audioElement.current.onended = () => {
          URL.revokeObjectURL(url);
          setIsSpeaking(false);
          currentlyPlayingText.current = null;
        };
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error with Eleven Labs speech synthesis:', error);
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
      return false;
    }
  };
  
  const speakWithBrowserSynthesis = (text: string): void => {
    if (!speechSynthesis.current) {
      console.error('Speech synthesis not available');
      return;
    }
    
    // Don't repeat the same text if it's already playing
    if (isSpeaking && currentlyPlayingText.current === text) {
      console.log('This text is already being spoken, skipping duplicate');
      return;
    }
    
    // Cancel any ongoing speech
    stopSpeaking();
    
    const utterance = new SpeechSynthesisUtterance();
    currentUtterance.current = utterance;
    currentlyPlayingText.current = text;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    };
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    };
    
    // Select a preferred voice
    const preferredVoice = getPreferredVoice(voices.length > 0 ? voices : speechSynthesis.current.getVoices());
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      console.log('Using voice:', preferredVoice.name);
    } else {
      console.log('No preferred voice found, using default');
    }
    
    // Process text for more natural sound
    const processedText = processTextForNaturalSpeech(text);
    
    // Split long responses into sentences for more natural pauses
    const sentences = processedText.match(/[^.!?]+[.!?]+/g) || [processedText];
    
    if (sentences.length > 1 && sentences.length < 20) {
      // For medium-length responses, speak sentence by sentence with pauses
      speakSentenceBySequence(sentences, 0);
    } else {
      // For short or very long responses, speak all at once
      utterance.text = processedText;
      configureUtteranceForNaturalSpeech(utterance, processedText);
      
      // Finally, speak the text
      speechSynthesis.current.speak(utterance);
    }
  };
  
  const speakResponse = async (text: string): Promise<void> => {
    if (!text || text.trim() === '') {
      console.log('Empty text provided, not speaking');
      return;
    }
    
    // Don't repeat the same text if it's already playing
    if (isSpeaking && currentlyPlayingText.current === text) {
      console.log('This text is already being spoken, skipping duplicate');
      return;
    }
    
    // Stop any ongoing speech first
    stopSpeaking();
    
    // Try to use Eleven Labs if available, fall back to browser synthesis
    if (useElevenLabs) {
      const success = await speakWithElevenLabs(text);
      if (success) return;
      
      // If Eleven Labs fails, fall back to browser synthesis
      console.log('Falling back to browser speech synthesis');
    }
    
    // Use browser's speech synthesis
    speakWithBrowserSynthesis(text);
    
    // Return a promise that resolves when speaking is done
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (!isSpeaking) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  };
  
  // Function to speak sentences one by one for more natural cadence
  const speakSentenceBySequence = (sentences: string[], index: number): void => {
    if (!speechSynthesis.current || index >= sentences.length) {
      return;
    }
    
    const sentence = sentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    
    // Select voice
    const preferredVoice = getPreferredVoice(voices.length > 0 ? voices : speechSynthesis.current.getVoices());
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Configure utterance properties
    configureUtteranceForNaturalSpeech(utterance, sentence);
    
    // Handle events
    utterance.onstart = () => {
      if (index === 0) {
        setIsSpeaking(true);
      }
    };
    
    utterance.onend = () => {
      // Move to next sentence
      if (index < sentences.length - 1) {
        speakSentenceBySequence(sentences, index + 1);
      } else {
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
      }
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    };
    
    // Speak the current sentence
    speechSynthesis.current.speak(utterance);
  };
  
  // Function to prompt for Eleven Labs API key
  const promptForElevenLabsKey = (): void => {
    const apiKey = prompt('Enter your Eleven Labs API key for improved voice quality:');
    if (apiKey) {
      ElevenLabsService.setApiKey(apiKey);
      setUseElevenLabs(true);
      toast.success('Eleven Labs API key saved. Voice quality will be improved.');
    }
  };
  
  return {
    isSpeaking,
    speakResponse,
    stopSpeaking,
    useElevenLabs,
    promptForElevenLabsKey
  };
};
