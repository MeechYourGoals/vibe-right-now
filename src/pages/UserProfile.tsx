
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { mockUsers, mockPosts, mockComments } from "@/mock/data";
import { User, Comment, Post } from "@/types";
import UserProfileHeader from "@/components/user/UserProfileHeader";
import ProfileTabs from "@/components/user/ProfileTabs";
import VerifiedIcon from "@/components/icons/VerifiedIcon";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // Find the user based on the username from the URL
    const foundUser = mockUsers.find((user) => user.username === username);
    if (foundUser) {
      setUser(foundUser);
      // Find posts by this user
      const foundPosts = mockPosts.filter((post) => post.user.id === foundUser.id);
      setUserPosts(foundPosts);
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

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <p className="text-muted-foreground">This user doesn't exist or has been removed.</p>
          <Button className="mt-6" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          <UserProfileHeader user={user} getUserBio={getUserBio} />
          
          <ProfileTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            viewMode={viewMode}
            setViewMode={setViewMode}
            userPosts={userPosts}
            getComments={getPostComments}
          />
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
