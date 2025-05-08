
export interface VenueInsights {
  id: string;
  name: string;
  visitors: number;
  engagement: number;
  revenue: number;
  satisfaction: number;
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
