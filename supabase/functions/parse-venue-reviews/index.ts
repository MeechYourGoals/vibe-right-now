
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url, venueId } = await req.json()

    if (!url) {
      throw new Error('URL is required')
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured')
    }

    // Extract domain from URL for identification
    const domain = new URL(url).hostname.replace('www.', '')
    
    // For demo purposes, return mock data for known domains
    const mockSummaries: Record<string, any> = {
      'yelp.com': {
        platform: 'Yelp',
        summary: `Based on analysis of 247 Yelp reviews, this venue consistently receives praise for its excellent service and atmosphere. Recent reviews highlight exceptional food quality and friendly staff.

**Positive highlights:**
• "Outstanding food and incredible service" (4.6/5 avg)
• "Great atmosphere for both date nights and group dinners"
• "Fresh ingredients and creative menu options"

**Areas noted for improvement:**
• Parking can be challenging during peak hours
• Reservations recommended for weekend dining
• Some reviewers note higher prices

**Recent sentiment:** 86% positive, with visitors consistently praising the quality and experience.`,
        reviewCount: 247,
        overallSentiment: 0.86,
        themes: {
          positive: ['food quality', 'service', 'atmosphere', 'creative menu'],
          negative: ['parking', 'pricing', 'wait times'],
          neutral: ['location', 'reservations']
        }
      },
      'tripadvisor.com': {
        platform: 'TripAdvisor',
        summary: `Based on analysis of 189 TripAdvisor reviews, this venue is highly rated by travelers for its authentic experience and excellent value. International visitors particularly appreciate the local cuisine and welcoming atmosphere.

**Positive highlights:**
• "Must-visit spot for authentic local experience" (4.4/5 avg)
• "Excellent value for money and portion sizes"
• "Staff goes above and beyond for guests"

**Areas noted for improvement:**
• Can get crowded during tourist season
• Limited English menu options
• Advance booking recommended

**Recent sentiment:** 91% positive, with travelers consistently recommending it as a highlight of their visit.`,
        reviewCount: 189,
        overallSentiment: 0.91,
        themes: {
          positive: ['authentic experience', 'value', 'local cuisine', 'welcoming staff'],
          negative: ['crowded', 'language barrier', 'booking'],
          neutral: ['tourist season', 'location', 'hours']
        }
      }
    }

    // Check if we have mock data for this domain
    const mockData = mockSummaries[domain]
    if (mockData) {
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            url,
            domain,
            venueId,
            ...mockData,
            analyzedAt: new Date().toISOString()
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    // For real implementation, we would:
    // 1. Scrape the URL content
    // 2. Extract reviews using AI
    // 3. Analyze sentiment with Gemini
    // 4. Store in database
    
    // For now, return a generic response
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          url,
          domain,
          venueId,
          platform: domain,
          summary: `Analysis of reviews from ${domain} is in progress. This feature will extract and summarize all reviews from the provided URL using AI.`,
          reviewCount: 0,
          overallSentiment: 0,
          themes: { positive: [], negative: [], neutral: [] },
          analyzedAt: new Date().toISOString()
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in parse-venue-reviews function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
