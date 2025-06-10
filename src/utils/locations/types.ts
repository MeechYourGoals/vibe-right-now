
export interface MockUserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  type?: 'regular' | 'celebrity' | 'venue';
  verified?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
  isFollowing?: boolean;
  isPrivate?: boolean;
}

export interface CityCoordinates {
  lat: number;
  lng: number;
  name: string;
  state?: string;
  country: string;
}
