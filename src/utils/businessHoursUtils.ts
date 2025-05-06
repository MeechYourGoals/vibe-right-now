
// This file handles business hours formatting and calculations

// Format 24-hour time to 12-hour format with AM/PM
export const formatTimeToAmPm = (time: string): string => {
  if (!time) return '';
  
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${displayHours}:${formattedMinutes} ${period}`;
};

// Convert hours from BusinessHours format to Record<string, string[]> format
export const convertBusinessHoursToRecordFormat = (hours: BusinessHours): Record<string, string[]> => {
  if (!hours) return {};
  
  const result: Record<string, string[]> = {};
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  days.forEach(day => {
    if (hours[day] && typeof hours[day] === 'string') {
      // Parse range like "9:00 AM - 5:00 PM" to ["09:00", "17:00"]
      const timeRange = hours[day] as string;
      const [openTime, closeTime] = timeRange.split(' - ');
      
      if (openTime && closeTime) {
        // Convert from 12h to 24h format
        result[day] = [convertTo24Hour(openTime), convertTo24Hour(closeTime)];
      } else {
        result[day] = ["00:00", "00:00"]; // Default closed
      }
    } else if (hours.isOpen24Hours) {
      result[day] = ["00:00", "23:59"]; // 24 hours
    } else {
      result[day] = ["00:00", "00:00"]; // Default closed
    }
  });
  
  return result;
};

// Convert from 12-hour format to 24-hour format
export const convertTo24Hour = (time12h: string): string => {
  if (!time12h || typeof time12h !== 'string') return '00:00';
  
  const [timePart, modifier] = time12h.split(' ');
  if (!timePart || !modifier) return '00:00';
  
  let [hours, minutes] = timePart.split(':').map(Number);
  
  if (isNaN(hours) || isNaN(minutes)) return '00:00';
  
  if (hours === 12) {
    hours = modifier.toLowerCase() === 'pm' ? 12 : 0;
  } else if (modifier.toLowerCase() === 'pm') {
    hours += 12;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Check if a venue is currently open
export const isVenueOpen = (hours: BusinessHours | Record<string, string[]>): boolean => {
  if (!hours) return false;
  
  // Convert BusinessHours to Record<string, string[]> if needed
  const hoursRecord = isBusinessHoursObject(hours) ? convertBusinessHoursToRecordFormat(hours) : hours;
  
  // Get current day and time
  const now = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = days[now.getDay()];
  
  // Check if there are hours for today
  if (!hoursRecord[currentDay] || !Array.isArray(hoursRecord[currentDay]) || hoursRecord[currentDay].length < 2) {
    return false;
  }
  
  const todayHours = hoursRecord[currentDay];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Parse opening and closing times
  const [openingTime, closingTime] = todayHours.map(timeStr => {
    if (typeof timeStr !== 'string') {
      return { hours: 0, minutes: 0 };
    }
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours: hours || 0, minutes: minutes || 0 };
  });
  
  // Handle overnight hours (if closing time is earlier than opening time)
  if (closingTime.hours < openingTime.hours) {
    // Venue is open overnight
    return (currentHour > openingTime.hours || 
            (currentHour === openingTime.hours && currentMinute >= openingTime.minutes)) || 
           (currentHour < closingTime.hours || 
            (currentHour === closingTime.hours && currentMinute <= closingTime.minutes));
  }
  
  // Normal hours (same day)
  return (currentHour > openingTime.hours || 
          (currentHour === openingTime.hours && currentMinute >= openingTime.minutes)) && 
         (currentHour < closingTime.hours || 
          (currentHour === closingTime.hours && currentMinute <= closingTime.minutes));
};

// Helper function to check if an object is a BusinessHours type
export const isBusinessHoursObject = (hours: any): hours is BusinessHours => {
  return (
    hours !== null &&
    typeof hours === 'object' &&
    !Array.isArray(hours) &&
    typeof hours.monday === 'string' &&
    typeof hours.tuesday === 'string'
  );
};

// Get the current status of the venue (Open Now, Closed, Opening Soon, etc.)
export const getVenueStatus = (hours: BusinessHours | Record<string, string[]>): string => {
  if (!hours) return 'Hours not available';
  
  if (isVenueOpen(hours)) {
    return 'Open Now';
  } else {
    // Here we could add logic to show "Opening Soon" or "Closing Soon"
    return 'Closed';
  }
};

// Format and display business hours for the week
export const formatBusinessHours = (hours: BusinessHours | Record<string, string[]>): string => {
  if (!hours) return 'Hours not available';
  
  // Convert BusinessHours to Record<string, string[]> if needed
  const hoursRecord = isBusinessHoursObject(hours) ? convertBusinessHoursToRecordFormat(hours) : hours;
  
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const currentDayIndex = new Date().getDay(); // 0 is Sunday
  const reorderedDays = [...days.slice(currentDayIndex === 0 ? 6 : currentDayIndex - 1), ...days.slice(0, currentDayIndex === 0 ? 6 : currentDayIndex - 1)];
  
  const todayIdx = reorderedDays.findIndex(day => day === days[(currentDayIndex === 0 ? 6 : currentDayIndex - 1)]);
  
  return reorderedDays.map((day, index) => {
    const isToday = index === todayIdx;
    const dayHours = hoursRecord[day];
    
    if (!dayHours || !Array.isArray(dayHours) || dayHours.length < 2) {
      return `${day.charAt(0).toUpperCase() + day.slice(1)}: Closed ${isToday ? '(Today)' : ''}`;
    }
    
    const [open, close] = dayHours;
    if (typeof open === 'string' && typeof close === 'string') {
      return `${day.charAt(0).toUpperCase() + day.slice(1)}: ${formatTimeToAmPm(open)} - ${formatTimeToAmPm(close)} ${isToday ? '(Today)' : ''}`;
    } else {
      return `${day.charAt(0).toUpperCase() + day.slice(1)}: Hours not available ${isToday ? '(Today)' : ''}`;
    }
  }).join('\n');
};

// Generate default business hours for a venue
export const generateBusinessHours = (venue: Location): Record<string, string[]> => {
  // If hours already exist, return them
  if (venue.hours) {
    if (isBusinessHoursObject(venue.hours)) {
      return convertBusinessHoursToRecordFormat(venue.hours);
    }
    return venue.hours as Record<string, string[]>;
  }
  
  // Default hours based on venue type
  const venueType = venue.type?.toLowerCase() || 'default';
  
  const defaultHours: Record<string, string[]> = {
    monday: ['09:00', '17:00'],
    tuesday: ['09:00', '17:00'],
    wednesday: ['09:00', '17:00'],
    thursday: ['09:00', '17:00'],
    friday: ['09:00', '17:00'],
    saturday: ['10:00', '15:00'],
    sunday: ['10:00', '15:00'],
  };
  
  // Adjust based on venue type
  switch (venueType) {
    case 'restaurant':
    case 'cafe':
      return {
        monday: ['11:00', '22:00'],
        tuesday: ['11:00', '22:00'],
        wednesday: ['11:00', '22:00'],
        thursday: ['11:00', '23:00'],
        friday: ['11:00', '23:00'],
        saturday: ['10:00', '23:00'],
        sunday: ['10:00', '22:00'],
      };
    case 'bar':
    case 'nightclub':
      return {
        monday: ['16:00', '00:00'],
        tuesday: ['16:00', '00:00'],
        wednesday: ['16:00', '00:00'],
        thursday: ['16:00', '01:00'],
        friday: ['16:00', '02:00'],
        saturday: ['16:00', '02:00'],
        sunday: ['16:00', '00:00'],
      };
    case 'gym':
    case 'fitness':
      return {
        monday: ['06:00', '22:00'],
        tuesday: ['06:00', '22:00'],
        wednesday: ['06:00', '22:00'],
        thursday: ['06:00', '22:00'],
        friday: ['06:00', '22:00'],
        saturday: ['08:00', '20:00'],
        sunday: ['08:00', '18:00'],
      };
    case 'hotel':
      return {
        monday: ['00:00', '23:59'],
        tuesday: ['00:00', '23:59'],
        wednesday: ['00:00', '23:59'],
        thursday: ['00:00', '23:59'],
        friday: ['00:00', '23:59'],
        saturday: ['00:00', '23:59'],
        sunday: ['00:00', '23:59'],
      };
    default:
      return defaultHours;
  }
};

export const getTodaysHours = (venue: Location): string => {
  if (!venue.hours) {
    return 'Hours not available';
  }
  
  // Convert to the right format if needed
  const hours = isBusinessHoursObject(venue.hours) 
    ? convertBusinessHoursToRecordFormat(venue.hours) 
    : venue.hours as Record<string, string[]>;
  
  // Get current day
  const now = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = days[now.getDay()];
  
  // Check if there are hours for today
  if (!hours[currentDay] || !Array.isArray(hours[currentDay]) || hours[currentDay].length < 2) {
    return 'Closed today';
  }
  
  const [open, close] = hours[currentDay];
  if (typeof open === 'string' && typeof close === 'string') {
    return `${formatTimeToAmPm(open)} - ${formatTimeToAmPm(close)}`;
  } else {
    return 'Hours not available';
  }
};
