
import { User, Location, Media } from '.';

export interface Post {
  id: string;
  user: User;
  content: string;
  media: Media[];
  timestamp: string | Date;
  location: Location;
  likes: number;
  isVenuePost?: boolean;
  isPinned?: boolean;
  vibeTags?: string[];
}

export interface Media {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: string | Date;
  likes: number;
}
