
import React from "react";
import { Post } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface PostCardGridProps {
  posts: Post[];
}

const PostCardGrid: React.FC<PostCardGridProps> = ({ posts }) => {
  const navigate = useNavigate();

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  // Function to get media URL from post
  const getMediaUrl = (post: Post) => {
    if (!post.media || post.media.length === 0) return null;
    
    const firstMedia = post.media[0];
    
    if (typeof firstMedia === "string") {
      return firstMedia;
    } else if (typeof firstMedia === "object" && firstMedia !== null) {
      return firstMedia.url;
    }
    
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Card 
          key={post.id} 
          className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
          onClick={() => handlePostClick(post.id)}
        >
          <div className="aspect-square relative overflow-hidden">
            {getMediaUrl(post) ? (
              <img 
                src={getMediaUrl(post)} 
                alt={post.content?.substring(0, 20) || "Post image"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center p-4">
                <p className="text-sm text-center line-clamp-6">
                  {post.content || post.text || "No content"}
                </p>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="text-white text-sm font-medium line-clamp-2">
                {post.location?.name}
              </div>
            </div>
          </div>
          
          <CardContent className="p-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">
                {post.user?.name || post.author?.name || "Unknown user"}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>❤️ {post.likes || 0}</span>
                <span>💬 {Array.isArray(post.comments) ? post.comments.length : post.comments || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostCardGrid;
