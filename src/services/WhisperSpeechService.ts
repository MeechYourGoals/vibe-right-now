
// Speech recognition service using Google's Speech-to-Text API
export class WhisperSpeechService {
  private static isInitialized = false;
  
  /**
   * Initialize the speech recognition model
   */
  static async initSpeechRecognition() {
    // In a real implementation, this would load any necessary models
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('WhisperSpeechService initialized (using Google Speech-to-Text)');
    this.isInitialized = true;
    return true;
  }
  
  /**
   * Check if the service is initialized
   */
  static isAvailable() {
    return this.isInitialized;
  }

  /**
   * Convert speech to text using Google Speech-to-Text
   * @param audioBlob The audio recording as a Blob
   */
  static async speechToText(audioBlob: Blob): Promise<string> {
    try {
      console.log('Processing audio with Google Speech-to-Text');
      // Convert blob to base64
      const base64Audio = await this.blobToBase64(audioBlob);
      
      // Call our service to handle the API request
      return await GoogleSpeechService.speechToText(base64Audio);
    } catch (error) {
      console.error('Error in Google speech-to-text:', error);
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

// Import GoogleSpeechService to use for API calls
import { GoogleSpeechService } from './GoogleSpeechService';
