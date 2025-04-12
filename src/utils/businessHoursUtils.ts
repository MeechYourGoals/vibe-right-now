
import { BusinessHours } from "@/types";

export const getFormattedBusinessHours = (hours: BusinessHours): Record<string, string> => {
  const formattedHours: Record<string, string> = {};
  
  Object.entries(hours).forEach(([day, timeRange]) => {
    if (typeof timeRange === 'object' && 'open' in timeRange && 'close' in timeRange) {
      formattedHours[day] = `${timeRange.open} - ${timeRange.close}`;
    } else if (timeRange === 'Closed') {
      formattedHours[day] = 'Closed';
    } else {
      formattedHours[day] = 'Hours not available';
    }
  });
  
  return formattedHours;
};

export const getDefaultBusinessHours = (): BusinessHours => {
  return {
    monday: { open: "9:00 AM", close: "5:00 PM" },
    tuesday: { open: "9:00 AM", close: "5:00 PM" },
    wednesday: { open: "9:00 AM", close: "5:00 PM" },
    thursday: { open: "9:00 AM", close: "5:00 PM" },
    friday: { open: "9:00 AM", close: "6:00 PM" },
    saturday: { open: "10:00 AM", close: "4:00 PM" },
    sunday: { open: "Closed", close: "Closed" }
  };
};

export const formatHoursForDisplay = (hours: BusinessHours): string => {
  const today = new Date().getDay();
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayName = daysOfWeek[today];
  
  const todayHours = hours[todayName as keyof BusinessHours];
  
  if (typeof todayHours === 'object' && 'open' in todayHours && 'close' in todayHours) {
    if (todayHours.open === "Closed" || todayHours.close === "Closed") {
      return "Closed Today";
    }
    return `Today: ${todayHours.open} - ${todayHours.close}`;
  }
  
  return "Hours not available";
};

export const getRestaurantBusinessHours = (): BusinessHours => {
  return {
    monday: { open: "11:00 AM", close: "10:00 PM" },
    tuesday: { open: "11:00 AM", close: "10:00 PM" },
    wednesday: { open: "11:00 AM", close: "10:00 PM" },
    thursday: { open: "11:00 AM", close: "11:00 PM" },
    friday: { open: "11:00 AM", close: "12:00 AM" },
    saturday: { open: "10:00 AM", close: "12:00 AM" },
    sunday: { open: "10:00 AM", close: "9:00 PM" }
  };
};

export const getBarBusinessHours = (): BusinessHours => {
  return {
    monday: { open: "4:00 PM", close: "1:00 AM" },
    tuesday: { open: "4:00 PM", close: "1:00 AM" },
    wednesday: { open: "4:00 PM", close: "1:00 AM" },
    thursday: { open: "4:00 PM", close: "2:00 AM" },
    friday: { open: "4:00 PM", close: "3:00 AM" },
    saturday: { open: "2:00 PM", close: "3:00 AM" },
    sunday: { open: "2:00 PM", close: "12:00 AM" }
  };
};

export const getEventBusinessHours = (): BusinessHours => {
  return {
    monday: { open: "Varies", close: "Varies" },
    tuesday: { open: "Varies", close: "Varies" },
    wednesday: { open: "Varies", close: "Varies" },
    thursday: { open: "Varies", close: "Varies" },
    friday: { open: "6:00 PM", close: "2:00 AM" },
    saturday: { open: "6:00 PM", close: "2:00 AM" },
    sunday: { open: "Closed", close: "Closed" }
  };
};
