
import React from 'react';
import { Venue } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateMockUserData } from "@/mock/mockUserData";

interface VenueReviewsProps {
  venue: Venue;
}

interface MockReview {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorImage: string;
  content: string;
  rating: number;
  date: string;
}

const VenueReviews: React.FC<VenueReviewsProps> = ({ venue }) => {
  // Generate some mock reviews
  const mockReviews: MockReview[] = Array.from({ length: 3 }, (_, i) => {
    const user = generateMockUserData();
    return {
      id: `review-${i + 1}`,
      authorId: user.id,
      authorName: user.name,
      authorUsername: user.username,
      authorImage: user.image || `https://i.pravatar.cc/150?img=${i + 10}`,
      content: [
        "Great place! The atmosphere was amazing and the service was top-notch.",
        "Really enjoyed my time here. Would definitely recommend to friends.",
        "Nice spot for hanging out. The vibe was really good, especially in the evening.",
      ][i],
      rating: 3 + Math.floor(Math.random() * 3),
      date: new Date(Date.now() - (i + 1) * 86400000 * 3).toLocaleDateString()
    };
  });
  
  // Calculate average rating
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Reviews</CardTitle>
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span className="ml-1 font-medium">{averageRating.toFixed(1)}</span>
          <span className="ml-1 text-muted-foreground">({mockReviews.length})</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockReviews.map(review => (
            <div key={review.id} className="border-b pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={review.authorImage} alt={review.authorName} />
                    <AvatarFallback>{review.authorName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.authorName}</div>
                    <div className="text-xs text-muted-foreground">{review.date}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm">{review.content}</p>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4" variant="outline">
          <MessageCircle className="h-4 w-4 mr-2" />
          Write a Review
        </Button>
      </CardContent>
    </Card>
  );
};

export default VenueReviews;
