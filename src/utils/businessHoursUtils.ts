
import { Location, BusinessHours } from "@/types";

export const generateBusinessHours = (location: Location): BusinessHours => {
  // Generate hours based on location type
  if (location.type === 'bar' || location.type === 'nightclub') {
    return {
      monday: { open: '5:00 PM', close: '2:00 AM' },
      tuesday: { open: '5:00 PM', close: '2:00 AM' },
      wednesday: { open: '5:00 PM', close: '2:00 AM' },
      thursday: { open: '5:00 PM', close: '2:00 AM' },
      friday: { open: '5:00 PM', close: '3:00 AM' },
      saturday: { open: '5:00 PM', close: '3:00 AM' },
      sunday: 'Closed'
    };
  } else if (location.type === 'restaurant' || location.type === 'cafe') {
    return {
      monday: { open: '7:00 AM', close: '10:00 PM' },
      tuesday: { open: '7:00 AM', close: '10:00 PM' },
      wednesday: { open: '7:00 AM', close: '10:00 PM' },
      thursday: { open: '7:00 AM', close: '10:00 PM' },
      friday: { open: '7:00 AM', close: '11:00 PM' },
      saturday: { open: '8:00 AM', close: '11:00 PM' },
      sunday: { open: '8:00 AM', close: '9:00 PM' }
    };
  } else if (location.type === 'attraction' || location.type === 'museum') {
    return {
      monday: { open: '9:00 AM', close: '6:00 PM' },
      tuesday: { open: '9:00 AM', close: '6:00 PM' },
      wednesday: { open: '9:00 AM', close: '6:00 PM' },
      thursday: { open: '9:00 AM', close: '6:00 PM' },
      friday: { open: '9:00 AM', close: '7:00 PM' },
      saturday: { open: '9:00 AM', close: '7:00 PM' },
      sunday: { open: '10:00 AM', close: '5:00 PM' }
    };
  } else {
    // Default hours for other types
    return {
      monday: { open: '9:00 AM', close: '9:00 PM' },
      tuesday: { open: '9:00 AM', close: '9:00 PM' },
      wednesday: { open: '9:00 AM', close: '9:00 PM' },
      thursday: { open: '9:00 AM', close: '9:00 PM' },
      friday: { open: '9:00 AM', close: '10:00 PM' },
      saturday: { open: '9:00 AM', close: '10:00 PM' },
      sunday: { open: '10:00 AM', close: '8:00 PM' }
    };
  }
};

export const getTodaysHours = (location: Location): string => {
  if (!location.hours) {
    location.hours = generateBusinessHours(location);
  }
  
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todaysHours = location.hours[dayOfWeek as keyof BusinessHours];
  
  if (typeof todaysHours === 'string') {
    return todaysHours;
  } else if (todaysHours && typeof todaysHours === 'object') {
    return `${todaysHours.open} - ${todaysHours.close}`;
  }
  
  return 'Closed';
};
