
import { BusinessHours, Location } from '@/types';

// Format business hours for display
export const formatBusinessHours = (hours: BusinessHours | undefined): Record<string, string> => {
  if (!hours) {
    return {
      monday: "Hours not available",
      tuesday: "Hours not available",
      wednesday: "Hours not available",
      thursday: "Hours not available",
      friday: "Hours not available",
      saturday: "Hours not available",
      sunday: "Hours not available"
    };
  }
  
  return hours;
};

// Get today's hours string
export const getTodaysHours = (location: Location): string => {
  if (!location.hours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const hours = location.hours as BusinessHours;
  
  return hours[today as keyof BusinessHours] as string || "Hours not available";
};

// Generate business hours based on venue type
export const generateBusinessHours = (type: string): BusinessHours => {
  if (type === "restaurant") {
    return {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "11:00 AM - 11:00 PM",
      sunday: "12:00 PM - 9:00 PM"
    };
  } else if (type === "bar") {
    return {
      monday: "4:00 PM - 12:00 AM",
      tuesday: "4:00 PM - 12:00 AM",
      wednesday: "4:00 PM - 12:00 AM",
      thursday: "4:00 PM - 1:00 AM",
      friday: "4:00 PM - 2:00 AM",
      saturday: "4:00 PM - 2:00 AM",
      sunday: "4:00 PM - 12:00 AM"
    };
  } else if (type === "attraction") {
    return {
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 6:00 PM",
      wednesday: "10:00 AM - 6:00 PM", 
      thursday: "10:00 AM - 6:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 9:00 PM", 
      sunday: "9:00 AM - 6:00 PM"
    };
  } else if (type === "sports" || type === "event") {
    return {
      monday: "Event times vary",
      tuesday: "Event times vary",
      wednesday: "Event times vary",
      thursday: "Event times vary", 
      friday: "Event times vary",
      saturday: "Event times vary",
      sunday: "Event times vary"
    };
  }
  
  // Default hours
  return {
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM",
    wednesday: "9:00 AM - 5:00 PM", 
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 3:00 PM",
    sunday: "Closed"
  };
};
