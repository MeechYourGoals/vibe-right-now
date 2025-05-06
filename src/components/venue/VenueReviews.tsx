
import React from 'react';
import { Venue } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface VenueReviewsProps {
  venue: Venue;
}

interface ReviewType {
  id: string;
  authorId: string;
  content: string;
  rating: number;
  timestamp: string;
  likes: number;
  author: {
    name: string;
    username: string;
    avatar: string;
  }
}

const VenueReviews: React.FC<VenueReviewsProps> = ({ venue }) => {
  const mockReviews: ReviewType[] = [
    {
      id: '1',
      authorId: 'user1',
      content: 'Amazing experience! The staff was incredibly friendly and the atmosphere was perfect. Would definitely recommend to anyone visiting the area.',
      rating: 5,
      timestamp: '2023-10-15T14:30:00Z',
      likes: 7,
      author: {
        name: 'Sarah Johnson',
        username: 'sarahj',
        avatar: 'https://i.pravatar.cc/150?img=5'
      }
    },
    {
      id: '2',
      authorId: 'user2',
      content: 'Good place overall, but the service was a bit slow during peak hours. The quality of food makes up for it though.',
      rating: 4,
      timestamp: '2023-09-22T18:45:00Z',
      likes: 3,
      author: {
        name: 'Michael Chen',
        username: 'mikechen',
        avatar: 'https://i.pravatar.cc/150?img=8'
      }
    },
    {
      id: '3',
      authorId: 'user3',
      content: 'Nice place with good vibes. Prices are reasonable for what you get.',
      rating: 4,
      timestamp: '2023-08-05T20:10:00Z',
      likes: 2,
      author: {
        name: 'Alex Rivera',
        username: 'alexr',
        avatar: 'https://i.pravatar.cc/150?img=12'
      }
    }
  ];
  
  const ratingDistribution = {
    5: 65,
    4: 20,
    3: 10,
    2: 3,
    1: 2
  };
  
  const calculateAverageRating = (reviews: ReviewType[]): number => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };
  
  const averageRating = venue.rating || calculateAverageRating(mockReviews);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Reviews</span>
          <Button size="sm">Write a Review</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star}
                  className={`h-4 w-4 ${star <= Math.round(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{mockReviews.length} reviews</div>
          </div>
          
          <div className="space-y-1 flex-1 ml-8">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center">
                <div className="text-sm w-3">{rating}</div>
                <Star className="h-3 w-3 text-yellow-500 ml-1 mr-2" />
                <Progress value={ratingDistribution[rating as keyof typeof ratingDistribution]} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground ml-2 w-8">
                  {ratingDistribution[rating as keyof typeof ratingDistribution]}%
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {mockReviews.map(review => (
            <div key={review.id} className="border-t pt-4">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={review.author.avatar} alt={review.author.name} />
                    <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.author.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(review.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm">{review.content}</p>
              <div className="mt-2 flex items-center">
                <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
                  <ThumbsUp className="h-3 w-3 mr-1" /> {review.likes}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VenueReviews;
