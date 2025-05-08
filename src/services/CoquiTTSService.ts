
/**
 * Service for text-to-speech using Coqui TTS (fallback to Web Speech API)
 */
export class CoquiTTSService {
  private static available = false;
  private static initialized = false;

  /**
   * Initialize the Coqui TTS service
   * @returns Whether the service is available
   */
  static async init(): Promise<boolean> {
    if (this.initialized) {
      return this.available;
    }
    
    try {
      // Check if Web Speech API is available for fallback
      if ('speechSynthesis' in window) {
        console.log('Web Speech API available for fallback TTS');
        this.initialized = true;
        return true;
      } else {
        console.warn('Web Speech API not available for fallback TTS');
        this.initialized = true;
        this.available = false;
        return false;
      }
    } catch (error) {
      console.error('Error initializing Coqui TTS service:', error);
      this.initialized = true;
      this.available = false;
      return false;
    }
  }

  /**
   * Convert text to speech
   * @param text Text to convert to speech
   * @param options Options for text-to-speech
   * @returns Audio data as base64 string
   */
  static async textToSpeech(
    text: string,
    options: { voice?: string; rate?: number; pitch?: number } = {}
  ): Promise<string> {
    await this.init();
    
    try {
      // Fall back to Web Speech API
      if ('speechSynthesis' in window) {
        return new Promise((resolve, reject) => {
          const utterance = new SpeechSynthesisUtterance(text);
          
          // Set options if provided
          if (options.voice) {
            const voices = window.speechSynthesis.getVoices();
            const voice = voices.find(v => v.name === options.voice);
            if (voice) utterance.voice = voice;
          }
          
          if (options.rate) utterance.rate = options.rate;
          if (options.pitch) utterance.pitch = options.pitch;
          
          utterance.onend = () => resolve('speech-completed');
          utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));
          
          window.speechSynthesis.speak(utterance);
        });
      }
      
      throw new Error('No text-to-speech service available');
    } catch (error) {
      console.error('Error in Coqui TTS service:', error);
      throw error;
    }
  }
}
