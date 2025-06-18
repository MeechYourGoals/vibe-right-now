
import { BaseEntity, Timestamps } from '../core/base';

export interface Message extends BaseEntity, Timestamps {
  content: string;
  sender: string;
}
