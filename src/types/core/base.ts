
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
}

export interface Timestamps {
  createdAt?: string;
  updatedAt?: string;
}
