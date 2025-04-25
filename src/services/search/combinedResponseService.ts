
import { Location } from '@/types';
import { EventItem } from '@/components/venue/events/types'; 
import { getCitySpecificEvent, getEventWebsite } from './eventService';

export interface CombinedResponseOptions {
  includeEvents?: boolean;
  includeLocations?: boolean;
  maxEvents?: number;
  maxLocations?: number;
  eventsFirst?: boolean;
}

export function generateCombinedResponse(
  query: string,
  locations: Location[],
  events: EventItem[],
  options: CombinedResponseOptions = {}
): string {
  const {
    includeEvents = true,
    includeLocations = true,
    maxEvents = 3,
    maxLocations = 3,
    eventsFirst = false
  } = options;
  
  let response = `Here's what I found for "${query}":\n\n`;
  
  const selectedLocations = locations.slice(0, maxLocations);
  const selectedEvents = events.slice(0, maxEvents);
  
  const sections = [];
  
  if (includeLocations && selectedLocations.length > 0) {
    const locationsSection = generateLocationsSection(selectedLocations);
    sections.push(locationsSection);
  }
  
  if (includeEvents && selectedEvents.length > 0) {
    const eventsSection = generateEventsSection(selectedEvents);
    sections.push(eventsSection);
  }
  
  // Order the sections based on the eventsFirst option
  if (eventsFirst) {
    sections.reverse();
  }
  
  response += sections.join('\n\n');
  
  if (sections.length === 0) {
    response = `I couldn't find any specific results for "${query}". Please try a different search or browse our featured content.`;
  }
  
  return response;
}

function generateLocationsSection(locations: Location[]): string {
  let section = '**Places You Might Like**:\n\n';
  
  locations.forEach((location, index) => {
    section += `${index + 1}. **${location.name}** - ${location.address}, ${location.city}\n`;
    if (location.type) {
      section += `   Type: ${location.type.charAt(0).toUpperCase() + location.type.slice(1)}\n`;
    }
    if (location.verified) {
      section += '   ✓ Verified Location\n';
    }
    section += '\n';
  });
  
  return section;
}

function generateEventsSection(events: EventItem[]): string {
  let section = '**Upcoming Events**:\n\n';
  
  events.forEach((event, index) => {
    section += `${index + 1}. **${event.title}** - ${event.date} at ${event.time}\n`;
    section += `   Venue: ${event.venue}\n`;
    section += `   ${event.price} ${event.ticketsAvailable > 0 ? '- Tickets Available!' : '- Sold Out!'}\n\n`;
  });
  
  return section;
}

export function generateSpecificEventResponse(eventType: string, city: string, dateRange?: string): string {
  const eventTitle = getCitySpecificEvent(eventType, city);
  const website = getEventWebsite(eventType);
  const date = dateRange || 'This weekend';
  
  return `
## ${eventTitle}

**When**: ${date}
**Where**: ${city}
**Website**: ${website}

Don't miss this amazing event! Get your tickets early as they might sell out fast.
  `;
}
