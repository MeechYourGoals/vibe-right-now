
import { useState } from "react";
import { Link } from "react-router-dom";
import { Post, Comment } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare, Users, ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/hooks/use-toast";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostUsersList from "./PostUsersList";

interface PostCardProps {
  posts: Post[];
  locationPostCount?: number; // Number of posts at this location in the last 24h
  getComments?: (postId: string) => Comment[]; // Function to get comments for a post
}

const PostCard = ({ posts, locationPostCount = 1, getComments }: PostCardProps) => {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(
    posts.reduce((acc, post) => ({ ...acc, [post.id]: post.likes }), {})
  );
  const [isOpen, setIsOpen] = useState(false);
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [expandedMedia, setExpandedMedia] = useState<string | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [followedVenues, setFollowedVenues] = useState<Record<string, boolean>>({});

  const mainPost = posts[0];
  // Ensure location is defined before using it
  if (!mainPost || !mainPost.location) {
    console.error("Post or location is undefined:", mainPost);
    return null;
  }

  const location = mainPost.location;
  const isSinglePost = posts.length === 1;

  const handleLike = (postId: string) => {
    const isLiked = likedPosts[postId] || false;
    setLikedPosts({ ...likedPosts, [postId]: !isLiked });
    
    if (isLiked) {
      setLikeCounts({ ...likeCounts, [postId]: likeCounts[postId] - 1 });
    } else {
      setLikeCounts({ ...likeCounts, [postId]: likeCounts[postId] + 1 });
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments({ 
      ...showComments, 
      [postId]: !showComments[postId] 
    });
  };

  const handleFollowVenue = () => {
    const isFollowed = followedVenues[location.id] || false;
    setFollowedVenues({ ...followedVenues, [location.id]: !isFollowed });
    
    if (isFollowed) {
      toast({
        title: "Unfollowed",
        description: `You are no longer following ${location.name}`,
      });
    } else {
      toast({
        title: "Following!",
        description: `You are now following ${location.name}`,
      });
    }
  };

  const displayedPosts = showAllPosts ? posts : posts.slice(0, 4);
  const hasMorePosts = posts.length > 4;
  const isFollowed = followedVenues[location.id] || false;

  return (
    <div className="vibe-card overflow-hidden mb-4">
      <PostHeader 
        location={location} 
        isFollowed={isFollowed}
        onFollowVenue={handleFollowVenue}
        locationPostCount={locationPostCount}
        mainPost={mainPost}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setShowAllUsers={setShowAllUsers}
      />
      
      <PostContent 
        location={location}
        posts={posts}
        displayedPosts={displayedPosts}
        showAllPosts={showAllPosts}
        setShowAllPosts={setShowAllPosts}
        hasMorePosts={hasMorePosts}
        isSinglePost={isSinglePost}
        showComments={showComments}
        toggleComments={toggleComments}
        likeCounts={likeCounts}
        likedPosts={likedPosts}
        handleLike={handleLike}
        getComments={getComments}
      />
      
      <PostFooter location={location} posts={posts} displayedPosts={displayedPosts} />
      
      {showAllUsers && (
        <PostUsersList location={location} setShowAllUsers={setShowAllUsers} />
      )}
    </div>
  );
};

export default PostCard;
