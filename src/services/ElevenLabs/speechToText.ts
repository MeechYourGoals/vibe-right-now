
import { ElevenLabsBase, ScribeTranscriptionOptions } from './base';

export class ElevenLabsSpeechToText {
  // Speech to text using Eleven Labs Scribe API (latest ASR model)
  public static async speechToText(
    audioData: ArrayBuffer | Blob,
    options: ScribeTranscriptionOptions = {}
  ): Promise<string | null> {
    const apiKey = ElevenLabsBase.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return null;
    }
    
    try {
      console.log('Processing speech to text with Eleven Labs Scribe, audio size:', 
        audioData instanceof ArrayBuffer ? audioData.byteLength : audioData.size);
      
      // Prepare the audio data
      const formData = new FormData();
      
      if (audioData instanceof Blob) {
        formData.append('file', audioData, 'audio.wav');
      } else {
        const blob = new Blob([audioData], { type: 'audio/wav' });
        formData.append('file', blob, 'audio.wav');
      }
      
      // Add transcription options
      if (options.language) {
        formData.append('language', options.language);
      }
      
      if (options.prompt) {
        formData.append('prompt', options.prompt);
      }

      // Use Scribe API for speech-to-text
      const url = 'https://api.elevenlabs.io/v1/speech-recognition';
      
      console.log('Sending request to Eleven Labs Scribe API');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Eleven Labs Scribe API error response:', errorText);
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(`Eleven Labs Scribe API error: ${errorData.detail || response.statusText}`);
        } catch (e) {
          throw new Error(`Eleven Labs Scribe API error: ${response.statusText} (${response.status})`);
        }
      }
      
      const data = await response.json();
      console.log('Received transcription from Eleven Labs Scribe:', data);
      return data.text || null;
    } catch (error) {
      console.error('Error in Eleven Labs speech-to-text:', error);
      return null;
    }
  }
}
