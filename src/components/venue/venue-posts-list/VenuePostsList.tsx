
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Verified from "@/components/Verified";
import { Post } from "@/types";
import PostCard from "@/components/post/PostCard";

interface VenuePostsListProps {
  posts: Post[];
}

const VenuePostsList = ({ posts }: VenuePostsListProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onComment={(postId, comment) => console.log('Comment added:', postId, comment)}
            onLike={(postId) => console.log('Post liked:', postId)}
            onShare={(postId) => console.log('Post shared:', postId)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default VenuePostsList;
