
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GOOGLE_VERTEX_API_KEY = Deno.env.get('GOOGLE_VERTEX_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { venue_id, venue_name, reviews_text, sentiment_summary } = await req.json();

    if (!venue_id || !venue_name) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: venue_id, venue_name' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generating audio summary for venue: ${venue_name}`);

    // Step 1: Generate script using Gemini
    const script = await generateScript(venue_name, reviews_text, sentiment_summary);
    
    // Step 2: Convert to speech using Google Text-to-Speech
    const audioBase64 = await textToSpeech(script);
    
    // Step 3: Store in Supabase
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store audio summary metadata
    const { error: upsertError } = await supabase
      .from('venue_audio_summaries')
      .upsert({
        venue_id,
        script_text: script,
        audio_url: `data:audio/mpeg;base64,${audioBase64}`,
        generated_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'venue_id'
      });

    if (upsertError) {
      console.error('Error storing audio summary:', upsertError);
      throw new Error('Failed to store audio summary');
    }

    return new Response(
      JSON.stringify({
        success: true,
        script,
        audio_url: `data:audio/mpeg;base64,${audioBase64}`,
        generated_at: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating audio summary:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function generateScript(venueName: string, reviewsText: string, sentimentSummary: string): Promise<string> {
  const prompt = `
You are "VRN Audio Host", a friendly venue discovery assistant. Create a 2-minute podcast-style script (275-300 words) for "${venueName}".

Context:
- Reviews: ${reviewsText || 'Limited review data available'}
- Sentiment: ${sentimentSummary || 'Mixed reviews'}

Guidelines:
• Open with venue name & vibe (NPR/Spotify Daily Drive tone)
• Highlight 3-4 key sentiments (pros & cons) with anecdotes
• End with call-to-action: "Check VRN for live vibes"
• Keep language PG-13, inclusive, no personal data
• Sound natural when spoken aloud

Format as a single paragraph for smooth audio flow.
`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 400,
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Audio summary temporarily unavailable.';
}

async function textToSpeech(text: string): Promise<string> {
  const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_VERTEX_API_KEY
    },
    body: JSON.stringify({
      input: { text },
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Neural2-C',
        ssmlGender: 'FEMALE'
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 1.05,
        pitch: 0
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Google TTS API error:', response.status, errorData);
    throw new Error(`Google TTS API error: ${response.status}`);
  }

  const data = await response.json();
  return data.audioContent;
}
