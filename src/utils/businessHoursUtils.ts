
import { BusinessHours } from "@/types";

/**
 * Gets the day of the week name for a given date or current day
 * @param date Optional date to get day name for
 * @returns Day of the week name
 */
export const getDayName = (date: Date = new Date()): string => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getDay()];
};

/**
 * Formats hours as 12h time
 * @param hours Hour in 24h format
 * @param minutes Minutes
 * @returns Formatted time string
 */
export const formatTime = (hours: number, minutes: number): string => {
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${period}`;
};

/**
 * Checks if a venue is currently open
 * @param hours Business hours object
 * @returns Boolean indicating if venue is open
 */
export const isVenueOpen = (hours: BusinessHours | Record<string, any>): boolean => {
  const now = new Date();
  const currentDayName = getDayName(now).toLowerCase();
  const currentDay = hours[currentDayName];
  
  // If closed today
  if (!currentDay || currentDay === 'Closed') return false;
  
  // Parse open and close times
  const [openHours, openMinutes] = parseTimeString(currentDay.open);
  const [closeHours, closeMinutes] = parseTimeString(currentDay.close);
  
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  
  // Convert to total minutes for easy comparison
  const currentTotalMinutes = currentHours * 60 + currentMinutes;
  const openTotalMinutes = openHours * 60 + openMinutes;
  const closeTotalMinutes = closeHours * 60 + closeMinutes;
  
  // Handle cases where closing time is on the next day (e.g. 2 AM)
  if (closeTotalMinutes < openTotalMinutes) {
    return currentTotalMinutes >= openTotalMinutes || currentTotalMinutes < closeTotalMinutes;
  }
  
  return currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes;
};

/**
 * Parses a time string like "9:00 AM" into hours and minutes
 * @param timeStr Time string to parse
 * @returns Array of [hours, minutes] in 24h format
 */
export const parseTimeString = (timeStr: string): [number, number] => {
  if (!timeStr || typeof timeStr !== 'string') {
    return [0, 0]; // Default for invalid input
  }
  
  const match = timeStr.match(/(\d+):(\d+)\s*([AP]M)/i);
  if (!match) return [0, 0];
  
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  
  if (period === 'PM' && hours < 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return [hours, minutes];
};

/**
 * Formats business hours in a readable format
 * @param hours Business hours object
 * @returns Formatted business hours string
 */
export const formatBusinessHours = (hours: BusinessHours | Record<string, any>): string => {
  let result = '';
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  for (const day of days) {
    const dayHours = hours[day];
    const dayName = day.charAt(0).toUpperCase() + day.slice(1);
    
    if (!dayHours || dayHours === 'Closed') {
      result += `${dayName}: Closed\n`;
    } else {
      result += `${dayName}: ${dayHours.open} - ${dayHours.close}\n`;
    }
  }
  
  return result;
};
