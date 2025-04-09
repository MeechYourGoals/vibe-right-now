
import { ElevenLabsBase } from './base';

// Interface for voice information
export interface VoiceInfo {
  voice_id: string;
  name: string;
  samples: any[];
  category: string;
  description: string;
  preview_url: string;
}

export class ElevenLabsVoiceManagement {
  /**
   * Get all available voices for the user
   */
  public static async getVoices(): Promise<VoiceInfo[] | null> {
    const apiKey = ElevenLabsBase.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return null;
    }
    
    try {
      const url = 'https://api.elevenlabs.io/v1/voices';
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Eleven Labs API error: ${errorData.detail || response.statusText}`);
      }
      
      const data = await response.json();
      return data.voices;
    } catch (error) {
      console.error('Error getting Eleven Labs voices:', error);
      return null;
    }
  }
  
  /**
   * Get details about a specific voice
   */
  public static async getVoice(voiceId: string): Promise<VoiceInfo | null> {
    const apiKey = ElevenLabsBase.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return null;
    }
    
    try {
      const url = `https://api.elevenlabs.io/v1/voices/${voiceId}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Eleven Labs API error: ${errorData.detail || response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting Eleven Labs voice:', error);
      return null;
    }
  }
}
