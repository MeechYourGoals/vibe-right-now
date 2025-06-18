
import { BaseEntity, UserProfile as BaseUserProfile, GeoCoordinates, Address, Timestamps } from '../core/base';

// Re-export UserProfile from base
export type { UserProfile } from '../core/base';

// User-related types
export interface User extends BaseEntity, BaseUserProfile, Timestamps {
  email: string;
  phone?: string;
}
