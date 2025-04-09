
import { ElevenLabsBase, ElevenLabsOptions } from './base';

export class ElevenLabsTextToSpeech {
  // Text to speech conversion
  public static async textToSpeech(
    text: string, 
    options: ElevenLabsOptions = {}
  ): Promise<ArrayBuffer | null> {
    const apiKey = ElevenLabsBase.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return null;
    }
    
    try {
      // Always use the Adam voice by default - consistent male voice
      const voiceId = options.voice_id || ElevenLabsBase.getDefaultVoiceId();
      const modelId = options.model_id || 'eleven_multilingual_v2';
      
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      
      console.log(`Converting text to speech with voice ID ${voiceId} and model ${modelId}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          voice_settings: options.voice_settings || {
            stability: 0.8,
            similarity_boost: 0.7
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Eleven Labs API error: ${errorData.detail || response.statusText}`);
      }
      
      // Return audio as ArrayBuffer
      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error in Eleven Labs text-to-speech:', error);
      return null;
    }
  }
}
