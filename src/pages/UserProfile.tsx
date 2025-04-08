
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { mockUsers, mockPosts, mockComments, mockLocations } from "@/mock/data";
import { User, Comment, Post, Location } from "@/types";
import UserProfileHeader from "@/components/user/UserProfileHeader";
import ProfileTabs from "@/components/user/ProfileTabs";
import { Lock, MapPin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [followedVenues, setFollowedVenues] = useState<Location[]>([]);
  
  useEffect(() => {
    // Find the user based on the username from the URL
    const foundUser = mockUsers.find((user) => user.username === username);
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
  const isPrivateProfile = user ? parseInt(user.id) % 2 === 0 : false;

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
          
          {isPrivateProfile ? (
            <PrivateProfileContent user={user} />
          ) : (
            <>
              <ProfileTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                viewMode={viewMode}
                setViewMode={setViewMode}
                userPosts={userPosts}
                getComments={getPostComments}
              />
              
              {activeTab === "following" && (
                <FollowedVenuesSection venues={followedVenues} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

const PrivateProfileContent = ({ user }: { user: User }) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-muted">
            <Lock className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">This profile is private</h2>
        <p className="text-muted-foreground mb-8">
          @{user.username} has chosen to keep their profile private. 
          Follow them to request access to their content.
        </p>
        <Button>
          Request to Follow
        </Button>
      </div>
    </div>
  );
};

const FollowedVenuesSection = ({ venues }: { venues: Location[] }) => {
  const navigate = useNavigate();
  
  if (venues.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">This user isn't following any venues yet.</p>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <h3 className="font-medium text-xl mb-4">Followed Venues</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {venues.map((venue) => (
          <Card 
            key={venue.id} 
            className="hover:bg-accent/10 transition-colors cursor-pointer"
            onClick={() => navigate(`/venue/${venue.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://source.unsplash.com/random/200x200/?${venue.type}`} alt={venue.name} />
                  <AvatarFallback>{venue.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{venue.name}</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{venue.city}, {venue.state || venue.country}</span>
                  </div>
                  <Badge variant="outline" className="mt-1 text-xs bg-muted">
                    {venue.type}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
