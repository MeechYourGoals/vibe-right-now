import { DeepgramBase, DeepgramOptions } from './base';

export class DeepgramTextToSpeech {
  public static async textToSpeech(text: string, options: DeepgramOptions = {}): Promise<ArrayBuffer | null> {
    const apiKey = DeepgramBase.getApiKey();
    if (!apiKey) {
      console.error('Deepgram API key not set');
      return null;
    }

    try {
      const model = options.model || 'aura-asteria-en';
      const url = `https://api.deepgram.com/v1/speak?model=${model}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Deepgram TTS API error: ${errorText}`);
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error in Deepgram text-to-speech:', error);
      return null;
    }
  }
}
