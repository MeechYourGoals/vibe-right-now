
import { VertexAIService } from './VertexAIService';

/**
 * Whisper Speech Service that proxies through Google Speech-to-Text
 * Maintains backward compatibility while using Google ecosystem
 */
export class WhisperSpeechService {
  private static isInitialized = false;
  
  /**
   * Initialize the speech recognition (now using Google STT)
   */
  static async initSpeechRecognition() {
    try {
      // Check if browser supports SpeechRecognition as fallback
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        console.warn('Speech recognition not supported in this browser, using Google STT');
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Whisper proxy: Google Speech-to-Text service initialized');
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      return false;
    }
  }
  
  /**
   * Check if the service is initialized
   */
  static isAvailable() {
    if (!this.isInitialized) {
      // Try to initialize if not already initialized
      this.initSpeechRecognition().catch(console.error);
    }
    return this.isInitialized;
  }

  /**
   * Convert speech to text using Google Speech-to-Text API
   * @param audioBlob The audio recording as a Blob
   */
  static async speechToText(audioBlob: Blob): Promise<string> {
    try {
      console.log('Whisper proxy: Processing audio with Google Speech-to-Text');
      
      // Convert blob to base64
      const base64Audio = await this.blobToBase64(audioBlob);
      
      // Use Vertex AI service
      const result = await VertexAIService.speechToText(base64Audio);
      
      return result || "Could not transcribe audio.";
    } catch (error) {
      console.error('Error in speech-to-text:', error);
      throw error;
    }
  }

  /**
   * Helper method to convert blob to base64
   */
  private static blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Extract the base64 data without the data URL prefix
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
