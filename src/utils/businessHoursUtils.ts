
export interface BusinessHours {
  monday: string | { open: string; close: string };
  tuesday: string | { open: string; close: string };
  wednesday: string | { open: string; close: string };
  thursday: string | { open: string; close: string };
  friday: string | { open: string; close: string };
  saturday: string | { open: string; close: string };
  sunday: string | { open: string; close: string };
}

export const formatBusinessHour = (hour: string | { open: string; close: string }): string => {
  if (typeof hour === 'string') {
    return hour;
  }
  return `${hour.open} - ${hour.close}`;
};

export const isOpenNow = (hours: BusinessHours): boolean => {
  const now = new Date();
  const dayOfWeek = now.toLocaleLowerCase() as keyof BusinessHours;
  const currentTime = now.getHours() * 100 + now.getMinutes();
  
  const todayHours = hours[dayOfWeek];
  
  if (typeof todayHours === 'string') {
    return todayHours.toLowerCase() !== 'closed';
  }
  
  if (typeof todayHours === 'object' && todayHours.open && todayHours.close) {
    const openTime = parseTime(todayHours.open);
    const closeTime = parseTime(todayHours.close);
    
    return currentTime >= openTime && currentTime <= closeTime;
  }
  
  return false;
};

const parseTime = (timeStr: string): number => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  
  let hour24 = hours;
  if (period?.toLowerCase() === 'pm' && hours !== 12) {
    hour24 += 12;
  } else if (period?.toLowerCase() === 'am' && hours === 12) {
    hour24 = 0;
  }
  
  return hour24 * 100 + (minutes || 0);
};

export const getCurrentDayHours = (hours: BusinessHours): string => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof BusinessHours;
  const todayHours = hours[today];
  
  return formatBusinessHour(todayHours);
};
