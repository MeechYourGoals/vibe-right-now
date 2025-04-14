
// OpenRouterService.ts - Handles API calls to OpenRouter

interface CompletionOptions {
  prompt: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

interface SpeechToTextOptions {
  audioBase64: string;
}

interface TextToSpeechOptions {
  text: string;
  voice?: string;
}

export const OpenRouterService = {
  apiKey: "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",
  baseUrl: "https://openrouter.ai/api/v1",

  async getCompletion({
    prompt,
    model = "anthropic/claude-3-haiku",
    max_tokens = 1000,
    temperature = 0.7,
    top_p = 1,
    frequency_penalty = 0,
    presence_penalty = 0
  }: CompletionOptions): Promise<string> {
    try {
      console.log(`Making OpenRouter completion request to model: ${model}`);
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'VibesApp'
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          max_tokens,
          temperature,
          top_p,
          frequency_penalty,
          presence_penalty
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenRouter API error:', errorData);
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('OpenRouter response data:', data);
      
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        return data.choices[0].message.content;
      } else {
        console.error('Unexpected response format from OpenRouter:', data);
        throw new Error('Unexpected response format from OpenRouter');
      }
    } catch (error) {
      console.error('Error in OpenRouterService.getCompletion:', error);
      throw error;
    }
  },

  // Speech-to-text functionality using OpenRouter (via Anthropic's Claude)
  async speechToText({ audioBase64 }: SpeechToTextOptions): Promise<string> {
    try {
      console.log('Processing speech to text with OpenRouter...');
      
      // We'll use Claude to transcribe audio by describing what we hear
      const prompt = `I have an audio recording of someone speaking. Please transcribe exactly what they say, word for word. Don't add any commentary or notes, just provide the verbatim transcription.`;
      
      // For actual implementation, you would need to use an audio model compatible with OpenRouter
      // This is a placeholder that assumes using a model with audio capabilities
      const response = await fetch(`${this.baseUrl}/audio/transcriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'VibesApp'
        },
        body: JSON.stringify({
          file: audioBase64,
          model: "anthropic/claude-3-opus" // Use a model with audio capabilities
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenRouter speech-to-text error:', errorData);
        throw new Error(`Speech-to-text error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.text || '';
    } catch (error) {
      console.error('Error in speech-to-text:', error);
      // Fall back to browser's speech recognition
      return '';
    }
  },

  // Text-to-speech functionality using OpenRouter
  async textToSpeech({ text, voice = 'default' }: TextToSpeechOptions): Promise<string> {
    try {
      console.log('Converting text to speech with OpenRouter...');
      
      // For actual implementation, OpenRouter would need to support TTS
      // This is a placeholder for now
      const response = await fetch(`${this.baseUrl}/audio/speech`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'VibesApp'
        },
        body: JSON.stringify({
          input: text,
          voice: voice,
          model: "anthropic/claude-3-sonnet" // Use a model with TTS capabilities
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenRouter text-to-speech error:', errorData);
        throw new Error(`Text-to-speech error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.audio || '';
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      // Fall back to browser's speech synthesis
      return '';
    }
  }
};
