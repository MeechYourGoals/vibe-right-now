
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Location, Post } from "@/types";
import PostItem from '@/components/PostItem';
import PostCardGrid from '@/components/PostCardGrid';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockPosts } from '@/mock/data';

interface VenuePostsContentProps {
  venue: Location;
  posts: Post[];
  reviewsCount?: number;
}

const VenuePostsContent = ({ venue, posts, reviewsCount = 0 }: VenuePostsContentProps) => {
  const [activeTab, setActiveTab] = useState("vibes");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  
  // Simulate reviews tab data
  const reviews = posts.filter((post) => post.content.includes("review") || post.content.length > 100).slice(0, 5);
  
  // Sort posts by pinned status and then by timestamp (most recent first)
  const sortedPosts = [...posts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  const pinnedPosts = sortedPosts.filter(post => post.isPinned);
  const regularPosts = sortedPosts.filter(post => !post.isPinned);
  
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsPostDialogOpen(true);
  };
  
  // Mock AI summary for reviews
  const reviewSummary = 
    "Based on 32 recent reviews, visitors love the atmosphere and cocktails at this venue. Many praise the DJ's music selection and friendly staff, though some mention it gets crowded after 10pm on weekends. Overall sentiment is very positive (4.6/5) with recommendations to arrive early to get a good spot.";

  return (
    <div className="mt-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full border-b mb-4">
          <TabsTrigger value="vibes" className="flex-1">Vibes</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews {reviewsCount > 0 && `(${reviewsCount})`}</TabsTrigger>
          <TabsTrigger value="photos" className="flex-1">Photos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vibes" className="mt-0">
          {pinnedPosts.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Pinned</h3>
              {pinnedPosts.map(post => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
          )}
          
          {regularPosts.length > 0 ? (
            <>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Latest Vibes</h3>
              <PostCardGrid 
                posts={regularPosts} 
                onPostClick={handlePostClick} 
                columns={3} 
              />
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts yet. Be the first to share the vibe!</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-0">
          <div className="bg-muted/30 p-4 rounded-lg mb-4">
            <h3 className="font-medium mb-2">AI Review Summary</h3>
            <p className="text-sm">{reviewSummary}</p>
          </div>
          
          {reviews.length > 0 ? (
            <div>
              {reviews.map(review => (
                <PostItem key={review.id} post={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="photos" className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {posts.filter(post => post.media && post.media.length > 0).map(post => (
              <div 
                key={post.id}
                className="aspect-square rounded-md overflow-hidden cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                {post.media && post.media.length > 0 && (
                  post.media[0].type === "image" ? (
                    <img 
                      src={post.media[0].url} 
                      alt="Venue" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video 
                      src={post.media[0].url} 
                      className="w-full h-full object-cover"
                    />
                  )
                )}
              </div>
            ))}
          </div>
          
          {posts.filter(post => post.media && post.media.length > 0).length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No photos available yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Post</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <PostItem post={selectedPost} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VenuePostsContent;
