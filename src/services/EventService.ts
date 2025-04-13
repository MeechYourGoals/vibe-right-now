
import { supabase } from '@/integrations/supabase/client';
import { EventItem } from "@/components/venue/events/types";

export interface TicketmasterEvent {
  id: string;
  name: string;
  url: string;
  images: { url: string, ratio: string }[];
  dates: {
    start: {
      localDate: string;
      localTime: string;
    }
  };
  _embedded?: {
    venues?: {
      name: string;
      city?: {
        name: string;
      };
      address?: {
        line1: string;
      };
    }[];
  };
  priceRanges?: {
    min: number;
    max: number;
    currency: string;
  }[];
  type?: string;
  classifications?: {
    segment: { name: string };
  }[];
}

export const EventService = {
  /**
   * Fetch events by category
   * @param category Event category
   * @param city City name (optional)
   * @param startDate Start date in ISO format (optional)
   * @param endDate End date in ISO format (optional)
   * @returns List of events
   */
  async getEventsByCategory(
    category: string,
    city?: string,
    startDate?: string,
    endDate?: string
  ): Promise<EventItem[]> {
    try {
      // First try to fetch from Ticketmaster
      const { data: ticketmasterData, error } = await supabase.functions.invoke('ticketmaster', {
        body: {
          operation: 'events-by-category',
          category,
          city: city || sessionStorage.getItem('selectedCity') || undefined,
          startDate,
          endDate,
          size: 10
        }
      });
      
      if (error) {
        console.error('Error fetching events from Ticketmaster:', error);
        // Fall back to local mock data
        return getLocalMockEventsByCategory(category);
      }
      
      // Parse and format Ticketmaster events
      if (ticketmasterData && 
          ticketmasterData._embedded && 
          ticketmasterData._embedded.events) {
        
        return ticketmasterData._embedded.events.map((event: TicketmasterEvent) => {
          const venue = event._embedded?.venues?.[0];
          
          // Format price range
          const priceRange = event.priceRanges ? 
            `$${Math.floor(event.priceRanges[0].min)} - $${Math.ceil(event.priceRanges[0].max)}` : 
            'Price varies';
          
          return {
            id: event.id,
            title: event.name,
            description: `Live event at ${venue?.name || 'venue TBA'}`,
            date: event.dates.start.localDate,
            time: event.dates.start.localTime?.substring(0, 5) || '19:00',
            location: venue?.name || 'TBA',
            type: category.toLowerCase(),
            imageUrl: event.images?.[0]?.url || `https://source.unsplash.com/random/600x400?${category}`,
            ticketUrl: event.url,
            price: priceRange
          };
        });
      }
      
      // Fall back to local mock data if no events found
      return getLocalMockEventsByCategory(category);
    } catch (error) {
      console.error(`Error fetching ${category} events:`, error);
      // Fall back to mock data on error
      return getLocalMockEventsByCategory(category);
    }
  }
};

/**
 * Get mock events from local data
 */
function getLocalMockEventsByCategory(category: string): EventItem[] {
  const currentDate = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(currentDate.getMonth() + 1);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Different event themes based on category
  if (category.toLowerCase() === 'nightlife') {
    return [
      {
        id: "nightlife-1",
        title: "Summer Night Club Party",
        description: "Experience the ultimate nightlife with top DJs and exclusive VIP sections.",
        date: formatDate(nextMonth),
        time: "22:00",
        location: "Skyline Rooftop Lounge",
        type: "nightlife",
        imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&h=400",
        ticketUrl: "https://ticketmaster.com/events/nightlife-1",
        price: "$30 - $75"
      },
      {
        id: "nightlife-2",
        title: "Underground House Music Night",
        description: "Deep house and techno in an exclusive underground venue.",
        date: formatDate(new Date(currentDate.setDate(currentDate.getDate() + 7))),
        time: "23:00",
        location: "The Basement Club",
        type: "nightlife",
        imageUrl: "https://images.unsplash.com/photo-1569924994774-0f1464c8bb11?auto=format&fit=crop&w=600&h=400",
        ticketUrl: "https://ticketmaster.com/events/nightlife-2",
        price: "$25"
      },
      {
        id: "nightlife-3",
        title: "Retro 80s Dance Night",
        description: "Dance to the best hits from the 80s at this monthly throwback party.",
        date: formatDate(new Date(currentDate.setDate(currentDate.getDate() + 14))),
        time: "21:00",
        location: "Neon Lounge",
        type: "nightlife",
        imageUrl: "https://images.unsplash.com/photo-1556035511-3168381ea4d4?auto=format&fit=crop&w=600&h=400",
        ticketUrl: "https://ticketmaster.com/events/nightlife-3",
        price: "$20 - $40"
      }
    ];
  } else if (category.toLowerCase() === 'comedy') {
    return [
      {
        id: "comedy-1",
        title: "Stand-up Comedy Showcase",
        description: "Five of the city's best comedians performing their latest material.",
        date: formatDate(new Date(currentDate.setDate(currentDate.getDate() + 5))),
        time: "20:00",
        location: "Laugh Factory",
        type: "comedy",
        imageUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=600&h=400",
        ticketUrl: "https://ticketmaster.com/events/comedy-1",
        price: "$25"
      },
      {
        id: "comedy-2",
        title: "Improv Night",
        description: "Hilarious unscripted comedy with audience participation.",
        date: formatDate(new Date(currentDate.setDate(currentDate.getDate() + 12))),
        time: "19:30",
        location: "Comedy Cellar",
        type: "comedy",
        imageUrl: "https://images.unsplash.com/photo-1543584756-31b1d21cecf2?auto=format&fit=crop&w=600&h=400",
        ticketUrl: "https://ticketmaster.com/events/comedy-2",
        price: "$22"
      },
      {
        id: "comedy-3",
        title: "Late Night Comedy Special",
        description: "Adult-oriented comedy show featuring two headlining comedians.",
        date: formatDate(new Date(currentDate.setDate(currentDate.getDate() + 18))),
        time: "22:00",
        location: "The Improv",
        type: "comedy",
        imageUrl: "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?auto=format&fit=crop&w=600&h=400",
        ticketUrl: "https://ticketmaster.com/events/comedy-3",
        price: "$35 - $55"
      }
    ];
  } else if (category.toLowerCase() === 'music') {
    return [
      {
        id: "music-1",
        title: "Summer Music Festival",
        description: "Annual music festival featuring indie rock, pop, and electronic artists.",
        date: formatDate(nextMonth),
        time: "14:00",
        location: "Central Park",
        type: "music",
        imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&h=400",
        ticketUrl: "https://ticketmaster.com/events/music-1",
        price: "$65 - $150"
      },
      {
        id: "music-2",
        title: "Jazz in the Park",
        description: "Weekly jazz performances by local and touring musicians.",
        date: formatDate(new Date(currentDate.setDate(currentDate.getDate() + 8))),
        time: "19:00",
        location: "Riverside Amphitheater",
        type: "music",
        imageUrl: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?auto=format&fit=crop&w=600&h=400",
        ticketUrl: "https://ticketmaster.com/events/music-2",
        price: "$40"
      },
      {
        id: "music-3",
        title: "Classical Symphony Night",
        description: "The city orchestra performs classics by Mozart and Beethoven.",
        date: formatDate(new Date(currentDate.setDate(currentDate.getDate() + 15))),
        time: "20:00",
        location: "Concert Hall",
        type: "music",
        imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=600&h=400",
        ticketUrl: "https://ticketmaster.com/events/music-3",
        price: "$50 - $120"
      }
    ];
  } else {
    // Generic events for other categories
    return [
      {
        id: `${category}-1`,
        title: `${category} Event`,
        description: `Great ${category} event happening soon!`,
        date: formatDate(new Date(currentDate.setDate(currentDate.getDate() + 10))),
        time: "19:00",
        location: "Downtown Venue",
        type: category.toLowerCase(),
        imageUrl: `https://source.unsplash.com/random/600x400?${category}`,
        ticketUrl: `https://ticketmaster.com/events/${category}-1`,
        price: "$25 - $75"
      },
      {
        id: `${category}-2`,
        title: `${category} Festival`,
        description: `Annual ${category} festival with activities for everyone.`,
        date: formatDate(nextMonth),
        time: "12:00",
        location: "City Center",
        type: category.toLowerCase(),
        imageUrl: `https://source.unsplash.com/random/600x400?${category},festival`,
        ticketUrl: `https://ticketmaster.com/events/${category}-2`,
        price: "$40"
      },
      {
        id: `${category}-3`,
        title: `${category} Show`,
        description: `Special ${category} performance by renowned artists.`,
        date: formatDate(new Date(currentDate.setDate(currentDate.getDate() + 20))),
        time: "20:00",
        location: "Theater District",
        type: category.toLowerCase(),
        imageUrl: `https://source.unsplash.com/random/600x400?${category},performance`,
        ticketUrl: `https://ticketmaster.com/events/${category}-3`,
        price: "$35 - $85"
      }
    ];
  }
}
