import React, { useState } from "react";
import { PostHeader } from "@/components/post/PostHeader";
import { PostContent } from "@/components/post/PostContent";
import PostFooter from "@/components/post/PostFooter";
import { Media, Post } from "@/types";
import PostMedia from "../venue/post-grid-item/PostMedia";

interface PostCardProps {
  posts: Post[];
  locationPostCount?: number;
  getComments: (postId: string) => Comment[];
}

const PostCard = ({ posts, locationPostCount = 1, getComments }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [share, setShare] = useState(false);
  const [save, setSave] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const primaryPost = posts[0];

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleShare = () => {
    setShare(!share);
  };

  const handleSave = () => {
    setSave(!save);
  };

  // Helper function to ensure media is in the correct format
  const ensureMediaFormat = (media: any[]): Media[] => {
    if (!media || media.length === 0) {
      return [];
    }
    
    return media.map(item => {
      if (typeof item === 'string') {
        // Determine type based on extension
        const isVideo = item.endsWith('.mp4') || item.endsWith('.mov') || item.endsWith('.avi');
        return {
          type: isVideo ? 'video' : 'image',
          url: item
        };
      } else if (typeof item === 'object' && item !== null && 'type' in item && 'url' in item) {
        // Already in correct format
        return item as Media;
      }
      
      // Default fallback
      return {
        type: 'image' as const,
        url: 'https://via.placeholder.com/500'
      };
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      <PostHeader 
        user={primaryPost.user} 
        location={primaryPost.location} 
        timestamp={primaryPost.timestamp}
        locationPostCount={locationPostCount}
        isSponsored={primaryPost.isSponsored}
        sponsorInfo={primaryPost.sponsorInfo}
      />
      
      <PostContent content={primaryPost.content} />
      
      {ensureMediaFormat(primaryPost.media).length > 0 && (
        <PostMedia media={ensureMediaFormat(primaryPost.media)} />
      )}
      
      <PostFooter 
        post={primaryPost}
        comments={getComments(primaryPost.id)}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
        onSave={handleSave}
        showComments={showComments}
        setShowComments={setShowComments}
      />
    </div>
  );
};

export default PostCard;
