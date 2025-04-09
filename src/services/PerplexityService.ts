import { SimpleSearchService } from './SimpleSearchService';
import { SwirlSearchService } from './SwirlSearchService';

// Service to interact with search APIs and AI-assisted search
export const PerplexityService = {
  async searchPerplexity(query: string): Promise<string> {
    try {
      console.log('Searching for:', query);
      
      // Try using Swirl first (local search engine)
      try {
        // Check if Swirl is available
        const isSwirlAvailable = await SwirlSearchService.isAvailable();
        
        if (isSwirlAvailable) {
          console.log('Swirl is available, using it for search');
          const swirlResult = await SwirlSearchService.search(query);
          if (swirlResult) {
            return swirlResult;
          }
        }
      } catch (error) {
        console.log('Swirl search failed, trying alternative methods:', error);
      }
      
      // Try using OpenAI's search capabilities (most comprehensive)
      try {
        const openAIResult = await fetchOpenAIResults(query);
        if (openAIResult) {
          return openAIResult;
        }
      } catch (error) {
        console.log('OpenAI search failed, trying alternative methods:', error);
      }
      
      // Try with Google's Search API if available
      try {
        const googleResult = await fetchGoogleResults(query);
        if (googleResult) {
          return googleResult;
        }
      } catch (error) {
        console.log('Google search failed, trying next service:', error);
      }
      
      // Try DuckDuckGo JSONP API - most reliable free option
      try {
        const duckDuckGoResult = await fetchDuckDuckGoResults(query);
        if (duckDuckGoResult) {
          return duckDuckGoResult;
        }
      } catch (error) {
        console.log('DuckDuckGo search failed, trying alternative method:', error);
      }
      
      // Try Wikipedia API directly - most widely accessible
      try {
        const wikiResult = await fetchWikipediaResults(query);
        if (wikiResult) {
          return wikiResult;
        }
      } catch (error) {
        console.log('Wikipedia search failed, trying fallback service:', error);
      }
      
      // Try with Deepseek as fallback
      try {
        const deepseekResult = await fetchDeepseekResults(query);
        if (deepseekResult) {
          return deepseekResult;
        }
      } catch (error) {
        console.log('Deepseek search failed, using final fallback:', error);
      }
      
      // Try SimpleSearchService as the final fallback
      const simpleFallbackResult = await SimpleSearchService.searchForCityInfo(query);
      if (simpleFallbackResult) {
        return simpleFallbackResult;
      }
      
      // Ultimate fallback if all services fail
      return generateFallbackResponse(query);
    } catch (error) {
      console.error('Error in search services:', error);
      return await useFallbackLocalService(query);
    }
  }
};

// OpenAI's Responses API implementation
async function fetchOpenAIResults(query: string): Promise<string | null> {
  try {
    // Check if API key exists in local storage
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      console.log('No OpenAI API key found, skipping this service');
      return null;
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that helps users with accurate, current information about places, events, and activities in different cities. Return detailed information based on web searches, including specific venue names, event schedules, and links when possible. Format your response in a clean, readable way. Include specifics about real venues, events, and activities.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.choices[0].message.content;
    }
    return null;
  } catch (error) {
    console.error('Error with OpenAI search:', error);
    return null;
  }
}

// Google Search API implementation
async function fetchGoogleResults(query: string): Promise<string | null> {
  // This would ideally use Google's Custom Search JSON API
  // For now, we'll use a simplified approach without requiring API key
  try {
    // Use a CORS proxy for Google Search to avoid CORS issues
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=nws`;
    const googleResponse = await fetch(proxyUrl + encodeURIComponent(googleUrl));
    
    if (googleResponse.ok) {
      const proxyData = await googleResponse.json();
      if (proxyData.contents) {
        // Extract useful information from HTML using simple regex patterns
        const titleRegex = /<h3[^>]*>(.*?)<\/h3>/g;
        const titles = [...proxyData.contents.matchAll(titleRegex)].map(m => m[1]).slice(0, 3);
        
        if (titles.length > 0) {
          let resultText = `Here's what I found about "${query}":\n\n`;
          titles.forEach((title, index) => {
            // Clean the title of HTML tags
            const cleanTitle = title.replace(/<[^>]*>/g, '');
            resultText += `${index + 1}. ${cleanTitle}\n\n`;
          });
          return resultText;
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Error with Google search:', error);
    return null;
  }
}

// DuckDuckGo API implementation
async function fetchDuckDuckGoResults(query: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&callback=&pretty=1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      const text = await response.text();
      // Strip JSONP callback if present
      const jsonStr = text.replace(/^[^{]*/, '').replace(/[^}]*$/, '');
      
      try {
        const data = JSON.parse(jsonStr);
        
        if (data.Abstract && data.Abstract.length > 10) {
          return `Here's what I found about "${query}":\n\n${data.Abstract}`;
        } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
          let resultText = `Here's what I found about "${query}":\n\n`;
          
          // Extract information from related topics
          for (let i = 0; i < Math.min(3, data.RelatedTopics.length); i++) {
            const topic = data.RelatedTopics[i];
            if (topic.Text) {
              resultText += `${topic.Text}\n\n`;
            }
          }
          
          return resultText;
        }
      } catch (err) {
        console.error('Error parsing DuckDuckGo response:', err);
      }
    }
    return null;
  } catch (error) {
    console.error('Error with DuckDuckGo search:', error);
    return null;
  }
}

// Wikipedia API implementation
async function fetchWikipediaResults(query: string): Promise<string | null> {
  try {
    const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`, {
      method: 'GET',
    });
    
    if (wikiResponse.ok) {
      const data = await wikiResponse.json();
      if (data.extract && data.extract.length > 0) {
        return `Here's what I found about "${query}":\n\n${data.extract}`;
      }
    }
    return null;
  } catch (error) {
    console.error('Error with Wikipedia search:', error);
    return null;
  }
}

// Deepseek API implementation (simulation for now)
async function fetchDeepseekResults(query: string): Promise<string | null> {
  // This would ideally use Deepseek's API
  // For now, we're using a placeholder
  try {
    // Check if we have cached results for this query
    const cachedResults = localStorage.getItem(`deepseek_cache_${query}`);
    if (cachedResults) {
      return cachedResults;
    }
    
    // Use fallback method when API isn't available
    return null;
  } catch (error) {
    console.error('Error with Deepseek search:', error);
    return null;
  }
}

// Generate a detailed fallback response based on query type
function generateFallbackResponse(query: string): string {
  const lowercaseQuery = query.toLowerCase();
  
  // Check if it's a query about a city
  if (lowercaseQuery.includes('in ')) {
    const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
    if (cityMatch) {
      const city = cityMatch[1].trim();
      return `I'd like to provide you with specific information about ${city}, but I'm currently experiencing some limitations in accessing real-time web data. Here are some general suggestions for exploring ${city}:\n\n1. Check the official city tourism website for ${city} for current events and attractions.\n\n2. Popular review sites often have up-to-date information on trending restaurants and activities in ${city}.\n\n3. Local news websites for ${city} typically list upcoming events and festivals.\n\nI'll keep trying to get you more specific information about ${city}.`;
    }
  }
  
  return "I apologize, but I'm currently unable to retrieve specific web search results for your query. This could be due to temporary connectivity issues. Could you try asking again with more specific details, or perhaps I can help with something else?";
}

// Fallback service that uses local knowledge when online services fail
function useFallbackLocalService(query: string): string {
  // Extract location queries for better responses when all services fail
  const lowercaseQuery = query.toLowerCase();
  
  // Handle location-specific queries with a helpful response
  if (lowercaseQuery.includes("going on in") || 
      lowercaseQuery.includes("events in") || 
      lowercaseQuery.includes("happening in")) {
    
    // Extract city name if possible for a more relevant fallback
    const cityMatch = query.match(/in ([a-zA-Z\s]+)($|\?|\.)/i);
    const city = cityMatch ? cityMatch[1].trim() : "the area";
    
    // Generate a more specific fallback based on query
    if (lowercaseQuery.includes("concerts") || lowercaseQuery.includes("music")) {
      return generateCategorySpecificFallback(city, "concerts");
    } else if (lowercaseQuery.includes("sports") || lowercaseQuery.includes("games")) {
      return generateCategorySpecificFallback(city, "sports");
    } else if (lowercaseQuery.includes("restaurants") || lowercaseQuery.includes("dining") || lowercaseQuery.includes("food")) {
      return generateCategorySpecificFallback(city, "dining");
    } else if (lowercaseQuery.includes("bars") || lowercaseQuery.includes("clubs") || lowercaseQuery.includes("nightlife")) {
      return generateCategorySpecificFallback(city, "nightlife");
    }
    
    // Generic location fallback
    return `I'd love to tell you about events in ${city}, but I'm currently having trouble accessing external information. This might be due to connection limitations in this environment. I can still help you with recommendations based on local information I have, or assist with other questions that don't require web searches.`;
  }
  
  // Generic fallback response
  return "I'm sorry, but I'm currently unable to access search information. I can still help with general questions or recommendations based on information I already have available.";
}

// Generate category-specific fallback responses
function generateCategorySpecificFallback(city: string, category: string): string {
  switch (category) {
    case "concerts":
      return `I'd love to tell you about concerts in ${city}, but I'm currently having trouble accessing real-time event information. Popular venues in most cities include arena venues, performing arts centers, and smaller club venues that regularly host live music. You might want to check local event listing websites for the most up-to-date concert information in ${city}.`;
    
    case "sports":
      return `I'd love to tell you about sports events in ${city}, but I'm currently having trouble accessing real-time schedules. Most cities have professional or college teams with regular home games, and tickets are typically available through the team's official website or major ticketing platforms. You might want to check the official team websites for ${city} to see upcoming games.`;
    
    case "dining":
      return `I'd love to tell you about restaurants in ${city}, but I'm currently having trouble accessing real-time dining information. ${city} likely has a variety of dining options from casual eateries to fine dining establishments. You might want to check restaurant review sites for the most popular spots in ${city} right now.`;
    
    case "nightlife":
      return `I'd love to tell you about nightlife in ${city}, but I'm currently having trouble accessing real-time venue information. Most cities have popular areas with concentrations of bars and clubs that are busiest on weekend evenings. You might want to check local entertainment guides for the hottest spots in ${city} this week.`;
    
    default:
      return `I'd love to tell you about events in ${city}, but I'm currently having trouble accessing external information. This might be due to connection limitations in this environment. I can still help you with recommendations based on local information I have, or assist with other questions that don't require web searches.`;
  }
}
