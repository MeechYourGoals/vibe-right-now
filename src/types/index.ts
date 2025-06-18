
// Core types
export * from './core/base';
export * from './core/api';

// Entity types
export * from './entities/user';
export * from './entities/venue';
export * from './entities/content';
export * from './entities/events';
export * from './entities/messaging';

// Feature types
export * from './features/search';
export * from './features/analytics';
export * from './features/advertising';
export * from './features/sentiment';

// Re-export specific types for compatibility
export type { Post, User, VenueInsights } from './index.d';

// Chat types (with selective exports to avoid conflicts)
export type {
  ChatSession,
  ChatMessage,
  MessageRole,
  ChatContext,
  VoiceSession,
  AIAgent,
  AgentCapability,
  CapabilityType,
  CapabilityLevel
} from './features/chat';
