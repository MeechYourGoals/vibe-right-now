
// Eleven Labs API integration
// This service handles text-to-speech and speech-to-text conversion using Eleven Labs API

interface ElevenLabsOptions {
  voice_id?: string;
  model_id?: string;
  voice_settings?: {
    stability: number;
    similarity_boost: number;
  };
}

interface ScribeTranscriptionOptions {
  prompt?: string;
  language?: string;
  expected_format?: string;
  chunk_size?: number;
}

export class ElevenLabsService {
  private static apiKey: string | null = null;
  private static defaultApiKey: string = 'sk_236c24971a353bfa897b2c150b2d256ae65e352b405e3e4f';
  
  // Set API key
  public static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('elevenLabsApiKey', apiKey);
  }
  
  // Get API key from local storage if available, or use default
  public static getApiKey(): string | null {
    if (!this.apiKey) {
      // Try to get from localStorage first
      this.apiKey = localStorage.getItem('elevenLabsApiKey') || this.defaultApiKey;
      
      // If still no key, save the default key
      if (this.apiKey === this.defaultApiKey && !localStorage.getItem('elevenLabsApiKey')) {
        localStorage.setItem('elevenLabsApiKey', this.defaultApiKey);
      }
    }
    return this.apiKey;
  }
  
  // Clear API key
  public static clearApiKey() {
    this.apiKey = null;
    localStorage.removeItem('elevenLabsApiKey');
  }
  
  // Check if API key is available
  public static hasApiKey(): boolean {
    return !!this.getApiKey();
  }
  
  // Text to speech conversion
  public static async textToSpeech(
    text: string, 
    options: ElevenLabsOptions = {}
  ): Promise<ArrayBuffer | null> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return null;
    }
    
    try {
      // Default options - using premium voices
      const defaultVoiceId = 'pNInz6obpgDQGcFmaJgB'; // Adam voice
      const defaultModel = 'eleven_multilingual_v2';
      
      const voiceId = options.voice_id || defaultVoiceId;
      const modelId = options.model_id || defaultModel;
      
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      
      console.log(`Converting text to speech with voice ID ${voiceId} and model ${modelId}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          voice_settings: options.voice_settings || {
            stability: 0.6,
            similarity_boost: 0.85
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Eleven Labs API error: ${errorData.detail || response.statusText}`);
      }
      
      // Return audio as ArrayBuffer
      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error in Eleven Labs text-to-speech:', error);
      return null;
    }
  }
  
  // Speech to text using Eleven Labs Scribe API (latest ASR model)
  public static async speechToText(
    audioData: ArrayBuffer | Blob,
    options: ScribeTranscriptionOptions = {}
  ): Promise<string | null> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return null;
    }
    
    try {
      console.log('Processing speech to text with Eleven Labs Scribe, audio size:', 
        audioData instanceof ArrayBuffer ? audioData.byteLength : audioData.size);
      
      // Prepare the audio data
      const formData = new FormData();
      
      if (audioData instanceof Blob) {
        formData.append('file', audioData, 'audio.wav');
      } else {
        const blob = new Blob([audioData], { type: 'audio/wav' });
        formData.append('file', blob, 'audio.wav');
      }
      
      // Add transcription options
      if (options.language) {
        formData.append('language', options.language);
      }
      
      if (options.prompt) {
        formData.append('prompt', options.prompt);
      }

      // Use Scribe API for speech-to-text
      const url = 'https://api.elevenlabs.io/v1/speech-recognition';
      
      console.log('Sending request to Eleven Labs Scribe API');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Eleven Labs Scribe API error response:', errorText);
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(`Eleven Labs Scribe API error: ${errorData.detail || response.statusText}`);
        } catch (e) {
          throw new Error(`Eleven Labs Scribe API error: ${response.statusText} (${response.status})`);
        }
      }
      
      const data = await response.json();
      console.log('Received transcription from Eleven Labs Scribe:', data);
      return data.text || null;
    } catch (error) {
      console.error('Error in Eleven Labs speech-to-text:', error);
      return null;
    }
  }
  
  // Get available voices
  public static async getVoices(): Promise<any[]> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return [];
    }
    
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Eleven Labs API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Error fetching Eleven Labs voices:', error);
      return [];
    }
  }
  
  // Agent capabilities (similar to Nova Act protocol)
  public static async createAgentTask(
    task: string,
    contextData: object = {}
  ): Promise<object | null> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return null;
    }
    
    try {
      // Implementation for agent tasks - using the Eleven Labs Agents API
      console.log('Creating agent task:', task, contextData);
      
      // Mock implementation - in production, this would call the Eleven Labs Agents API
      return {
        status: 'pending',
        task_id: `task_${Date.now()}`,
        message: 'Agent task has been created and is being processed'
      };
    } catch (error) {
      console.error('Error creating agent task:', error);
      return null;
    }
  }
}
