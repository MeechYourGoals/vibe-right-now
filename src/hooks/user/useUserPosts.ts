
import { useState, useEffect } from "react";
import { User, Post, Media } from "@/types";
import { mockPosts } from "@/mock/data";
import { hashString } from "@/mock/users/utils";

// List of vibe tags that can be assigned to posts
export const vibeTags = [
  "Cozy", "Upscale", "Trendy", "Casual", "Romantic", "Lively", "Intimate", 
  "Family Friendly", "NightOwl", "Chill", "Energetic", "Artistic", "Sophisticated",
  "Rustic", "Modern", "Nostalgic", "Peaceful", "Vibrant", "Adventurous"
];

// Function to generate vibe tags for a post based on location and user
const generateVibeTags = (locationId: string, username: string): string[] => {
  const seed = parseInt(locationId) + hashString(username);
  const tagCount = 1 + (seed % 4); // 1-4 tags per post
  
  const shuffledTags = [...vibeTags].sort(() => 0.5 - (seed * 0.0001));
  return shuffledTags.slice(0, tagCount);
};

// Convert plain media strings to Media objects if needed
const ensureMediaFormat = (media: any[]): Media[] => {
  return media.map(item => {
    if (typeof item === 'string') {
      // Determine type based on extension
      const isVideo = item.endsWith('.mp4') || item.endsWith('.mov') || item.endsWith('.avi');
      return {
        type: isVideo ? 'video' : 'image',
        url: item
      };
    } else if (typeof item === 'object' && item !== null) {
      // Already in correct format
      return item;
    }
    
    // Default fallback
    return {
      type: 'image',
      url: 'https://via.placeholder.com/500'
    };
  });
};

export const useUserPosts = (user: User | null) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    if (!user) return;
    
    // Find posts by this user - use username for deterministic posts
    const usernameHash = hashString(user.username);
    
    // For our featured users, ensure they have more posts to showcase their profiles
    const isFeaturedUser = ['sarah_vibes', 'jay_experiences', 'adventure_alex', 'marco_travels', 'local_explorer'].includes(user.username);
    const postCount = isFeaturedUser ? 8 + (usernameHash % 4) : 3 + (usernameHash % 5); // 8-12 posts for featured users, 3-8 for others
    
    // Find posts by this user with deterministic selection based on username
    const allPosts = [...mockPosts];
    const selectedPosts = [];
    
    // Generate specific post types based on user profile
    let preferredLocationTypes: string[] = [];
    
    switch(user.username) {
      case 'sarah_vibes':
        preferredLocationTypes = ['restaurant', 'bar', 'cafe'];
        break;
      case 'jay_experiences':
        preferredLocationTypes = ['music_venue', 'cafe', 'concert_hall'];
        break; 
      case 'adventure_alex':
        preferredLocationTypes = ['park', 'mountain', 'beach', 'hiking_trail'];
        break;
      case 'marco_travels':
        preferredLocationTypes = ['landmark', 'museum', 'cultural_site'];
        break;
      case 'local_explorer':
        preferredLocationTypes = ['speakeasy', 'gallery', 'boutique', 'hidden_gem'];
        break;
      default:
        preferredLocationTypes = [];
    }
    
    // If we have preference, start with those
    const preferredLocations = preferredLocationTypes.length > 0 
      ? allPosts.filter(post => preferredLocationTypes.includes(post.location.type || ''))
      : [];
    
    // Fill with random posts if needed
    const remainingPosts = allPosts.filter(post => !preferredLocations.includes(post));
    const shuffledRemaining = [...remainingPosts].sort(() => 0.5 - Math.random());
    
    // Select posts, prioritizing preferred types
    for (let i = 0; i < Math.min(postCount, preferredLocations.length); i++) {
      const index = (usernameHash + i) % preferredLocations.length;
      const post = {...preferredLocations[index]};
      
      // Ensure media is in the correct format
      post.media = ensureMediaFormat(post.media);
      
      // Assign this user as the post creator
      post.user = user;
      
      selectedPosts.push(post);
    }
    
    // Fill remaining posts if needed
    const additionalNeeded = postCount - selectedPosts.length;
    for (let i = 0; i < additionalNeeded; i++) {
      const index = (usernameHash + i) % shuffledRemaining.length;
      const post = {...shuffledRemaining[index]};
      
      // Ensure media is in the correct format
      post.media = ensureMediaFormat(post.media);
      
      // Assign this user as the post creator
      post.user = user;
      
      selectedPosts.push(post);
    }
    
    // Add vibe tags to each post if they don't already have them
    const postsWithTags = selectedPosts.map(post => ({
      ...post,
      vibeTags: post.vibeTags || generateVibeTags(post.location.id, user.username)
    }));
    
    setUserPosts(postsWithTags);
  }, [user]);
  
  return { userPosts };
};
