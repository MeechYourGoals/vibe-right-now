
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { query, categories } = await req.json();
    console.log(`Vector search for: "${query}"`);
    
    if (categories && categories.length > 0) {
      console.log('With NLP categories:', categories);
    }
    
    // Enhance the query with categories if available
    let enhancedQuery = query;
    if (categories && categories.length > 0) {
      const categoryContext = categories
        .filter((cat: string) => cat && cat.trim().length > 0)
        .join(', ');
        
      if (categoryContext) {
        enhancedQuery = `${query} (Categories: ${categoryContext})`;
      }
    }
    
    // Parse keywords to help with relevant result matching
    const keywords = extractKeywords(query);
    
    // For this example, we'll simulate results based on keywords in the query
    // In a real implementation, this would connect to a vector database
    let content = generateRealisticSearchResults(query, keywords, categories);
    
    return new Response(
      JSON.stringify({
        content,
        categories: categories || [],
        keywords
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in vector-search function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

/**
 * Extract key terms from a search query
 */
function extractKeywords(query: string): string[] {
  const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'about', 'is', 'are', 'was', 'were'];
  
  // Convert to lowercase and remove punctuation
  const cleanedQuery = query.toLowerCase().replace(/[^\w\s]/g, '');
  
  // Split into words and filter out stop words and short words
  return cleanedQuery.split(' ')
    .filter(word => word.length > 2 && !stopWords.includes(word))
    .map(word => word.trim());
}

/**
 * Generate realistic search results based on query analysis
 */
function generateRealisticSearchResults(query: string, keywords: string[], categories: string[] = []): string {
  // Check for location queries
  const isMiamiQuery = /miami/i.test(query);
  const isNYCQuery = /new\s*york|nyc/i.test(query);
  const isLAQuery = /los\s*angeles|la\b/i.test(query);
  
  // Check for activity types
  const isDiningQuery = /dinner|food|eat|restaurant|dining/i.test(query);
  const isNightlifeQuery = /night|club|party|bar|drinks/i.test(query);
  const isSportsQuery = /game|sports|basketball|football|heat|yankees/i.test(query);
  const isEventQuery = /event|show|concert|festival|music/i.test(query);
  
  let results = '';
  
  // For Miami queries
  if (isMiamiQuery) {
    results += '## Miami Recommendations\n\n';
    
    if (isDiningQuery && isNightlifeQuery) {
      results += '### Dinner and Nightlife Options\n\n';
      results += '- [Sunset Lounge](https://venue.vrn/sunset-lounge) - Upscale restaurant with amazing views and transitions to a lounge after 10pm\n';
      results += '- [KYU Miami](https://venue.vrn/kyu-miami) - Asian-inspired BBQ in Wynwood, great for dinner before hitting the clubs\n';
      results += '- [Swan & Bar Bevy](https://venue.vrn/swan-and-bar-bevy) - Restaurant by day, club by night\n\n';
    }
    
    if (isDiningQuery) {
      results += '### Top Dining Spots\n\n';
      results += '- [Sunset Lounge](https://venue.vrn/sunset-lounge) - Upscale dining with ocean views\n';
      results += '- [Carbone Miami](https://venue.vrn/carbone-miami) - High-end Italian restaurant\n';
      results += '- [Joe\'s Stone Crab](https://venue.vrn/joes-stone-crab) - Iconic Miami seafood institution\n\n';
    }
    
    if (isSportsQuery) {
      results += '### Sports Events\n\n';
      results += '- [Heat vs Magic](https://venue.vrn/heat-vs-magic) - Basketball game at the Kaseya Center, 8PM-10PM\n';
      results += '- [Inter Miami CF Match](https://venue.vrn/inter-miami) - Soccer at Chase Stadium\n\n';
    }
    
    if (isNightlifeQuery) {
      results += '### Nightlife\n\n';
      results += '- [LIV Miami](https://venue.vrn/liv-miami) - Premier nightclub in Fontainebleau, open 24 hours\n';
      results += '- [Skyline Nightclub](https://venue.vrn/skyline-nightclub) - Rooftop club with amazing city views\n';
      results += '- [E11EVEN](https://venue.vrn/e11even) - 24-hour ultraclub downtown\n\n';
    }
  } else {
    // Generic response for non-specific locations
    results += `## Recommendations for "${query}"\n\n`;
    results += 'I found several options that might interest you. Try searching for a specific city like Miami, New York, or LA to get more targeted results.\n\n';
    
    results += '### Featured Venues\n\n';
    results += '- [Sunset Lounge](https://venue.vrn/sunset-lounge) - Miami, FL\n';
    results += '- [Artisan Coffee House](https://venue.vrn/artisan-coffee) - Portland, OR\n';
    results += '- [Summer Music Festival](https://venue.vrn/summer-fest) - Austin, TX\n';
  }
  
  // Add a suggestion to use the Explore page
  results += '\n### Explore More\n\n';
  results += `To see all venues matching your search "${query}" on the map, [visit our Explore page](/explore?q=${encodeURIComponent(query)}).`;
  
  return results;
}
