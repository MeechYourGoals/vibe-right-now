import { useState, useEffect } from "react";
import { User, Post, Location, Comment } from "@/types";
import { mockUsers, mockPosts, mockComments, mockLocations } from "@/mock/data";
import { hashString, generateUserBio } from "@/mock/users";

export const useUserProfile = (username: string | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [followedVenues, setFollowedVenues] = useState<Location[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<Location[]>([]);
  const [wantToVisitPlaces, setWantToVisitPlaces] = useState<Location[]>([]);
  
  useEffect(() => {
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
      setUser(foundUser);
      
      // Find posts by this user - use username for deterministic posts
      const usernameHash = hashString(foundUser.username);
      const postCount = 3 + (usernameHash % 8); // 3-10 posts per user
      
      // Find posts by this user with deterministic selection based on username
      const allPosts = [...mockPosts];
      const selectedPosts = [];
      for (let i = 0; i < postCount; i++) {
        const index = (usernameHash + i) % allPosts.length;
        const post = {...allPosts[index], user: foundUser};
        selectedPosts.push(post);
      }
      
      setUserPosts(selectedPosts);
      
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
    return generateUserBio(user);
  };

  // Determine if user profile is private (explicitly set or based on ID pattern)
  const isPrivateProfile = user ? user.isPrivate || parseInt(user.id) % 2 === 0 : false;
  
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
