
import { BaseEntity } from '../core/base';

export interface Ad extends BaseEntity {
  title: string;
  content: string;
}

// Extended AdFormat for compatibility
export interface AdFormat {
  id: string;
  name: string;
  type: string;
  description?: string;
  duration?: number;
  platform?: string;
  dimensions?: string;
  kpis?: string[];
}
