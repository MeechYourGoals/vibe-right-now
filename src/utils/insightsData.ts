
import { VenueInsights } from "@/types";

export const generateVenueInsights = (venueId: string): VenueInsights => {
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

  const dailyViews: Record<string, number> = {};
  const peakHours: Record<string, number> = {};

  // Generate random daily views for the last 7 days
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

  // Create demographic data with proper structure
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
    },
    // Add ageGroups as an additional property (optional)
    ageGroups: {
      '18-24': 25,
      '25-34': 40,
      '35-44': 20,
      '45-54': 10,
      '55+': 5
    }
  };

  const competitiveInsights = {
    rank: Math.floor(Math.random() * 10) + 1,
    totalCompetitors: 20,
    marketShare: parseFloat((Math.random() * 0.15).toFixed(2)),
    averageCompetitorRating: parseFloat((Math.random() * 4 + 1).toFixed(1))
  };

  return {
    totalViews,
    totalVisits,
    totalSaves,
    totalShares,
    averageRating,
    ratingCount,
    totalReviews,
    visitorCount,
    checkInCount,
    receiptUploads,
    discountRedemptions,
    dailyViews,
    peakHours,
    demographicData,
    competitiveInsights
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
