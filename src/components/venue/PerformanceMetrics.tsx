
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Heart, MapPin, Star, Calendar } from "lucide-react";

interface VenueInsights {
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
}

interface PerformanceMetricsProps {
  venueInsights: VenueInsights;
}

const PerformanceMetrics = ({ venueInsights }: PerformanceMetricsProps) => {
  const formatChange = (change: number) => {
    const sign = change > 0 ? "+" : "";
    return `${sign}${change}%`;
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? "text-green-400" : "text-red-400";
  };

  const metrics = [
    {
      title: "Visitors",
      value: venueInsights.visitors.toLocaleString(),
      change: venueInsights.visitorsChange,
      icon: Users,
      description: "Total number of visitors"
    },
    {
      title: "Posts", 
      value: venueInsights.posts.toString(),
      change: venueInsights.postsChange,
      icon: MessageSquare,
      description: "Number of posts mentioning the venue"
    },
    {
      title: "Likes",
      value: venueInsights.likes.toLocaleString(),
      change: venueInsights.likesChange,
      icon: Heart,
      description: "Total number of likes on posts"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-neutral-800/80 border-neutral-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg flex items-center">
              <metric.icon className="h-5 w-5 mr-2 text-teal-400" />
              {metric.title}
            </CardTitle>
            <p className="text-neutral-400 text-sm">{metric.description}</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {metric.value}
            </div>
            <div className={`text-sm ${getChangeColor(metric.change)}`}>
              {formatChange(metric.change)} vs. last month
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceMetrics;
