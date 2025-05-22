
import { useState } from "react";
import { mockPosts } from "@/mock/posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Ticket, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Media, Post } from "@/types";

const DiscountLocations = () => {
  const navigate = useNavigate();
  // Filter posts with discount offers (posts 29-32 are our discount posts)
  const discountPosts = mockPosts.filter(post => 
    ["29", "30", "31", "32"].includes(post.id)
  ).slice(0, 3); // Only show first 3 in the sidebar
  
  // Helper function to get media URL
  const getMediaUrl = (media: Media[] | string[] | undefined): string => {
    if (!media || media.length === 0) {
      return `https://source.unsplash.com/random/200x200/?venue`;
    }
    
    const firstMedia = media[0];
    if (typeof firstMedia === 'string') {
      return firstMedia;
    } else if (typeof firstMedia === 'object' && firstMedia !== null) {
      return firstMedia.url;
    }
    
    return `https://source.unsplash.com/random/200x200/?venue`;
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center">
            <Tag className="h-5 w-5 mr-2" />
            <span>Currently Offering Discounts</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {discountPosts.map((post) => (
            <div 
              key={post.id} 
              className="p-3 border rounded-lg flex justify-between items-start hover:bg-accent/10 transition-colors"
            >
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={getMediaUrl(post.media) || `https://source.unsplash.com/random/200x200/?venue`} 
                    alt={post.location.name} 
                  />
                  <AvatarFallback>{post.location.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.location.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {post.location.city}, {post.location.state}
                  </div>
                  <div className="mt-1">
                    <Badge variant="secondary" className="text-xs">
                      <Ticket className="h-3 w-3 mr-1" />
                      {(post.content || post.text || "").includes("FREE TICKETS") ? "Free Tickets" :
                        (post.content || post.text || "").includes("FREE COVER") ? "Free Entry" :
                        (post.content || post.text || "").includes("FREE pastry") ? "Free Item w/ Purchase" :
                        "VIP Access"}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8" 
                onClick={() => navigate(`/venue/${post.location.id}`)}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/discounts')}
          >
            View All Discounts
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscountLocations;
