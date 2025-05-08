import { BusinessHours } from '@/types';

/**
 * Generates random business hours for a location based on location ID
 * @param locationId ID of the location to generate hours for
 * @returns BusinessHours object with opening and closing times
 */
export const generateBusinessHours = (locationId: string): BusinessHours => {
  // Seed the random number generator based on the location ID
  const seedValue = locationId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  let seedCounter = seedValue;
  
  const random = () => {
    // Use seedCounter rather than mutating seed
    seedCounter = (seedCounter * 9301 + 49297) % 233280;
    return seedCounter / 233280;
  };
  
  // Generate opening times between 7AM and 11AM
  const openingHour = Math.floor(random() * 4) + 7;
  const openingMinute = Math.floor(random() * 4) * 15;
  
  // Generate closing times between 5PM and 11PM
  const closingHour = Math.floor(random() * 6) + 17;
  const closingMinute = Math.floor(random() * 4) * 15;
  
  // Format the times
  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
  };
  
  // Generate day-specific variations
  const generateDayHours = (baseOpen: number, baseClose: number, modifier: number) => {
    const open = (baseOpen + Math.floor(random() * modifier)) % 24;
    const close = (baseClose + Math.floor(random() * modifier)) % 24;
    return `${formatTime(open, openingMinute)} - ${formatTime(close, closingMinute)}`;
  };
  
  // Determine if the place is open now
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const isOpen = currentHour > openingHour && currentHour < closingHour || 
                (currentHour === openingHour && currentMinute >= openingMinute) || 
                (currentHour === closingHour && currentMinute < closingMinute);
  
  return {
    monday: generateDayHours(openingHour, closingHour, 1),
    tuesday: generateDayHours(openingHour, closingHour, 1),
    wednesday: generateDayHours(openingHour, closingHour, 1),
    thursday: generateDayHours(openingHour, closingHour, 2),
    friday: generateDayHours(openingHour - 1, closingHour + 1, 2),
    saturday: generateDayHours(openingHour + 1, closingHour + 2, 3),
    sunday: generateDayHours(openingHour + 2, closingHour - 1, 2),
    isOpen
  };
};

/**
 * Check if a venue is currently open
 * @param hours BusinessHours object for the venue
 * @returns Boolean indicating if venue is currently open
 */
export const isVenueOpen = (hours?: BusinessHours): boolean => {
  if (!hours) return false;
  
  // Use the pre-calculated isOpen property if available
  if (hours.isOpen !== undefined) {
    return hours.isOpen;
  }
  
  // Otherwise calculate based on current time
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTimeStr = now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true 
  });
  
  // Get hours string for today
  let todayHours: string;
  switch (dayName) {
    case 'monday': todayHours = hours.monday; break;
    case 'tuesday': todayHours = hours.tuesday; break;
    case 'wednesday': todayHours = hours.wednesday; break;
    case 'thursday': todayHours = hours.thursday; break;
    case 'friday': todayHours = hours.friday; break;
    case 'saturday': todayHours = hours.saturday; break;
    case 'sunday': todayHours = hours.sunday; break;
    default: return false;
  }
  
  // Parse hours string (e.g., "10:00 AM - 9:00 PM")
  const [openTime, closeTime] = todayHours.split(' - ');
  if (!openTime || !closeTime) return false;
  
  // Parse times to comparable format
  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };
  
  const openMinutes = parseTime(openTime);
  let closeMinutes = parseTime(closeTime);
  
  // Handle cases where closing is past midnight
  if (closeMinutes < openMinutes) {
    closeMinutes += 24 * 60;
  }
  
  // Get current time in minutes
  const currentTime = parseTime(currentTimeStr);
  
  // Check if current time is within open hours
  return currentTime >= openMinutes && currentTime < closeMinutes;
};
