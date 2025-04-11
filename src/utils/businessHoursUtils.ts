
import { BusinessHours } from "./locations/types";

export const generateBusinessHours = (location?: any): BusinessHours => {
  // Default business hours
  return {
    monday: { open: "9:00 AM", close: "5:00 PM" },
    tuesday: { open: "9:00 AM", close: "5:00 PM" },
    wednesday: { open: "9:00 AM", close: "5:00 PM" },
    thursday: { open: "9:00 AM", close: "5:00 PM" },
    friday: { open: "9:00 AM", close: "5:00 PM" },
    saturday: { open: "10:00 AM", close: "3:00 PM" },
    sunday: { open: "Closed", close: "Closed" }
  };
};

export const getTodaysHours = (location: any): string => {
  if (!location.hours) return "Hours not available";
  
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = days[new Date().getDay()];
  const hours = location.hours[today];
  
  if (!hours) return "Hours not available";
  if (hours.open === "Closed") return "Closed today";
  
  return `${hours.open} - ${hours.close}`;
};

export const formatHoursForDisplay = (day: string, hours: { open: string; close: string }): string => {
  if (hours.open === "Closed") return "Closed";
  return `${hours.open} - ${hours.close}`;
};

// Updated to use proper weekday format
export const formatDayOfWeek = (day: string, format: "narrow" | "short" | "long" = "short"): string => {
  // Map day strings to numbers for Date API
  const dayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  };
  
  // Use Intl.DateTimeFormat to get proper day names
  if (dayMap[day.toLowerCase()] !== undefined) {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + dayMap[day.toLowerCase()]);
    return new Intl.DateTimeFormat('en-US', { weekday: format }).format(date);
  }
  
  // Fallback for invalid days
  return day.charAt(0).toUpperCase() + day.slice(1);
};

// Check if a venue is currently open
export const isVenueOpenNow = (hours: BusinessHours): boolean => {
  if (!hours) return false;
  
  const now = new Date();
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = days[now.getDay()];
  const currentHours = hours[today as keyof BusinessHours];
  
  if (!currentHours || currentHours.open === "Closed") return false;
  
  // Parse opening and closing times
  const openTimeParts = currentHours.open.match(/(\d+):(\d+)\s*([AP]M)/i);
  const closeTimeParts = currentHours.close.match(/(\d+):(\d+)\s*([AP]M)/i);
  
  if (!openTimeParts || !closeTimeParts) return false;
  
  // Convert to 24 hour format
  let openHour = parseInt(openTimeParts[1]);
  const openMinute = parseInt(openTimeParts[2]);
  const openPeriod = openTimeParts[3].toUpperCase();
  
  let closeHour = parseInt(closeTimeParts[1]);
  const closeMinute = parseInt(closeTimeParts[2]);
  const closePeriod = closeTimeParts[3].toUpperCase();
  
  // Adjust hours for PM
  if (openPeriod === "PM" && openHour < 12) openHour += 12;
  if (openPeriod === "AM" && openHour === 12) openHour = 0;
  if (closePeriod === "PM" && closeHour < 12) closeHour += 12;
  if (closePeriod === "AM" && closeHour === 12) closeHour = 0;
  
  // Handle cases where closing time is after midnight
  if (closeHour < openHour) closeHour += 24;
  
  // Get current hour and minute
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Convert all to minutes for easier comparison
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const openTimeInMinutes = openHour * 60 + openMinute;
  const closeTimeInMinutes = closeHour * 60 + closeMinute;
  
  return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;
};
