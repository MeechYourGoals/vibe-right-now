
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

export const formatDayOfWeek = (day: string): string => {
  return day.charAt(0).toUpperCase() + day.slice(1);
};
