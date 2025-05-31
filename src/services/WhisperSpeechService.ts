
import { VertexAIService } from './VertexAIService';

/**
 * Speech recognition service, now proxied to VertexAIService.
 * Original Web Speech API integration parts have been removed.
 */
export class WhisperSpeechService {

  /**
   * Convert speech to text using VertexAIService.
   * @param audioBlob The audio recording as a Blob
   */
  static async speechToText(audioBlob: Blob): Promise<string> {
    try {
      console.log(`WhisperSpeechService.speechToText called, redirecting to VertexAIService. Blob type: ${audioBlob.type}`);
      
      const base64Audio = await this.blobToBase64(audioBlob);
      if (!base64Audio) {
        throw new Error("Failed to convert audio blob to base64.");
      }

      const sttOptions: { audioEncoding?: string; languageCode?: string; sampleRateHertz?: number } = {};
      
      // Determine audio encoding from blob type
      // VertexAIService STT function defaults to 'WEBM_OPUS' if no options.audioEncoding is given.
      // The Google STT API supports various encodings.
      // Common browser recording formats:
      // - audio/webm;codecs=opus  -> WEBM_OPUS
      // - audio/ogg;codecs=opus   -> OGG_OPUS
      // - audio/wav               -> WAV (or LINEAR16 if we are sure about PCM content)
      // - audio/mp3               -> MP3
      
      if (audioBlob.type.startsWith('audio/webm')) {
        sttOptions.audioEncoding = 'WEBM_OPUS';
      } else if (audioBlob.type.startsWith('audio/ogg')) {
        sttOptions.audioEncoding = 'OGG_OPUS';
      } else if (audioBlob.type.startsWith('audio/wav')) {
        sttOptions.audioEncoding = 'WAV';
        // For WAV, sampleRateHertz is often important if not in header or if API requires it.
        // However, Google STT API is often good at detecting from WAV header.
        // We could try to parse WAV header for sampleRateHertz or make it an option.
        // For now, we'll rely on API's auto-detection or a common default if we had one.
        // sttOptions.sampleRateHertz = 48000; // Example, if known
      } else if (audioBlob.type === 'audio/mp3' || audioBlob.type === 'audio/mpeg') {
        sttOptions.audioEncoding = 'MP3';
      } else if (audioBlob.type) { // If type is present but not explicitly handled
        console.warn(`Unsupported audio type: ${audioBlob.type}. Attempting with VertexAI's default encoding.`);
      }
      // languageCode will use VertexAIService's default ('en-US')

      const transcript = await VertexAIService.speechToText(base64Audio, sttOptions);
      return transcript || ""; // Ensure string return type, as original signature expects
    } catch (error) {
      console.error('Error in WhisperSpeechService.speechToText (proxied to VertexAI):', error);
      return ""; // Return empty string on error, as per original signature's implication
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
        if (base64Data) {
          resolve(base64Data);
        } else {
          // This can happen if the blob is empty or reader.result is not a valid data URL
          reject(new Error("Could not extract base64 data from blob."));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  }
}
