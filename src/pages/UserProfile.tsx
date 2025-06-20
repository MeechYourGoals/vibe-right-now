import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Users, Heart, Grid3X3, List, Lock } from "lucide-react";
import { mockPosts, mockComments } from "@/mock/data";
import PostCard from "@/components/post/PostCard";
import { Comment, Post, User } from "@/types";
import Masonry from "react-masonry-css";
import UserProfileHeader from "@/components/user-profile/UserProfileHeader";
import { UserProfileData } from "@/types";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeTab, setActiveTab] = useState("posts");

  // Mock user data - in a real app, this would come from your API
  const user: UserProfileData = {
    id: "user123",
    username: username || "vibemaster",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Living my best life, one vibe at a time ✨ | Coffee enthusiast ☕ | Always looking for the next adventure 🌟",
    verified: true,
    followers: 2847,
    following: 1203,
    posts: 89
  };

  // Mock data, handlers, filtering logic
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const userPosts = mockPosts.filter(post => post.user.username === username);
  const savedPosts = mockPosts.filter(post => post.saved);
  const taggedPosts = mockPosts.filter(post => 
    post.content.includes(`@${username}`) || 
    (post.vibeTags && post.vibeTags.some(tag => tag.includes(username || '')))
  );

  const renderPosts = (posts: Post[]) => {
    if (posts.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Grid3X3 className="mx-auto h-12 w-12 mb-2" />
            <p>No posts yet</p>
          </div>
        </div>
      );
    }

    if (viewMode === "grid") {
      return (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {posts.map((post) => (
            <div key={post.id} className="mb-4">
              <PostCard post={post} comments={getPostComments(post.id)} />
            </div>
          ))}
        </Masonry>
      );
    }

    return (
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} comments={getPostComments(post.id)} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          <UserProfileHeader user={user} />
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="posts" className="flex items-center gap-2">
                    <Grid3X3 className="h-4 w-4" />
                    Posts ({userPosts.length})
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Saved ({savedPosts.length})
                  </TabsTrigger>
                  <TabsTrigger value="tagged" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Tagged ({taggedPosts.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="posts">
                {renderPosts(userPosts)}
              </TabsContent>
              
              <TabsContent value="saved">
                {renderPosts(savedPosts)}
              </TabsContent>
              
              <TabsContent value="tagged">
                {renderPosts(taggedPosts)}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
