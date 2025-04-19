
import { Location, BusinessHours } from "@/types";

// Generate business hours for a location if not already present
export const generateBusinessHours = (venue: Location): Record<string, string> => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Default hours pattern
  const defaultHours: Record<string, string> = {
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 5:00 PM',
    thursday: '9:00 AM - 5:00 PM',
    friday: '9:00 AM - 5:00 PM',
    saturday: '10:00 AM - 3:00 PM',
    sunday: 'Closed'
  };
  
  // Restaurant hours pattern
  const restaurantHours: Record<string, string> = {
    monday: '11:00 AM - 10:00 PM',
    tuesday: '11:00 AM - 10:00 PM',
    wednesday: '11:00 AM - 10:00 PM',
    thursday: '11:00 AM - 11:00 PM',
    friday: '11:00 AM - 12:00 AM',
    saturday: '10:00 AM - 12:00 AM',
    sunday: '10:00 AM - 9:00 PM'
  };
  
  // Bar hours pattern
  const barHours: Record<string, string> = {
    monday: '4:00 PM - 12:00 AM',
    tuesday: '4:00 PM - 12:00 AM',
    wednesday: '4:00 PM - 1:00 AM',
    thursday: '4:00 PM - 2:00 AM',
    friday: '4:00 PM - 4:00 AM',
    saturday: '4:00 PM - 4:00 AM',
    sunday: '4:00 PM - 10:00 PM'
  };
  
  // Select hours based on venue type
  let hours: Record<string, string>;
  
  switch (venue.type) {
    case 'restaurant':
      hours = restaurantHours;
      break;
    case 'bar':
      hours = barHours;
      break;
    default:
      hours = defaultHours;
  }
  
  return hours;
};

// Get today's hours for a venue
export const getTodaysHours = (venue: Location): string => {
  if (!venue.hours) return "Hours not available";
  
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = daysOfWeek[new Date().getDay()];
  
  return venue.hours[today] || "Closed";
};
