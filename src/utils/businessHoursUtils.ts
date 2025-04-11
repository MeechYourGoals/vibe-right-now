
// Business hours utility functions
import { Location } from "@/types";

export interface BusinessHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// Get default business hours (9 AM - 5 PM weekdays, closed weekends)
export const getDefaultBusinessHours = (): BusinessHours => {
  return {
    monday: { open: '9:00 AM', close: '5:00 PM' },
    tuesday: { open: '9:00 AM', close: '5:00 PM' },
    wednesday: { open: '9:00 AM', close: '5:00 PM' },
    thursday: { open: '9:00 AM', close: '5:00 PM' },
    friday: { open: '9:00 AM', close: '5:00 PM' },
    saturday: { open: 'Closed', close: 'Closed' },
    sunday: { open: 'Closed', close: 'Closed' },
  };
};

// Get the current day of the week
export const getCurrentDayOfWeek = (): DayOfWeek => {
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayIndex = new Date().getDay();
  return days[dayIndex];
};

// Get today's hours for a venue
export const getTodaysHours = (hours: BusinessHours): { open: string; close: string } => {
  const today = getCurrentDayOfWeek();
  return hours[today];
};

// Format the day of week (e.g., "monday" -> "Monday")
export const formatDayOfWeek = (day: DayOfWeek, format: 'short' | 'long' | 'narrow' = 'long'): string => {
  const date = new Date();
  const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day);
  
  date.setDate(date.getDate() - date.getDay() + dayIndex);
  
  return date.toLocaleDateString('en-US', { weekday: format });
};

// Check if a venue is currently open
export const isVenueOpen = (hours: BusinessHours): boolean => {
  const today = getCurrentDayOfWeek();
  const todayHours = hours[today];
  
  // If explicitly closed, return false
  if (todayHours.open === 'Closed') {
    return false;
  }
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Parse opening hours
  const openTimeParts = todayHours.open.match(/(\d+):(\d+)\s*(AM|PM)/i);
  const closeTimeParts = todayHours.close.match(/(\d+):(\d+)\s*(AM|PM)/i);
  
  if (!openTimeParts || !closeTimeParts) {
    return false;
  }
  
  let openHour = parseInt(openTimeParts[1]);
  const openMinute = parseInt(openTimeParts[2]);
  const openPeriod = openTimeParts[3].toUpperCase();
  
  let closeHour = parseInt(closeTimeParts[1]);
  const closeMinute = parseInt(closeTimeParts[2]);
  const closePeriod = closeTimeParts[3].toUpperCase();
  
  // Convert to 24-hour format
  if (openPeriod === 'PM' && openHour < 12) openHour += 12;
  if (openPeriod === 'AM' && openHour === 12) openHour = 0;
  
  if (closePeriod === 'PM' && closeHour < 12) closeHour += 12;
  if (closePeriod === 'AM' && closeHour === 12) closeHour = 0;
  
  // Check if current time is within opening hours
  const currentTotalMinutes = currentHour * 60 + currentMinute;
  const openTotalMinutes = openHour * 60 + openMinute;
  const closeTotalMinutes = closeHour * 60 + closeMinute;
  
  return currentTotalMinutes >= openTotalMinutes && currentTotalMinutes <= closeTotalMinutes;
};

// Generate business hours display
export const generateBusinessHours = getDefaultBusinessHours;
