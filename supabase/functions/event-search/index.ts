
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.43/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { provider, location, dateFrom, dateTo } = await req.json();
    
    if (!provider || !location) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    switch (provider.toLowerCase()) {
      case 'bandsintown':
        return await handleBandsInTownSearch(location, dateFrom, dateTo);
        
      case 'punchup':
        return await handlePunchupSearch(location, dateFrom, dateTo);
        
      default:
        return new Response(
          JSON.stringify({ error: 'Unknown provider' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Error in event-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Handle scraping BandsInTown website for concerts
 */
async function handleBandsInTownSearch(location: string, dateFrom?: string, dateTo?: string) {
  try {
    const encodedLocation = encodeURIComponent(location);
    const url = `https://www.bandsintown.com/c/${encodedLocation}`;
    
    console.log(`Scraping Bandsintown for ${location} at URL: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Bandsintown responded with ${response.status}`);
    }
    
    const html = await response.text();
    const parser = new DOMParser();
    const document = parser.parseFromString(html, "text/html");
    
    if (!document) {
      throw new Error("Failed to parse Bandsintown HTML");
    }
    
    // Extract events data
    const events = extractBandsintownEvents(document, dateFrom, dateTo);
    
    return new Response(
      JSON.stringify({ events }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error scraping Bandsintown:', error);
    return new Response(
      JSON.stringify({ error: error.message, events: [] }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Extract concert information from Bandsintown HTML
 */
function extractBandsintownEvents(document: Document, dateFrom?: string, dateTo?: string) {
  try {
    const eventElements = document.querySelectorAll(".event-card");
    const events = [];
    
    for (let i = 0; i < eventElements.length; i++) {
      const eventEl = eventElements[i];
      
      try {
        // Extract event details
        const artist = extractTextContent(eventEl.querySelector(".event-artist-name"));
        const title = artist ? `${artist} Concert` : extractTextContent(eventEl.querySelector(".event-title"));
        const venue = extractTextContent(eventEl.querySelector(".venue-name"));
        const dateString = extractTextContent(eventEl.querySelector(".event-date"));
        
        // Parse date from text content
        let eventDate;
        if (dateString) {
          const dateMatch = dateString.match(/(\w+)\s(\d+)/); // e.g., "Jun 15"
          if (dateMatch) {
            const month = dateMatch[1];
            const day = dateMatch[2];
            const year = new Date().getFullYear();
            eventDate = new Date(`${month} ${day}, ${year}`).toISOString();
          }
        }
        
        if (!eventDate) {
          eventDate = new Date().toISOString();
        }
        
        // Filter by date range if provided
        if (dateFrom || dateTo) {
          const eventTime = new Date(eventDate).getTime();
          if (dateFrom && eventTime < new Date(dateFrom).getTime()) continue;
          if (dateTo && eventTime > new Date(dateTo).getTime()) continue;
        }
        
        // Attempt to extract image URL
        let imageUrl = "";
        const imgEl = eventEl.querySelector("img.event-image");
        if (imgEl && imgEl.hasAttribute("src")) {
          imageUrl = imgEl.getAttribute("src") || "";
        }
        
        // Try to extract ticket link
        let ticketUrl = "https://www.bandsintown.com/";
        const linkEl = eventEl.querySelector("a.event-link");
        if (linkEl && linkEl.hasAttribute("href")) {
          const href = linkEl.getAttribute("href");
          if (href) {
            ticketUrl = href.startsWith("http") ? href : `https://www.bandsintown.com${href}`;
          }
        }
        
        events.push({
          title,
          artist,
          venue,
          date: eventDate,
          time: "8:00 PM", // Default time, Bandsintown often doesn't show this on main listings
          imageUrl,
          ticketUrl,
          description: `Live performance by ${artist}`,
          price: "Tickets Available" // Price typically not shown on listings page
        });
      } catch (eventError) {
        console.error('Error extracting event details:', eventError);
      }
    }
    
    return events;
  } catch (error) {
    console.error('Error parsing Bandsintown events:', error);
    return [];
  }
}

/**
 * Handle scraping Punchup.live website for comedy events
 */
async function handlePunchupSearch(location: string, dateFrom?: string, dateTo?: string) {
  try {
    // First try to convert the city to a postal code
    const postalCode = await getPostalCodeForLocation(location);
    
    let url = 'https://punchup.live/nearby';
    if (postalCode) {
      url = `https://punchup.live/nearby?postalCode=${postalCode}&countryCode=US`;
    }
    
    console.log(`Scraping Punchup for ${location} with postal code ${postalCode} at URL: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Punchup responded with ${response.status}`);
    }
    
    const html = await response.text();
    const parser = new DOMParser();
    const document = parser.parseFromString(html, "text/html");
    
    if (!document) {
      throw new Error("Failed to parse Punchup HTML");
    }
    
    // Extract events data
    const events = extractPunchupEvents(document, dateFrom, dateTo);
    
    return new Response(
      JSON.stringify({ events }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error scraping Punchup:', error);
    return new Response(
      JSON.stringify({ error: error.message, events: [] }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Convert a location string to a postal code
 */
async function getPostalCodeForLocation(location: string): Promise<string | null> {
  try {
    // Use geocoding service (Nominatim/OpenStreetMap) to convert city,state to postal code
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&addressdetails=1`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Vibe Right Now App/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Geocoding service responded with ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.length > 0 && data[0].address && data[0].address.postcode) {
      return data[0].address.postcode;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting postal code:', error);
    return null;
  }
}

/**
 * Extract comedy events from Punchup HTML
 */
function extractPunchupEvents(document: Document, dateFrom?: string, dateTo?: string) {
  try {
    const eventElements = document.querySelectorAll(".card, .event-card");
    const events = [];
    
    for (let i = 0; i < eventElements.length; i++) {
      const eventEl = eventElements[i];
      
      try {
        // Extract event details
        const title = extractTextContent(eventEl.querySelector(".card-title, .event-title"));
        const venue = extractTextContent(eventEl.querySelector(".venue-name, .card-text"));
        const dateString = extractTextContent(eventEl.querySelector(".event-date, .card-subtitle"));
        
        // Parse date from text content
        let eventDate;
        if (dateString) {
          try {
            // Handle various date formats
            eventDate = new Date(dateString).toISOString();
          } catch (e) {
            eventDate = new Date().toISOString();
          }
        } else {
          eventDate = new Date().toISOString();
        }
        
        // Filter by date range if provided
        if (dateFrom || dateTo) {
          const eventTime = new Date(eventDate).getTime();
          if (dateFrom && eventTime < new Date(dateFrom).getTime()) continue;
          if (dateTo && eventTime > new Date(dateTo).getTime()) continue;
        }
        
        // Attempt to extract image URL
        let imageUrl = "";
        const imgEl = eventEl.querySelector("img.card-img-top, img.event-image");
        if (imgEl && imgEl.hasAttribute("src")) {
          imageUrl = imgEl.getAttribute("src") || "";
        }
        
        // Try to extract ticket link
        let ticketUrl = "https://punchup.live/";
        const linkEl = eventEl.querySelector("a.btn, a.event-link");
        if (linkEl && linkEl.hasAttribute("href")) {
          const href = linkEl.getAttribute("href");
          if (href) {
            ticketUrl = href.startsWith("http") ? href : `https://punchup.live${href}`;
          }
        }
        
        // Try to extract price
        let price = "Tickets Available";
        const priceEl = eventEl.querySelector(".price, .ticket-price");
        if (priceEl) {
          price = extractTextContent(priceEl) || price;
        }
        
        events.push({
          title: title || "Comedy Show",
          venue: venue || "Local Venue",
          date: eventDate,
          time: extractTextContent(eventEl.querySelector(".event-time")) || "8:00 PM",
          imageUrl,
          ticketUrl,
          description: `Comedy show${title ? `: ${title}` : ''}`,
          price
        });
      } catch (eventError) {
        console.error('Error extracting event details:', eventError);
      }
    }
    
    return events;
  } catch (error) {
    console.error('Error parsing Punchup events:', error);
    return [];
  }
}

/**
 * Safely extract text content from a DOM element
 */
function extractTextContent(element: Element | null): string {
  if (!element) return "";
  return element.textContent?.trim() || "";
}
