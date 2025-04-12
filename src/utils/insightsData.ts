
import { formatDate } from "@/lib/utils";
import { VenueInsights } from "@/types";

// Mock insights data generator
export const generateVenueInsights = (venueId: string): VenueInsights => {
  // Use venueId to generate consistent "random" data
  const seed = venueId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate visitor trends for the last 14 days
  const visitorTrends = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    
    // Generate somewhat random count based on the day of week
    // Weekends have higher numbers
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseCount = isWeekend ? 80 + (seed % 40) : 30 + (seed % 30);
    
    return {
      date: formatDate(date),
      count: baseCount + Math.floor(Math.random() * 20)
    };
  });
  
  return {
    visitorCount: 1200 + (seed % 800), 
    checkInCount: 950 + (seed % 600),
    receiptUploads: 430 + (seed % 300),
    discountRedemptions: 210 + (seed % 150),
    popularHours: {
      "12pm": 15,
      "1pm": 30,
      "2pm": 40,
      "3pm": 25,
      "4pm": 35,
      "5pm": 60,
      "6pm": 90,
      "7pm": 120,
      "8pm": 140,
      "9pm": 125,
      "10pm": 90,
      "11pm": 60
    },
    demographicData: {
      ageGroups: {
        "18-24": 20 + (seed % 10),
        "25-34": 40 + (seed % 15),
        "35-44": 25 + (seed % 10),
        "45-54": 10 + (seed % 5),
        "55+": 5 + (seed % 5)
      },
      gender: {
        "Male": 48 + (seed % 10),
        "Female": 48 + (seed % 10),
        "Other": 4 + (seed % 2)
      }
    },
    visitorTrends,
    mediaUploads: 280 + (seed % 200)
  };
};

// Add the missing exported functions for VenueInsights and PerformanceMetrics components
export const generateWeeklyData = () => {
  return [
    { name: 'Mon', photos: 65, videos: 12 },
    { name: 'Tue', photos: 59, videos: 10 },
    { name: 'Wed', photos: 80, videos: 15 },
    { name: 'Thu', photos: 81, videos: 16 },
    { name: 'Fri', photos: 90, videos: 22 },
    { name: 'Sat', photos: 120, videos: 35 },
    { name: 'Sun', photos: 95, videos: 25 },
  ];
};

export const currentInsights = generateVenueInsights("default-venue");
