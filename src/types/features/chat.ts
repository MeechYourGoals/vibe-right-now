
import { GeoCoordinates } from '../core/base';

// Chat and messaging types for the VernonChat system
export interface ChatSession {
  id: string;
  userId: string;
  startedAt: Date;
  endedAt?: Date;
  messages: ChatMessage[];
  context: ChatContext;
  metadata: SessionMetadata;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  metadata?: MessageMetadata;
  attachments?: MessageAttachment[];
}

export type MessageRole = 'user' | 'assistant' | 'system' | 'error';

export interface ChatContext {
  location?: GeoCoordinates;
  preferences: UserChatPreferences;
  history: ConversationHistory;
  capabilities: ChatCapability[];
}

export interface UserChatPreferences {
  language: string;
  tone: 'casual' | 'formal' | 'friendly' | 'professional';
  responseLength: 'brief' | 'detailed' | 'comprehensive';
  topics: PreferredTopic[];
}

export interface PreferredTopic {
  category: string;
  interest: number; // 0-1 scale
  keywords: string[];
}

export interface ConversationHistory {
  recentQueries: string[];
  frequentTopics: string[];
  lastInteraction: Date;
  sessionCount: number;
}

export interface ChatCapability {
  name: string;
  description: string;
  enabled: boolean;
  confidence: number;
}

export interface SessionMetadata {
  platform: string;
  userAgent: string;
  ipAddress?: string;
  referrer?: string;
  experiments: string[];
}

export interface MessageMetadata {
  processingTime: number;
  confidence: number;
  sources: InformationSource[];
  intent: DetectedIntent;
  entities: ExtractedEntity[];
}

export interface InformationSource {
  type: 'knowledge_base' | 'search' | 'api' | 'user_data';
  url?: string;
  title?: string;
  confidence: number;
}

export interface DetectedIntent {
  name: string;
  confidence: number;
  parameters: Record<string, any>;
}

export interface ExtractedEntity {
  type: string;
  value: string;
  confidence: number;
  start: number;
  end: number;
}

export interface MessageAttachment {
  id: string;
  type: AttachmentType;
  url: string;
  filename?: string;
  size?: number;
  metadata?: AttachmentMetadata;
}

export type AttachmentType = 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact';

export interface AttachmentMetadata {
  width?: number;
  height?: number;
  duration?: number;
  format?: string;
  thumbnail?: string;
}

// Voice interaction types
export interface VoiceSession {
  id: string;
  chatSessionId: string;
  startedAt: Date;
  endedAt?: Date;
  language: string;
  settings: VoiceSettings;
  transcript: VoiceTranscript[];
}

export interface VoiceSettings {
  inputEnabled: boolean;
  outputEnabled: boolean;
  voice: VoiceProfile;
  quality: AudioQuality;
  noiseReduction: boolean;
}

export interface VoiceProfile {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  accent: string;
  speed: number;
  pitch: number;
}

export type AudioQuality = 'low' | 'medium' | 'high' | 'premium';

export interface VoiceTranscript {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  confidence: number;
  startTime: number;
  endTime: number;
  audioUrl?: string;
}

// AI Agent types
export interface AIAgent {
  id: string;
  name: string;
  description: string;
  capabilities: AgentCapability[];
  personality: AgentPersonality;
  knowledge: KnowledgeBase;
  status: AgentStatus;
}

export interface AgentCapability {
  type: CapabilityType;
  level: CapabilityLevel;
  description: string;
  examples: string[];
}

export type CapabilityType = 
  | 'search' 
  | 'recommendation' 
  | 'booking' 
  | 'navigation' 
  | 'translation' 
  | 'analysis' 
  | 'creative' 
  | 'technical';

export type CapabilityLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';

export interface AgentPersonality {
  traits: PersonalityTrait[];
  communication: CommunicationStyle;
  expertise: string[];
  limitations: string[];
}

export interface PersonalityTrait {
  name: string;
  strength: number; // 0-1 scale
  description: string;
}

export interface CommunicationStyle {
  formality: number; // 0-1 scale
  enthusiasm: number;
  helpfulness: number;
  creativity: number;
}

export interface KnowledgeBase {
  domains: KnowledgeDomain[];
  lastUpdated: Date;
  version: string;
  confidence: number;
}

export interface KnowledgeDomain {
  name: string;
  coverage: number; // 0-1 scale
  lastUpdated: Date;
  sources: string[];
}

export type AgentStatus = 'active' | 'training' | 'maintenance' | 'deprecated';

// Search and recommendation types
export interface SearchQuery {
  text: string;
  type: QueryType;
  filters: SearchFilter[];
  location?: GeoCoordinates;
  context: SearchContext;
}

export type QueryType = 'venue' | 'event' | 'recommendation' | 'information' | 'navigation';

export interface SearchFilter {
  field: string;
  operator: FilterOperator;
  value: any;
}

export type FilterOperator = 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in';

export interface SearchContext {
  userPreferences: UserPreferences;
  sessionHistory: string[];
  timeOfDay: string;
  dayOfWeek: string;
  weather?: WeatherInfo;
}

export interface UserPreferences {
  categories: string[];
  priceRange: [number, number];
  distance: number;
  rating: number;
  accessibility: AccessibilityRequirement[];
}

export interface AccessibilityRequirement {
  type: string;
  required: boolean;
  description?: string;
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  description: string;
  score: number;
  metadata: ResultMetadata;
  actions: ResultAction[];
}

export type ResultType = 'venue' | 'event' | 'article' | 'recommendation' | 'direction';

export interface ResultMetadata {
  location?: GeoCoordinates;
  category?: string;
  rating?: number;
  price?: number;
  distance?: number;
  availability?: string;
  images?: string[];
}

export interface ResultAction {
  type: ActionType;
  label: string;
  url?: string;
  data?: Record<string, any>;
}

export type ActionType = 'view' | 'book' | 'navigate' | 'share' | 'save' | 'call' | 'message';
