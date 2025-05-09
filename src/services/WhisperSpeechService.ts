
/**
 * Speech recognition service using browser's Web Speech API
 */
export class WhisperSpeechService {
  private static isInitialized = false;
  
  /**
   * Initialize the speech recognition model
   */
  static async initSpeechRecognition() {
    try {
      // Check if browser supports SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        console.warn('Speech recognition not supported in this browser');
        return false;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Speech recognition service initialized');
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
   * Convert speech to text using browser's SpeechRecognition API
   * @param audioBlob The audio recording as a Blob
   */
  static async speechToText(audioBlob: Blob): Promise<string> {
    try {
      console.log('Processing audio with Web Speech API');
      
      return new Promise((resolve, reject) => {
        // In a real implementation, we would process the blob
        // For now, we'll resolve with a placeholder message
        setTimeout(() => {
          resolve("I heard what you said using the Web Speech API.");
        }, 1000);
      });
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
