
import { supabase } from '@/integrations/supabase/client';

const OPENAI_CHAT_ENDPOINT = 'https://yiitqkjrbskxumriujrh.functions.supabase.co/openai-chat';
const OPENAI_SPEECH_ENDPOINT = 'https://yiitqkjrbskxumriujrh.functions.supabase.co/openai-speech';

interface ChatOptions {
  model?: string;
  stream?: boolean;
  context?: 'user' | 'venue';
}

export const OpenAIService = {
  /**
   * Send a chat request to OpenAI
   */
  async sendChatRequest(messages: Array<{ role: string; content: string }>, options: ChatOptions = {}) {
    try {
      const { model = 'gpt-4o-mini', stream = false, context = 'user' } = options;
      console.log('Sending chat request to OpenAI:', { messages, model, stream, context });
      
      const response = await fetch(OPENAI_CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          model,
          stream,
          context
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Handle streaming responses
      if (stream) {
        return response;
      }

      // Handle regular responses
      const data = await response.json();
      return data.response.choices[0].message.content;
    } catch (error) {
      console.error('Error in OpenAIService.sendChatRequest:', error);
      throw error;
    }
  },

  /**
   * Convert speech to text using OpenAI's Whisper model
   */
  async speechToText(audioBase64: string): Promise<string> {
    try {
      console.log('Converting speech to text...');
      
      const response = await fetch(OPENAI_SPEECH_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'speech-to-text',
          audio: audioBase64,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Error in OpenAIService.speechToText:', error);
      throw error;
    }
  },

  /**
   * Convert text to speech using OpenAI's TTS model
   */
  async textToSpeech(text: string): Promise<string> {
    try {
      console.log('Converting text to speech...');
      
      const response = await fetch(OPENAI_SPEECH_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'text-to-speech',
          text,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.audio;
    } catch (error) {
      console.error('Error in OpenAIService.textToSpeech:', error);
      throw error;
    }
  }
};
