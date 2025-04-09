
/**
 * Service to interact with a Coqui TTS server
 */

// Default server URL - can be configured based on deployment environment
const DEFAULT_SERVER_URL = 'http://localhost:5002';

export const CoquiTTSService = {
  // Server URL can be configured at runtime
  serverUrl: DEFAULT_SERVER_URL,
  
  /**
   * Configure the service with a custom server URL
   */
  configure(serverUrl: string): void {
    this.serverUrl = serverUrl;
  },
  
  /**
   * Check if the Coqui TTS server is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      // Try to connect to the server's health endpoint if available
      // or just attempt a simple HEAD request
      const response = await fetch(`${this.serverUrl}/api/health`, {
        method: 'HEAD',
        // Short timeout to avoid long waits
        signal: AbortSignal.timeout(2000),
      });
      return response.ok;
    } catch (error) {
      console.error('Coqui TTS server availability check failed:', error);
      return false;
    }
  },
  
  /**
   * Convert text to speech using Coqui TTS server
   * 
   * @param text The text to convert to speech
   * @returns A promise that resolves to true if successful
   */
  async textToSpeech(text: string): Promise<boolean> {
    try {
      if (!text || text.trim() === '') {
        console.warn('Empty text provided to Coqui TTS');
        return false;
      }
      
      console.log('Converting text to speech with Coqui TTS:', text);
      
      // Make the API call to the Coqui TTS server
      const response = await fetch(`${this.serverUrl}/api/tts?text=${encodeURIComponent(text)}`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`Coqui TTS server responded with status: ${response.status}`);
      }
      
      // Get the audio blob from the response
      const audioBlob = await response.blob();
      
      if (!audioBlob || audioBlob.size === 0) {
        throw new Error('Received empty audio data from Coqui TTS server');
      }
      
      // Create a URL for the audio blob
      const audioURL = URL.createObjectURL(audioBlob);
      
      // Create and play the audio element
      const audio = new Audio(audioURL);
      
      // Set up event handlers
      return new Promise((resolve) => {
        audio.onended = () => {
          // Clean up the URL object when done
          URL.revokeObjectURL(audioURL);
          console.log('Coqui TTS audio playback complete');
          resolve(true);
        };
        
        audio.onerror = (error) => {
          console.error('Error playing Coqui TTS audio:', error);
          URL.revokeObjectURL(audioURL);
          resolve(false);
        };
        
        // Start playback
        audio.play().catch((error) => {
          console.error('Failed to play Coqui TTS audio:', error);
          URL.revokeObjectURL(audioURL);
          resolve(false);
        });
      });
    } catch (error) {
      console.error('Error with Coqui TTS text-to-speech:', error);
      return false;
    }
  },
  
  /**
   * Initialize the service and pre-warm connections
   */
  async init(): Promise<boolean> {
    try {
      // Check if server is available
      const available = await this.isAvailable();
      
      if (available) {
        console.log('Coqui TTS server is available at:', this.serverUrl);
      } else {
        console.warn('Coqui TTS server is not available. Speech synthesis will use browser fallback.');
      }
      
      return available;
    } catch (error) {
      console.error('Error initializing Coqui TTS service:', error);
      return false;
    }
  }
};
