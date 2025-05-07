
import { Location } from "@/types";

interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export const generateBusinessHours = (locationId: string): BusinessHours => {
  // Seed the random number generator based on the location ID
  const seed = locationId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  // Get current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDay = new Date().getDay();
  
  // Format day names
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  // Generate hours for each day
  const hours: BusinessHours = {
    monday: getRandomHours(random),
    tuesday: getRandomHours(random),
    wednesday: getRandomHours(random),
    thursday: getRandomHours(random),
    friday: getRandomHours(random),
    saturday: getRandomHours(random),
    sunday: getRandomHours(random)
  };
  
  return hours;
};

// Helper function to generate random opening hours
const getRandomHours = (random: () => number): string => {
  // 20% chance of being closed
  if (random() < 0.2) {
    return "Closed";
  }

  // Generate opening hour (7am-12pm)
  const openingHour = Math.floor(random() * 5) + 7;
  
  // Generate closing hour (5pm-12am)
  const closingHour = Math.floor(random() * 7) + 17;

  return `${openingHour === 12 ? '12pm' : (openingHour > 12 ? `${openingHour-12}pm` : `${openingHour}am`)} - ${closingHour === 12 ? '12pm' : (closingHour > 12 ? `${closingHour-12}pm` : `${closingHour}am`)}`;
};

// Get today's business hours for a venue
export const getTodaysHours = (venue: Location): string => {
  if (!venue.hours) {
    return "Hours not available";
  }
  
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  
  return venue.hours[today as keyof typeof venue.hours] || "Hours not available";
};

// Check if a venue is currently open
export const isOpenNow = (venue: Location): boolean => {
  if (!venue.hours) {
    return false;
  }
  
  // Get current day and time
  const now = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[now.getDay()];
  const currentHours = venue.hours[today as keyof typeof venue.hours];
  
  // If "Closed" or not available, return false
  if (!currentHours || currentHours === "Closed") {
    return false;
  }
  
  // Parse hours
  const [openingStr, closingStr] = currentHours.split(' - ');
  
  if (!openingStr || !closingStr) {
    return false;
  }
  
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Parse opening hour
  let openingHour = parseInt(openingStr);
  const isOpeningAM = openingStr.toLowerCase().includes('am');
  const isOpeningPM = openingStr.toLowerCase().includes('pm');
  
  if (isOpeningPM && openingHour < 12) {
    openingHour += 12;
  } else if (isOpeningAM && openingHour === 12) {
    openingHour = 0;
  }
  
  // Parse closing hour
  let closingHour = parseInt(closingStr);
  const isClosingAM = closingStr.toLowerCase().includes('am');
  const isClosingPM = closingStr.toLowerCase().includes('pm');
  
  if (isClosingPM && closingHour < 12) {
    closingHour += 12;
  } else if (isClosingAM && closingHour === 12) {
    closingHour = 0;
  }
  
  // Check if current time is between opening and closing
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const openingTimeInMinutes = openingHour * 60;
  let closingTimeInMinutes = closingHour * 60;
  
  // Handle cases where closing time is past midnight
  if (closingTimeInMinutes < openingTimeInMinutes) {
    closingTimeInMinutes += 24 * 60;
    if (currentTimeInMinutes < openingTimeInMinutes) {
      return currentTimeInMinutes + 24 * 60 <= closingTimeInMinutes;
    }
  }
  
  return currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes <= closingTimeInMinutes;
};
