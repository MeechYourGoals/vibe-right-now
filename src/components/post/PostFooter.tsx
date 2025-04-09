
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Post, Location } from "@/types";

interface PostFooterProps {
  location: Location;
  posts: Post[];
  displayedPosts: Post[];
}

const PostFooter: React.FC<PostFooterProps> = ({ location, posts, displayedPosts }) => {
  const getAllMedia = () => {
    const allMedia: { postId: string; media: Post['media'][0]; user: Post['user'] }[] = [];
    
    posts.forEach(post => {
      post.media.forEach(mediaItem => {
        allMedia.push({
          postId: post.id,
          media: mediaItem,
          user: post.user
        });
      });
    });
    
    return allMedia;
  };

  const allMedia = getAllMedia();

  return (
    <CardFooter className="p-4 pt-0 flex justify-between">
      <div className="text-xs text-muted-foreground">
        {allMedia.length} media items from {displayedPosts.length} posts
      </div>
      <Button variant="default" size="sm" asChild>
        <Link to={`/venue/${location.id}`}>View Location</Link>
      </Button>
    </CardFooter>
  );
};

export default PostFooter;
