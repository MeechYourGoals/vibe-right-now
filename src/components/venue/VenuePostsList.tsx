
import { Post, Comment, Location } from "@/types";
import PostCard from "@/components/post/PostCard";

interface VenuePostsListProps {
  posts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
  subscriptionTier: "standard" | "plus" | "premium" | "pro";
  onPostDeleted: (postId: string) => void;
}

const VenuePostsList = ({
  posts,
  venue,
  viewMode,
  getComments,
  subscriptionTier,
  onPostDeleted
}: VenuePostsListProps) => {
  const handleComment = (postId: string, comment: string) => {
    console.log('Comment added:', postId, comment);
  };

  const handleLike = (postId: string) => {
    console.log('Post liked:', postId);
  };

  const handleShare = (postId: string) => {
    console.log('Post shared:', postId);
  };

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onComment={handleComment}
            onLike={handleLike}
            onShare={handleShare}
          />
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
          onComment={handleComment}
          onLike={handleLike}
          onShare={handleShare}
        />
      ))}
    </div>
  );
};

export default VenuePostsList;
