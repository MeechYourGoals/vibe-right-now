
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');

// Flag to determine which Google AI service to use
const useVertexAI = false; // Default to Gemini, can be toggled

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
    const { query } = await req.json();
    
    console.log("Vector search query:", query);
    
    // Check if API keys are available
    if (useVertexAI && !GOOGLE_VERTEX_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Vertex AI API key not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else if (!useVertexAI && !GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Gemini API key not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if it's a comedy query
    const isComedyQuery = /comedy|comedian|stand[ -]?up|improv|funny|laugh|jokes/i.test(query);
    
    // Analyze the query to identify components that can be categorized
    const queryComponents = await analyzeQuery(query);
    
    // Generate the completion prompt based on the query analysis
    let promptText = "";
    
    if (isComedyQuery) {
      promptText = generateComedyPrompt(query, queryComponents);
    } else {
      promptText = generatePrompt(query, queryComponents);
    }
    
    try {
      let results;
      
      if (useVertexAI) {
        // Use Vertex AI to search for relevant information
        const VERTEX_API_URL = "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-1.5-pro:generateContent";
        
        const response = await fetch(`${VERTEX_API_URL}?key=${GOOGLE_VERTEX_API_KEY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "USER",
                parts: [{ text: promptText }]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            }
          })
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error("Vertex AI API error:", errorData);
          throw new Error(`Error calling Vertex AI API: ${response.status}`);
        }
        
        const data = await response.json();
        results = data.candidates[0].content.parts[0].text;
      } else {
        // Use Gemini to search for relevant information
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: promptText }]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            }
          })
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error("Gemini API error:", errorData);
          throw new Error(`Error calling Gemini API: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
          console.error("Unexpected API response structure:", JSON.stringify(data));
          throw new Error("Unexpected API response structure");
        }
        
        results = data.candidates[0].content.parts[0].text;
      }
      
      // Extract categories for the UI to filter by
      let extractedCategories = extractCategoriesFromQuery(queryComponents);
      
      // Add comedy category if it's a comedy query
      if (isComedyQuery && !extractedCategories.includes('comedy')) {
        extractedCategories.push('comedy');
      }
      
      return new Response(
        JSON.stringify({ results, categories: extractedCategories }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (aiError) {
      console.error(`Error calling ${useVertexAI ? 'Vertex AI' : 'Gemini'} API:`, aiError);
      return new Response(
        JSON.stringify({ error: `Failed to process with ${useVertexAI ? 'Vertex AI' : 'Gemini'} API`, details: aiError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in vector-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Generate a structured prompt for comedy-specific queries
 */
function generateComedyPrompt(originalQuery: string, queryComponents: any): string {
  const { location } = queryComponents;
  
  return `You are VeRNon, a comedy event discovery assistant. The user is asking for: "${originalQuery}".
  
  Search for comedy shows, stand-up events, and comedy clubs in ${location || 'the mentioned location'}.
  
  For your search, consult these sources:
  - PunchUp Live (punchup.live)
  - Funny Bone Comedy Club (funnybone.com)
  - The Improv (improv.com)
  - Live Nation Comedy (livenation.com/feature/comedy)
  - AEG Presents (aegpresents.com/tours/)
  - Icon Concerts (iconconcerts.com/events/)
  - Local comedy clubs in the specified city
  
  For each comedy show or venue, provide:
  1. Name of comedian or show title
  2. Venue name with full address
  3. Date(s) and time(s)
  4. Ticket price range (if available)
  5. Direct links to official ticket pages (if available)
  6. Brief description of the performer or show
  
  Structure your response in clearly defined sections:
  - Upcoming Shows (for the next 2 weeks)
  - Featured Comedians
  - Comedy Venues in the area
  
  Focus on real venues and events that actually exist. Be specific and accurate with all details.`;
}

/**
 * Analyze a natural language query to extract key components
 */
async function analyzeQuery(query) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `
              For the following search query, extract and categorize the key components into a JSON structure:
              
              Query: "${query}"
              
              Extract the following information if present:
              - location (city, neighborhood, etc.)
              - venue_types (restaurant, bar, nightlife, attraction, etc.)
              - vibes (upscale, family-friendly, casual, romantic, etc.)
              - events (sports games, concerts, shows, comedy, etc.)
              - timeframe (morning, afternoon, night, specific dates, etc.)
              - special_requirements (parking, accessibility, etc.)
              
              Format the output as a valid JSON object, like:
              {
                "location": "Chicago",
                "venue_types": ["restaurant", "nightlife"],
                "vibes": ["upscale", "family-friendly"],
                "events": ["NBA game", "NFL game", "comedy show"],
                "timeframe": "lunch",
                "special_requirements": null
              }
              
              Only include fields that are explicitly mentioned in the query. If a category isn't mentioned, set it to null or an empty array.
            ` }]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });
    
    const data = await response.json();
    const jsonText = data.candidates[0].content.parts[0].text;
    
    // Extract the JSON object from the response text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("Failed to parse JSON from analysis:", e);
        return {}; 
      }
    }
    
    return {};
  } catch (error) {
    console.error("Error analyzing query:", error);
    return {};
  }
}

/**
 * Generate a structured prompt for Gemini based on query components
 */
function generatePrompt(originalQuery, queryComponents) {
  const {
    location,
    venue_types = [],
    vibes = [],
    events = [],
    timeframe,
    special_requirements
  } = queryComponents;
  
  // Build a structured prompt for Gemini to get comprehensive results
  let prompt = `You are VeRNon, a venue and event discovery assistant. The user is asking for: "${originalQuery}".
  
  Provide detailed information about real venues, events, and activities in ${location || 'the specified location'} that match these criteria:
  `;
  
  if (venue_types.length > 0) {
    prompt += `\n- Venue Types: ${venue_types.join(', ')}`;
  }
  
  if (vibes.length > 0) {
    prompt += `\n- Atmosphere/Vibes: ${vibes.join(', ')}`;
  }
  
  if (events.length > 0) {
    prompt += `\n- Events: ${events.join(', ')}`;
  }
  
  if (timeframe) {
    prompt += `\n- Timeframe: ${timeframe}`;
  }
  
  if (special_requirements) {
    prompt += `\n- Special Requirements: ${special_requirements}`;
  }
  
  prompt += `
  
  For each category (Restaurants, Nightlife, Events, Attractions, etc.), provide:
  1. At least 3-5 specific venues or events with real names
  2. Address information for each venue
  3. Brief descriptions highlighting how they match the requested criteria
  4. Operating hours when available
  5. Price ranges when applicable
  6. Direct links to websites or ticketing if available
  
  For sporting events like NBA or NFL games:
  - Include any upcoming games in the area with dates, times, and ticket information
  - Mention nearby venues that would be good before/after the game
  
  Structure your response in clearly defined sections for each category and make it easy to read.
  Prioritize real, verifiable places and events that actually exist.
  `;
  
  return prompt;
}

/**
 * Extract categories from query components for UI filtering
 */
function extractCategoriesFromQuery(queryComponents) {
  const categories = [];
  
  if (queryComponents.venue_types && queryComponents.venue_types.length > 0) {
    categories.push(...queryComponents.venue_types.map(type => {
      // Map venue types to our application's category system
      switch (type.toLowerCase()) {
        case 'restaurant':
        case 'dining':
        case 'food':
          return 'restaurant';
        case 'bar':
        case 'nightlife':
        case 'club':
          return 'bar';
        case 'concert':
        case 'music':
        case 'show':
          return 'music';
        case 'comedy':
        case 'stand-up':
        case 'improv':
          return 'comedy';
        case 'attraction':
        case 'sight':
        case 'landmark':
          return 'attraction';
        case 'sports':
        case 'game':
        case 'match':
          return 'sports';
        default:
          return type.toLowerCase();
      }
    }));
  }
  
  if (queryComponents.events && queryComponents.events.length > 0) {
    for (const event of queryComponents.events) {
      if (event.toLowerCase().includes('nba') || event.toLowerCase().includes('basketball')) {
        if (!categories.includes('sports')) categories.push('sports');
      }
      if (event.toLowerCase().includes('nfl') || event.toLowerCase().includes('football')) {
        if (!categories.includes('sports')) categories.push('sports');
      }
      if (event.toLowerCase().includes('concert') || event.toLowerCase().includes('music')) {
        if (!categories.includes('music')) categories.push('music');
      }
      if (event.toLowerCase().includes('comedy') || event.toLowerCase().includes('stand-up') || event.toLowerCase().includes('improv')) {
        if (!categories.includes('comedy')) categories.push('comedy');
      }
    }
  }
  
  if (queryComponents.vibes && queryComponents.vibes.length > 0) {
    // Add vibes as categories too
    categories.push(...queryComponents.vibes.map(vibe => vibe.toLowerCase()));
  }
  
  // Remove duplicates
  return [...new Set(categories)];
}
