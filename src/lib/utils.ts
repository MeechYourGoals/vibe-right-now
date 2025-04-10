
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string or Date object into a human-readable format
 * Handles both string and Date input types
 */
export function formatDate(dateString: string | Date): string {
  if (!dateString) return '';
  
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return typeof dateString === 'string' ? dateString : dateString.toString();
  }
}

/**
 * Format a time string into a human-readable format
 */
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

/**
 * Format a timestamp (string or Date) into a string for display
 * Ensures compatibility with components expecting string
 */
export function formatTimestamp(timestamp: string | Date): string {
  if (timestamp instanceof Date) {
    return timestamp.toISOString();
  }
  return timestamp;
}
