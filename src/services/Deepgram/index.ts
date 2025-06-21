import { DeepgramBase } from './base';
import { DeepgramTextToSpeech } from './textToSpeech';
import { DeepgramSpeechToText } from './speechToText';

export class DeepgramService {
  public static setApiKey = DeepgramBase.setApiKey;
  public static getApiKey = DeepgramBase.getApiKey;
  public static clearApiKey = DeepgramBase.clearApiKey;
  public static hasApiKey = DeepgramBase.hasApiKey;

  public static textToSpeech = DeepgramTextToSpeech.textToSpeech;
  public static speechToText = DeepgramSpeechToText.speechToText;

  // Compatibility stubs
  public static getVoices = async () => null;
  public static getVoice = async (_voiceId: string) => null;
  public static createAgentTask = async (_req: any) => null;
  public static getSignedUrl = async (_agentId: string) => null;
  public static getAgentInfo = async (_agentId: string) => null;
}

export type { DeepgramOptions } from './base';
