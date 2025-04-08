
import { useState, useEffect } from "react";
import { User, Post, Location, Comment } from "@/types";
import { mockUsers, mockPosts, mockComments, mockLocations } from "@/mock/data";

export const useUserProfile = (username: string | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [followedVenues, setFollowedVenues] = useState<Location[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<Location[]>([]);
  const [wantToVisitPlaces, setWantToVisitPlaces] = useState<Location[]>([]);
  
  useEffect(() => {
    console.log("Looking for username:", username);
    // Find the user based on the username from the URL
    const foundUser = mockUsers.find((user) => user.username === username);
    console.log("Found user:", foundUser);
    
    if (foundUser) {
      setUser(foundUser);
      // Find posts by this user
      const foundPosts = mockPosts.filter((post) => post.user.id === foundUser.id);
      setUserPosts(foundPosts);
      
      // Get random venues as "followed venues"
      const randomVenues = mockLocations
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 6) + 3);
      setFollowedVenues(randomVenues);
      
      // Get random venues for "visited" and "want to visit" sections
      const allLocations = [...mockLocations].sort(() => 0.5 - Math.random());
      
      // First 5 locations for visited places
      setVisitedPlaces(allLocations.slice(0, 5));
      
      // Next 5 locations for want to visit places
      setWantToVisitPlaces(allLocations.slice(5, 10));
    }
  }, [username]);

  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const getUserBio = () => {
    if (!user) return "";
    
    if (user.bio) {
      return user.bio;
    }
    
    // Generate bios based on username patterns
    if (user.username.includes("food") || user.username.includes("chef") || user.username.includes("coffee")) {
      return "Foodie exploring the best culinary experiences around the world. Always on the hunt for hidden gems and authentic flavors. 🍜🍷✨";
    } else if (user.username.includes("travel") || user.username.includes("explorer") || user.username.includes("wanderer")) {
      return "Travel enthusiast with a passion for discovering new cultures and hidden spots. 30 countries and counting! 🌍✈️🧳";
    } else if (user.username.includes("party") || user.username.includes("club") || user.username.includes("fest")) {
      return "Nightlife connoisseur and music lover. Finding the best clubs, festivals, and dance floors wherever I go. 🎵🥂🕺";
    } else if (user.username.includes("sport") || user.username.includes("fitness")) {
      return "Sports fanatic and fitness enthusiast. Always looking for the next adrenaline rush and active experiences. 🏈🏀⚽";
    } else {
      return "Always seeking the next great vibe! Foodie, music lover, and adventure seeker exploring one city at a time. 🌮🎵✨";
    }
  };

  // Determine if user profile is private (based on user ID for deterministic results)
  // Make user ID even = private, odd = public for consistent results
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
