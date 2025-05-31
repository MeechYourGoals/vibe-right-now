
import { Location, BusinessHours } from "@/types";

// Mock function to generate random business hours for a location
export const generateBusinessHours = (location: Location): BusinessHours => {
  // Use location type to determine general business hours pattern
  const isBar = location.type === 'bar';
  const isRestaurant = location.type === 'restaurant';
  const isAttraction = location.type === 'attraction';
  
  const hours: BusinessHours = {
    monday: isBar ? '16:00-02:00' : isRestaurant ? '11:00-22:00' : '10:00-18:00',
    tuesday: isBar ? '16:00-02:00' : isRestaurant ? '11:00-22:00' : '10:00-18:00',
    wednesday: isBar ? '16:00-02:00' : isRestaurant ? '11:00-22:00' : '10:00-18:00',
    thursday: isBar ? '16:00-02:00' : isRestaurant ? '11:00-22:00' : '10:00-18:00',
    friday: isBar ? '16:00-03:00' : isRestaurant ? '11:00-23:00' : '10:00-20:00',
    saturday: isBar ? '16:00-03:00' : isRestaurant ? '10:00-23:00' : '10:00-20:00',
    sunday: isBar ? '16:00-00:00' : isRestaurant ? '10:00-22:00' : '11:00-17:00',
    isOpenNow: "true",
    timezone: 'America/New_York'
  };
  
  return hours;
};

// Get today's hours for display
export const getTodaysHours = (location: Location): string => {
  if (!location.hours) {
    return "Hours not available";
  }
  
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date().getDay();
  
  const dayName = days[today] as keyof BusinessHours;
  const dayHours = location.hours[dayName];
  
  if (!dayHours) {
    return "Closed today";
  }
  
  if (dayHours === "Closed") {
    return "Closed today";
  }
  
  // Check if open now
  const isOpenNow = location.hours.isOpenNow === "true" ? "Open now" : "Closed now";
  
  return `${isOpenNow} · Today ${formatHoursRange(dayHours as string)}`;
};

// Format hours range for display
const formatHoursRange = (hoursRange: string): string => {
  if (!hoursRange.includes('-')) {
    return hoursRange;
  }
  
  const [openTime, closeTime] = hoursRange.split('-');
  return `${formatTime(openTime)} - ${formatTime(closeTime)}`;
};

// Format time for display (convert 24h to 12h)
const formatTime = (time24h: string): string => {
  const [hours, minutes] = time24h.split(':');
  const h = parseInt(hours, 10);
  
  if (h === 0) {
    return `12:${minutes} AM`;
  }
  if (h < 12) {
    return `${h}:${minutes} AM`;
  }
  if (h === 12) {
    return `12:${minutes} PM`;
  }
  return `${h-12}:${minutes} PM`;
};
