
import { BusinessHours, Location } from "@/types";

export const getTodaysHours = (hours?: BusinessHours | Location): string => {
  if (!hours) return "Hours not available";
  
  // If it's a Location object, extract the hours property
  const businessHours = 'hours' in hours ? hours.hours : hours;
  
  if (!businessHours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todaysHours = businessHours[today];
  
  if (!todaysHours) return "Closed today";
  
  return todaysHours;
};

export const formatBusinessHours = (hours?: BusinessHours | Location): string => {
  if (!hours) return "Hours not available";
  
  // If it's a Location object, extract the hours property
  const businessHours = 'hours' in hours ? hours.hours : hours;
  
  if (!businessHours) return "Hours not available";
  
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const formattedHours = daysOfWeek
    .map(day => {
      const dayHours = businessHours[day];
      if (dayHours) {
        const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
        return `${capitalizedDay}: ${dayHours}`;
      }
      return null;
    })
    .filter(Boolean)
    .join('\n');
  
  return formattedHours || "Hours not available";
};

export const generateBusinessHours = (location?: any): BusinessHours => {
  if (location && location.hours) {
    return location.hours;
  }
  
  // Default business hours
  return {
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM", 
    wednesday: "9:00 AM - 5:00 PM",
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Closed"
  };
};
