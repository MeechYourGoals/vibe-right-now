
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

  // Speech-to-text functionality
  async speechToText({ audioBase64 }: SpeechToTextOptions): Promise<string> {
    try {
      console.log('Processing speech to text with OpenRouter...');
      
      // Direct transcription is not yet available via OpenRouter API
      // Instead, we'll use Claude to describe the audio and extract the transcription
      const prompt = `I have an audio recording that needs to be transcribed. 
      Please output ONLY the exact transcription with no additional commentary.
      If you can't determine what is being said with confidence, make your best guess.`;
      
      // Construct message with audio attachment for Claude
      const messages = [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { 
              type: "image", 
              image_url: {
                url: `data:audio/wav;base64,${audioBase64}`
              }
            }
          ]
        }
      ];
      
      // Using Claude-3 Opus for best audio transcription capabilities
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'VibesApp'
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-opus",
          messages: messages,
          max_tokens: 500,
          temperature: 0.2 // Lower temperature for more precise transcription
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenRouter speech-to-text error:', errorData);
        throw new Error(`Speech-to-text error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        // Extract only the transcription from the response
        const content = data.choices[0].message.content;
        
        // Clean up the response to extract just the transcription
        // Removing any explanatory text Claude might add
        const cleanedTranscription = content
          .replace(/^(transcript:|transcription:|here's the transcription:|the transcription is:)/i, '')
          .trim();
        
        return cleanedTranscription;
      }
      
      throw new Error('Failed to get transcription from OpenRouter');
    } catch (error) {
      console.error('Error in speech-to-text:', error);
      return ''; // Return empty string to fall back to browser's speech recognition
    }
  },

  // Text-to-speech functionality
  async textToSpeech({ text, voice = 'default' }: TextToSpeechOptions): Promise<string> {
    try {
      console.log('Converting text to speech...');
      
      // For now, OpenRouter doesn't have a direct TTS API
      // We'll use a workaround by asking Claude to generate a response describing
      // how to synthesize the speech, then parse it for base64 audio data
      
      const prompt = `Please convert this text to speech without any commentary: "${text}"
      If you don't have direct text-to-speech capabilities, please respond with: "TTS_NOT_AVAILABLE"`;
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'VibesApp'
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-sonnet",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Text-to-speech error:', errorData);
        throw new Error(`Text-to-speech error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        const content = data.choices[0].message.content;
        
        if (content.includes('TTS_NOT_AVAILABLE')) {
          console.log('OpenRouter TTS not available, falling back...');
          return '';
        }
        
        // Try to find base64 audio data in the response
        const base64Match = content.match(/data:audio\/[^;]+;base64,([^"]+)/);
        if (base64Match && base64Match[1]) {
          return base64Match[1];
        }
      }
      
      // If we get here, TTS wasn't available or failed
      console.log('No TTS data found in response, falling back...');
      return '';
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      return ''; // Fall back to browser's speech synthesis
    }
  },
  
  // Function to browse the web and extract event information
  async browseWebAndExtractEvents(searchQuery: string, eventType: string): Promise<any[]> {
    try {
      console.log(`Browsing for ${eventType} events: ${searchQuery}`);
      
      let prompt = '';
      let targetSites = '';
      
      if (eventType === 'music') {
        targetSites = 'bandsintown.com, livenation.com, ticketmaster.com';
        prompt = `Search for "${searchQuery}" on ${targetSites} and extract detailed information about upcoming music events.
        Return the results as a JSON array with these fields: id, title, date (ISO format), time, location, ticketUrl, price, imageUrl, description.
        Make the JSON valid and parseable. Return at least 5 events if possible.`;
      } else if (eventType === 'comedy') {
        targetSites = 'punchup.live, ticketmaster.com, livenation.com';
        prompt = `Search for "${searchQuery}" on ${targetSites} and extract detailed information about upcoming comedy shows.
        Return the results as a JSON array with these fields: id, title, comedian, date (ISO format), time, venue, address, price, ticketUrl, imageUrl.
        Make the JSON valid and parseable. Return at least 5 events if possible.`;
      } else if (eventType === 'nightlife') {
        targetSites = 'yelp.com, tripadvisor.com, nightout.com';
        prompt = `Search for "${searchQuery}" on ${targetSites} and extract detailed information about nightlife venues.
        Return the results as a JSON array with these fields: id, name, type, address, city, state, hours, rating, description, imageUrl, website.
        Make the JSON valid and parseable. Return at least 5 venues if possible.`;
      }
      
      if (!prompt) {
        throw new Error('Invalid event type specified');
      }
      
      const response = await this.getCompletion({
        prompt,
        model: "anthropic/claude-3-sonnet",
        max_tokens: 3000,
        temperature: 0.5
      });
      
      if (!response) {
        throw new Error('No response from OpenRouter');
      }
      
      // Extract JSON data from response
      const jsonMatch = response.match(/\[\s*{[\s\S]*}\s*\]/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in the response');
      }
      
      try {
        const events = JSON.parse(jsonMatch[0]);
        console.log(`Successfully extracted ${events.length} ${eventType} events/venues`);
        return events;
      } catch (parseError) {
        console.error(`Error parsing ${eventType} JSON:`, parseError);
        throw new Error(`Failed to parse ${eventType} JSON`);
      }
    } catch (error) {
      console.error('Error in browsing web for events:', error);
      return [];
    }
  }
};

