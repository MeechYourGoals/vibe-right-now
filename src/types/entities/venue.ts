
import { BaseEntity, GeoCoordinates, Timestamps } from '../core/base';

export interface Location extends BaseEntity, GeoCoordinates, Timestamps {
  name: string;
  address: string;
  city: string;
  country: string;
  type: string;
  verified: boolean;
}
