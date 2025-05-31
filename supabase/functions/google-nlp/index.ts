
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Get API key from environment variable
const GOOGLE_NLP_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY'); // Using the same Vertex AI key
const NLP_API_URL = "https://language.googleapis.com/v1/documents:annotateText"; // Changed to annotateText

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
    const { text, tasks } = await req.json();
    
    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Determine features based on tasks or default
    let featuresForApi: { [key: string]: boolean } = {};
    if (tasks && Object.keys(tasks).length > 0) {
      if (tasks.entities) featuresForApi.extractEntities = true;
      if (tasks.sentiment) featuresForApi.extractDocumentSentiment = true;
      if (tasks.syntax) featuresForApi.extractSyntax = true;
      if (tasks.entitySentiment) {
        featuresForApi.extractEntitySentiment = true;
        featuresForApi.extractEntities = true; // Required for entitySentiment
      }
      // Add other features here as needed, e.g., classifyText
    } else {
      // Default features if tasks object is not provided or empty
      console.log("No specific tasks provided, defaulting to entities and sentiment.");
      featuresForApi = {
        extractEntities: true,
        extractDocumentSentiment: true,
      };
    }

    if (Object.keys(featuresForApi).length === 0 && (!tasks || Object.keys(tasks).length > 0)) {
        // This case means 'tasks' was provided but all were false or unrecognized.
        // Or 'tasks' was an empty object.
        console.log("Tasks object was provided but resulted in no features being enabled. Defaulting to entities and sentiment.");
        featuresForApi = {
            extractEntities: true,
            extractDocumentSentiment: true,
        };
    } else if (Object.keys(featuresForApi).length === 0) {
        // Should not happen if default logic above is correct, but as a safeguard.
        console.warn("No features were enabled for NLP analysis after processing tasks. This might be an issue.");
         return new Response(
            JSON.stringify({ error: 'No NLP features selected or defaulted.' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
    
    console.log("Requesting NLP features:", featuresForApi);

    // Call Google Natural Language API's annotateText endpoint
    const response = await fetch(`${NLP_API_URL}?key=${GOOGLE_NLP_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document: {
          type: 'PLAIN_TEXT',
          content: text
        },
        features: featuresForApi,
        encodingType: 'UTF8'
      })
    });

    if (!response.ok) {
      const errorBody = await response.text(); // Use .text() for better error details
      console.error(`Google NLP API error: ${response.status}`, errorBody);
      return new Response(
        JSON.stringify({ error: `Error calling Google NLP API: ${response.status} - ${errorBody}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("Google NLP API response received for annotateText");
    
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in google-nlp function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
