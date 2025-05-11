import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from 'lucide-react';

// Update the venueInsights prop type to match the actual structure
interface Props {
  venueInsights: {
    visitors: number;
    visitorsChange: number;
    posts: number;
    postsChange: number;
    likes: number;
    likesChange: number;
    mentions: number;
    mentionsChange: number;
    checkins: number;
    checkinsChange: number;
    reviews: number;
    reviewsChange: number;
    rating: number;
    ratingChange: number;
  };
}

const PerformanceMetrics: React.FC<Props> = ({ venueInsights }) => {
  const {
    visitors,
    visitorsChange,
    posts,
    postsChange,
    likes,
    likesChange,
    mentions,
    mentionsChange,
    checkins,
    checkinsChange,
    reviews,
    reviewsChange,
    rating,
    ratingChange,
  } = venueInsights;

  const getChangeIndicator = (change: number) => {
    const isPositive = change > 0;
    const Icon = isPositive ? ArrowUp : ArrowDown;
    const colorClass = isPositive ? 'text-green-500' : 'text-red-500';
    const changeText = `${Math.abs(change)}%`;

    return (
      <div className="flex items-center">
        <Icon className={`h-4 w-4 ${colorClass} mr-1`} />
        <span className={colorClass}>{changeText}</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Visitors</CardTitle>
          <CardDescription>Total number of visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{visitors}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {getChangeIndicator(visitorsChange)}
            <span>vs. last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>Number of posts mentioning the venue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{posts}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {getChangeIndicator(postsChange)}
            <span>vs. last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Likes</CardTitle>
          <CardDescription>Total number of likes on posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{likes}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {getChangeIndicator(likesChange)}
            <span>vs. last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mentions</CardTitle>
          <CardDescription>Number of times the venue was mentioned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mentions}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {getChangeIndicator(mentionsChange)}
            <span>vs. last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Check-ins</CardTitle>
          <CardDescription>Number of check-ins at the venue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{checkins}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {getChangeIndicator(checkinsChange)}
            <span>vs. last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>Number of reviews received</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{reviews}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {getChangeIndicator(reviewsChange)}
            <span>vs. last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rating</CardTitle>
          <CardDescription>Average rating of the venue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{rating}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {getChangeIndicator(ratingChange)}
            <span>vs. last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
