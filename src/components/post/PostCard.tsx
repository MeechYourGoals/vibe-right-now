
import { useState } from "react";
import { Post, Comment } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Share, MapPin, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PostMedia from "./PostMedia";
import CommentItem from "@/components/CommentItem";

interface PostCardProps {
  post: Post;
  onComment: (postId: string, comment: string) => void;
  onLike: (postId: string) => void;
  onShare: (postId: string) => void;
}

const PostCard = ({ post, onComment, onLike, onShare }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  const handleComment = () => {
    if (newComment.trim()) {
      onComment(post.id, newComment);
      setNewComment("");
    }
  };

  // Safely get comment count
  const commentCount = Array.isArray(post.comments) ? post.comments.length : (typeof post.comments === 'number' ? post.comments : 0);
  const commentsArray = Array.isArray(post.comments) ? post.comments : [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.user.profileImage || post.user.avatar} alt={post.user.displayName || post.user.name} />
            <AvatarFallback>{(post.user.displayName || post.user.name || '').charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-sm">@{post.user.username}</h3>
              {post.user.isVerified && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                  ✓
                </Badge>
              )}
              {post.vibedHere && (
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  Vibed Here
                </Badge>
              )}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{timeAgo}</span>
              {post.location && (
                <>
                  <span className="mx-1">•</span>
                  <span>{post.location.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <p className="text-sm">{post.content}</p>
      </div>

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <PostMedia media={post.media} />
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{commentCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare(post.id)}
              className="flex items-center space-x-1"
            >
              <Share className="h-4 w-4" />
              <span className="text-xs">{post.shares}</span>
            </Button>
          </div>
          {post.momentScore && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-medium">{post.momentScore}/10</span>
            </div>
          )}
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-3">
          {commentsArray.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
          
          <div className="mt-3 flex space-x-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
            />
            <Button size="sm" onClick={handleComment}>
              Post
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
