
// Core Deepgram service for text-to-speech and speech-to-text functionality
export class DeepgramService {
  private static apiKey: string | null = null;
  private static defaultApiKey: string = 'a615f48b1cfac2c90654240a126e3cbbb05fdc5f';
  
  // Set API key
  public static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('deepgramApiKey', apiKey);
  }
  
  // Get API key from local storage if available, or use default
  public static getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('deepgramApiKey') || this.defaultApiKey;
      
      if (this.apiKey === this.defaultApiKey && !localStorage.getItem('deepgramApiKey')) {
        localStorage.setItem('deepgramApiKey', this.defaultApiKey);
      }
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

  // Text to speech conversion using Deepgram Aura
  public static async textToSpeech(text: string, voice: string = 'aura-asteria-en'): Promise<ArrayBuffer | null> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      console.error('Deepgram API key not set');
      return null;
    }
    
    try {
      console.log(`Converting text to speech with Deepgram Aura voice: ${voice}`);
      
      const response = await fetch('https://api.deepgram.com/v1/speak?model=aura-asteria-en', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text.length > 500 ? text.substring(0, 500) + '...' : text
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.warn('Deepgram TTS API error:', errorText);
        return null;
      }
      
      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error in Deepgram text-to-speech:', error);
      return null;
    }
  }

  // Speech to text conversion using Deepgram Nova-2
  public static async speechToText(audioData: ArrayBuffer | Blob): Promise<string | null> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      console.error('Deepgram API key not set');
      return null;
    }
    
    try {
      console.log('Processing speech to text with Deepgram Nova-2');
      
      const response = await fetch('https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'audio/wav'
        },
        body: audioData
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Deepgram STT API error:', errorText);
        return null;
      }
      
      const data = await response.json();
      return data.results?.channels[0]?.alternatives[0]?.transcript || null;
    } catch (error) {
      console.error('Error in Deepgram speech-to-text:', error);
      return null;
    }
  }
}
