
import { BusinessHours, Location } from "@/types";

export const generateBusinessHours = (location: Location): BusinessHours => {
  // Default hours based on venue type
  let defaultHours: BusinessHours;
  
  if (location.type === "bar" || location.type === "nightclub") {
    defaultHours = {
      monday: { open: "5:00 PM", close: "2:00 AM" },
      tuesday: { open: "5:00 PM", close: "2:00 AM" },
      wednesday: { open: "5:00 PM", close: "2:00 AM" },
      thursday: { open: "5:00 PM", close: "2:00 AM" },
      friday: { open: "5:00 PM", close: "3:00 AM" },
      saturday: { open: "5:00 PM", close: "3:00 AM" },
      sunday: { open: "5:00 PM", close: "1:00 AM" }
    };
  } else if (location.type === "restaurant" || location.type === "cafe") {
    defaultHours = {
      monday: { open: "7:00 AM", close: "10:00 PM" },
      tuesday: { open: "7:00 AM", close: "10:00 PM" },
      wednesday: { open: "7:00 AM", close: "10:00 PM" },
      thursday: { open: "7:00 AM", close: "10:00 PM" },
      friday: { open: "7:00 AM", close: "11:00 PM" },
      saturday: { open: "8:00 AM", close: "11:00 PM" },
      sunday: { open: "8:00 AM", close: "9:00 PM" }
    };
  } else if (location.type === "attraction" || location.type === "museum") {
    defaultHours = {
      monday: { open: "9:00 AM", close: "5:00 PM" },
      tuesday: { open: "9:00 AM", close: "5:00 PM" },
      wednesday: { open: "9:00 AM", close: "5:00 PM" },
      thursday: { open: "9:00 AM", close: "5:00 PM" },
      friday: { open: "9:00 AM", close: "6:00 PM" },
      saturday: { open: "9:00 AM", close: "6:00 PM" },
      sunday: { open: "10:00 AM", close: "4:00 PM" }
    };
  } else {
    // Default for events, sports, and other venues
    defaultHours = {
      monday: { open: "10:00 AM", close: "10:00 PM" },
      tuesday: { open: "10:00 AM", close: "10:00 PM" },
      wednesday: { open: "10:00 AM", close: "10:00 PM" },
      thursday: { open: "10:00 AM", close: "10:00 PM" },
      friday: { open: "10:00 AM", close: "11:00 PM" },
      saturday: { open: "10:00 AM", close: "11:00 PM" },
      sunday: { open: "12:00 PM", close: "9:00 PM" }
    };
  }

  return defaultHours;
};

export const isCurrentlyOpen = (hours: BusinessHours): boolean => {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
  
  const todaysHours = hours[currentDay as keyof BusinessHours];
  
  if (!todaysHours || todaysHours === "Closed") {
    return false;
  }
  
  if (typeof todaysHours === "string") {
    return todaysHours !== "Closed";
  }
  
  if (typeof todaysHours === "object" && todaysHours.open && todaysHours.close) {
    const openTime = convertTo24Hour(todaysHours.open);
    const closeTime = convertTo24Hour(todaysHours.close);
    
    return currentTime >= openTime && currentTime <= closeTime;
  }
  
  return false;
};

const convertTo24Hour = (time: string): string => {
  const [timeStr, period] = time.split(' ');
  let [hours, minutes] = timeStr.split(':').map(Number);
  
  if (period === 'AM' && hours === 12) hours = 0;
  if (period === 'PM' && hours !== 12) hours += 12;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const getNextOpenTime = (hours: BusinessHours): string | null => {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const now = new Date();
  let checkDate = new Date(now);
  
  for (let i = 0; i < 7; i++) {
    const dayName = daysOfWeek[checkDate.getDay()];
    const dayHours = hours[dayName as keyof BusinessHours];
    
    if (dayHours && typeof dayHours === "object" && dayHours.open) {
      return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} at ${dayHours.open}`;
    }
    
    checkDate.setDate(checkDate.getDate() + 1);
  }
  
  return null;
};
