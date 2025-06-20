
import { BaseEntity } from '../core/base';

export interface Ad extends BaseEntity {
  title: string;
  content: string;
}

// Note: AdFormat and TargetingOptions are now consolidated in src/types/index.ts
// This file now only contains advertising-specific types that aren't duplicated elsewhere
