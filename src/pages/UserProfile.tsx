import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Award, Heart, MessageSquare, Grid2X2, ListIcon, Share2, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { mockUsers, mockPosts, mockComments } from "@/mock/data";
import { User, Comment, Post } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

// Define the VerifiedIcon component
const VerifiedIcon = ({ className }: { className?: string }) => {
  return <CheckCircle className={className} />;
};

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isFollowing, setIsFollowing] = useState(false);
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

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    
    if (isFollowing) {
      toast.success(`Unfollowed @${user?.username}`);
    } else {
      toast.success(`Now following @${user?.username}`);
    }
  };
  
  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${user?.name}'s profile on Vibe Right Now!`,
        text: `I found ${user?.name} (@${user?.username}) on Vibe Right Now and thought you might want to follow them!`,
        url: `${window.location.origin}/user/${user?.username}`
      })
      .then(() => toast.success("Shared successfully!"))
      .catch((error) => {
        console.error('Error sharing:', error);
        toast.error("Couldn't share. Try copying the link instead.");
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      const url = `${window.location.origin}/user/${user?.username}`;
      navigator.clipboard.writeText(url)
        .then(() => toast.success("Profile link copied to clipboard!"))
        .catch(() => toast.error("Couldn't copy link. Please try again."));
    }
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
          <div className="glass-effect p-6 rounded-xl mb-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                      {user.name}
                      {user.verified && <VerifiedIcon className="h-5 w-5 text-primary" />}
                    </h1>
                    <p className="text-muted-foreground">@{user.username}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{user.isCelebrity ? Math.floor(Math.random() * 90 + 10) + "M" : Math.floor(Math.random() * 900 + 100) + "K"} Followers</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Joined {user.isCelebrity ? "Jan 2020" : "Aug 2023"}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{user.isCelebrity ? "Los Angeles, CA" : "New York, NY"}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {user.isCelebrity && (
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-500">Verified</Badge>
                      )}
                      <Badge variant="outline" className="bg-primary/20">Top Vibe Creator</Badge>
                      {user.isCelebrity ? (
                        <Badge variant="outline" className="bg-rose-500/20 text-rose-500">Celebrity</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-purple-500/20 text-purple-600">VIP Member</Badge>
                      )}
                      <Badge variant="outline" className="bg-amber-500/20 text-amber-600">
                        <Award className="h-3 w-3 mr-1" />
                        <span>Vibe Enthusiast</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-9"
                      onClick={handleShareProfile}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button 
                      variant={isFollowing ? "default" : "outline"}
                      size="sm"
                      className="h-9"
                      onClick={handleFollowToggle}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                </div>
                
                <p className="mt-4 text-sm">
                  {getUserBio()}
                </p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="posts">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>Posts</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="liked">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    <span>Liked</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="saved">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    <span>Popular</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="posts" className="mt-4 space-y-4">
              {userPosts.length > 0 ? (
                viewMode === "list" ? (
                  <PostCard 
                    posts={userPosts} 
                    locationPostCount={userPosts.length}
                    getComments={getPostComments} 
                  />
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userPosts.map((post) => (
                      <PostGridItem key={post.id} post={post} />
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                  <p className="text-muted-foreground">This user hasn't posted any vibes yet.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="liked" className="mt-4 space-y-4">
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">Liked vibes</h3>
                <p className="text-muted-foreground">Posts this user has liked will appear here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-4 space-y-4">
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">Popular posts</h3>
                <p className="text-muted-foreground">This user's most popular posts will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

interface PostGridItemProps {
  post: Post;
}

const PostGridItem = ({ post }: PostGridItemProps) => {
  const [liked, setLiked] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
  };

  return (
    <div className="group relative block aspect-square overflow-hidden rounded-lg">
      {post.media[0]?.type === "image" ? (
        <img 
          src={post.media[0].url}
          alt={`Post by ${post.user.username}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      ) : post.media[0]?.type === "video" ? (
        <video
          src={post.media[0].url}
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <p className="p-2 text-center text-sm">{post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 border border-white">
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-white">@{post.user.username}</span>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike} 
              className="h-8 px-2 text-white hover:bg-black/20"
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="ml-1">{post.likes + (liked ? 1 : 0)}</span>
            </Button>
            <span className="text-xs text-white">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
