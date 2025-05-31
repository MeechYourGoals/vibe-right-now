
// Speech synthesis helpers using Google's TTS
import { toast } from "sonner";
import { VertexAIHub, DEFAULT_MALE_VOICE } from "@/services/VertexAI";

export const initializeSpeechSynthesis = (): SpeechSynthesis | null => {
  if ('speechSynthesis' in window) {
    // Force initialize voices if available
    const synth = window.speechSynthesis;
    synth.getVoices(); // Trigger voice loading
    
    // For iOS Safari, we need to speak a silent utterance to initialize the voices
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      const silentUtterance = new SpeechSynthesisUtterance('');
      silentUtterance.volume = 0;
      synth.speak(silentUtterance);
    }
    
    return synth;
  }
  
  console.error('Speech synthesis not supported');
  return null;
};

// Google TTS using Cloud Text-to-Speech API implementation
export const getGoogleTTS = async (text: string): Promise<string | null> => {
  try {
    console.log('Requesting Google TTS for text:', text.substring(0, 50) + '...');
    
    // Use our VertexAIHub to handle TTS
    return await VertexAIHub.textToSpeech(text, {
      voice: DEFAULT_MALE_VOICE,
      speakingRate: 1.0,
      pitch: 0
    });
  } catch (error) {
    console.error('Error calling Google TTS:', error);
    toast.error('Error generating speech, falling back to browser TTS');
    return null;
  }
};

// Helper to play audio from base64 string
export const playAudioBase64 = (audioBase64: string): HTMLAudioElement | null => {
  if (!audioBase64) {
    console.error('Empty audio base64 string provided');
    return null;
  }
  
  try {
    const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
    
    // Add event listeners for debugging
    audio.onloadeddata = () => console.log('Audio loaded successfully');
    audio.onerror = (err) => console.error('Audio loading error:', err);
    
    // Play the audio
    audio.play().catch(err => {
      console.error('Error playing audio:', err);
      toast.error('Error playing audio');
    });
    
    return audio;
  } catch (error) {
    console.error('Error creating audio element:', error);
    toast.error('Error processing audio');
    return null;
  }
};
