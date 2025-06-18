
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
        timezone: "America/Los_Angeles"
      };
  }
};

export const getTodaysHours = (location: Location): string => {
  if (!location.hours) {
    location.hours = generateBusinessHours(location);
  }

  // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
  const dayIndex = new Date().getDay();
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
