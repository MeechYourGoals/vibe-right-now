
import { supabaseApiClient } from './api';

/**
 * Service for interacting with ElevenLabs API via Supabase Edge Functions
 * Now uses the unified API client architecture
 */
export class ElevenLabsService {
  private static DEFAULT_VOICE_ID = 'nPczCjzI2devNBz1zQrb'; // Brian voice
  
  /**
   * Convert text to speech using ElevenLabs
   */
  static async textToSpeech(
    text: string, 
    options: { 
      voiceId?: string; 
      model?: string;
      stability?: number;
      similarityBoost?: number;
    } = {}
  ): Promise<ArrayBuffer> {
    try {
      console.log('Converting text to speech with ElevenLabs');
      
      const response = await supabaseApiClient.callElevenLabsTTS(text, options.voiceId);
      return response;
    } catch (error) {
      console.error('Error with ElevenLabs text-to-speech:', error);
      throw error;
    }
  }

  /**
   * Get available voices
   */
  static async getVoices(): Promise<any> {
    try {
      // This would need to be implemented in the Supabase function
      // For now, return default voice info
      return {
        voices: [
          {
            voice_id: this.DEFAULT_VOICE_ID,
            name: 'Brian',
            category: 'premade',
            description: 'A deep, authoritative voice'
          }
        ]
      };
    } catch (error) {
      console.error('Error fetching ElevenLabs voices:', error);
      throw error;
    }
  }

  /**
   * Convert speech to text (if available)
   */
  static async speechToText(audioBase64: string): Promise<string | null> {
    try {
      // ElevenLabs doesn't have native STT, so this would need custom implementation
      // For now, return null to indicate unavailable
      console.warn('ElevenLabs STT not implemented');
      return null;
    } catch (error) {
      console.error('Error with ElevenLabs speech-to-text:', error);
      return null;
    }
  }

  /**
   * Play audio from base64 or ArrayBuffer
   */
  static async playAudio(audioData: ArrayBuffer | string): Promise<boolean> {
    try {
      let blob: Blob;
      
      if (typeof audioData === 'string') {
        // Convert base64 to blob
        const binaryString = atob(audioData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        blob = new Blob([bytes], { type: 'audio/mpeg' });
      } else {
        blob = new Blob([audioData], { type: 'audio/mpeg' });
      }
      
      const audio = new Audio();
      const url = URL.createObjectURL(blob);
      audio.src = url;
      
      return new Promise((resolve) => {
        audio.onended = () => {
          URL.revokeObjectURL(url);
          resolve(true);
        };
        
        audio.onerror = () => {
          URL.revokeObjectURL(url);
          console.error('Audio playback error');
          resolve(false);
        };
        
        audio.play().catch(() => {
          URL.revokeObjectURL(url);
          resolve(false);
        });
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      return false;
    }
  }
}
