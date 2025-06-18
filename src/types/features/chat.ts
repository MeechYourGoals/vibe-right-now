
export interface ChatSession {
  id: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  timestamp: string;
  text?: string;
  sender?: 'user' | 'ai';
}

export type MessageRole = 'user' | 'assistant' | 'system' | 'error';

export interface ChatContext {
  sessionId?: string;
  userId?: string;
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

export type CapabilityType = 'search' | 'analysis' | 'recommendation';
export type CapabilityLevel = 'basic' | 'advanced' | 'expert';
