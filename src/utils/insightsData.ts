
import { VenueInsights } from "@/types";

export const generateVenueInsights = (venueId: string): VenueInsights => {
  // Generate base metrics
  const totalViews = Math.floor(Math.random() * 10000);
  const totalVisits = Math.floor(Math.random() * 5000);
  const totalSaves = Math.floor(Math.random() * 2000);
  const totalShares = Math.floor(Math.random() * 1500);
  const averageRating = parseFloat((Math.random() * 4 + 1).toFixed(1)); // Between 1 and 5
  const ratingCount = Math.floor(Math.random() * 500);
  const totalReviews = Math.floor(Math.random() * 800);
  const visitorCount = Math.floor(Math.random() * 6000);
  const checkInCount = Math.floor(Math.random() * 3000);
  const receiptUploads = Math.floor(Math.random() * 1200);
  const discountRedemptions = Math.floor(Math.random() * 900);

  // Generate random daily views for the last 7 days
  const dailyViews: Record<string, number> = {};
  const peakHours: Record<string, number> = {};
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    dailyViews[dateString] = Math.floor(Math.random() * 1500);
  }

  // Generate random peak hours
  for (let hour = 0; hour < 24; hour++) {
    peakHours[hour.toString()] = Math.floor(Math.random() * 300);
  }

  // Required legacy fields
  const visitors = Math.floor(Math.random() * 10000);
  const visitorsChange = Math.floor(Math.random() * 30) - 15; // Between -15% and +15%
  const posts = Math.floor(Math.random() * 500);
  const postsChange = Math.floor(Math.random() * 40) - 10; // Between -10% and +30%
  const engagement = Math.floor(Math.random() * 8000);
  const engagementChange = Math.floor(Math.random() * 25) - 5; // Between -5% and +20%
  const likes = Math.floor(Math.random() * 2000);
  const likesChange = Math.floor(Math.random() * 20) - 5; // Between -5% and +15%
  const comments = Math.floor(Math.random() * 1000);
  const commentsChange = Math.floor(Math.random() * 30) - 10; // Between -10% and +20%

  // Demographics data
  const demographicData = {
    age: {
      '18-24': 25,
      '25-34': 40,
      '35-44': 20,
      '45-54': 10,
      '55+': 5
    },
    gender: {
      'Male': 48,
      'Female': 49,
      'Other': 3
    },
    location: {
      'Local (< 5mi)': 40,
      'City (5-15mi)': 35,
      'Regional (15-50mi)': 20,
      'Tourist (50mi+)': 5
    }
  };

  // Generate some sample top posts
  const topPosts = Array(3).fill(null).map((_, i) => ({
    id: `toppost-${i}-${venueId}`,
    user: {
      id: `user-${i}`,
      username: `user${i}`,
      name: `User ${i}`,
      avatar: `https://i.pravatar.cc/150?u=${i}`
    },
    location: {
      id: venueId,
      name: `Venue ${venueId}`,
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      lat: 40.7128,
      lng: -74.006,
    },
    content: `This is a great place to visit! Highly recommended.`,
    media: [{
      type: "image" as const,
      url: `https://source.unsplash.com/featured/?restaurant/${i}`
    }],
    timestamp: new Date(Date.now() - i * 86400000).toISOString(),
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50)
  }));

  const competitiveInsights = {
    rank: Math.floor(Math.random() * 10) + 1,
    totalCompetitors: 20,
    marketShare: parseFloat((Math.random() * 0.15).toFixed(2)),
    averageCompetitorRating: parseFloat((Math.random() * 4 + 1).toFixed(1))
  };

  const visitorsByTime: Record<string, number> = {};
  const visitorsByDay: Record<string, number> = {};
  
  // Generate visitorsByTime data
  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    visitorsByTime[formattedHour] = Math.floor(Math.random() * 300);
  }
  
  // Generate visitorsByDay data
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  days.forEach(day => {
    visitorsByDay[day] = Math.floor(Math.random() * 500) + 100;
  });

  return {
    // Required legacy fields
    visitors,
    visitorsChange,
    posts,
    postsChange,
    engagement,
    engagementChange,
    likes,
    likesChange,
    comments,
    commentsChange,
    topPosts,
    demographics: {
      ageGroups: demographicData.age,
      gender: demographicData.gender,
      interests: {
        'Food': 35,
        'Drinks': 30,
        'Music': 20,
        'Social': 15
      }
    },
    visitorsByTime,
    visitorsByDay,
    
    // Additional fields
    visitorCount,
    checkInCount,
    receiptUploads,
    discountRedemptions,
    totalViews,
    totalVisits,
    totalSaves,
    totalShares,
    averageRating,
    ratingCount,
    totalReviews,
    dailyViews,
    peakHours,
    demographicData,
    competitiveInsights,
    
    // Charts data
    visitorChart: {
      labels: Object.keys(dailyViews),
      data: Object.values(dailyViews)
    },
    engagementChart: {
      labels: Object.keys(dailyViews),
      data: {
        comments: Array(7).fill(0).map(() => Math.floor(Math.random() * 100)),
        likes: Array(7).fill(0).map(() => Math.floor(Math.random() * 200)),
        shares: Array(7).fill(0).map(() => Math.floor(Math.random() * 50))
      }
    }
  };
};

// Add the missing currentInsights constant
export const currentInsights: VenueInsights = generateVenueInsights('default');

// Add the missing generateWeeklyData function
export const generateWeeklyData = () => {
  const weeklyData = [];
  const categories = ['Photos', 'Videos', 'Stories', 'Events'];
  
  // Generate 7 days of data for each category
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i)); // Last 7 days
    const dayData = {
      date: date.toISOString().split('T')[0],
    };
    
    // Add random values for each category
    categories.forEach(category => {
      dayData[category.toLowerCase()] = Math.floor(Math.random() * 100) + 10;
    });
    
    weeklyData.push(dayData);
  }
  
  return weeklyData;
};
