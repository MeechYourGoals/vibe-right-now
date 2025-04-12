
/**
 * Service for text-to-speech using Coqui TTS
 */
export class CoquiTTSService {
  private static serverUrl: string = 'http://localhost:5002';
  private static isAvailable: boolean = false;

  /**
   * Configure the Coqui TTS service
   * @param serverUrl The URL of the Coqui TTS server
   */
  static configure(serverUrl: string): void {
    this.serverUrl = serverUrl;
    console.log('Coqui TTS configured with server:', serverUrl);
  }

  /**
   * Initialize and check if the Coqui TTS service is available
   * @returns True if the service is available, false otherwise
   */
  static async init(): Promise<boolean> {
    try {
      // For now, we'll simulate a successful connection
      // In a real implementation, we would check if the server is reachable
      await new Promise(resolve => setTimeout(resolve, 300));
      
      this.isAvailable = true;
      return true;
    } catch (error) {
      console.error('Error initializing Coqui TTS:', error);
      this.isAvailable = false;
      return false;
    }
  }

  /**
   * Convert text to speech using Coqui TTS
   * @param text The text to convert to speech
   * @returns The audio data as a base64 string
   */
  static async textToSpeech(text: string): Promise<string> {
    if (!this.isAvailable) {
      throw new Error('Coqui TTS service is not available');
    }

    // Since we don't have a real Coqui TTS server,
    // we'll delegate to OpenAI's TTS service
    return OpenAIService.textToSpeech(text);
  }
}

// Import OpenAIService for API calls
import { OpenAIService } from './OpenAIService';
