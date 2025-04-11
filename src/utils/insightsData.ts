
import { VenueInsights } from "@/types";

// Mock data for venue insights
export const getVenueInsights = (): VenueInsights => {
  return {
    id: "venue1",
    venueName: "The Rooftop Bar",
    totalVisits: 1250,
    uniqueVisitors: 864,
    averageRating: 4.7,
    visitorCount: 342,
    checkInCount: 156,
    receiptUploads: 98,
    discountRedemptions: 67,
    totalReviews: 342,
    reviewDistribution: {
      5: 254,
      4: 76,
      3: 8,
      2: 3,
      1: 1
    },
    demographics: {
      gender: {
        male: 48,
        female: 52
      },
      ageGroups: {
        '18-24': 22,
        '25-34': 38,
        '35-44': 25,
        '45-54': 10,
        '55+': 5
      }
    },
    topReasons: [
      { reason: "Ambiance", count: 45 },
      { reason: "Food Quality", count: 38 },
      { reason: "Service", count: 32 },
      { reason: "Value", count: 25 }
    ],
    peakHours: {
      monday: '6-9 PM',
      tuesday: '6-10 PM',
      wednesday: '7-10 PM',
      thursday: '7-11 PM',
      friday: '8 PM-12 AM',
      saturday: '8 PM-1 AM',
      sunday: '2-5 PM'
    },
    visitsByDay: {
      'Monday': 85,
      'Tuesday': 95,
      'Wednesday': 120,
      'Thursday': 145,
      'Friday': 210,
      'Saturday': 250,
      'Sunday': 100
    },
    visitsByHour: {
      '12 PM': 25,
      '1 PM': 30,
      '2 PM': 35,
      '3 PM': 40,
      '4 PM': 60,
      '5 PM': 80,
      '6 PM': 120,
      '7 PM': 150,
      '8 PM': 180,
      '9 PM': 200,
      '10 PM': 180,
      '11 PM': 150
    },
    averageSpend: 35,
    customerLoyalty: {
      repeatCustomers: 32,
      newCustomers: 68
    },
    marketingEffectiveness: {
      socialMedia: 45,
      email: 25,
      ads: 30
    },
    customerFeedback: {
      positive: 89,
      negative: 11
    },
    popularHours: {
      'Monday': 18,
      'Tuesday': 19,
      'Wednesday': 19,
      'Thursday': 20,
      'Friday': 21,
      'Saturday': 22,
      'Sunday': 15
    },
    competitorAnalysis: [
      { name: "Sky Lounge", visitors: 1050, rating: 4.5, distance: 0.5 },
      { name: "Cloud Nine", visitors: 950, rating: 4.2, distance: 0.8 },
      { name: "Elevation Bar", visitors: 1150, rating: 4.6, distance: 1.2 }
    ]
  };
};

// Current insights data for the venue
export const currentInsights: VenueInsights = {
  id: "venue1",
  venueName: "The Rooftop Bar",
  visitorCount: 342,
  checkInCount: 156,
  receiptUploads: 98,
  discountRedemptions: 67,
  averageRating: 4.7,
  totalReviews: 342,
  totalVisits: 1250,
  uniqueVisitors: 864,
  topReasons: [
    { reason: "Ambiance", count: 45 },
    { reason: "Food Quality", count: 38 }
  ],
  demographics: {
    gender: {
      male: 48,
      female: 52
    },
    ageGroups: {
      '18-24': 22,
      '25-34': 38,
      '35-44': 25,
      '45-54': 10,
      '55+': 5
    }
  },
  visitsByDay: {
    'Monday': 85,
    'Tuesday': 95,
    'Wednesday': 120,
    'Thursday': 145,
    'Friday': 210,
    'Saturday': 250,
    'Sunday': 100
  },
  visitsByHour: {
    '12 PM': 25,
    '1 PM': 30,
    '2 PM': 35,
    '3 PM': 40
  },
  engagement: {
    posts: 78,
    shares: 156,
    mentions: 45
  },
  dailyData: [
    { day: 'Mon', visitors: 45 },
    { day: 'Tue', visitors: 52 },
    { day: 'Wed', visitors: 58 },
    { day: 'Thu', visitors: 75 },
    { day: 'Fri', visitors: 87 },
    { day: 'Sat', visitors: 120 },
    { day: 'Sun', visitors: 65 }
  ]
};

// Generate mock weekly data for charts
export const generateWeeklyData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return days.map(day => {
    const baseViews = Math.floor(Math.random() * 50) + 100;
    const baseEngagement = Math.floor(Math.random() * 30) + 50;
    const baseShares = Math.floor(Math.random() * 15) + 10;
    
    return {
      name: day,
      views: baseViews,
      engagement: baseEngagement,
      shares: baseShares
    };
  });
};
