
import { BaseEntity } from '../core/base';

export interface ChatSession extends BaseEntity {
  participants: string[];
}

export interface ChatMessage extends BaseEntity {
  content: string;
  role: 'user' | 'assistant' | 'system' | 'error';
  timestamp: string;
}

export type MessageRole = 'user' | 'assistant' | 'system' | 'error';

export interface ChatContext {
  sessionId: string;
  history: ChatMessage[];
}

export interface VoiceSession {
  id: string;
  isActive: boolean;
}

export interface AIAgent {
  id: string;
  name: string;
  capabilities: AgentCapability[];
}

export interface AgentCapability {
  type: CapabilityType;
  level: CapabilityLevel;
}

export type CapabilityType = 'search' | 'booking' | 'recommendation';
export type CapabilityLevel = 'basic' | 'advanced' | 'expert';
