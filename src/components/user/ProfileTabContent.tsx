
import React from "react";
import PostCard from "@/components/post/PostCard";
import { Card } from "@/components/ui/card";
import { Grid2X2, List } from "lucide-react";
import { Post, Comment } from "@/types";

interface ProfileTabContentProps {
  activeTab: string;
  viewMode: "list" | "grid";
  userPosts: Post[];
  getComments: (postId: string) => Comment[];
}

const ProfileTabContent = ({ 
  activeTab, 
  viewMode, 
  userPosts, 
  getComments 
}: ProfileTabContentProps) => {
  const renderEmptyState = () => (
    <div className="text-center py-12">
      <p className="text-muted-foreground">
        {activeTab === "posts" && "No posts yet"}
        {activeTab === "liked" && "No liked posts"}
        {activeTab === "saved" && "No popular posts"}
      </p>
    </div>
  );

  const renderPosts = (posts: Post[]) => {
    if (posts.length === 0) {
      return renderEmptyState();
    }

    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-4">
              <div className="aspect-square bg-muted rounded-lg mb-2" />
              <p className="text-sm line-clamp-2">{post.content}</p>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard 
            key={post.id}
            post={post}
          />
        ))}
      </div>
    );
  };

  const getPostsForTab = () => {
    switch (activeTab) {
      case "posts":
        return userPosts;
      case "liked":
        return []; // Would be filtered from user's liked posts
      case "saved":
        return userPosts.filter(post => (post.likes || 0) > 10); // Mock popular posts
      default:
        return [];
    }
  };

  return renderPosts(getPostsForTab());
};

export default ProfileTabContent;
