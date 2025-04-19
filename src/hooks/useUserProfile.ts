
import { useState, useEffect } from "react";
import { User, Post, Location, Comment, Media } from "@/types";
import { mockUsers, mockPosts, mockComments, mockLocations } from "@/mock/data";
import { hashString, generateUserBio } from "@/mock/users";

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
  if (!media || !Array.isArray(media)) {
    return [];
  }
  
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

export const useUserProfile = (username: string | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [followedVenues, setFollowedVenues] = useState<Location[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<Location[]>([]);
  const [wantToVisitPlaces, setWantToVisitPlaces] = useState<Location[]>([]);
  
  useEffect(() => {
    if (!username) {
      console.log("No username provided");
      return;
    }
    
    console.log("Looking for username:", username);
    
    // Find user by username or id (for backward compatibility)
    const isUserId = username && !isNaN(Number(username));
    
    let foundUser: User | undefined;
    
    if (isUserId) {
      // If it's an ID, look for a user with that ID
      foundUser = mockUsers.find((user) => user.id === username);
    } else {
      // Otherwise look for a user with that username
      foundUser = mockUsers.find((user) => user.username === username);
    }
    
    console.log("Found user:", foundUser);
    
    if (foundUser) {
      // Ensure user has all required properties
      const completeUser: User = {
        ...foundUser,
        verified: foundUser.verified || false,
        isCelebrity: foundUser.isCelebrity || false
      };
      
      setUser(completeUser);
      
      // Find posts by this user - use username for deterministic posts
      const usernameHash = hashString(foundUser.username);
      
      // For our featured users, ensure they have more posts to showcase their profiles
      const isFeaturedUser = ['sarah_vibes', 'jay_experiences', 'adventure_alex', 'marco_travels', 'local_explorer'].includes(foundUser.username);
      const postCount = isFeaturedUser ? 8 + (usernameHash % 4) : 3 + (usernameHash % 5); // 8-12 posts for featured users, 3-8 for others
      
      // Find posts by this user with deterministic selection based on username
      const allPosts = [...mockPosts];
      const selectedPosts = [];
      
      // Generate specific post types based on user profile
      // Sarah - food and drinks
      // Jay - music venues and coffee shops
      // Alex - outdoors and adventure
      // Marco - international and cultural
      // Jamie - local hidden gems
      
      let preferredLocationTypes: string[] = [];
      
      switch(foundUser.username) {
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
        ? allPosts.filter(post => {
            if (!post.location || !post.location.type) {
              return false;
            }
            return preferredLocationTypes.includes(post.location.type);
          })
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
        post.user = completeUser;
        
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
        post.user = completeUser;
        
        selectedPosts.push(post);
      }
      
      // Add vibe tags to each post if they don't already have them
      const postsWithTags = selectedPosts.map(post => {
        if (!post.location) {
          // Ensure post has a valid location
          return {
            ...post,
            location: mockLocations[0], // Use a default location
            vibeTags: post.vibeTags || vibeTags.slice(0, 3) // Use default vibe tags
          };
        }
        
        return {
          ...post,
          vibeTags: post.vibeTags || generateVibeTags(post.location.id, foundUser.username)
        };
      });
      
      setUserPosts(postsWithTags);
      
      // Get deterministic venues as "followed venues" based on username
      const usernameCharCode = foundUser.username.charCodeAt(0);
      const venueCount = 3 + (usernameCharCode % 5); // 3-7 venues
      
      const filteredLocations = mockLocations.filter(location => !!location.type);
      const followedVenuesList = [];
      
      for (let i = 0; i < venueCount; i++) {
        const index = (usernameCharCode + i * 3) % filteredLocations.length;
        followedVenuesList.push(filteredLocations[index]);
      }
      
      setFollowedVenues(followedVenuesList);
      
      // Get deterministic venues for "visited" and "want to visit" sections
      const visitedCount = 4 + (usernameCharCode % 4); // 4-7 visited places
      const wantToVisitCount = 3 + (usernameCharCode % 5); // 3-7 want to visit places
      
      const visitedList = [];
      const wantToVisitList = [];
      
      for (let i = 0; i < visitedCount; i++) {
        const index = (usernameCharCode + i * 7) % filteredLocations.length;
        visitedList.push(filteredLocations[index]);
      }
      
      for (let i = 0; i < wantToVisitCount; i++) {
        const index = (usernameCharCode + i * 11) % filteredLocations.length;
        // Ensure no duplicates between visited and want to visit
        if (!visitedList.some(loc => loc.id === filteredLocations[index].id)) {
          wantToVisitList.push(filteredLocations[index]);
        }
      }
      
      setVisitedPlaces(visitedList);
      setWantToVisitPlaces(wantToVisitList);
    }
  }, [username]);

  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const getUserBio = () => {
    if (!user) return "";
    return user.bio || generateUserBio(user);
  };

  // Determine if user profile is private (explicitly set or based on ID pattern)
  const isPrivateProfile = user ? user.isPrivate || parseInt(user.id) % 5 === 0 : false;
  
  return {
    user,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    getPostComments,
    getUserBio,
    isPrivateProfile
  };
};
