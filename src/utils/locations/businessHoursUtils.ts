
import { BusinessHours } from "@/types";

// Define the DayHours type here since it's missing from the main types
type DayHours = boolean | {
  open: boolean;
  openTime?: string;
  closeTime?: string;
};

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

/**
 * Generate random business hours for a venue
 */
export const generateRandomBusinessHours = (): BusinessHours => {
  // Seed for consistent generation
  let seed = Math.floor(Math.random() * 100);
  
  // Determine if the venue is open 7 days a week
  const isOpenAllWeek = (seed % 3) !== 0;
  
  // Determine if the venue has the same hours every day
  const hasSameHours = (seed % 2) === 0;
  
  const hours: Record<string, DayHours> = {} as BusinessHours;
  
  // Generate standard business hours
  const standardOpen = `${8 + (seed % 4)}:00`;
  const standardClose = `${18 + (seed % 6)}:00`;
  
  days.forEach(day => {
    if (!isOpenAllWeek && (day === 'sunday' || (seed % 7 === 0 && day === 'monday'))) {
      // Closed on Sunday and sometimes Monday
      hours[day] = false;
    } else if (hasSameHours) {
      // Same hours every day
      hours[day] = {
        open: true,
        openTime: standardOpen,
        closeTime: standardClose
      };
    } else {
      // Different hours based on day
      const dayNumber = days.indexOf(day);
      const openHour = (8 + (dayNumber + seed) % 4);
      const closeHour = (18 + (dayNumber + seed) % 6);
      
      hours[day] = {
        open: true,
        openTime: `${openHour}:00`,
        closeTime: `${closeHour}:00`
      };
    }
    
    // Increment seed for variety
    seed += 1;
  });
  
  return hours as BusinessHours;
};

/**
 * Get formatted hours for today
 */
export const getTodaysHoursFormatted = (businessHours?: BusinessHours): string => {
  if (!businessHours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todayHours = businessHours[today as keyof BusinessHours];
  
  if (todayHours === undefined) return "Hours not available";
  if (todayHours === true) return "Open 24 hours";
  if (todayHours === false) return "Closed today";
  
  const hours = todayHours as { open: boolean, openTime?: string, closeTime?: string };
  if (!hours.open) return "Closed today";
  
  return `${hours.openTime} - ${hours.closeTime}`;
};

/**
 * Check if venue is open now
 */
export const isVenueOpenNow = (businessHours?: BusinessHours): boolean => {
  if (!businessHours) return false;
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todayHours = businessHours[today as keyof BusinessHours];
  
  if (todayHours === undefined) return false;
  if (todayHours === true) return true;
  if (todayHours === false) return false;
  
  const hours = todayHours as { open: boolean, openTime?: string, closeTime?: string };
  if (!hours.open) return false;
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Parse opening time
  const [openHour, openMinute] = (hours.openTime || "9:00").split(":").map(Number);
  // Parse closing time
  const [closeHour, closeMinute] = (hours.closeTime || "17:00").split(":").map(Number);
  
  // Convert to minutes since midnight for easy comparison
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const openTimeInMinutes = openHour * 60 + openMinute;
  const closeTimeInMinutes = closeHour * 60 + closeMinute;
  
  return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes;
};
