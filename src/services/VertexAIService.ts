
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/firebase/config';

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
  
  // Send chat request to Vertex AI
  static async sendChatRequest(
    messages: Array<{ role: string; content: string }>,
    options: { context?: string; model?: string } = {}
  ): Promise<string> {
    try {
      const chatCompletionFn = httpsCallable<
        { messages: any[]; options: any },
        { text: string }
      >(functions, 'chatCompletion');
      
      const result = await chatCompletionFn({
        messages,
        options: {
          model: options.model || 'gemini-1.5-pro',
          context: options.context || 'user'
        }
      });
      
      return result.data.text;
    } catch (error) {
      console.error('Error in chat completion:', error);
      return "I'm sorry, I encountered an error processing your request. Please try again.";
    }
  }
  
  // Content moderation using Vertex AI Content API
  static async moderateContent(text: string): Promise<{
    isFlagged: boolean;
    categories: Record<string, number>;
  }> {
    try {
      const moderateContentFn = httpsCallable<
        { text: string },
        { isFlagged: boolean; categories: Record<string, number> }
      >(functions, 'moderateContent');
      
      const result = await moderateContentFn({ text });
      
      return result.data;
    } catch (error) {
      console.error('Error in content moderation:', error);
      return { isFlagged: false, categories: {} };
    }
  }
  
  // Vector search for similar content
  static async vectorSearch(
    query: string,
    collection: string,
    limit: number = 5
  ): Promise<any[]> {
    try {
      const vectorSearchFn = httpsCallable<
        { query: string; collection: string; limit: number },
        { results: any[] }
      >(functions, 'vectorSearch');
      
      const result = await vectorSearchFn({
        query,
        collection,
        limit
      });
      
      return result.data.results;
    } catch (error) {
      console.error('Error in vector search:', error);
      return [];
    }
  }
}

// Create an adapter to maintain compatibility with existing OpenAIService calls
export const OpenAIService = {
  sendChatRequest: VertexAIService.sendChatRequest,
  speechToText: VertexAIService.speechToText,
  textToSpeech: VertexAIService.textToSpeech
};
