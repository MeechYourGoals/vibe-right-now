
import { Location } from "@/types";

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export const isOpenNow = (location: Location): boolean => {
  if (!location.hours) return false;
  
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof BusinessHours;
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const hours = location.hours[currentDay];
  if (!hours || hours === 'Closed') return false;
  
  // Parse hours like "9:00 AM - 10:00 PM"
  const [openTime, closeTime] = hours.split(' - ');
  if (!openTime || !closeTime) return false;
  
  const parseTime = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    
    if (period === 'PM' && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period === 'AM' && hours === 12) {
      totalMinutes = minutes;
    }
    
    return totalMinutes;
  };
  
  const openMinutes = parseTime(openTime);
  const closeMinutes = parseTime(closeTime);
  
  return currentTime >= openMinutes && currentTime <= closeMinutes;
};

export const formatBusinessHours = (location: Location): string => {
  if (!location.hours) return 'Hours not available';
  
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof BusinessHours;
  const todayHours = location.hours[currentDay];
  
  if (!todayHours || todayHours === 'Closed') {
    return 'Closed today';
  }
  
  return `Today: ${todayHours}`;
};

export const generateBusinessHours = (): BusinessHours => {
  return {
    monday: "9:00 AM - 10:00 PM",
    tuesday: "9:00 AM - 10:00 PM", 
    wednesday: "9:00 AM - 10:00 PM",
    thursday: "9:00 AM - 11:00 PM",
    friday: "9:00 AM - 12:00 AM",
    saturday: "10:00 AM - 12:00 AM",
    sunday: "10:00 AM - 9:00 PM"
  };
};

export const getTodaysHours = (location: Location): string => {
  if (!location.hours) return 'Hours not available';
  
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof BusinessHours;
  const todayHours = location.hours[currentDay];
  
  if (!todayHours || todayHours === 'Closed') {
    return 'Closed today';
  }
  
  return todayHours;
};
