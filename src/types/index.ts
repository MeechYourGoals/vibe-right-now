
// Add this to your types file or extend the existing Post interface
export interface Post {
  id: string;
  userId?: string; // Make userId optional
  user: User;
  location: Location;
  content: string;
  media: (string | Media)[];
  timestamp: string;
  expiresAt?: string;
  likes: number;
  comments: number;
  isPinned?: boolean;
  vibeTags?: string[];
  locationId?: string;
}

// Add any other missing interfaces or types needed
