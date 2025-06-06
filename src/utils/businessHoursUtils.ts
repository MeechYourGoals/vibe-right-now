
import { Location, BusinessHours } from "@/types";

export const generateBusinessHours = (location: Location): BusinessHours => {
  // Default hours based on location type
  let defaultHours = {
    open: "9:00 AM",
    close: "6:00 PM"
  };

  if (location.type === "restaurant") {
    defaultHours = { open: "11:00 AM", close: "10:00 PM" };
  } else if (location.type === "bar") {
    defaultHours = { open: "4:00 PM", close: "2:00 AM" };
  } else if (location.type === "attraction") {
    defaultHours = { open: "9:00 AM", close: "5:00 PM" };
  }

  return {
    monday: defaultHours,
    tuesday: defaultHours,
    wednesday: defaultHours,
    thursday: defaultHours,
    friday: defaultHours,
    saturday: defaultHours,
    sunday: defaultHours,
    isOpenNow: "Open",
    timezone: "America/New_York"
  };
};

export const formatBusinessHours = (hours: BusinessHours): string => {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todaysHours = hours[dayOfWeek as keyof BusinessHours];
  
  if (typeof todaysHours === 'string') {
    return todaysHours;
  }
  
  if (typeof todaysHours === 'object' && todaysHours.open && todaysHours.close) {
    return `${todaysHours.open} - ${todaysHours.close}`;
  }
  
  return "Closed";
};

export const isCurrentlyOpen = (hours: BusinessHours): boolean => {
  const now = new Date();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todaysHours = hours[dayOfWeek as keyof BusinessHours];
  
  if (typeof todaysHours === 'string') {
    return todaysHours.toLowerCase() !== 'closed';
  }
  
  if (typeof todaysHours === 'object' && todaysHours.open && todaysHours.close) {
    // Simple check - in real app would need proper time parsing
    return true;
  }
  
  return false;
};
