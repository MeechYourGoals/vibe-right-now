
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
    
    console.log("Looking for username:", username);
    
    // Featured usernames list for easy checking
    const featuredUsernames = featuredUsers.map(u => u.username);
    const normalizedSearchUsername = username.toLowerCase();
    
    // Check for different variations of usernames (full name, username, etc.)
    const nameVariations = [
      { type: 'sarah', username: 'sarah_vibes' },
      { type: 'jay', username: 'jay_experiences' },
      { type: 'alex', username: 'adventure_alex' },
      { type: 'marco', username: 'marco_travels' },
      { type: 'jamie', username: 'local_explorer' },
      { type: 'sarah miller', username: 'sarah_vibes' },
      { type: 'jay johnson', username: 'jay_experiences' },
      { type: 'alex kim', username: 'adventure_alex' },
      { type: 'marco williams', username: 'marco_travels' },
      { type: 'jamie chen', username: 'local_explorer' },
      { type: 'sarah_miller', username: 'sarah_vibes' },
      { type: 'jay_johnson', username: 'jay_experiences' },
      { type: 'alex_kim', username: 'adventure_alex' },
      { type: 'marco_williams', username: 'marco_travels' },
      { type: 'jamie_chen', username: 'local_explorer' }
    ];
    
    // First check for direct match
    let foundUser: User | undefined = mockUsers.find(
      user => user.username && user.username.toLowerCase() === normalizedSearchUsername
    );
    
    // If no direct match, check for name variations
    if (!foundUser) {
      const variation = nameVariations.find(v => v.type.toLowerCase() === normalizedSearchUsername);
      if (variation) {
        foundUser = mockUsers.find(user => user.username === variation.username);
      }
    }
    
    // If still no match, check if username contains parts of any featured user
    if (!foundUser) {
      for (const featured of featuredUsers) {
        // If any part of the featured username or full name is in the search, use that user
        if (
          featured.username.toLowerCase().includes(normalizedSearchUsername) || 
          normalizedSearchUsername.includes(featured.username.toLowerCase()) ||
          featured.fullName.toLowerCase().includes(normalizedSearchUsername) ||
          normalizedSearchUsername.includes(featured.fullName.toLowerCase())
        ) {
          foundUser = mockUsers.find(user => user.username === featured.username);
          break;
        }
      }
    }
    
    console.log("Found user:", foundUser);
    
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
      const isFeaturedUser = featuredUsernames.includes(completeUser.username);
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
