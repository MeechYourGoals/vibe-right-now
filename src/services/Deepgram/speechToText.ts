import { DeepgramBase, DeepgramOptions } from './base';

export class DeepgramSpeechToText {
  public static async speechToText(audioData: ArrayBuffer | Blob, options: DeepgramOptions = {}): Promise<string | null> {
    const apiKey = DeepgramBase.getApiKey();
    if (!apiKey) {
      console.error('Deepgram API key not set');
      return null;
    }

    try {
      const model = options.model || 'nova-3';
      const language = options.language || 'en-US';
      const url = `https://api.deepgram.com/v1/listen?model=${model}&language=${language}`;

      const body = audioData instanceof Blob ? audioData : new Blob([audioData]);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': body.type || 'audio/wav'
        },
        body
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Deepgram STT API error: ${errorText}`);
      }

      const data = await response.json();
      return data.results?.channels?.[0]?.alternatives?.[0]?.transcript || null;
    } catch (error) {
      console.error('Error in Deepgram speech-to-text:', error);
      return null;
    }
  }
}
