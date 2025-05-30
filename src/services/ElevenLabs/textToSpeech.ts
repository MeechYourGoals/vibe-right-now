
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
    
    // Reduce text length if it's too long to save credits
    // This will truncate long texts to around 150 words to stay within credit limits
    const reducedText = ElevenLabsTextToSpeech.reduceLongText(text);
    
    try {
      // Always use the Adam voice by default - consistent male voice
      const voiceId = options.voice_id || ElevenLabsBase.getDefaultVoiceId();
      const modelId = options.model_id || 'eleven_multilingual_v2';
      
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      
      console.log(`Converting text to speech with voice ID ${voiceId} and model ${modelId}`);
      console.log(`Text length before reduction: ${text.length}, after: ${reducedText.length}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: reducedText,
          model_id: modelId,
          voice_settings: options.voice_settings || {
            stability: 0.8,
            similarity_boost: 0.7
          }
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { detail: errorText };
        }
        
        // Check specifically for quota exceeded error
        if (errorData?.detail?.status === 'quota_exceeded') {
          console.warn('ElevenLabs quota exceeded, returning null to trigger fallback to browser speech');
          return null;
        }
        
        throw new Error(`Eleven Labs API error: ${JSON.stringify(errorData?.detail || response.statusText)}`);
      }
      
      // Return audio as ArrayBuffer
      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error in Eleven Labs text-to-speech:', error);
      return null;
    }
  }
  
  // Helper method to reduce text length to save credits
  private static reduceLongText(text: string): string {
    // If text is less than 500 characters, return as is
    if (text.length < 500) return text;
    
    // For longer text, truncate while trying to maintain complete sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    let result = '';
    let totalChars = 0;
    const charLimit = 800;
    
    for (const sentence of sentences) {
      if (totalChars + sentence.length > charLimit) {
        break;
      }
      result += sentence;
      totalChars += sentence.length;
    }
    
    // Add an ellipsis if we truncated the text
    if (result.length < text.length) {
      result = result.trim() + '...';
    }
    
    return result;
  }
}
