
import { BaseEntity, Timestamps } from '../core/base';
import { User } from '../entities/user';

// Chat and AI assistant types
export interface ChatSession extends BaseEntity, Timestamps {
  userId: string;
  mode: ChatMode;
  context: ChatContext;
  messages: ChatMessage[];
  settings: ChatSettings;
  analytics: ChatAnalytics;
  status: ChatStatus;
}

export type ChatMode = 'user' | 'venue' | 'concierge' | 'agent' | 'support';
export type ChatStatus = 'active' | 'paused' | 'completed' | 'timeout' | 'error';

export interface ChatContext {
  location?: GeoCoordinates;
  venue?: string;
  preferences: UserChatPreferences;
  history: string[];
  intents: ExtractedIntent[];
  metadata: Record<string, any>;
}

export interface UserChatPreferences {
  preferredLanguage: string;
  voiceEnabled: boolean;
  preferredVoice: string;
  responseLength: 'short' | 'medium' | 'detailed';
  topics: string[];
  restrictions: string[];
}

export interface ExtractedIntent {
  intent: string;
  entities: Record<string, any>;
  confidence: number;
  type?: string;
  location?: string;
  keywords?: string[];
  mood?: string;
}

export interface ChatMessage extends BaseEntity, Timestamps {
  sessionId: string;
  role: MessageRole;
  content: string;
  metadata: ChatMessageMetadata;
  processing: MessageProcessing;
  feedback?: MessageFeedback;
}

export type MessageRole = 'user' | 'assistant' | 'system' | 'error' | 'tool';

export interface ChatMessageMetadata {
  direction: 'incoming' | 'outgoing';
  spoken?: boolean;
  verified?: boolean;
  source?: string;
  intent?: ExtractedIntent;
  context?: Record<string, any>;
  attachments?: ChatAttachment[];
}

export interface ChatAttachment {
  type: 'image' | 'voice' | 'location' | 'file' | 'link';
  url: string;
  metadata?: Record<string, any>;
}

export interface MessageProcessing {
  isProcessing: boolean;
  startedAt?: Date;
  completedAt?: Date;
  model?: string;
  tokens?: TokenUsage;
  confidence?: number;
  errors?: ProcessingError[];
}

export interface TokenUsage {
  prompt: number;
  completion: number;
  total: number;
  cost?: number;
}

export interface ProcessingError {
  type: string;
  message: string;
  code?: string;
  timestamp: Date;
}

export interface MessageFeedback {
  rating: number; // 1-5
  helpful: boolean;
  issues?: string[];
  comment?: string;
  submittedAt: Date;
}

export interface ChatSettings {
  personality: string;
  responseStyle: ResponseStyle;
  features: ChatFeatures;
  limitations: ChatLimitations;
  integrations: ChatIntegrations;
}

export interface ResponseStyle {
  tone: 'professional' | 'casual' | 'friendly' | 'formal' | 'humorous';
  length: 'brief' | 'moderate' | 'detailed';
  technicality: 'simple' | 'moderate' | 'advanced';
  emoji: boolean;
  formatting: boolean;
}

export interface ChatFeatures {
  voiceInteraction: boolean;
  imageAnalysis: boolean;
  locationAware: boolean;
  bookingCapable: boolean;
  multiLanguage: boolean;
  contextMemory: boolean;
  proactive: boolean;
}

export interface ChatLimitations {
  maxMessageLength: number;
  maxSessionDuration: number; // minutes
  rateLimiting: RateLimit;
  allowedTopics?: string[];
  blockedTopics?: string[];
  contentFiltering: boolean;
}

export interface RateLimit {
  messagesPerMinute: number;
  messagesPerHour: number;
  messagesPerDay: number;
  resetPeriod: number; // seconds
}

export interface ChatIntegrations {
  search: boolean;
  booking: boolean;
  payments: boolean;
  calendar: boolean;
  maps: boolean;
  social: boolean;
  thirdParty: string[];
}

export interface ChatAnalytics {
  totalMessages: number;
  averageResponseTime: number;
  satisfactionScore: number;
  topIntents: Record<string, number>;
  errorRate: number;
  handoffRate: number;
  completionRate: number;
  engagementMetrics: EngagementMetrics;
}

export interface EngagementMetrics {
  sessionDuration: number;
  messagesPerSession: number;
  returnVisits: number;
  featureUsage: Record<string, number>;
  userSentiment: SentimentScore;
}

export interface SentimentScore {
  positive: number;
  negative: number;
  neutral: number;
  compound: number;
}

// Speech and voice types
export interface VoiceSettings {
  enabled: boolean;
  provider: VoiceProvider;
  voice: VoiceProfile;
  speed: number;
  pitch: number;
  volume: number;
  language: string;
}

export type VoiceProvider = 'browser' | 'elevenlabs' | 'openai' | 'google' | 'aws';

export interface VoiceProfile {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  age: 'young' | 'adult' | 'elderly';
  accent?: string;
  style?: string;
}

export interface SpeechRecognitionSettings {
  enabled: boolean;
  language: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  noiseReduction: boolean;
  echoCancellation: boolean;
}

export interface VoiceInteractionState {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  transcript: string;
  interimTranscript: string;
  confidence: number;
  error?: string;
}
