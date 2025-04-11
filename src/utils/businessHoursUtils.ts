
import { BusinessHours, Location } from '@/types';

/**
 * Generates mock business hours for a location
 */
export const generateBusinessHours = (location: Location): BusinessHours => {
  // First check if location has hours already
  if (location.hours) {
    return location.hours;
  }
  
  // Some locations are open 24 hours
  const is24Hours = location.id.includes('24') || Math.random() < 0.1;
  
  if (is24Hours) {
    return {
      monday: 'Open 24 hours',
      tuesday: 'Open 24 hours',
      wednesday: 'Open 24 hours',
      thursday: 'Open 24 hours',
      friday: 'Open 24 hours',
      saturday: 'Open 24 hours',
      sunday: 'Open 24 hours',
      isOpen24Hours: true
    };
  }
  
  // Determine opening and closing times based on location type
  const openingHour = getOpeningHour(location.type);
  const closingHour = getClosingHour(location.type);
  
  // Create weekday hours
  const weekdayHours = `${openingHour}AM - ${closingHour > 12 ? closingHour - 12 : closingHour}${closingHour >= 12 ? 'PM' : 'AM'}`;
  
  // Weekend might have different hours
  const weekendOpeningHour = Math.max(openingHour - 1, 6); // Open earlier on weekends, but not before 6AM
  const weekendClosingHour = Math.min(closingHour + 1, 24); // Close later on weekends, but not after midnight
  
  const weekendHours = `${weekendOpeningHour}AM - ${weekendClosingHour > 12 ? weekendClosingHour - 12 : weekendClosingHour}${weekendClosingHour >= 12 ? 'PM' : 'AM'}`;
  
  return {
    monday: weekdayHours,
    tuesday: weekdayHours,
    wednesday: weekdayHours,
    thursday: weekdayHours,
    friday: weekendHours,
    saturday: weekendHours,
    sunday: weekendHours,
    isOpen24Hours: false
  };
};

/**
 * Get typical opening hour based on location type
 */
const getOpeningHour = (locationType: string): number => {
  switch (locationType) {
    case 'restaurant':
      return 11; // 11AM
    case 'bar':
      return 16; // 4PM
    case 'event':
      return 9; // 9AM
    case 'attraction':
      return 9; // 9AM
    case 'sports':
      return 9; // 9AM
    default:
      return 9; // 9AM
  }
};

/**
 * Get typical closing hour based on location type
 */
const getClosingHour = (locationType: string): number => {
  switch (locationType) {
    case 'restaurant':
      return 22; // 10PM
    case 'bar':
      return 2; // 2AM (next day)
    case 'event':
      return 22; // 10PM
    case 'attraction':
      return 18; // 6PM
    case 'sports':
      return 21; // 9PM
    default:
      return 18; // 6PM
  }
};
