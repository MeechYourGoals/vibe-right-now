
import { useState, useCallback } from 'react';
import { DeepgramService } from '@/services';

export const useDeepgramVoice = () => {
  const [isDeepgramReady, setIsDeepgramReady] = useState<boolean>(DeepgramService.hasApiKey());
  
  // Function to prompt user for Deepgram API key
  const promptForDeepgramKey = useCallback(() => {
    const apiKey = prompt('Enter your Deepgram API key for improved voice quality:');
    if (apiKey) {
      DeepgramService.setApiKey(apiKey);
      setIsDeepgramReady(true);
    }
  }, []);
  
  // Function to speak using Deepgram
  const speakWithDeepgram = useCallback(async (text: string): Promise<void> => {
    try {
      const audioData = await DeepgramService.textToSpeech(text);
      
      if (!audioData) {
        throw new Error('Failed to get audio from Deepgram');
      }
      
      // Create a blob from the audio data
      const blob = new Blob([audioData], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      
      // Create and play audio element
      const audio = new Audio(url);
      
      return new Promise((resolve, reject) => {
        audio.onended = () => {
          URL.revokeObjectURL(url);
          resolve();
        };
        
        audio.onerror = (error) => {
          URL.revokeObjectURL(url);
          reject(error);
        };
        
        audio.play().catch(reject);
      });
    } catch (error) {
      console.error('Error with Deepgram speech:', error);
      throw error;
    }
  }, []);
  
  // Function to cancel Deepgram speech
  const cancelDeepgramSpeech = useCallback(() => {
    // This is a simple implementation
    // In a more complex app, you might need to track active audio elements
    const audios = document.querySelectorAll('audio');
    audios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, []);
  
  return {
    isDeepgramReady,
    speakWithDeepgram,
    promptForDeepgramKey,
    cancelDeepgramSpeech
  };
};
