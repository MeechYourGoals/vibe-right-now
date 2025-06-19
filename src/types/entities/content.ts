
import { BaseEntity, Timestamps } from '../core/base';

export interface Post extends BaseEntity, Timestamps {
  content: string;
  likes: number;
  comments: number;
}
