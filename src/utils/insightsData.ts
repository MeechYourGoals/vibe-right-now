
import { format, subDays } from "date-fns";
import { VenueInsights } from "@/types";

// Generate weekly data for insights
export const generateWeeklyData = () => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, "EEE"),
      visitors: Math.floor(Math.random() * 50) + 10,
      checkIns: Math.floor(Math.random() * 30) + 5,
      receipts: Math.floor(Math.random() * 15),
      discounts: Math.floor(Math.random() * 10),
      photos: Math.floor(Math.random() * 20),
      videos: Math.floor(Math.random() * 10),
      impressions: Math.floor(Math.random() * 100) + 50,
    });
  }
  return data;
};

// Monthly data for insights
export const monthlyData = [
  { name: "Jan", visitors: 240, checkIns: 180, receipts: 90, discounts: 60 },
  { name: "Feb", visitors: 300, checkIns: 200, receipts: 100, discounts: 80 },
  { name: "Mar", visitors: 200, checkIns: 150, receipts: 70, discounts: 40 },
  { name: "Apr", visitors: 278, checkIns: 190, receipts: 95, discounts: 55 },
  { name: "May", visitors: 189, checkIns: 120, receipts: 60, discounts: 30 },
  { name: "Jun", visitors: 239, checkIns: 170, receipts: 85, discounts: 50 },
];

// Current insights data
export const currentInsights: VenueInsights = {
  visitorCount: 342,
  checkInCount: 198,
  receiptUploads: 87,
  discountRedemptions: 52,
  mediaUploads: {
    photos: 156,
    videos: 63,
  },
  impressions: 1248,
};
