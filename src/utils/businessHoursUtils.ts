
import { Location, BusinessHours } from "@/types";

export const generateBusinessHours = (venue: Location | string): BusinessHours => {
  // Create default business hours
  return {
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM",
    wednesday: "9:00 AM - 5:00 PM",
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 8:00 PM",
    saturday: "10:00 AM - 10:00 PM",
    sunday: "11:00 AM - 4:00 PM"
  };
};

export const getTodaysHours = (venue: Location): string => {
  if (!venue || !venue.hours) return "Hours not available";
  
  const today = new Date().toLocaleString('en-US', { weekday: 'lowercase' });
  
  switch (today) {
    case 'monday': return venue.hours.monday || "Closed";
    case 'tuesday': return venue.hours.tuesday || "Closed";
    case 'wednesday': return venue.hours.wednesday || "Closed";
    case 'thursday': return venue.hours.thursday || "Closed";
    case 'friday': return venue.hours.friday || "Closed";
    case 'saturday': return venue.hours.saturday || "Closed";
    case 'sunday': return venue.hours.sunday || "Closed";
    default: return "Hours not available";
  }
};

export const isOpenNow = (hours: BusinessHours): boolean => {
  const now = new Date();
  const dayOfWeek = now.toLocaleString('en-US', { weekday: 'lowercase' });
  
  // Get today's hours
  let todayHours;
  switch (dayOfWeek) {
    case 'monday': todayHours = hours.monday; break;
    case 'tuesday': todayHours = hours.tuesday; break;
    case 'wednesday': todayHours = hours.wednesday; break;
    case 'thursday': todayHours = hours.thursday; break;
    case 'friday': todayHours = hours.friday; break;
    case 'saturday': todayHours = hours.saturday; break;
    case 'sunday': todayHours = hours.sunday; break;
    default: return false;
  }
  
  if (todayHours === "Closed" || !todayHours) return false;
  
  // Parse hours like "9:00 AM - 5:00 PM"
  const [openStr, closeStr] = todayHours.split(" - ");
  if (!openStr || !closeStr) return false;
  
  // Convert to 24-hour format for comparison
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Parse opening hours
  const openMatch = openStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!openMatch) return false;
  let openHour = parseInt(openMatch[1]);
  const openMinute = parseInt(openMatch[2]);
  if (openMatch[3].toUpperCase() === "PM" && openHour !== 12) openHour += 12;
  if (openMatch[3].toUpperCase() === "AM" && openHour === 12) openHour = 0;
  
  // Parse closing hours
  const closeMatch = closeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!closeMatch) return false;
  let closeHour = parseInt(closeMatch[1]);
  const closeMinute = parseInt(closeMatch[2]);
  if (closeMatch[3].toUpperCase() === "PM" && closeHour !== 12) closeHour += 12;
  if (closeMatch[3].toUpperCase() === "AM" && closeHour === 12) closeHour = 0;
  
  // Check if current time is within operating hours
  const currentTime = currentHour * 60 + currentMinute;
  const openTime = openHour * 60 + openMinute;
  const closeTime = closeHour * 60 + closeMinute;
  
  return currentTime >= openTime && currentTime <= closeTime;
};
