
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Star } from "lucide-react";

interface VenueInsights {
  visitors: number;
  visitorsChange: number;
  posts: number;
  postsChange: number;
  likes: number;
  likesChange: number;
  mentions?: number;
  mentionsChange?: number;
  checkins?: number;
  checkinsChange?: number;
  reviews?: number;
  reviewsChange?: number;
  rating?: number;
  ratingChange?: number;
}

interface PerformanceMetricsProps {
  venueInsights: VenueInsights;
}

const PerformanceMetrics = ({ venueInsights }: PerformanceMetricsProps) => {
  const metrics = [
    {
      title: "Visitors",
      value: venueInsights.visitors,
      change: venueInsights.visitorsChange,
      icon: Users,
      description: "Total number of visitors"
    },
    {
      title: "Posts",
      value: venueInsights.posts,
      change: venueInsights.postsChange,
      icon: MessageCircle,
      description: "Number of posts mentioning the venue"
    },
    {
      title: "Likes",
      value: venueInsights.likes,
      change: venueInsights.likesChange,
      icon: Heart,
      description: "Total number of likes on posts"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white text-lg">
              <metric.icon className="mr-2 h-5 w-5 text-blue-400" />
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-neutral-400">{metric.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-white">{metric.value.toLocaleString()}</span>
                <div className={`flex items-center ${metric.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <p className="text-xs text-neutral-500">vs. last month</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceMetrics;
