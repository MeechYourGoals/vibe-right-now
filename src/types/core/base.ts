
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface Timestamps {
  createdAt?: string;
  updatedAt?: string;
}
