
import { Location, Post } from "@/types";
import { mockUsers } from "@/mock/users";
import { Media } from "@/types";

// Generates venue-specific posts based on the location and available media
export const generateVenuePosts = (venue: Location, media: Media[]): Post[] => {
  // Create venue-specific posts
  const posts: Post[] = [];
  
  // Create a post for each media item (up to 5)
  const maxPosts = Math.min(media.length, 5);
  
  for (let i = 0; i < maxPosts; i++) {
    const mediaItem = media[i];
    
    // Create a post with this media
    posts.push({
      id: `venue-${venue.id}-${i}`,
      user: mockUsers[i % mockUsers.length],
      location: venue,
      timestamp: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(), // Past few days
      likes: Math.floor(Math.random() * 200) + 20,
      comments: [],
      saved: Math.random() > 0.5,
      media: [mediaItem],
      text: getRandomPostText(venue, i),
      content: getRandomPostText(venue, i),
      isPinned: i === 0, // First post is pinned
      isVenuePost: true
    });
  }
  
  return posts;
};

// Generate random post text based on venue type
const getRandomPostText = (venue: Location, index: number): string => {
  const venueType = venue.type || 'venue';
  
  const texts = [
    `Amazing time at ${venue.name}! This ${venueType} is absolutely incredible! #VibeCheck`,
    `Just checked in at ${venue.name} in ${venue.city}. The atmosphere here is 🔥`,
    `If you're in ${venue.city}, you HAVE to visit ${venue.name}. Best ${venueType} in town!`,
    `Enjoying my evening at ${venue.name}. Anyone else here right now?`,
    `${venue.name} never disappoints! Loving the vibes here tonight.`
  ];
  
  return texts[index % texts.length];
};
