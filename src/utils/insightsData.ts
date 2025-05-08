
// Add the missing property to the type or fix how the object is generated
// This is a partial fix since we don't have direct access to the full file
import { VenueInsights } from "@/types";

// Fix for the error about totalVisits not existing in type 'VenueInsights'
// We'll modify how the insights data is created
export const generateVenueInsights = (): VenueInsights => {
  const visitors = Math.floor(Math.random() * 10000) + 500;
  const posts = Math.floor(Math.random() * 100) + 10;
  const shares = Math.floor(Math.random() * 50) + 5;
  const likes = Math.floor(Math.random() * 200) + 50;
  
  return {
    visitors: visitors,
    visitorsChange: (Math.random() * 30 - 10).toFixed(1),
    posts: posts,
    postsChange: (Math.random() * 20 - 5).toFixed(1),
    shares: shares,
    sharesChange: (Math.random() * 15 - 5).toFixed(1),
    likes: likes,
    likesChange: (Math.random() * 25 - 10).toFixed(1),
    engagementRate: (Math.random() * 10 + 2).toFixed(1),
    followerGrowth: (Math.random() * 15 - 5).toFixed(1),
    clickThroughRate: (Math.random() * 5 + 1).toFixed(1),
    totalVisits: Math.floor(Math.random() * 15000) + 1000,
    revenueImpact: `$${Math.floor(Math.random() * 10000) + 1000}`,
    totalReach: Math.floor(Math.random() * 50000) + 5000,
    impressions: Math.floor(Math.random() * 75000) + 7500,
    viewsPer: Math.floor(Math.random() * 5) + 2
  };
};

// Add missing functions that were referenced in other files
export const generateWeeklyData = () => {
  return Array(7).fill(0).map((_, i) => ({
    day: i,
    visits: Math.floor(Math.random() * 100) + 10,
    engagement: Math.floor(Math.random() * 50) + 5,
  }));
};

export const currentInsights = {
  visitorCount: Math.floor(Math.random() * 1000) + 100,
  engagementRate: (Math.random() * 10 + 2).toFixed(1) + '%',
  followerGrowth: (Math.random() * 15 - 5).toFixed(1) + '%',
  viewCount: Math.floor(Math.random() * 5000) + 500,
};
