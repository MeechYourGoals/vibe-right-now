
import React, { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Grid3X3, LayoutList, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location, Post, Comment } from "@/types";
import PostItem from "@/components/PostItem";
import PostCardGrid from "@/components/PostCardGrid";
import VenuePost from "@/components/VenuePost";
import { getVenueContent } from "@/utils/venue/venueContentHelpers";
import { Badge } from "@/components/ui/badge";
import ReviewSummary from "@/components/venue/ReviewSummary";

interface VenuePostsContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  allPosts: Post[];
  filteredPosts: Post[];
  generatedVenuePosts: Post[];
  selectedDays: number[];
  venue: Location;
  getPostComments: (postId: string) => Comment[];
}

const VenuePostsContent: React.FC<VenuePostsContentProps> = ({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  allPosts,
  filteredPosts,
  generatedVenuePosts,
  selectedDays,
  venue,
  getPostComments
}) => {
  const [reviewSummary, setReviewSummary] = useState<string | null>(null);

  // Generate mock reviews based on venue id to ensure consistency
  const mockReviews = useMemo(() => {
    const reviewCount = parseInt(venue.id) % 10 + 5; // 5-14 reviews based on venue id
    const reviews = [];
    
    for (let i = 0; i < reviewCount; i++) {
      const rating = 3 + (parseInt(venue.id.charAt(i % venue.id.length)) % 3); // Ratings between 3-5
      
      reviews.push({
        author_name: `Reviewer ${i + 1}`,
        rating,
        text: `This ${venue.type} has ${rating >= 4 ? 'great' : 'decent'} service and ${
          rating >= 4 ? 'excellent' : 'good'
        } atmosphere. ${rating === 5 ? 'Highly recommended!' : 'Worth checking out.'}`,
        time: Date.now() - (i * 86400000) // Staggered over the past few days
      });
    }
    
    return reviews;
  }, [venue.id, venue.type]);

  const handleSummaryGenerated = (summary: string) => {
    setReviewSummary(summary);
  };

  return (
    <div className="mt-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="user">User Posts</TabsTrigger>
            <TabsTrigger value="venue">Venue Posts</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews
              <Badge variant="outline" className="ml-2 bg-primary/10 text-xs">
                New
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="h-4 w-4" />
              <span className="sr-only">List View</span>
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid View</span>
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-4 space-y-6">
          {allPosts.length > 0 ? (
            viewMode === "list" ? (
              <div className="space-y-6">
                {allPosts.map((post) => (
                  <VenuePost
                    key={post.id}
                    venue={venue}
                    content={post.content}
                    media={post.media}
                    timestamp={post.timestamp}
                  />
                ))}
              </div>
            ) : (
              <PostCardGrid posts={allPosts} />
            )
          ) : (
            <p className="text-center text-muted-foreground py-10">
              No posts available for this venue. Be the first to post!
            </p>
          )}
        </TabsContent>
        
        <TabsContent value="user" className="mt-4 space-y-6">
          {filteredPosts.length > 0 ? (
            viewMode === "list" ? (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <PostItem
                    key={post.id}
                    post={post}
                    comments={getPostComments(post.id)}
                  />
                ))}
              </div>
            ) : (
              <PostCardGrid posts={filteredPosts} />
            )
          ) : (
            <p className="text-center text-muted-foreground py-10">
              No user posts available for this venue. Be the first to post!
            </p>
          )}
        </TabsContent>
        
        <TabsContent value="venue" className="mt-4 space-y-6">
          {generatedVenuePosts.length > 0 ? (
            viewMode === "list" ? (
              <div className="space-y-6">
                {generatedVenuePosts.map((post) => (
                  <VenuePost
                    key={post.id}
                    venue={venue}
                    content={post.content || getVenueContent(venue, new Date(post.timestamp))}
                    media={post.media}
                    timestamp={post.timestamp}
                    isPinned={post.isPinned}
                    isVenuePost={true}
                  />
                ))}
              </div>
            ) : (
              <PostCardGrid posts={generatedVenuePosts} />
            )
          ) : (
            <p className="text-center text-muted-foreground py-10">
              No venue posts available yet. Check back later!
            </p>
          )}
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-4">
          <div className="mb-6">
            <ReviewSummary 
              venue={venue}
              reviews={mockReviews} 
              onSummaryGenerated={handleSummaryGenerated}
            />
          </div>
          
          <div className="space-y-4">
            {mockReviews.map((review, index) => (
              <div key={index} className="p-4 border rounded-lg bg-background">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{review.author_name}</div>
                  <div className="flex items-center">
                    <span className="text-amber-500 mr-1">{review.rating}</span>
                    <Sparkles className="h-3 w-3 text-amber-500" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.text}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  {new Date(review.time).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VenuePostsContent;
