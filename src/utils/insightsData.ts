import { VenueInsights } from "@/types";

// Mock data for venue insights
export const getVenueInsights = (): VenueInsights => {
  return {
    overallRating: 4.7,
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
      age: {
        '18-24': 22,
        '25-34': 38,
        '35-44': 25,
        '45-54': 10,
        '55+': 5
      }
    },
    peakHours: {
      monday: '6-9 PM',
      tuesday: '6-10 PM',
      wednesday: '7-10 PM',
      thursday: '7-11 PM',
      friday: '8 PM-12 AM',
      saturday: '8 PM-1 AM',
      sunday: '2-5 PM'
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
    }
  };
};
