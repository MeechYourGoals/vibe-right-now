
import { useState, useEffect } from "react";
import { mockUsers, type MockUserProfile } from "@/mock/users";
import { mockPosts, mockComments } from "@/mock/data";
import { mockLocations } from "@/mock/locations";
import { User, Post, Location } from "@/types";

export const vibeTags = [
  "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", "Upscale", 
  "Casual", "Romantic", "Lively", "Intimate", "Artsy", "Historic", 
  "Modern", "Quirky", "Elegant", "Rustic", "Vibrant", "Peaceful"
];

const useUserProfile = (username: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [followedVenues, setFollowedVenues] = useState<Location[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<Location[]>([]);
  const [wantToVisitPlaces, setWantToVisitPlaces] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // Find the user by username
        const mockUser = mockUsers.find(u => u.username === username);
        
        if (!mockUser) {
          setError("User not found");
          return;
        }

        // Convert mock user to User type
        const userData: User = {
          id: mockUser.id,
          username: mockUser.username,
          name: mockUser.name,
          avatar: mockUser.avatar,
          isVerified: mockUser.isVerified || false,
          bio: mockUser.bio || "",
          followers: Number(mockUser.followers) || 0,
          following: Number(mockUser.following) || 0,
          posts: Number(mockUser.posts) || 0,
          isPrivate: mockUser.isPrivate || false,
          vibeTags: mockUser.vibeTags || []
        };
        
        setUser(userData);

        // Get user's posts
        const posts = mockPosts.filter(post => post.user.username === username);
        setUserPosts(posts);

        // Generate mock followed venues (5-10 venues)
        const shuffledVenues = [...mockLocations].sort(() => 0.5 - Math.random());
        const followedCount = 5 + Math.floor(Math.random() * 6);
        setFollowedVenues(shuffledVenues.slice(0, followedCount));

        // Generate mock visited places (10-20 places)
        const visitedCount = 10 + Math.floor(Math.random() * 11);
        setVisitedPlaces(shuffledVenues.slice(followedCount, followedCount + visitedCount));

        // Generate mock want-to-visit places (5-15 places)
        const wantToVisitCount = 5 + Math.floor(Math.random() * 11);
        setWantToVisitPlaces(shuffledVenues.slice(followedCount + visitedCount, followedCount + visitedCount + wantToVisitCount));

      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  const getPostComments = (postId: string) => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const getUserBio = () => {
    return user?.bio || "No bio available";
  };

  const isPrivateProfile = () => {
    return user?.isPrivate || false;
  };

  return {
    user,
    userPosts,
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces,
    getPostComments,
    getUserBio,
    isPrivateProfile,
    loading,
    error
  };
};

export default useUserProfile;
