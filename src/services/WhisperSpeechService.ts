
import { pipeline, type ProgressCallback } from '@huggingface/transformers';
import { createAudioElement } from '@/components/VernonChat/hooks/speechSynthesis/speechSynthesisUtils';

// Store models and initialization state
let speechRecognitionModel = null;
let speechSynthesisVoice = null;
let modelLoadingPromise = null;
let audioElement = null;

interface TextToSpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export class WhisperSpeechService {
  // Check if browser supports the required APIs for Whisper
  public static isAvailable(): boolean {
    try {
      // Check if we have the required browser APIs for audio recording and processing
      return !!(
        navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia &&
        window.AudioContext &&
        window.MediaRecorder
      );
    } catch (error) {
      console.error('Error checking Whisper availability:', error);
      return false;
    }
  }
  
  // Initialize speech recognition model (only once)
  public static async initSpeechRecognition(): Promise<any> {
    // If already initialized or initializing, return existing promise
    if (speechRecognitionModel) {
      return Promise.resolve(speechRecognitionModel);
    }
    
    if (modelLoadingPromise) {
      return modelLoadingPromise;
    }
    
    try {
      console.log('Initializing speech recognition model');
      
      // Create pipeline for speech recognition using Whisper
      modelLoadingPromise = pipeline(
        'automatic-speech-recognition',
        'onnx-community/whisper-tiny.en',
        { 
          progress_callback: ((progressInfo: any) => {
            if (typeof progressInfo === 'number') {
              console.log(`Loading model: ${Math.round(progressInfo * 100)}%`);
            } else if (progressInfo && typeof progressInfo.progress === 'number') {
              console.log(`Loading model: ${Math.round(progressInfo.progress * 100)}%`);
            } else {
              console.log('Loading model:', progressInfo);
            }
          }) as ProgressCallback
        }
      );
      
      speechRecognitionModel = await modelLoadingPromise;
      console.log('Whisper model initialized successfully');
      return speechRecognitionModel;
    } catch (error) {
      console.error('Error initializing speech recognition model:', error);
      modelLoadingPromise = null;
      throw error;
    }
  }
  
  // Initialize voices array
  public static async initVoices(): Promise<any[]> {
    try {
      // For simplicity, we'll just use browser's built-in voices
      if ('speechSynthesis' in window) {
        // Force voice loading
        window.speechSynthesis.getVoices();
        
        return new Promise((resolve) => {
          // Wait for voices to load
          setTimeout(() => {
            const voices = window.speechSynthesis.getVoices();
            resolve(voices);
          }, 100);
        });
      }
      return [];
    } catch (error) {
      console.error('Error initializing voices:', error);
      return [];
    }
  }
  
  // Create audio element for playback if it doesn't exist
  private static getAudioElement(): HTMLAudioElement {
    if (!audioElement) {
      audioElement = new Audio();
    }
    return audioElement;
  }
  
  // Coqui TTS integration for text-to-speech
  public static textToSpeech(text: string, options: TextToSpeechOptions = {}): Promise<boolean> {
    return new Promise((resolve) => {
      if (!text || text.trim() === '') {
        resolve(false);
        return;
      }
      
      try {
        // Get or create audio element
        const audio = this.getAudioElement();
        
        // Encode text for URL
        const encodedText = encodeURIComponent(text);
        
        // URL for the Coqui TTS server - using localhost for development
        // In production, this would be your hosted Coqui TTS server URL
        const ttsServerUrl = 'http://localhost:5002/api/tts';
        
        // Create URL with text parameter
        const requestUrl = `${ttsServerUrl}?text=${encodedText}`;
        
        // Setup event handlers
        audio.onplay = () => {
          console.log('Playing audio from Coqui TTS');
        };
        
        audio.onended = () => {
          console.log('Coqui TTS audio playback completed');
          resolve(true);
        };
        
        audio.onerror = (error) => {
          console.error('Error playing Coqui TTS audio:', error);
          // Fall back to browser speech synthesis on error
          this.fallbackToBrowserSpeech(text, options);
          resolve(false);
        };
        
        // Make request to Coqui TTS server
        fetch(requestUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Coqui TTS server error: ${response.status}`);
            }
            return response.blob();
          })
          .then(audioBlob => {
            const audioUrl = URL.createObjectURL(audioBlob);
            audio.src = audioUrl;
            audio.play().catch(error => {
              console.error('Error playing audio:', error);
              this.fallbackToBrowserSpeech(text, options);
              resolve(false);
            });
          })
          .catch(error => {
            console.error('Error fetching from Coqui TTS server:', error);
            // Fall back to browser speech synthesis
            this.fallbackToBrowserSpeech(text, options);
            resolve(false);
          });
      } catch (error) {
        console.error('Error in Coqui TTS:', error);
        // Fall back to browser speech synthesis
        this.fallbackToBrowserSpeech(text, options);
        resolve(false);
      }
    });
  }
  
  // Fallback to browser's built-in speech synthesis
  private static fallbackToBrowserSpeech(text: string, options: TextToSpeechOptions = {}): void {
    console.log('Falling back to browser speech synthesis');
    
    if (!('speechSynthesis' in window)) {
      console.error('Browser speech synthesis not supported');
      return;
    }
    
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply options
      if (options.rate) utterance.rate = options.rate;
      if (options.pitch) utterance.pitch = options.pitch;
      if (options.volume) utterance.volume = options.volume;
      
      // Select a voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        // Try to find a good English voice
        const preferredVoice = voices.find(voice => 
          voice.lang.includes('en-') && 
          (voice.name.includes('Google') || voice.name.includes('Female'))
        );
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }
      
      // Speak the text
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error in browser speech fallback:', error);
    }
  }
  
  // Method to transcribe audio blobs (for local Whisper integration)
  // This is the method we're adding to fix the error
  public static async speechToText(audioBlob: Blob): Promise<string> {
    return this.transcribeAudio(audioBlob);
  }
  
  // Method to transcribe audio blobs (for local Whisper integration)
  public static async transcribeAudio(audioBlob: Blob): Promise<string> {
    try {
      // Make sure model is initialized
      if (!speechRecognitionModel) {
        await this.initSpeechRecognition();
      }
      
      // Process audio with Whisper
      const result = await speechRecognitionModel(audioBlob);
      return result.text || '';
    } catch (error) {
      console.error('Error transcribing audio with Whisper:', error);
      return '';
    }
  }
}
