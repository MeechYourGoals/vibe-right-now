
// No longer using ElevenLabsBase or ElevenLabsOptions directly in this method's core logic
// import { ElevenLabsBase, ElevenLabsOptions } from './base';
import { VertexAIService } from '../VertexAIService'; // Adjusted path

// Define ElevenLabsOptions interface locally if not importing from base, to satisfy method signature
// This is just to match the existing signature, these options will be ignored.
export interface ElevenLabsOptions {
  voice_id?: string;
  model_id?: string;
  voice_settings?: {
    stability: number;
    similarity_boost: number;
  };
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  try {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (e) {
    console.error("Error decoding base64 string to ArrayBuffer:", e);
    throw new Error("Invalid base64 string for ArrayBuffer conversion.");
  }
}

export class ElevenLabsTextToSpeech {
  // Text to speech conversion, now proxied to VertexAIService
  public static async textToSpeech(
    text: string, 
    options: ElevenLabsOptions = {} // These options are now ignored
  ): Promise<ArrayBuffer | null> {
    console.log(`ElevenLabsTextToSpeech.textToSpeech called, redirecting to VertexAIService.textToSpeech. Text: ${text.substring(0,30)}...`);
    // ElevenLabs specific options (voice_id, model_id, voice_settings) are not directly mappable to Google TTS.
    // We will call VertexAIService.textToSpeech with its default voice options.
    // If specific voice mapping or parameter adjustment were needed, it would be done here.
    // For now, we use VertexAI's defaults by passing {}.
    
    try {
      const base64Audio = await VertexAIService.textToSpeech(text, {}); // Pass empty options for Vertex defaults
      
      if (base64Audio && base64Audio.length > 0) {
        return base64ToArrayBuffer(base64Audio);
      } else {
        // This case should ideally not be hit if VertexAIService.textToSpeech throws on error or no content.
        console.warn('VertexAIService.textToSpeech returned empty or null audio content.');
        return null;
      }
    } catch (error) {
      console.error('Error in ElevenLabsTextToSpeech (proxied to VertexAI):', error);
      return null; // Maintain original behavior of returning null on error
    }
  }
  
  // reduceLongText method is no longer needed here as VertexAIService will handle text as is.
}
