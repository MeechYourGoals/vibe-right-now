
import { VenueInsights } from "@/types";

export const generateMockInsights = (venueId: string, venueName: string): VenueInsights => {
  const uniqueVisitors = 100 + Math.floor(Math.random() * 500);
  const totalVisits = uniqueVisitors + Math.floor(Math.random() * 300);
  
  return {
    id: venueId,
    venueName,
    totalVisits,
    uniqueVisitors,
    visitorCount: uniqueVisitors,
    checkInCount: Math.floor(totalVisits * 0.7),
    receiptUploads: Math.floor(totalVisits * 0.4),
    discountRedemptions: Math.floor(totalVisits * 0.2),
    averageRating: 3.5 + Math.random() * 1.5,
    topReasons: [
      { reason: "Food & Drink", count: Math.floor(uniqueVisitors * 0.6) },
      { reason: "Atmosphere", count: Math.floor(uniqueVisitors * 0.4) },
      { reason: "Service", count: Math.floor(uniqueVisitors * 0.3) },
      { reason: "Entertainment", count: Math.floor(uniqueVisitors * 0.2) },
    ],
    demographics: {
      ageGroups: {
        "18-24": Math.floor(uniqueVisitors * 0.25),
        "25-34": Math.floor(uniqueVisitors * 0.4),
        "35-44": Math.floor(uniqueVisitors * 0.2),
        "45+": Math.floor(uniqueVisitors * 0.15),
      },
      gender: {
        Male: Math.floor(uniqueVisitors * 0.45),
        Female: Math.floor(uniqueVisitors * 0.5),
        Other: Math.floor(uniqueVisitors * 0.05),
      }
    },
    visitsByDay: {
      Monday: Math.floor(totalVisits * 0.08),
      Tuesday: Math.floor(totalVisits * 0.1),
      Wednesday: Math.floor(totalVisits * 0.12),
      Thursday: Math.floor(totalVisits * 0.15),
      Friday: Math.floor(totalVisits * 0.25),
      Saturday: Math.floor(totalVisits * 0.2),
      Sunday: Math.floor(totalVisits * 0.1),
    },
    visitsByHour: {
      "9-12": Math.floor(totalVisits * 0.2),
      "12-15": Math.floor(totalVisits * 0.3),
      "15-18": Math.floor(totalVisits * 0.25),
      "18-21": Math.floor(totalVisits * 0.15),
      "21+": Math.floor(totalVisits * 0.1),
    },
    competitorAnalysis: [
      {
        name: "Competitor A",
        visitors: Math.floor(uniqueVisitors * 0.8),
        rating: 3.2 + Math.random() * 1.5,
        distance: 0.3,
      },
      {
        name: "Competitor B",
        visitors: Math.floor(uniqueVisitors * 0.6),
        rating: 3.0 + Math.random() * 1.5,
        distance: 0.5,
      },
      {
        name: "Competitor C",
        visitors: Math.floor(uniqueVisitors * 0.4),
        rating: 2.8 + Math.random() * 1.5,
        distance: 0.8,
      },
    ]
  };
};
