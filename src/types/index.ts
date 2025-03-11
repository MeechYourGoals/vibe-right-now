
export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  type: "restaurant" | "bar" | "event" | "attraction" | "other";
  verified: boolean;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media: {
    type: "image" | "video";
    url: string;
  }[];
  timestamp: string;
  expiresAt: string;
  likes: number;
  comments: number;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: string;
}
