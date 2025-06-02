
import { useState, useCallback } from 'react';
import { ElevenLabsService } from '@/services/ElevenLabs';

export const useElevenLabsVoice = () => {
  const [isElevenLabsReady, setIsElevenLabsReady] = useState<boolean>(ElevenLabsService.hasApiKey());
  
  // Function to prompt user for ElevenLabs API key
  const promptForElevenLabsKey = useCallback(() => {
    const apiKey = prompt('Enter your Eleven Labs API key for improved voice quality:');
    if (apiKey) {
      ElevenLabsService.setApiKey(apiKey);
      setIsElevenLabsReady(true);
    }
  }, []);
  
  // Function to speak using ElevenLabs
  const speakWithElevenLabs = useCallback(async (text: string): Promise<void> => {
    try {
      const audioData = await ElevenLabsService.textToSpeech(text);
      
      if (!audioData) {
        throw new Error('Failed to get audio from Eleven Labs');
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
      console.error('Error with Eleven Labs speech:', error);
      throw error;
    }
  }, []);
  
  // Function to cancel ElevenLabs speech
  const cancelElevenLabsSpeech = useCallback(() => {
    // This is a simple implementation
    // In a more complex app, you might need to track active audio elements
    const audios = document.querySelectorAll('audio');
    audios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, []);
  
  return {
    isElevenLabsReady,
    speakWithElevenLabs,
    promptForElevenLabsKey,
    cancelElevenLabsSpeech
  };
};
