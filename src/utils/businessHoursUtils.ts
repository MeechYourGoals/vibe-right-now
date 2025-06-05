
import { Location, BusinessHours } from '@/types';

export const generateBusinessHours = (location: Location): BusinessHours => {
  // Default hours based on venue type
  const getDefaultHours = () => {
    if (location.type === 'bar') {
      return { open: '5:00 PM', close: '2:00 AM' };
    } else if (location.type === 'restaurant') {
      return { open: '11:00 AM', close: '10:00 PM' };
    } else {
      return { open: '9:00 AM', close: '9:00 PM' };
    }
  };

  const defaultHours = getDefaultHours();

  return {
    monday: defaultHours,
    tuesday: defaultHours,
    wednesday: defaultHours,
    thursday: defaultHours,
    friday: location.type === 'bar' ? { open: '5:00 PM', close: '3:00 AM' } : defaultHours,
    saturday: location.type === 'bar' ? { open: '5:00 PM', close: '3:00 AM' } : defaultHours,
    sunday: location.type === 'bar' ? { open: '5:00 PM', close: '1:00 AM' } : defaultHours,
    timezone: 'America/New_York'
  };
};

export const isOpenNow = (hours: BusinessHours): boolean => {
  const now = new Date();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const todaysHours = hours[dayOfWeek as keyof BusinessHours];
  
  if (typeof todaysHours === 'string') {
    return todaysHours !== 'Closed';
  }
  
  if (todaysHours && typeof todaysHours === 'object' && 'open' in todaysHours && 'close' in todaysHours) {
    // Simple time comparison - this could be enhanced for more complex scenarios
    return currentTime >= todaysHours.open && currentTime <= todaysHours.close;
  }
  
  return false;
};

export const formatHours = (hours: BusinessHours[keyof BusinessHours]): string => {
  if (typeof hours === 'string') {
    return hours;
  }
  
  if (hours && typeof hours === 'object' && 'open' in hours && 'close' in hours) {
    return `${hours.open} - ${hours.close}`;
  }
  
  return 'Closed';
};
