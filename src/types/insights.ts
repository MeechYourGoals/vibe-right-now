
export interface VenueInsights {
  id: string;
  name: string;
  visitors: number;
  visitorsChange?: number;
  engagement: number;
  engagementChange?: number;
  revenue: number;
  revenueChange?: number;
  satisfaction: number;
  satisfactionChange?: number;
  posts?: number;
  postsChange?: number;
  likes?: number;
  likesChange?: number;
  comments?: number;
  commentsChange?: number;
  followers?: number;
  followersChange?: number;
  shares?: number;
  sharesChange?: number;
  date: string;
}

export interface WeeklyData {
  date: string;
  visitors: number;
  engagement: number;
  revenue: number;
}

export interface TrendData {
  name: string;
  data: number[];
}
