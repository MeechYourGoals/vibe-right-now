import { Location, BusinessHours } from "@/types";

export const generateBusinessHours = (location: Location): BusinessHours => {
  const defaultHours = {
    open: "9:00 AM",
    close: "10:00 PM",
    closed: false
  };

  const closedDay = { open: "", close: "", closed: true };

  // Generate hours based on location type
  switch (location.type) {
    case 'bar':
    case 'nightclub':
      return {
        monday: closedDay,
        tuesday: { open: "5:00 PM", close: "2:00 AM", closed: false },
        wednesday: { open: "5:00 PM", close: "2:00 AM", closed: false },
        thursday: { open: "5:00 PM", close: "2:00 AM", closed: false },
        friday: { open: "5:00 PM", close: "3:00 AM", closed: false },
        saturday: { open: "5:00 PM", close: "3:00 AM", closed: false },
        sunday: { open: "5:00 PM", close: "12:00 AM", closed: false },
        isOpenNow: true,
        isOpen24Hours: false,
        timezone: "America/Los_Angeles"
      };
    
    case 'cafe':
      return {
        monday: { open: "6:00 AM", close: "6:00 PM", closed: false },
        tuesday: { open: "6:00 AM", close: "6:00 PM", closed: false },
        wednesday: { open: "6:00 AM", close: "6:00 PM", closed: false },
        thursday: { open: "6:00 AM", close: "6:00 PM", closed: false },
        friday: { open: "6:00 AM", close: "7:00 PM", closed: false },
        saturday: { open: "7:00 AM", close: "7:00 PM", closed: false },
        sunday: { open: "7:00 AM", close: "6:00 PM", closed: false },
        isOpenNow: true,
        isOpen24Hours: false,
        timezone: "America/Los_Angeles"
      };

    case 'restaurant':
    default:
      return {
        monday: defaultHours,
        tuesday: defaultHours,
        wednesday: defaultHours,
        thursday: defaultHours,
        friday: { open: "9:00 AM", close: "11:00 PM", closed: false },
        saturday: { open: "9:00 AM", close: "11:00 PM", closed: false },
        sunday: defaultHours,
        isOpenNow: true,
        isOpen24Hours: false,
        timezone: "America/Los_Angeles"
      };
  }
};

export const getTodaysHours = (location: Location): string => {
  if (!location.hours) {
    location.hours = generateBusinessHours(location);
  }

  // Fixed: Get day of week correctly and use proper day names
  const today = new Date();
  const dayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const fullDayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = fullDayNames[dayIndex];
  
  const todaysHours = location.hours[dayName];
  
  if (!todaysHours) {
    return "Hours not available";
  }

  if (typeof todaysHours === 'string') {
    return todaysHours;
  }

  if (todaysHours.closed) {
    return "Closed";
  }

  return `${todaysHours.open} - ${todaysHours.close}`;
};

export const isOpenNow = (location: Location): boolean => {
  if (!location.hours) {
    return false;
  }

  return location.hours.isOpenNow || false;
};

export const isVenueOpen = (venue: Location): boolean => {
  if (!venue.hours) return false;

  const now = new Date();
  const dayName = getDayName(now.getDay());
  const currentTime = now.getHours() * 60 + now.getMinutes(); // minutes since midnight
  
  const todaysHours = venue.hours[dayName];
  
  // Handle different hour formats
  if (typeof todaysHours === 'string') {
    // If it's a string like "Closed" or "24/7"
    if (todaysHours.toLowerCase() === 'closed') return false;
    if (todaysHours === '24/7') return true;
    // Try to parse as "HH:MM - HH:MM" format
    const match = todaysHours.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
    if (match) {
      const [, openHour, openMin, closeHour, closeMin] = match;
      const openTime = parseInt(openHour) * 60 + parseInt(openMin);
      const closeTime = parseInt(closeHour) * 60 + parseInt(closeMin);
      return currentTime >= openTime && currentTime <= closeTime;
    }
    return false;
  }
  
  if (typeof todaysHours === 'object' && todaysHours !== null) {
    // Handle object format with open/close/closed properties
    if ('closed' in todaysHours && todaysHours.closed) return false;
    if ('open' in todaysHours && 'close' in todaysHours) {
      const openTime = parseTimeString(todaysHours.open);
      const closeTime = parseTimeString(todaysHours.close);
      return currentTime >= openTime && currentTime <= closeTime;
    }
  }
  
  return false;
};

const getDayName = (dayIndex: number): string => {
  const fullDayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return fullDayNames[dayIndex];
};

const parseTimeString = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};
