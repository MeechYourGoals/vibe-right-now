
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getApiKey } from "../_shared/auth.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Retrieve the Gemini API key from environment variables
const GEMINI_API_KEY = getApiKey('GEMINI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { venue_id, platform, reviews } = await req.json();

    if (!venue_id || !platform || !reviews || !Array.isArray(reviews)) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: venue_id, platform, reviews' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing sentiment for venue ${venue_id} on ${platform} with ${reviews.length} reviews`);

    // Prepare the prompt for Gemini
    const reviewTexts = reviews.map(r => r.text || r.content).join('\n\n');
    
    const prompt = `
    You are an AI sentiment analysis expert. Analyze the following customer reviews for a venue and provide:
    
    1. Overall sentiment score (-1.0 to 1.0, where -1 is very negative, 0 is neutral, 1 is very positive)
    2. A concise summary sentence describing the overall customer sentiment
    3. Theme analysis with scores for common themes like: ambience, service, food, music, cleanliness, value, staff, atmosphere
    
    Reviews to analyze:
    ${reviewTexts}
    
    Respond in this exact JSON format:
    {
      "overall_sentiment": 0.75,
      "sentiment_summary": "Customers love the ambience and music but find the service slow",
      "themes": {
        "ambience": 0.9,
        "service": -0.3,
        "food": 0.6,
        "music": 0.8,
        "atmosphere": 0.7
      }
    }
    
    Only include themes that are actually mentioned in the reviews. Keep the summary under 100 characters.
    `;

    // Call Gemini API
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
          temperature: 0.1,
          topK: 1,
          topP: 0.8,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Parse the JSON response from Gemini
    let analysisResult;
    try {
      // Extract JSON from the response (in case it's wrapped in markdown)
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : generatedText;
      analysisResult = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', generatedText);
      // Fallback analysis
      analysisResult = {
        overall_sentiment: 0.0,
        sentiment_summary: "Unable to analyze sentiment automatically",
        themes: {}
      };
    }

    // Store results in Supabase
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Upsert venue sentiment analysis
    const { error: upsertError } = await supabase
      .from('venue_sentiment_analysis')
      .upsert({
        venue_id,
        platform,
        overall_sentiment: analysisResult.overall_sentiment,
        sentiment_summary: analysisResult.sentiment_summary,
        themes: analysisResult.themes,
        review_count: reviews.length,
        last_analyzed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'venue_id,platform'
      });

    if (upsertError) {
      console.error('Error storing sentiment analysis:', upsertError);
    }

    // Cache individual review sentiments (simplified for now)
    for (const review of reviews) {
      if (review.id && review.text) {
        await supabase
          .from('review_sentiment_cache')
          .upsert({
            venue_id,
            platform,
            review_id: review.id,
            review_text: review.text,
            sentiment_score: analysisResult.overall_sentiment, // Simplified - using overall score
            themes: analysisResult.themes,
            analyzed_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
          }, {
            onConflict: 'venue_id,platform,review_id'
          });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        analysis: analysisResult,
        processed_reviews: reviews.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in sentiment analysis:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
