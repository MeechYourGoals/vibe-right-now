
import { VenueInsights, WeeklyData, TrendData } from '@/types/insights';

// Current insights data
export const currentInsights: VenueInsights[] = [
  {
    id: '1',
    name: 'The Vibe Bar',
    visitors: 1245,
    visitorsChange: 5.2,
    engagement: 78,
    engagementChange: 2.3,
    revenue: 15400,
    revenueChange: 3.7,
    satisfaction: 92,
    satisfactionChange: 1.2,
    posts: 23,
    postsChange: 4.1,
    likes: 543,
    likesChange: 7.8,
    comments: 104,
    commentsChange: 3.2,
    followers: 872,
    followersChange: 2.5,
    shares: 67,
    sharesChange: 5.3,
    date: '2023-10-15'
  },
  {
    id: '2',
    name: 'Rhythm Lounge',
    visitors: 980,
    visitorsChange: 3.1,
    engagement: 65,
    engagementChange: 1.5,
    revenue: 12300,
    revenueChange: 2.9,
    satisfaction: 88,
    satisfactionChange: 0.8,
    posts: 18,
    postsChange: 3.4,
    likes: 412,
    likesChange: 6.2,
    comments: 87,
    commentsChange: 2.1,
    followers: 654,
    followersChange: 1.8,
    shares: 49,
    sharesChange: 4.2,
    date: '2023-10-15'
  },
  {
    id: '3',
    name: 'Beats Club',
    visitors: 1540,
    visitorsChange: 7.3,
    engagement: 82,
    engagementChange: 3.8,
    revenue: 18200,
    revenueChange: 5.2,
    satisfaction: 94,
    satisfactionChange: 1.5,
    posts: 28,
    postsChange: 5.7,
    likes: 687,
    likesChange: 9.3,
    comments: 132,
    commentsChange: 4.8,
    followers: 1042,
    followersChange: 3.6,
    shares: 82,
    sharesChange: 6.7,
    date: '2023-10-15'
  }
];

// Generate weekly data for charts
export const generateWeeklyData = (): WeeklyData[] => {
  const today = new Date();
  const data: WeeklyData[] = [];

  // Generate data for the past 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      visitors: Math.floor(Math.random() * 500) + 800,
      engagement: Math.floor(Math.random() * 30) + 60,
      revenue: Math.floor(Math.random() * 5000) + 10000
    });
  }

  return data;
};

// Format trend data for charts
export const formatTrendData = (weeklyData: WeeklyData[]): TrendData[] => {
  return [
    {
      name: 'Visitors',
      data: weeklyData.map(item => item.visitors)
    },
    {
      name: 'Engagement',
      data: weeklyData.map(item => item.engagement)
    },
    {
      name: 'Revenue',
      data: weeklyData.map(item => item.revenue / 100) // Scale down for better visualization
    }
  ];
};
