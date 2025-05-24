
import React, { useState, useEffect } from 'react';
import { Post, Comment } from "@/types";
import PostCard from "@/components/post/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ProfileTabContentProps {
  posts: Post[];
  locationPostCount: number;
  getComments: (postId: string) => Comment[];
}

const ProfileTabContent = ({ 
  posts, 
  locationPostCount, 
  getComments 
}: ProfileTabContentProps) => {
  const [activeTab, setActiveTab] = useState("recent");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    filterPosts(activeTab);
  }, [activeTab, posts]);

  const filterPosts = (tab: string) => {
    if (tab === "recent") {
      setFilteredPosts([...posts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } else if (tab === "popular") {
      setFilteredPosts([...posts].sort((a, b) => b.likes - a.likes));
    } else if (tab === "location") {
      setFilteredPosts(posts.filter(post => post.location));
    }
  };

  const handleComment = (postId: string, comment: string) => {
    console.log('Comment added:', postId, comment);
  };

  const handleLike = (postId: string) => {
    console.log('Post liked:', postId);
  };

  const handleShare = (postId: string) => {
    console.log('Post shared:', postId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="recent" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="location">
              Location <Badge variant="secondary">{locationPostCount}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostCard 
            key={post.id}
            post={post}
            onComment={handleComment}
            onLike={handleLike}
            onShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileTabContent;
