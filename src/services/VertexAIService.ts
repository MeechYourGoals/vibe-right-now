
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/firebase/config';
import { Message } from '@/components/VernonChat/types';

interface GenerateTextOptions {
  temperature?: number;
  maxTokens?: number;
  topK?: number;
  topP?: number;
  modelVersion?: string;
  safetySettings?: any[];
  mode?: string;
}

interface VertexAIRequest {
  text: string;
  history?: Array<{ role: string; content: string }>;
  options?: GenerateTextOptions;
}

export class VertexAIService {
  // Text generation using Vertex AI (Gemini)
  static async generateText(
    prompt: string,
    history: Array<{ role: string; content: string }> = [],
    options: GenerateTextOptions = {}
  ): Promise<string> {
    try {
      const generateTextFn = httpsCallable<VertexAIRequest, { text: string }>(
        functions, 
        'generateText'
      );
      
      const result = await generateTextFn({
        text: prompt,
        history,
        options
      });
      
      return result.data.text;
    } catch (error) {
      console.error('Error generating text with Vertex AI:', error);
      return "I'm having trouble connecting to my AI services right now. Please try again later.";
    }
  }
  
  // Generate response for Vernon Chat
  static async generateResponse(
    prompt: string,
    mode: 'venue' | 'default' = 'default',
    messages: Message[] = []
  ): Promise<string> {
    try {
      // Convert messages to the format expected by Vertex AI
      const history = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      
      // Call generateText with the mode option
      return await VertexAIService.generateText(prompt, history, { 
        mode,
        temperature: mode === 'venue' ? 0.3 : 0.7 // More precise for business data
      });
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble processing your request right now.";
    }
  }
  
  // Search with Vertex AI for more context-aware results
  static async searchWithVertex(
    query: string, 
    options: { city?: string; category?: string } = {}
  ): Promise<string> {
    try {
      const searchFn = httpsCallable<
        { query: string; options: any },
        { text: string }
      >(functions, 'vertexSearch');
      
      const result = await searchFn({
        query,
        options: {
          ...options,
          searchMode: true
        }
      });
      
      return result.data.text;
    } catch (error) {
      console.error('Error in Vertex AI search:', error);
      return "I couldn't find specific information about that. Could you try asking in a different way?";
    }
  }
  
  // Speech to text using Vertex AI Speech API
  static async speechToText(audioBase64: string): Promise<string> {
    try {
      const speechToTextFn = httpsCallable<{ audio: string }, { transcript: string }>(
        functions,
        'speechToText'
      );
      
      const result = await speechToTextFn({ audio: audioBase64 });
      
      return result.data.transcript;
    } catch (error) {
      console.error('Error in speech to text conversion:', error);
      return '';
    }
  }
  
  // Text to speech using Vertex AI Text-to-Speech API
  static async textToSpeech(
    text: string,
    options: { voice?: string; speakingRate?: number; pitch?: number } = {}
  ): Promise<string> {
    try {
      const textToSpeechFn = httpsCallable<
        { text: string; options: any },
        { audioContent: string }
      >(functions, 'textToSpeech');
      
      const result = await textToSpeechFn({
        text,
        options: {
          voice: options.voice || 'en-US-Neural2-D',
          speakingRate: options.speakingRate || 1.0,
          pitch: options.pitch || 0
        }
      });
      
      return result.data.audioContent;
    } catch (error) {
      console.error('Error in text to speech conversion:', error);
      return '';
    }
  }
}

// Create an adapter to maintain compatibility with existing code
export const OpenAIService = {
  sendChatRequest: async (messages: any[], options: any = {}) => {
    try {
      const latestMessage = messages[messages.length - 1];
      const prompt = latestMessage.content;
      
      const history = messages.slice(0, -1).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const mode = options.context === 'venue' ? 'venue' : 'default';
      
      return await VertexAIService.generateText(prompt, history, { mode });
    } catch (error) {
      console.error('Error in sendChatRequest:', error);
      return "I'm sorry, I encountered an error processing your request.";
    }
  },
  speechToText: VertexAIService.speechToText,
  textToSpeech: VertexAIService.textToSpeech
};
