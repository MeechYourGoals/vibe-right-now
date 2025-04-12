import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { comments } from '@/mock/data';
import PostCard from '@/components/post/PostCard';
import { Skeleton } from '@/components/ui/skeleton';

interface PostFeedProps {
  posts: Post[];
  loading: boolean;
}

const PostFeed: React.FC<PostFeedProps> = ({ posts, loading }) => {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(3); // Initial number of posts to display

  useEffect(() => {
    if (posts) {
      setDisplayedPosts(posts.slice(0, visiblePosts));
    }
  }, [posts, visiblePosts]);

  const loadMorePosts = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 3); // Load 3 more posts
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-full h-40" />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div>
      <div className="space-y-4">
        {displayedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {displayedPosts.length < posts.length && (
        <div className="flex justify-center mt-4">
          <button onClick={loadMorePosts} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
