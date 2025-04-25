
export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export const defaultBusinessHours: BusinessHours = {
  monday: '9:00 AM - 5:00 PM',
  tuesday: '9:00 AM - 5:00 PM',
  wednesday: '9:00 AM - 5:00 PM',
  thursday: '9:00 AM - 5:00 PM',
  friday: '9:00 AM - 5:00 PM',
  saturday: '10:00 AM - 3:00 PM',
  sunday: 'Closed'
};

export const restaurantBusinessHours: BusinessHours = {
  monday: '11:00 AM - 9:00 PM',
  tuesday: '11:00 AM - 9:00 PM',
  wednesday: '11:00 AM - 9:00 PM',
  thursday: '11:00 AM - 10:00 PM',
  friday: '11:00 AM - 11:00 PM',
  saturday: '10:00 AM - 11:00 PM',
  sunday: '10:00 AM - 8:00 PM'
};

export const barBusinessHours: BusinessHours = {
  monday: '4:00 PM - 12:00 AM',
  tuesday: '4:00 PM - 12:00 AM',
  wednesday: '4:00 PM - 12:00 AM',
  thursday: '4:00 PM - 1:00 AM',
  friday: '4:00 PM - 2:00 AM',
  saturday: '2:00 PM - 2:00 AM',
  sunday: '2:00 PM - 10:00 PM'
};

export const attractionBusinessHours: BusinessHours = {
  monday: '9:00 AM - 5:00 PM',
  tuesday: '9:00 AM - 5:00 PM',
  wednesday: '9:00 AM - 5:00 PM',
  thursday: '9:00 AM - 5:00 PM',
  friday: '9:00 AM - 5:00 PM',
  saturday: '9:00 AM - 7:00 PM',
  sunday: '10:00 AM - 4:00 PM'
};

export function getBusinessHoursForLocation(locationType: string): BusinessHours {
  switch(locationType.toLowerCase()) {
    case 'restaurant':
      return restaurantBusinessHours;
    case 'bar':
      return barBusinessHours;
    case 'attraction':
      return attractionBusinessHours;
    default:
      return defaultBusinessHours;
  }
}

export function isOpenNow(hours: BusinessHours): string {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  
  if (day in hours) {
    const dayHours = hours[day as keyof BusinessHours];
    
    if (dayHours === 'Closed') {
      return 'Closed';
    }
    
    const [openTime, closeTime] = dayHours.split(' - ');
    
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const openHour = parseTimeString(openTime);
    const closeHour = parseTimeString(closeTime);
    
    const currentTimeMinutes = currentHour * 60 + currentMinute;
    
    if (currentTimeMinutes >= openHour && currentTimeMinutes <= closeHour) {
      return 'Open';
    }
    
    return 'Closed';
  }
  
  return 'Unknown';
}

function parseTimeString(timeString: string): number {
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours < 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return hours * 60 + minutes;
}

export function getFormattedHours(hours: BusinessHours): string {
  const entries = Object.entries(hours);
  let result = '';
  
  for (const [day, time] of entries) {
    result += `${day.charAt(0).toUpperCase() + day.slice(1)}: ${time}\n`;
  }
  
  return result.trim();
}
