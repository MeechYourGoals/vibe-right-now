
import { Location, BusinessHours } from "@/types";

export const generateBusinessHours = (venue: Location): BusinessHours => {
  // Generate realistic hours based on venue type
  const isLateNight = venue.type === "bar" || venue.type === "nightclub";
  const isEarlyBird = venue.type === "cafe" || venue.type === "restaurant";
  const isAttraction = venue.type === "museum" || venue.type === "attraction";
  
  // Default restaurant/cafe hours
  let weekdayOpen = "11:00 AM";
  let weekdayClose = "10:00 PM";
  let weekendOpen = "10:00 AM";
  let weekendClose = "11:00 PM";
  
  if (isLateNight) {
    weekdayOpen = "4:00 PM";
    weekdayClose = "2:00 AM";
    weekendOpen = "2:00 PM";
    weekendClose = "3:00 AM";
  } else if (isEarlyBird) {
    weekdayOpen = "7:00 AM";
    weekdayClose = "9:00 PM";
    weekendOpen = "8:00 AM";
    weekendClose = "10:00 PM";
  } else if (isAttraction) {
    weekdayOpen = "9:00 AM";
    weekdayClose = "6:00 PM";
    weekendOpen = "9:00 AM";
    weekendClose = "7:00 PM";
  }
  
  return {
    monday: { open: weekdayOpen, close: weekdayClose },
    tuesday: { open: weekdayOpen, close: weekdayClose },
    wednesday: { open: weekdayOpen, close: weekdayClose },
    thursday: { open: weekdayOpen, close: weekdayClose },
    friday: { open: weekdayOpen, close: weekendClose },
    saturday: { open: weekendOpen, close: weekendClose },
    sunday: { open: weekendOpen, close: weekdayClose }
  };
};

export const getTodaysHours = (venue: Location): string => {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = days[today] as keyof BusinessHours;
  
  if (!venue.hours) {
    return "Hours not available";
  }
  
  const todaysHours = venue.hours[dayName];
  
  if (typeof todaysHours === "string") {
    return todaysHours;
  } else if (typeof todaysHours === "object" && todaysHours.open && todaysHours.close) {
    return `${todaysHours.open} - ${todaysHours.close}`;
  }
  
  return "Closed";
};
