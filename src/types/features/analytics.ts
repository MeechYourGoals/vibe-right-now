
import { BaseEntity } from '../core/base';

export interface Analytics extends BaseEntity {
  views: number;
  clicks: number;
}
