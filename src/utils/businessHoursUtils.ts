
import { BusinessHours } from "@/types";

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export function isOpen(hours: BusinessHours, currentTime: Date = new Date()): boolean {
  const daysOfWeek: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const day = daysOfWeek[currentTime.getDay()] as DayOfWeek;
  
  if (!hours[day]) {
    return false;
  }
  
  const dayHours = hours[day];
  
  // Check if hours are stored as a string (e.g. 'Closed')
  if (typeof dayHours === 'string') {
    return false;
  }
  
  const currentTimeString = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  
  const openTime = convertTo24Hour(dayHours.open);
  const closeTime = convertTo24Hour(dayHours.close);
  
  return currentTimeString >= openTime && currentTimeString <= closeTime;
}

function convertTo24Hour(timeString: string): string {
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }
  
  return `${hours}:${minutes}`;
}

export const formatBusinessHours = (hours: BusinessHours): string => {
  if (!hours) return 'Hours not available';
  
  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  let formatted = '';
  
  days.forEach(day => {
    const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);
    const dayHours = hours[day];
    
    if (!dayHours) {
      formatted += `${dayCapitalized}: Closed\n`;
    } else if (typeof dayHours === 'string') {
      formatted += `${dayCapitalized}: Closed\n`;
    } else {
      try {
        formatted += `${dayCapitalized}: ${dayHours.open} - ${dayHours.close}\n`;
      } catch (e) {
        formatted += `${dayCapitalized}: Hours unavailable\n`;
      }
    }
  });
  
  return formatted;
};

// Fix the signature: generateBusinessHours should take no arguments
export const generateBusinessHours = (): BusinessHours => {
  return {
    monday: { open: '9:00 AM', close: '5:00 PM' },
    tuesday: { open: '9:00 AM', close: '5:00 PM' },
    wednesday: { open: '9:00 AM', close: '5:00 PM' },
    thursday: { open: '9:00 AM', close: '5:00 PM' },
    friday: { open: '9:00 AM', close: '5:00 PM' },
    saturday: { open: '10:00 AM', close: '3:00 PM' },
    sunday: 'Closed'
  };
};

// Fix the getTodaysHours function to properly handle the hours property from Location
export const getTodaysHours = (hours: BusinessHours): string => {
  const daysOfWeek: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = daysOfWeek[new Date().getDay()] as DayOfWeek;
  
  const dayHours = hours[today];
  
  if (!dayHours) {
    return 'Closed';
  }
  
  if (typeof dayHours === 'string') {
    return dayHours;
  }
  
  return `${dayHours.open} - ${dayHours.close}`;
};

export const defaultBusinessHours: BusinessHours = {
  monday: { open: '9:00 AM', close: '5:00 PM' },
  tuesday: { open: '9:00 AM', close: '5:00 PM' },
  wednesday: { open: '9:00 AM', close: '5:00 PM' },
  thursday: { open: '9:00 AM', close: '5:00 PM' },
  friday: { open: '9:00 AM', close: '5:00 PM' },
  saturday: { open: '10:00 AM', close: '3:00 PM' },
  sunday: 'Closed'
};
