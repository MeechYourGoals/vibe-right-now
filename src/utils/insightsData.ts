
import { VenueInsights, WeeklyData, TrendData } from '@/types/insights';

// Current insights data
export const currentInsights: VenueInsights[] = [
  {
    id: '1',
    name: 'The Vibe Bar',
    visitors: 1245,
    engagement: 78,
    revenue: 15400,
    satisfaction: 92,
    date: '2023-10-15'
  },
  {
    id: '2',
    name: 'Rhythm Lounge',
    visitors: 980,
    engagement: 65,
    revenue: 12300,
    satisfaction: 88,
    date: '2023-10-15'
  },
  {
    id: '3',
    name: 'Beats Club',
    visitors: 1540,
    engagement: 82,
    revenue: 18200,
    satisfaction: 94,
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
