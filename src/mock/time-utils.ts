
import { Post } from "@/types";
import { addMonths, format, subDays, subHours, subMinutes } from "date-fns";

// Generate a time in the recent past (N days ago)
export const getRecentTime = (daysAgo: number): string => {
  const date = subDays(new Date(), daysAgo);
  // Set the time to a random hour between 9am and 11pm
  date.setHours(Math.floor(Math.random() * 14) + 9, Math.floor(Math.random() * 60), 0);
  return date.toISOString();
};

// Generate a time for specific day of week in the recent past
export const getRecentTimeForDayOfWeek = (dayOfWeek: number): string => {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Calculate how many days to go back to reach the desired day of week
  let daysToSubtract = currentDayOfWeek - dayOfWeek;
  if (daysToSubtract < 0) {
    daysToSubtract += 7; // Go back to previous week
  }
  
  // If it's the same day of week as today, use 7 days ago
  if (daysToSubtract === 0) {
    daysToSubtract = 7;
  }
  
  const date = subDays(today, daysToSubtract);
  // Set the time to a random hour between 9am and 11pm
  date.setHours(Math.floor(Math.random() * 14) + 9, Math.floor(Math.random() * 60), 0);
  return date.toISOString();
};

// Generate an expiry time for venue posts (3 months from post date)
export const getExpiryTime = (postTime: string): string => {
  const postDate = new Date(postTime);
  return addMonths(postDate, 3).toISOString();
};

// Check if a post is from a specific day of the week
export const isPostFromDayOfWeek = (timestamp: string, dayOfWeek: number): boolean => {
  const date = new Date(timestamp);
  return date.getDay() === dayOfWeek;
};

// Check if a post is within the last 3 months
export const isWithinThreeMonths = (timestamp: string): boolean => {
  const postDate = new Date(timestamp);
  const threeMonthsAgo = subMonths(new Date(), 3);
  return postDate >= threeMonthsAgo;
};

// Helper function to get posts for specific days of week
export const getPostsForDaysOfWeek = (posts: Post[], daysOfWeek: number[]): Post[] => {
  return posts.filter(post => 
    daysOfWeek.includes(new Date(post.timestamp).getDay())
  );
};

// Get a date string for a specific weekday in the most recent week
const subMonths = (date: Date, months: number): Date => {
  return new Date(date.getFullYear(), date.getMonth() - months, date.getDate());
};
