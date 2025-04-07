
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { mockUsers, mockPosts, mockComments } from "@/mock/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { 
  Grid2X2, ListIcon, MapPin, 
  Calendar, User, Settings, 
  Heart, MessageCircle, Share2 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PostCard from "@/components/PostCard";
import CameraButton from "@/components/CameraButton";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState("vibes");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Find user by username
  const user = mockUsers.find(user => user.username === username) || mockUsers[0];
  
  // Get posts by this user
  const userPosts = mockPosts.filter(post => post.user.id === user.id);
  
  const getPostComments = (postId: string) => {
    return mockComments.filter(comment => comment.postId === postId);
  };
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    
    if (!isFollowing) {
      toast({
        title: "Following!",
        description: `You are now following ${user.name}`,
      });
    } else {
      toast({
        title: "Unfollowed",
        description: `You are no longer following ${user.name}`,
      });
    }
  };
  
  return (
    <Layout>
      <div className="container py-6 max-w-4xl mx-auto">
        <Card className="border-none shadow-none mb-6">
          <CardContent className="p-0">
            <div className="h-48 w-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg relative">
              <div className="absolute -bottom-16 left-6">
                <Avatar className="h-32 w-32 border-4 border-background">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            <div className="mt-20 px-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <span className="font-bold">248</span>
                      <span className="text-sm text-muted-foreground">Vibes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">1.4K</span>
                      <span className="text-sm text-muted-foreground">Followers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">562</span>
                      <span className="text-sm text-muted-foreground">Following</span>
                    </div>
                  </div>
                  
                  <p className="mt-4">
                    Exploring the best vibes around the world. Always on the lookout for hidden gems and exciting experiences.
                  </p>
                  
                  <div className="flex items-center gap-3 mt-3 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Los Angeles, CA</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Joined Jan 2023</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant={isFollowing ? "default" : "outline"}
                    onClick={handleFollowToggle}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="vibes" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="vibes">Vibes</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            {activeTab === "vibes" && (
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
            )}
          </div>
          
          <TabsContent value="vibes" className="mt-4">
            {userPosts.length > 0 ? (
              viewMode === "list" ? (
                <PostCard 
                  posts={userPosts}
                  locationPostCount={userPosts.length}
                  getComments={getPostComments}
                />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {userPosts.map(post => (
                    <PostGridItem key={post.id} post={post} />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-10">
                <User className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-1">No vibes yet</h3>
                <p className="text-muted-foreground mb-4">This user hasn't posted any vibes yet</p>
                <Button>Post Your First Vibe</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="liked" className="mt-4">
            <div className="text-center py-10">
              <Heart className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-1">No liked vibes</h3>
              <p className="text-muted-foreground">This user hasn't liked any vibes yet</p>
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-4">
            <div className="text-center py-10">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-1">No saved vibes</h3>
              <p className="text-muted-foreground">This user hasn't saved any vibes yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <CameraButton />
    </Layout>
  );
};

interface PostGridItemProps {
  post: {
    id: string;
    media: { type: string; url: string }[];
    content: string;
    user: { name: string; username: string; avatar: string };
    timestamp: string;
    likes: number;
  };
}

const PostGridItem = ({ post }: PostGridItemProps) => {
  const [liked, setLiked] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.user.username} on Vibe Right Now!`,
        text: post.content.slice(0, 100) + (post.content.length > 100 ? '...' : ''),
        url: `${window.location.origin}/post/${post.id}`
      })
      .then(() => toast.success("Shared successfully!"))
      .catch((error) => {
        console.error('Error sharing:', error);
        toast.error("Couldn't share. Try copying the link instead.");
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      const url = `${window.location.origin}/post/${post.id}`;
      navigator.clipboard.writeText(url)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Couldn't copy link. Please try again."));
    }
  };

  return (
    <Link to={`/post/${post.id}`} className="group relative block aspect-square overflow-hidden rounded-lg">
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
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLike} 
                className="h-8 px-2 text-white hover:bg-black/20"
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="ml-1">{post.likes + (liked ? 1 : 0)}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare} 
                className="h-8 px-2 text-white hover:bg-black/20"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-xs text-white">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserProfile;
