
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Post, Comment } from "@/types";
import CommentList from "@/components/CommentList";

interface PostItemProps {
  post: Post;
  comments: Comment[];
}

const PostItem: React.FC<PostItemProps> = ({ post, comments }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes || 0);

  const handleLike = () => {
    if (liked) {
      setLocalLikes(prevLikes => prevLikes - 1);
    } else {
      setLocalLikes(prevLikes => prevLikes + 1);
    }
    setLiked(!liked);
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  // Choose which user property to use
  const user = post.user || post.author;
  
  if (!user) {
    return null;
  }

  const formattedDate = post.timestamp
    ? formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })
    : "";

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={user.avatar || user.image || ""} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium flex items-center">
              {user.name}
              {user.verified && (
                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200 text-[10px]">
                  Verified
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {post.location?.name} · {formattedDate}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <p>{post.content || post.text}</p>
          
          {post.vibeTags && post.vibeTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.vibeTags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-primary/10 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {post.media && post.media.length > 0 && (
          <div className="mb-3 rounded-lg overflow-hidden">
            {Array.isArray(post.media) && post.media.length > 0 ? (
              typeof post.media[0] === "string" ? (
                <img src={post.media[0]} alt="Post" className="w-full h-auto" />
              ) : 'type' in post.media[0] ? (
                post.media[0].type === "video" ? (
                  <video src={post.media[0].url} controls className="w-full h-auto" />
                ) : (
                  <img src={post.media[0].url} alt="Post" className="w-full h-auto" />
                )
              ) : null
            ) : null}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleLike} className={liked ? "text-red-500" : ""}>
              <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-red-500" : ""}`} />
              {localLikes}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShowComments}>
              <MessageCircle className="h-4 w-4 mr-1" />
              {Array.isArray(post.comments) ? post.comments.length : post.comments || 0}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              {post.shares || 0}
            </Button>
          </div>
        </div>

        {showComments && <CommentList postId={post.id} commentsCount={Array.isArray(post.comments) ? post.comments.length : post.comments || 0} />}
      </CardContent>
    </Card>
  );
};

export default PostItem;
