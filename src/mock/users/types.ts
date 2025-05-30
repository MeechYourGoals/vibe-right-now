
export interface MockUserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  type?: 'regular' | 'celebrity' | 'venue';
  verified?: boolean;
}
