
import { Location, BusinessHours } from "@/types";

export const getOpenCloseTime = (location: Location) => {
  if (!location.hours) return null;
  
  const now = new Date();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = dayNames[now.getDay()];
  
  // Handle different venue types with different schedules
  if (location.type === "bar") {
    return { open: "5:00 PM", close: "2:00 AM" };
  } else if (location.type === "restaurant") {
    return { open: "11:00 AM", close: "10:00 PM" };
  } else if (location.type === "attraction") {
    return { open: "9:00 AM", close: "6:00 PM" };
  }
  
  const todayHours = location.hours[today as keyof typeof location.hours];
  
  if (typeof todayHours === 'string') {
    if (todayHours.toLowerCase() === 'closed') {
      return null;
    }
    return { open: "9:00 AM", close: "5:00 PM" };
  }
  
  if (typeof todayHours === 'object' && todayHours.open && todayHours.close) {
    return todayHours;
  }
  
  return null;
};

export const generateBusinessHours = (venue: Location): BusinessHours => {
  // Generate realistic business hours based on venue type
  const getHoursForType = (type: string) => {
    switch (type) {
      case "restaurant":
        return { open: "11:00 AM", close: "10:00 PM" };
      case "bar":
        return { open: "5:00 PM", close: "2:00 AM" };
      case "attraction":
        return { open: "9:00 AM", close: "6:00 PM" };
      case "sports":
        return { open: "6:00 AM", close: "11:00 PM" };
      default:
        return { open: "9:00 AM", close: "5:00 PM" };
    }
  };

  const defaultHours = getHoursForType(venue.type);
  
  return {
    monday: defaultHours,
    tuesday: defaultHours,
    wednesday: defaultHours,
    thursday: defaultHours,
    friday: defaultHours,
    saturday: defaultHours,
    sunday: venue.type === "bar" ? defaultHours : { open: "10:00 AM", close: "9:00 PM" },
    isOpenNow: "true",
    timezone: "America/New_York",
    isOpen24Hours: false
  };
};

export const getTodaysHours = (venue: Location): string => {
  const hours = getOpenCloseTime(venue);
  if (!hours) return "Closed today";
  return `${hours.open} - ${hours.close}`;
};

export const isCurrentlyOpen = (location: Location): boolean => {
  const hours = getOpenCloseTime(location);
  if (!hours) return false;
  
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  // Simple time parsing for common formats
  const parseTime = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + (minutes || 0);
    
    if (period?.toLowerCase() === 'pm' && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period?.toLowerCase() === 'am' && hours === 12) {
      totalMinutes = minutes || 0;
    }
    
    return totalMinutes;
  };
  
  try {
    const openTime = parseTime(hours.open);
    const closeTime = parseTime(hours.close);
    
    // Handle overnight hours (close time is next day)
    if (closeTime < openTime) {
      return currentTime >= openTime || currentTime <= closeTime;
    }
    
    return currentTime >= openTime && currentTime <= closeTime;
  } catch {
    return false;
  }
};

export const formatBusinessHours = (hours: any): string => {
  if (typeof hours === 'string') {
    return hours;
  }
  
  if (typeof hours === 'object' && hours.open && hours.close) {
    return `${hours.open} - ${hours.close}`;
  }
  
  return 'Hours not available';
};
