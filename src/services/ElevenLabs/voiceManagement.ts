
import { ElevenLabsBase } from './base';

export class ElevenLabsVoiceManagement {
  // Get available voices
  public static async getVoices(): Promise<any[]> {
    const apiKey = ElevenLabsBase.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return [];
    }
    
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Eleven Labs API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Error fetching Eleven Labs voices:', error);
      return [];
    }
  }
}
