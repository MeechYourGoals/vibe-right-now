
import { supabase } from '@/integrations/supabase/client';

export class DeepgramService {
  private static apiKey: string | null = null;
  
  // Set API key in localStorage for client-side persistence
  public static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('deepgramApiKey', apiKey);
  }
  
  // Get API key from localStorage
  public static getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('deepgramApiKey');
    }
    return this.apiKey;
  }
  
  // Clear API key
  public static clearApiKey() {
    this.apiKey = null;
    localStorage.removeItem('deepgramApiKey');
  }
  
  // Check if API key is available
  public static hasApiKey(): boolean {
    return !!this.getApiKey();
  }

  // Text to speech using Supabase edge function
  public static async textToSpeech(text: string, voice: string = 'aura-asteria-en'): Promise<ArrayBuffer | null> {
    try {
      console.log(`Converting text to speech with Deepgram voice: ${voice}`);
      
      const { data, error } = await supabase.functions.invoke('deepgram-speech', {
        body: {
          action: 'text-to-speech',
          text: text.length > 800 ? text.substring(0, 800) + '...' : text,
          voice: voice
        }
      });
      
      if (error) {
        console.error('Deepgram TTS error:', error);
        return null;
      }
      
      // The edge function returns raw audio data
      if (data instanceof ArrayBuffer) {
        return data;
      }
      
      // If it's base64 encoded, decode it
      if (typeof data === 'string') {
        const binaryString = atob(data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
      }
      
      return null;
    } catch (error) {
      console.error('Error in Deepgram text-to-speech:', error);
      return null;
    }
  }

  // Speech to text using Supabase edge function
  public static async speechToText(audioData: ArrayBuffer | Blob | string): Promise<string | null> {
    try {
      console.log('Processing speech to text with Deepgram Nova-2');
      
      let base64Audio: string;
      
      if (typeof audioData === 'string') {
        base64Audio = audioData;
      } else if (audioData instanceof ArrayBuffer) {
        const bytes = new Uint8Array(audioData);
        base64Audio = btoa(String.fromCharCode(...bytes));
      } else if (audioData instanceof Blob) {
        const arrayBuffer = await audioData.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        base64Audio = btoa(String.fromCharCode(...bytes));
      } else {
        throw new Error('Unsupported audio data format');
      }
      
      const { data, error } = await supabase.functions.invoke('deepgram-speech', {
        body: {
          action: 'speech-to-text',
          audioData: base64Audio
        }
      });
      
      if (error) {
        console.error('Deepgram STT error:', error);
        return null;
      }
      
      return data?.transcript || null;
    } catch (error) {
      console.error('Error in Deepgram speech-to-text:', error);
      return null;
    }
  }
}
