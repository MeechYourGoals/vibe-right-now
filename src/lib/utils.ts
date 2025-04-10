
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

export function formatTime(timeString: string): string {
  if (!timeString) return '';
  
  try {
    // Add basic time formatting if needed
    return timeString;
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
}
