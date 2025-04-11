
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');
const VERTEX_API_URL = "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-1.5-pro:generateContent";

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
    const { prompt, mode, history, searchMode, categories } = await req.json();
    
    // Build conversation history in Vertex AI format
    const contents = [];
    
    // Add system prompt based on the mode
    if (mode === 'venue') {
      contents.push({
        role: "USER",
        parts: [{ text: "You are VeRNon for Venues, a business insights assistant. Help venue owners understand their metrics, customer trends, and marketing performance." }]
      });
      contents.push({
        role: "MODEL",
        parts: [{ text: "I am VeRNon for Venues, a business insights assistant. I help venue owners understand their metrics, customer trends, and marketing performance." }]
      });
    } else if (searchMode) {
      contents.push({
        role: "USER",
        parts: [{ text: "You are VeRNon, a venue and event discovery assistant. You provide ONLY real, factual information about venues, events, and places. Never make up information. If you don't know something, say so clearly. Always include real venue names, addresses, and other factual details when possible. Always format your responses with markdown and include hyperlinks to official websites or to internal pages using the format [Venue Name](/venue/venue-id) for internal links." }]
      });
      contents.push({
        role: "MODEL",
        parts: [{ text: "I am VeRNon, a venue and event discovery assistant. I provide only real, factual information about venues, events, and places. I will never make up information and will clearly state when I don't know something. I'll format my responses with markdown and include hyperlinks." }]
      });
      
      // For search mode, add a special prompt to get real information
      let enhancedPrompt = prompt;
      
      // Incorporate categories if available
      if (categories && categories.length > 0) {
        const categoryContext = categories.join(', ');
        enhancedPrompt = `${prompt} (Categories: ${categoryContext})`;
      }
      
      contents.push({
        role: "USER",
        parts: [{ text: `Search for real factual information about: "${enhancedPrompt}". Include real venue names, addresses, opening hours, and other specific details. Format your response with markdown, including headers and bulleted lists. IMPORTANT: Present information for venues in this format:

## [Venue Name](venue official website URL) - Category
* 📍 Address
* ⏰ Hours
* 💲 Price range
* 📞 Phone
* 🌐 [View on VRN](/venue/venue-id)

For events, use this format:
## [Event Name](event official website URL)
* 📅 Date and time
* 📍 Location
* 💲 Ticket prices
* 🎟️ [Get Tickets](ticket URL)
* 🌐 [View on VRN](/event/event-id)

Only provide information you're confident is factual. If you don't know, say so clearly.` }]
      });
    } else {
      contents.push({
        role: "USER",
        parts: [{ text: "You are VeRNon, a venue and event discovery assistant. Help users find venues, events, and local attractions based on their preferences and location. Always format your responses with markdown and include hyperlinks to venues and events when possible." }]
      });
      contents.push({
        role: "MODEL",
        parts: [{ text: "I am VeRNon, a venue and event discovery assistant. I help users find venues, events, and local attractions based on their preferences and location. I'll format my responses with markdown and include hyperlinks." }]
      });
    }
    
    // Add conversation history for regular chat mode
    if (history && history.length > 0 && !searchMode) {
      for (const message of history) {
        contents.push({
          role: message.sender === 'user' ? "USER" : "MODEL",
          parts: [{ text: message.text }]
        });
      }
    }
    
    // Add the current prompt (only for non-search mode, for search mode it's already added)
    if (!searchMode) {
      contents.push({
        role: "USER",
        parts: [{ text: prompt }]
      });
    }
    
    console.log("Sending request to Vertex AI API");
    
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
  
  return text + exploreAllLink;
}
