
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');
const VERTEX_API_URL = "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-1.5-pro:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// System prompts that define the chatbot's personality and behavior
const SYSTEM_PROMPTS = {
  default: `You are a helpful and friendly AI assistant within the 'Lovable' app. Your primary goal is to help users discover great places to go and things to do based on their requests.
  
  Respond in a concise, informative, and enthusiastic tone. Be friendly, approachable, and helpful. Offer creative and interesting suggestions.
  
  Maintain a conversational style that is engaging and encourages users to explore. Avoid being overly verbose. Get straight to the point while still being helpful.
  
  When providing suggestions, briefly explain why you are recommending them based on potential user interests.
  
  If the user asks for something specific that isn't readily available, acknowledge it and offer alternative suggestions or ways to find more information within the app.
  
  Do not express personal opinions or beliefs. Focus solely on providing information relevant to places and activities. If a user's request is unclear, ask clarifying questions.`,
  
  venue: `You are a knowledgeable business assistant within the 'Lovable' platform. Your primary goal is to help venue owners understand their business metrics, customer trends, and marketing performance.
  
  Provide data-driven insights and actionable recommendations based on the information available. Be concise, professional, and helpful.
  
  When analyzing business data, focus on identifying trends, opportunities, and potential areas for improvement. Support your insights with specific metrics when available.
  
  If the venue owner asks for something specific that isn't readily available, acknowledge it and suggest alternative approaches or metrics they might consider.
  
  Maintain a professional but friendly tone that builds confidence. Avoid being overly technical unless the user demonstrates expertise in the subject.`,
  
  search: `You are an AI discovery expert for the 'Lovable' social platform. Your job is to provide factual, accurate information about places and venues.
  
  Always include real venue names, addresses, and other specific details when possible. Format your responses with markdown, including headers and bulleted lists.
  
  Present information for venues in a structured format including:
  - Full venue name (be specific)
  - Exact address with street number
  - Hours of operation by day of the week
  - Price range (using $ symbols)
  - Contact information (phone number and website)
  - Brief description of what makes this place special
  - Any current promotions or special events
  
  For events, include:
  - Event name and type
  - Date and time (be specific with AM/PM)
  - Venue location with address
  - Ticket prices and how to purchase
  - Any age restrictions or dress codes
  
  Organize venues by category (restaurants, bars, attractions, etc.) and sort them by relevance to the query.
  
  Only provide information you're confident is factual. If you don't know something, clearly state that you don't have that specific information.
  
  Be concise but thorough. Users are looking for helpful recommendations they can act on immediately.`
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting Vertex AI function execution");
    
    // Parse request body
    const requestData = await req.json();
    const { prompt, mode, history, searchMode, categories } = requestData;
    
    console.log("Request parameters:", { 
      prompt: prompt?.substring(0, 50) + "...", 
      mode, 
      historyLength: history?.length || 0,
      searchMode, 
      categoriesCount: categories?.length || 0 
    });
    
    // Build conversation history in Vertex AI format
    const contents = [];
    
    // Select the appropriate system prompt based on mode
    const systemPrompt = mode === 'venue' 
      ? SYSTEM_PROMPTS.venue 
      : (searchMode ? SYSTEM_PROMPTS.search : SYSTEM_PROMPTS.default);
    
    // Add system prompt
    contents.push({
      role: "USER",
      parts: [{ text: systemPrompt }]
    });
    
    // Add model acknowledgment of the system prompt
    contents.push({
      role: "MODEL",
      parts: [{ text: "I understand my role and will assist accordingly." }]
    });
    
    // Add conversation history for regular chat mode
    if (history && history.length > 0 && !searchMode) {
      for (const message of history) {
        contents.push({
          role: message.sender === 'user' ? "USER" : "MODEL",
          parts: [{ text: message.text }]
        });
      }
    }
    
    // Add the current prompt
    // For search mode, add extra context
    if (searchMode) {
      let enhancedPrompt = prompt;
      
      // Incorporate categories if available
      if (categories && categories.length > 0) {
        const categoryContext = categories.join(', ');
        enhancedPrompt = `${prompt} (Focus on these categories: ${categoryContext})`;
      }
      
      // Check if this is a nearby or location-specific query
      const isNearbyQuery = /nearby|close|around|near|within walking distance|in this area/i.test(prompt);
      if (isNearbyQuery) {
        enhancedPrompt += " (User is looking for places very close to their current location)";
      }
      
      // Check if this is about venues currently open
      const isOpenNowQuery = /open now|open late|still open|currently open|open today/i.test(prompt);
      if (isOpenNowQuery) {
        enhancedPrompt += " (Only include venues that would be open at the current time)";
      }
      
      contents.push({
        role: "USER",
        parts: [{ text: `Search for real factual information about: "${enhancedPrompt}". Include real venue names, addresses, opening hours, and other specific details. Organize the information by categories and focus on being practical and actionable.` }]
      });
    } else {
      contents.push({
        role: "USER",
        parts: [{ text: prompt }]
      });
    }
    
    console.log("Preparing to call Vertex AI API with URL:", VERTEX_API_URL);
    console.log("Contents length:", contents.length);
    
    if (!GOOGLE_VERTEX_API_KEY) {
      throw new Error("GOOGLE_VERTEX_API_KEY environment variable is not set");
    }
    
    // Call the Vertex AI API
    const response = await fetch(`${VERTEX_API_URL}?key=${GOOGLE_VERTEX_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: searchMode ? 0.1 : 0.7, // Lower temperature for factual search queries
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    console.log("Vertex AI API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Vertex AI API error: ${response.status}`, errorData);
      return new Response(
        JSON.stringify({ error: `Error calling Vertex AI API: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("Vertex AI API response received");
    
    // Extract the response text
    const responseText = data.candidates[0].content.parts[0].text;
    
    // Add hyperlinks to the Explore page for any locations or events mentioned
    const enhancedResponse = addExplorePageLinks(responseText, prompt);
    
    return new Response(
      JSON.stringify({ text: enhancedResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in vertex-ai function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Add hyperlinks to the Explore page for locations/events mentioned in the text
 */
function addExplorePageLinks(text: string, originalQuery: string): string {
  // Add a link to explore all results at the bottom
  const exploreAllLink = `\n\n---\n\n**[Explore all results on the map](/explore?q=${encodeURIComponent(originalQuery)})**`;
  
  // Try to extract venue names and link them individually
  let enhancedText = text;
  
  // Simple pattern matching for venue names - this could be improved
  const venuePattern = /\*\*([\w\s&',.]+)\*\*/g;
  const venueMatches = text.match(venuePattern);
  
  if (venueMatches) {
    venueMatches.forEach(match => {
      const venueName = match.replace(/\*\*/g, '').trim();
      if (venueName.length > 3) { // Avoid linking very short names
        const linkPattern = new RegExp(`\\*\\*${venueName}\\*\\*`, 'g');
        enhancedText = enhancedText.replace(
          linkPattern, 
          `**[${venueName}](/explore?venue=${encodeURIComponent(venueName)})**`
        );
      }
    });
  }
  
  return enhancedText + exploreAllLink;
}
