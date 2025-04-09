
import { useState, useRef, useEffect } from 'react';
import { 
  getPreferredVoice, 
  processTextForNaturalSpeech, 
  configureUtteranceForNaturalSpeech,
  initializeSpeechSynthesis
} from '../utils/speech';
import { ElevenLabsService } from '@/services/ElevenLabsService';
import { toast } from 'sonner';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [useElevenLabs, setUseElevenLabs] = useState(true); // Default to using ElevenLabs
  
  const speechSynthesis = useRef<SpeechSynthesis | null>(initializeSpeechSynthesis());
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const currentlyPlayingText = useRef<string | null>(null);
  const introHasPlayed = useRef<boolean>(false);
  
  // Initialize audio element for Eleven Labs playback
  useEffect(() => {
    if (!audioElement.current) {
      audioElement.current = new Audio();
      
      // Set up event handlers
      if (audioElement.current) {
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
      }
    }
    
    // Check if Eleven Labs API key is available and set useElevenLabs
    const hasElevenLabsKey = ElevenLabsService.hasApiKey();
    setUseElevenLabs(hasElevenLabsKey);
    
    return () => {
      if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current.src = '';
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
      
      // Set state to speaking and track current text
      setIsSpeaking(true);
      currentlyPlayingText.current = text;
      
      // Request to convert text to speech
      const audioData = await ElevenLabsService.textToSpeech(text);
      
      if (!audioData || !audioElement.current) {
        console.error('Failed to get audio from Eleven Labs or audio element not available');
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
        return false;
      }
      
      // Create blob from array buffer
      const blob = new Blob([audioData], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      
      // Set audio source and play
      audioElement.current.src = url;
      
      try {
        await audioElement.current.play();
        
        // Clean up blob URL after playback
        audioElement.current.onended = () => {
          URL.revokeObjectURL(url);
          setIsSpeaking(false);
          currentlyPlayingText.current = null;
        };
        return true;
      } catch (error) {
        console.error('Error playing audio:', error);
        URL.revokeObjectURL(url);
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
        return false;
      }
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
    const preferredVoice = getPreferredVoice(voices.length > 0 ? voices : (speechSynthesis.current.getVoices() || []));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      console.log('Using voice:', preferredVoice.name);
    } else {
      console.log('No preferred voice found, using default');
    }
    
    // Process text for more natural sound
    const processedText = processTextForNaturalSpeech(text);
    utterance.text = processedText;
    
    // Configure other utterance properties
    configureUtteranceForNaturalSpeech(utterance, processedText);
    
    // Finally, speak the text
    speechSynthesis.current.speak(utterance);
  };
  
  const speakResponse = async (text: string): Promise<void> => {
    // Avoid speaking empty text
    if (!text || text.trim() === '') {
      console.log('Empty text provided, not speaking');
      return;
    }
    
    // Don't repeat the same text if it's already playing
    if (isSpeaking && currentlyPlayingText.current === text) {
      console.log('This text is already being spoken, skipping duplicate');
      return;
    }
    
    // Always stop any ongoing speech first to prevent overlapping voices
    stopSpeaking();
    
    console.log('Speaking with ElevenLabs:', useElevenLabs);
    
    // Try to use Eleven Labs if available
    if (useElevenLabs) {
      try {
        const success = await speakWithElevenLabs(text);
        if (success) {
          // Mark intro as played if this is the first message
          if (!introHasPlayed.current && text.includes("I'm VeRNon")) {
            introHasPlayed.current = true;
          }
          return;
        }
      } catch (error) {
        console.error('ElevenLabs speech failed, falling back to browser synthesis:', error);
      }
    }
    
    // Fallback to browser's speech synthesis
    speakWithBrowserSynthesis(text);
  };
  
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
