
import { Location } from "@/types";

const getDefaultHours = (type: Location['type']) => {
  // Handle different venue types with default hours
  if (type === "restaurant") {
    return "11:00 AM - 10:00 PM";
  } else if (type === "bar" || type === "nightclub" || type === "lounge") {
    return "5:00 PM - 2:00 AM";
  }
  return "9:00 AM - 9:00 PM";
};

const isValidTimeFormat = (time: string | boolean | string[]): time is string => {
  return typeof time === 'string' && time.trim() !== '';
};

export const getBusinessHours = (location: Location) => {
  if (!location.hours) {
    return {
      isOpen: false,
      nextOpenTime: null,
      todayHours: getDefaultHours(location.type),
      isOpen24Hours: false
    };
  }

  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' }) as keyof typeof location.hours;
  
  let todayHours = "Closed";
  const currentHours = location.hours[currentDay];
  
  if (isValidTimeFormat(currentHours)) {
    todayHours = currentHours;
  } else if (typeof currentHours === 'boolean' && currentHours) {
    todayHours = "Open 24 Hours";
  }

  return {
    isOpen: location.hours.isOpenNow === "true" || location.hours.isOpenNow === true,
    nextOpenTime: null,
    todayHours,
    isOpen24Hours: location.hours.isOpen24Hours || false
  };
};

export const formatBusinessHours = (hours: Location['hours']) => {
  if (!hours) return "Hours not available";
  
  if (hours.isOpen24Hours) return "Open 24 Hours";
  
  if (hours.weekdayText && hours.weekdayText.length > 0) {
    return hours.weekdayText.join(', ');
  }
  
  return "Hours not available";
};
