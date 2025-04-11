
/**
 * Speech services using Google's Text-to-Speech API
 */
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TextToSpeechOptions, DEFAULT_MALE_VOICE } from './types';

/**
 * Generate speech from text using Google Text-to-Speech API
 */
export async function textToSpeech(text: string, options: TextToSpeechOptions = {}): Promise<string | null> {
  try {
    console.log('Converting text to speech with Google TTS:', text.substring(0, 50) + '...');
    
    const { data, error } = await supabase.functions.invoke('google-tts', {
      body: { 
        text,
        voice: options.voice || DEFAULT_MALE_VOICE, // Use male voice by default
        speakingRate: options.speakingRate || 1.0,
        pitch: options.pitch || 0
      }
    });
    
    if (error) {
      console.error('Error calling Google TTS function:', error);
      throw new Error(`Text-to-speech conversion failed: ${error.message}`);
    }
    
    if (!data || !data.audioContent) {
      throw new Error('No audio content received from Google TTS');
    }
    
    return data.audioContent;
  } catch (error) {
    console.error('Error in textToSpeech:', error);
    toast.error('Failed to generate speech. Using browser voice instead.');
    return null;
  }
}

/**
 * Transcribe speech to text using Google Speech-to-Text API
 */
export async function speechToText(audioBase64: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.functions.invoke('google-stt', {
      body: { audio: audioBase64 }
    });
    
    if (error) {
      console.error('Error calling Google STT function:', error);
      throw new Error(`Speech-to-text conversion failed: ${error.message}`);
    }
    
    if (!data || !data.transcript) {
      throw new Error('No transcript received from Google STT');
    }
    
    return data.transcript;
  } catch (error) {
    console.error('Error in speechToText:', error);
    return null;
  }
}
