
import { Location, BusinessHours } from "@/types";

export const generateBusinessHours = (venue: Location): BusinessHours => {
  // Generate realistic business hours based on venue type
  const venueType = venue.type || venue.category;
  
  switch (venueType) {
    case 'restaurant':
      return {
        monday: '11:00 AM - 10:00 PM',
        tuesday: '11:00 AM - 10:00 PM',
        wednesday: '11:00 AM - 10:00 PM',
        thursday: '11:00 AM - 10:00 PM',
        friday: '11:00 AM - 11:00 PM',
        saturday: '11:00 AM - 11:00 PM',
        sunday: '11:00 AM - 9:00 PM'
      };
    case 'bar':
    case 'nightclub':
      return {
        monday: 'Closed',
        tuesday: 'Closed',
        wednesday: '6:00 PM - 2:00 AM',
        thursday: '6:00 PM - 2:00 AM',
        friday: '6:00 PM - 3:00 AM',
        saturday: '6:00 PM - 3:00 AM',
        sunday: '6:00 PM - 1:00 AM'
      };
    case 'coffee':
      return {
        monday: '7:00 AM - 7:00 PM',
        tuesday: '7:00 AM - 7:00 PM',
        wednesday: '7:00 AM - 7:00 PM',
        thursday: '7:00 AM - 7:00 PM',
        friday: '7:00 AM - 8:00 PM',
        saturday: '8:00 AM - 8:00 PM',
        sunday: '8:00 AM - 6:00 PM'
      };
    default:
      return {
        monday: '9:00 AM - 9:00 PM',
        tuesday: '9:00 AM - 9:00 PM',
        wednesday: '9:00 AM - 9:00 PM',
        thursday: '9:00 AM - 9:00 PM',
        friday: '9:00 AM - 10:00 PM',
        saturday: '9:00 AM - 10:00 PM',
        sunday: '10:00 AM - 8:00 PM'
      };
  }
};

export const getTodaysHours = (venue: Location): string => {
  if (!venue.hours) {
    venue.hours = generateBusinessHours(venue);
  }
  
  const today = new Date().getDay();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = days[today] as keyof BusinessHours;
  
  return venue.hours[dayName] || 'Hours not available';
};
