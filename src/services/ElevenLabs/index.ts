
import { ElevenLabsBase } from './base';
import { ElevenLabsTextToSpeech } from './textToSpeech';
import { ElevenLabsSpeechToText } from './speechToText';
import { ElevenLabsVoiceManagement } from './voiceManagement';
import { ElevenLabsAgentCapabilities } from './agentCapabilities';

// Combine all functionality into a single service class
export class ElevenLabsService {
  // Re-export the base methods
  public static setApiKey = ElevenLabsBase.setApiKey;
  public static getApiKey = ElevenLabsBase.getApiKey;
  public static clearApiKey = ElevenLabsBase.clearApiKey;
  public static hasApiKey = ElevenLabsBase.hasApiKey;
  public static getDefaultVoiceId = ElevenLabsBase.getDefaultVoiceId;
  
  // Re-export text-to-speech functionality
  public static textToSpeech = ElevenLabsTextToSpeech.textToSpeech;
  
  // Re-export speech-to-text functionality
  public static speechToText = ElevenLabsSpeechToText.speechToText;
  
  // Re-export voice management functionality
  public static getVoices = ElevenLabsVoiceManagement.getVoices;
  public static getVoice = ElevenLabsVoiceManagement.getVoice;
  
  // Re-export agent capabilities
  public static createAgentTask = ElevenLabsAgentCapabilities.createAgentTask;
  public static getSignedUrl = ElevenLabsAgentCapabilities.getSignedUrl;
  public static getAgentInfo = ElevenLabsAgentCapabilities.getAgentInfo;
}

// Re-export types
export type { ElevenLabsOptions, ScribeTranscriptionOptions } from './base';
export type { VoiceInfo } from './voiceManagement';
export type { AgentTaskRequest, AgentTaskResponse } from './agentCapabilities';
