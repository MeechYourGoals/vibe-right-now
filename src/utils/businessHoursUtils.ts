
import { BusinessHours } from '@/types';

// Convert legacy string format hours to new object format
export const convertLegacyHours = (hours: any): BusinessHours => {
  if (!hours) return getDefaultBusinessHours();
  
  // Check if already in the correct format
  if (typeof hours.monday === 'object' && hours.monday.open !== undefined) {
    return hours as BusinessHours;
  }
  
  // Convert from legacy string format to object format
  const result: BusinessHours = {
    monday: parseHoursString(hours.monday),
    tuesday: parseHoursString(hours.tuesday),
    wednesday: parseHoursString(hours.wednesday),
    thursday: parseHoursString(hours.thursday),
    friday: parseHoursString(hours.friday),
    saturday: parseHoursString(hours.saturday),
    sunday: parseHoursString(hours.sunday),
  };
  
  return result;
};

// Parse string format like "9:00 AM - 5:00 PM" to object format
export const parseHoursString = (hoursString: string): { open: string; close: string } => {
  if (!hoursString || hoursString === 'Closed') {
    return { open: 'Closed', close: 'Closed' };
  }
  
  const parts = hoursString.split(' - ');
  if (parts.length !== 2) {
    return { open: 'Closed', close: 'Closed' };
  }
  
  return {
    open: parts[0].trim(),
    close: parts[1].trim()
  };
};

// Get default business hours
export const getDefaultBusinessHours = (): BusinessHours => {
  return {
    monday: { open: '9:00 AM', close: '5:00 PM' },
    tuesday: { open: '9:00 AM', close: '5:00 PM' },
    wednesday: { open: '9:00 AM', close: '5:00 PM' },
    thursday: { open: '9:00 AM', close: '5:00 PM' },
    friday: { open: '9:00 AM', close: '5:00 PM' },
    saturday: { open: '10:00 AM', close: '3:00 PM' },
    sunday: { open: 'Closed', close: 'Closed' },
  };
};

// Format hours for display
export const formatHoursForDisplay = (hours: { open: string; close: string }): string => {
  if (hours.open === 'Closed' || hours.close === 'Closed') {
    return 'Closed';
  }
  
  return `${hours.open} - ${hours.close}`;
};

// Check if a venue is currently open
export const isOpenNow = (hours: BusinessHours): boolean => {
  if (!hours) return false;
  
  const now = new Date();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
  const currentHours = hours[dayOfWeek];
  
  if (!currentHours || currentHours.open === 'Closed') {
    return false;
  }
  
  // Convert current time to minutes
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  // Convert open time to minutes
  const openTime = parseTimeString(currentHours.open);
  const openMinutes = openTime.hours * 60 + openTime.minutes;
  
  // Convert close time to minutes
  const closeTime = parseTimeString(currentHours.close);
  const closeMinutes = closeTime.hours * 60 + closeTime.minutes;
  
  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
};

// Parse time string like "9:00 AM" to hours and minutes
const parseTimeString = (timeString: string): { hours: number; minutes: number } => {
  if (timeString === 'Closed') {
    return { hours: 0, minutes: 0 };
  }
  
  const [timePart, period] = timeString.split(' ');
  const [hourStr, minuteStr] = timePart.split(':');
  
  let hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);
  
  // Convert to 24-hour format
  if (period === 'PM' && hours < 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return { hours, minutes };
};
