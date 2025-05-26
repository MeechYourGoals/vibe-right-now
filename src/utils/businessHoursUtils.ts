
import { BusinessHours } from "@/types";

export const getTodaysHours = (hours?: BusinessHours): string => {
  if (!hours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todaysHours = hours[today];
  
  if (!todaysHours) return "Closed today";
  
  return todaysHours;
};

export const formatBusinessHours = (hours?: BusinessHours): string => {
  if (!hours) return "Hours not available";
  
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const formattedHours = daysOfWeek
    .map(day => {
      const dayHours = hours[day];
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
