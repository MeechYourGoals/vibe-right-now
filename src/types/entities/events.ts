
import { BaseEntity, Timestamps } from '../core/base';

export interface Event extends BaseEntity, Timestamps {
  name: string;
  date: string;
}
