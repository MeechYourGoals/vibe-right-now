
/**
 * Speech services routed through edge functions with silent text-only degrade.
 */
import { invokeEdgeWithFallback } from '@/services/edge/invokeEdge';
import { TextToSpeechOptions, DEFAULT_MALE_VOICE } from './types';

function asAudio(data: unknown): string | null {
  if (typeof data === 'string' && data.trim()) return data;
  if (data && typeof data === 'object') {
    const obj = data as Record<string, any>;
    return obj.audioContent || obj.audio || obj.base64 || null;
  }
  return null;
}

/**
 * Generate speech from text. Tries `eleven-labs-tts`, then `google-tts`, and
 * returns null (text-only) when no audio backend is available.
 */
export async function textToSpeech(
  text: string,
  options: TextToSpeechOptions = {}
): Promise<string | null> {
  const data = await invokeEdgeWithFallback<unknown>(
    'eleven-labs-tts',
    { text, voice: options.voice || DEFAULT_MALE_VOICE },
    async () =>
      invokeEdgeWithFallback<unknown>(
        'google-tts',
        {
          text,
          voice: options.voice || DEFAULT_MALE_VOICE,
          speakingRate: options.speakingRate || 1.0,
          pitch: options.pitch || 0,
        },
        () => null
      )
  );

  return asAudio(data);
}

/**
 * Transcribe speech to text via `google-stt`. Returns null when unavailable so
 * the caller can fall back to browser speech recognition or text input.
 */
export async function speechToText(audioBase64: string): Promise<string | null> {
  const data = await invokeEdgeWithFallback<unknown>(
    'google-stt',
    { audio: audioBase64 },
    () => null
  );

  if (typeof data === 'string' && data.trim()) return data;
  if (data && typeof data === 'object') {
    const obj = data as Record<string, any>;
    const transcript = obj.transcript || obj.text;
    if (typeof transcript === 'string' && transcript.trim()) return transcript;
  }
  return null;
}
