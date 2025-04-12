
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
      
      // Generate unique posts for each user based on their username
      const usernameHash = hashString(foundUser.username);
      
      // Determine post count based on user type
      let postCount = 3 + (usernameHash % 8); // 3-10 posts for regular users
      
      // Add more posts for celebrity and popular accounts
      if (foundUser.isCelebrity) {
        postCount = 8 + (usernameHash % 7); // 8-14 posts for celebrities
      } else if (foundUser.verified) {
        postCount = 6 + (usernameHash % 6); // 6-11 posts for verified users
      }
      
      // Generate unique posts for this user by picking and customizing from the post pool
      const allPosts = [...mockPosts];
      const selectedPosts = [];
      
      for (let i = 0; i < postCount; i++) {
        const index = (usernameHash + i * 17) % allPosts.length;
        
        // Create a unique post based on template but with modifications
        const basePost = allPosts[index];
        
        // Generate a timestamp that makes sense (most recent first, then gradually older)
        const dayOffset = i * 2 + (usernameHash % 5);
        const timestamp = new Date();
        timestamp.setDate(timestamp.getDate() - dayOffset);
        
        // Custom text based on user personality/bio
        let customText = basePost.text || "";
        
        if (foundUser.username.includes("food") || foundUser.bio?.includes("food")) {
          customText = `Found this amazing spot with incredible ${['pasta', 'sushi', 'tacos', 'desserts'][i % 4]}! The vibes were immaculate.`;
        } else if (foundUser.username.includes("travel") || foundUser.bio?.includes("travel")) {
          customText = `Exploring ${basePost.location?.city || 'this amazing place'} has been a dream. Must visit spots in my story!`;
        } else if (foundUser.isCelebrity) {
          customText = `Thanks to all the fans who came out to see me at ${basePost.location?.name || 'this venue'}! You all made this night special.`;
        }
        
        // Create the unique post
        const post = {
          ...basePost,
          id: `${basePost.id}-${foundUser.username}-${i}`,
          user: foundUser,
          text: customText,
          timestamp: timestamp.toISOString(),
          likes: 50 + (usernameHash % 200) + (i * 23),
          saved: (usernameHash + i) % 5 === 0,
        };
        
        selectedPosts.push(post);
      }
      
      // Sort posts by timestamp (most recent first)
      selectedPosts.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      setUserPosts(selectedPosts);
      
      // Get deterministic venues as "followed venues" based on username
      const usernameCharCode = foundUser.username.charCodeAt(0);
      const venueCount = foundUser.isCelebrity ? 
        8 + (usernameCharCode % 7) : // 8-14 venues for celebrities
        3 + (usernameCharCode % 5);  // 3-7 venues for regular users
      
      const filteredLocations = mockLocations.filter(location => !!location.type);
      const followedVenuesList = [];
      
      for (let i = 0; i < venueCount; i++) {
        const index = (usernameCharCode + i * 7) % filteredLocations.length;
        followedVenuesList.push(filteredLocations[index]);
      }
      
      setFollowedVenues(followedVenuesList);
      
      // Get deterministic venues for "visited" and "want to visit" sections
      const visitedCount = foundUser.isCelebrity ?
        10 + (usernameCharCode % 8) : // 10-17 visited places for celebrities
        4 + (usernameCharCode % 4);   // 4-7 visited places for regular users
        
      const wantToVisitCount = foundUser.isCelebrity ?
        6 + (usernameCharCode % 6) : // 6-11 want to visit places for celebrities  
        3 + (usernameCharCode % 5);  // 3-7 want to visit places for regular users
      
      const visitedList = [];
      const wantToVisitList = [];
      
      for (let i = 0; i < visitedCount; i++) {
        const index = (usernameCharCode + i * 13) % filteredLocations.length;
        visitedList.push(filteredLocations[index]);
      }
      
      for (let i = 0; i < wantToVisitCount; i++) {
        const index = (usernameCharCode + i * 19) % filteredLocations.length;
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
    // Generate deterministic comments for each post
    const postIdHash = hashString(postId);
    const commentCount = 2 + (postIdHash % 8); // 2-9 comments per post
    
    const baseComments = mockComments.filter(comment => comment.postId === postId);
    const additionalComments = [];
    
    // If we don't have enough base comments, add more unique ones
    for (let i = baseComments.length; i < commentCount; i++) {
      const commentUserIndex = (postIdHash + i * 7) % mockUsers.length;
      const commentUser = mockUsers[commentUserIndex];
      
      const commentText = [
        "This place looks amazing! Adding to my list.",
        "The vibes are immaculate 🔥",
        "Been there last week, it's even better in person!",
        "Did you try their signature dish? It's worth going back for!",
        "Love the atmosphere here, great choice!",
        "Thanks for sharing this hidden gem!",
        "The view is incredible! Was it crowded?",
        "Perfect spot for a weekend getaway.",
        "This is exactly the kind of place I've been looking for!",
        "You always find the best spots!",
      ][i % 10];
      
      additionalComments.push({
        id: `generated-comment-${postId}-${i}`,
        user: commentUser,
        text: commentText,
        timestamp: new Date(Date.now() - (i * 3600000)).toISOString(), // each comment a few hours apart
        likes: 3 + (i * 2),
        postId,
        vibedHere: (postIdHash + i) % 3 === 0,
      });
    }
    
    return [...baseComments, ...additionalComments].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const getUserBio = () => {
    if (!user) return "";
    
    // Use the actual bio if available, otherwise generate one
    return user.bio || generateUserBio(user);
  };

  // Determine if user profile is private
  const isPrivateProfile = user ? user.isPrivate || parseInt(user.id) % 17 === 0 : false;
  
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
