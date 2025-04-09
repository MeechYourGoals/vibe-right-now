
import { pipeline } from '@huggingface/transformers';

// Cache for initialized models to prevent reloading
let speechRecognitionModel = null;
let speechSynthesisVoice = null;
let modelLoadingPromise = null;

interface TextToSpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export class WhisperSpeechService {
  // Initialize speech recognition model (only once)
  public static async initSpeechRecognition() {
    try {
      if (speechRecognitionModel) {
        return speechRecognitionModel;
      }
      
      if (modelLoadingPromise) {
        return await modelLoadingPromise;
      }
      
      console.log('Initializing Whisper speech recognition model...');
      modelLoadingPromise = pipeline(
        'automatic-speech-recognition',
        'onnx-community/whisper-tiny.en',
        { progress_callback: (progress: number) => console.log(`Loading model: ${Math.round(progress * 100)}%`) }
      );
      
      speechRecognitionModel = await modelLoadingPromise;
      modelLoadingPromise = null;
      console.log('Whisper speech recognition model loaded successfully');
      
      return speechRecognitionModel;
    } catch (error) {
      console.error('Error initializing Whisper speech recognition:', error);
      modelLoadingPromise = null;
      throw error;
    }
  }
  
  // Convert speech to text using Whisper
  public static async speechToText(audioBlob: Blob): Promise<string> {
    try {
      console.log('Processing speech with Whisper...');
      const model = await this.initSpeechRecognition();
      
      // Convert blob to correct format
      const audioArrayBuffer = await audioBlob.arrayBuffer();
      
      // Transcribe audio using Whisper
      const result = await model(audioArrayBuffer, {
        chunk_length_s: 30,
        stride_length_s: 5,
        language: 'en',
        return_timestamps: false
      });
      
      console.log('Whisper transcription result:', result);
      return result.text || '';
    } catch (error) {
      console.error('Error in Whisper speech-to-text:', error);
      return '';
    }
  }
  
  // Use browser's built-in speech synthesis for text-to-speech
  public static textToSpeech(text: string, options: TextToSpeechOptions = {}): Promise<boolean> {
    return new Promise((resolve) => {
      if (!text || text.trim() === '') {
        resolve(false);
        return;
      }
      
      if (!('speechSynthesis' in window)) {
        console.error('Speech synthesis not supported in this browser');
        resolve(false);
        return;
      }
      
      try {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        // Create new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set a nice male voice if available
        if (!speechSynthesisVoice) {
          const voices = window.speechSynthesis.getVoices();
          speechSynthesisVoice = voices.find(
            (voice) => (
              voice.name.includes('Male') || 
              voice.name.includes('Daniel') || 
              voice.name.includes('David') ||
              voice.name.includes('Mark')
            ) && voice.lang.includes('en')
          ) || voices.find(voice => voice.lang.includes('en'));
        }
        
        if (speechSynthesisVoice) {
          utterance.voice = speechSynthesisVoice;
        }
        
        // Configure speech properties
        utterance.rate = options.rate || 1.0;
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume || 1.0;
        
        // Setup callbacks
        utterance.onend = () => {
          resolve(true);
        };
        
        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          resolve(false);
        };
        
        // Start speaking
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Error with browser speech synthesis:', error);
        resolve(false);
      }
    });
  }
  
  // Helper function to initialize voice list
  public static initVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve([]);
        return;
      }
      
      // Get voices on load
      const getVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          resolve(voices);
        } else {
          setTimeout(getVoices, 100);
        }
      };
      
      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = getVoices;
      }
      
      // Try immediately in case voices are already loaded
      getVoices();
    });
  }
  
  // Check if the service is available in this browser
  public static isAvailable(): boolean {
    return 'speechSynthesis' in window && window.AudioContext !== undefined;
  }
}
