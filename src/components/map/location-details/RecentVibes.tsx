
import { useEffect, useState } from "react";
import { Location, Post } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { formatTimeAgo } from "@/utils/timeUtils";

interface RecentVibesProps {
  location: Location;
}

// Helper to create valid Post objects from minimal data
const createPost = (data: Partial<Post>): Post => {
  return {
    id: data.id || '',
    content: data.content || '',
    timestamp: data.timestamp || new Date().toISOString(),
    likes: data.likes || 0,
    comments: data.comments || 0,
    authorId: data.authorId || '',
    locationId: data.locationId || '',
    media: data.media || undefined,
    location: data.location || null, // Required field for Post
    vibeTags: data.vibeTags || [],
    isPinned: data.isPinned || false,
    isVenuePost: data.isVenuePost || false,
    saved: data.saved || false
  };
};

const RecentVibes = ({ location }: RecentVibesProps) => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would fetch from an API
        // For now, we'll generate mock data
        const mockPosts: Post[] = Array(3).fill(null).map((_, i) => createPost({
          id: `mock-${location.id}-${i}`,
          content: `Check out ${location.name}! ${i === 0 ? 'Great vibes tonight!' : i === 1 ? 'Amazing atmosphere!' : 'Love this place!'}`,
          timestamp: new Date(Date.now() - i * 3600000).toISOString(),
          likes: Math.floor(Math.random() * 50),
          comments: Math.floor(Math.random() * 10),
          authorId: `user-${i + 1}`,
          locationId: location.id,
          media: i === 0 ? [{ type: 'image', url: 'https://picsum.photos/400/300' }] : undefined,
          location: location, // Required for Post type
          isPinned: false,
          isVenuePost: true,
          saved: false,
          vibeTags: ['fun', 'energetic']
        }));
        
        setRecentPosts(mockPosts);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (location?.id) {
      fetchRecentPosts();
    }
  }, [location]);

  if (isLoading) {
    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Recent Vibes</h3>
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-12 rounded-md bg-muted animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!recentPosts.length) {
    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Recent Vibes</h3>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">No recent vibes at this location.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Recent Vibes</h3>
      <div className="space-y-2">
        {recentPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-3">
              <p className="text-xs truncate">{post.content}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatTimeAgo(post.timestamp)} • {post.likes} likes
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentVibes;
