
import { BusinessHours } from "@/types";

export const formatBusinessHours = (hours: BusinessHours): string => {
  if (!hours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof BusinessHours;
  const todayHours = hours[today];
  
  if (typeof todayHours === 'string') {
    return todayHours;
  }
  
  if (todayHours && typeof todayHours === 'object') {
    return `${todayHours.open} - ${todayHours.close}`;
  }
  
  return "Closed";
};

export const generateBusinessHours = (): BusinessHours => {
  return {
    monday: { open: "9:00 AM", close: "10:00 PM" },
    tuesday: { open: "9:00 AM", close: "10:00 PM" },
    wednesday: { open: "9:00 AM", close: "10:00 PM" },
    thursday: { open: "9:00 AM", close: "11:00 PM" },
    friday: { open: "9:00 AM", close: "12:00 AM" },
    saturday: { open: "10:00 AM", close: "12:00 AM" },
    sunday: { open: "10:00 AM", close: "9:00 PM" },
    isOpenNow: "Open",
    timezone: "EST"
  };
};

export const getTodaysHours = (hours: BusinessHours): string => {
  if (!hours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof BusinessHours;
  const todayHours = hours[today];
  
  if (typeof todayHours === 'string') {
    return todayHours;
  }
  
  if (todayHours && typeof todayHours === 'object') {
    return `${todayHours.open} - ${todayHours.close}`;
  }
  
  return "Closed today";
};
