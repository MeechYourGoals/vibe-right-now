import { useState, useEffect } from "react";
import { User, Post, Location, Comment, Media } from "@/types";
import { mockUsers, mockPosts, mockComments, mockLocations } from "@/mock/data";
import { hashString, generateUserBio } from "@/mock/users";
import { fuzzyMatch } from "@/utils/searchUtils";

// List of vibe tags that can be assigned to posts
export const vibeTags = [
  "Cozy", "Upscale", "Trendy", "Casual", "Romantic", "Lively", "Intimate", 
  "Family Friendly", "NightOwl", "Chill", "Energetic", "Artistic", "Sophisticated",
  "Rustic", "Modern", "Nostalgic", "Peaceful", "Vibrant", "Adventurous"
];

// Featured users with their full names
export const featuredUsers = [
  { username: 'sarah_vibes', fullName: 'Sarah Miller' },
  { username: 'jay_experiences', fullName: 'Jay Johnson' },
  { username: 'adventure_alex', fullName: 'Alex Kim' },
  { username: 'marco_travels', fullName: 'Marco Williams' },
  { username: 'local_explorer', fullName: 'Jamie Chen' }
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
  if (!media || !Array.isArray(media)) return [];
  
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
    
    const normalizedSearchUsername = username.toLowerCase().trim();
    
    // Helper function for fuzzy name matching
    const findBestUserMatch = (searchTerm: string) => {
      let bestMatch: User | undefined;
      let bestScore = 0;
      
      // Check each user's username, name, and variations
      mockUsers.forEach(user => {
        const variations = [
          user.username,
          user.name,
          user.name.replace(/\s+/g, ''),
          user.name.replace(/\s+/g, '_'),
          user.username.replace(/_/g, ' ')
        ];
        
        variations.forEach(variation => {
          const score = fuzzyMatch(searchTerm, variation);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = user;
          }
        });
      });
      
      return bestScore > 0.3 ? bestMatch : undefined;
    };
    
    // Try to find the best matching user
    const foundUser = findBestUserMatch(normalizedSearchUsername);
    
    if (foundUser) {
      // Ensure user has all required properties
      const completeUser: User = {
        ...foundUser,
        id: foundUser.id || String(Math.floor(Math.random() * 1000)),
        username: foundUser.username || `user_${Math.floor(Math.random() * 1000)}`,
        name: foundUser.name || "Anonymous User",
        avatar: foundUser.avatar || `https://avatars.dicebear.com/api/human/${foundUser.id || Math.random()}.svg`,
        verified: foundUser.verified || false,
        isCelebrity: foundUser.isCelebrity || false
      };
      
      setUser(completeUser);
      
      // Find posts by this user - use username for deterministic posts
      const usernameHash = hashString(completeUser.username);
      
      // For our featured users, ensure they have more posts to showcase their profiles
      const isFeaturedUser = featuredUsers.map(u => u.username).includes(completeUser.username);
      const postCount = isFeaturedUser ? 8 + (usernameHash % 4) : 3 + (usernameHash % 5); // 8-12 posts for featured users, 3-8 for others
      
      // Find posts by this user with deterministic selection based on username
      const allPosts = [...mockPosts];
      
      // Generate specific post types based on user profile
      // Sarah - food and drinks
      // Jay - music venues and coffee shops
      // Alex - outdoors and adventure
      // Marco - international and cultural
      // Jamie - local hidden gems
      
      let preferredLocationTypes: string[] = [];
      
      switch(completeUser.username) {
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
        ? allPosts.filter(post => post.location && preferredLocationTypes.includes(post.location.type || ''))
        : [];
      
      // Fill with random posts if needed
      const remainingPosts = allPosts.filter(post => !preferredLocations.includes(post));
      const shuffledRemaining = [...remainingPosts].sort(() => 0.5 - Math.random());
      
      // Select posts, prioritizing preferred types
      const selectedPosts = [];
      
      // Add preferred posts
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
        if (shuffledRemaining.length === 0) break;
        
        const index = (usernameHash + i) % shuffledRemaining.length;
        const post = {...shuffledRemaining[index]};
        
        // Ensure media is in the correct format
        post.media = ensureMediaFormat(post.media);
        
        // Assign this user as the post creator
        post.user = completeUser;
        
        selectedPosts.push(post);
      }
      
      // Add vibe tags to each post if they don't already have them
      const postsWithTags = selectedPosts.map(post => ({
        ...post,
        vibeTags: post.vibeTags || generateVibeTags(post.location.id, completeUser.username)
      }));
      
      setUserPosts(postsWithTags);
      
      // Get deterministic venues as "followed venues" based on username
      const usernameCharCode = completeUser.username.charCodeAt(0);
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
    } else {
      console.log("User not found:", username);
      setUser(null);
      setUserPosts([]);
      setFollowedVenues([]);
      setVisitedPlaces([]);
      setWantToVisitPlaces([]);
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
