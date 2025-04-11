
// Speech synthesis helpers using Google's TTS
import { toast } from "sonner";

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

// Google TTS using Vertex AI implementation
export const getGoogleTTS = async (text: string): Promise<string | null> => {
  try {
    // Call Vertex AI via Supabase Edge Function
    const response = await fetch('/api/google-tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        text,
        voice: 'en-US-Neural2-J', // Google's conversational voice
        languageCode: 'en-US'
      }),
    });
    
    if (!response.ok) {
      console.error('Error from Google TTS API:', await response.text());
      return null;
    }
    
    const data = await response.json();
    return data.audioContent; // Base64 encoded audio
  } catch (error) {
    console.error('Error calling Google TTS:', error);
    toast.error('Error generating speech, falling back to browser TTS');
    return null;
  }
};

// Helper to play audio from base64 string
export const playAudioBase64 = (audioBase64: string): HTMLAudioElement => {
  const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
  audio.play().catch(err => {
    console.error('Error playing audio:', err);
    toast.error('Error playing audio');
  });
  return audio;
};
