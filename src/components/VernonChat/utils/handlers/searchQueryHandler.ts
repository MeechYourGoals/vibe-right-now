
import { SearchCoordinator } from './search';
import { extractCategories } from '@/services/VertexAI/analysis';
import { SearchService } from '@/services/search/SearchService';
import { OpenAIService } from '@/services/OpenAIService';
import { getMusicEventsForCity, getComedyEventsForCity } from '@/services/search/eventService';

/**
 * Handle general search queries and location-based queries
 * Now powered by OpenRouter
 */
export const handleSearchQuery = async (
  inputValue: string,
  paginationState: Record<string, number>
): Promise<string> => {
  try {
    // Extract categories using Cloud Natural Language API
    const categories = await extractCategories(inputValue);
    console.log('Cloud Natural Language API extracted categories:', categories);
    
    // Store categories in session for later use
    if (categories.length > 0) {
      try {
        sessionStorage.setItem('nlpCategories', JSON.stringify(categories));
      } catch (e) {
        console.error('Error storing NLP categories in session:', e);
      }
    }
    
    // Check if this is a music or comedy specific query
    const isMusicQuery = /music|concert|band|artist|festival|gig|performance|tour/i.test(inputValue);
    const isComedyQuery = /comedy|comedian|stand[ -]?up|improv|funny|laugh|jokes/i.test(inputValue);
    
    // If it's a specific query for events, try to get real data
    if (isMusicQuery || isComedyQuery) {
      try {
        // Extract location from query if possible
        const locationMatch = inputValue.match(/in\s+([A-Za-z\s]+)(?:,|\s|$)/i);
        const city = locationMatch ? locationMatch[1].trim() : '';
        const stateMatch = inputValue.match(/([A-Za-z\s]+),\s+([A-Za-z]{2})/i);
        const state = stateMatch ? stateMatch[2].trim() : '';
        
        if (city) {
          if (isMusicQuery) {
            const musicEvents = await getMusicEventsForCity(city, state);
            if (musicEvents && musicEvents.length > 0) {
              // Format the music events for chat display
              const eventsList = musicEvents.map(event => `
- **${event.title}** 
  - ${new Date(event.date).toLocaleDateString()} at ${event.time}
  - ${event.location}
  - ${event.price}
              `).join('\n');
              
              const response = `Here are some music events in ${city}${state ? `, ${state}` : ''}:\n\n${eventsList}`;
              
              const musicExploreLinkText = "\n\nYou can also [view all music events on our Explore page](/explore?q=" + 
                encodeURIComponent(inputValue) + "&tab=music) for a better visual experience.";
              
              try {
                sessionStorage.setItem('lastSearchCategories', JSON.stringify(['music']));
                sessionStorage.setItem('lastSearchQuery', inputValue);
              } catch (e) {
                console.error('Error setting categories in sessionStorage:', e);
              }
              
              return response + musicExploreLinkText;
            }
          } else if (isComedyQuery) {
            const comedyEvents = await getComedyEventsForCity(city, state);
            if (comedyEvents && comedyEvents.length > 0) {
              // Format the comedy events for chat display
              const eventsList = comedyEvents.map(event => `
- **${event.title}** 
  - ${new Date(event.date).toLocaleDateString()} at ${event.time}
  - ${event.location}
  - ${event.price}
              `).join('\n');
              
              const response = `Here are some comedy shows in ${city}${state ? `, ${state}` : ''}:\n\n${eventsList}`;
              
              const comedyExploreLinkText = "\n\nYou can also [view all comedy shows on our Explore page](/explore?q=" + 
                encodeURIComponent(inputValue) + "&tab=comedy) for a better visual experience.";
              
              try {
                sessionStorage.setItem('lastSearchCategories', JSON.stringify(['comedy']));
                sessionStorage.setItem('lastSearchQuery', inputValue);
              } catch (e) {
                console.error('Error setting categories in sessionStorage:', e);
              }
              
              return response + comedyExploreLinkText;
            }
          }
        }
      } catch (eventError) {
        console.error('Error handling specific event query:', eventError);
      }
    }
    
    // First, try using OpenRouter directly
    try {
      console.log('Attempting search with OpenRouter');
      const openRouterResult = await callOpenRouter(inputValue, categories);
      if (openRouterResult) {
        console.log('Successfully retrieved information from OpenRouter');
        return openRouterResult;
      }
    } catch (openRouterError) {
      console.error('Error using OpenRouter for search:', openRouterError);
    }
    
    // Fall back to our existing search coordinator
    try {
      return await SearchCoordinator.processSearchQuery(inputValue, paginationState, categories);
    } catch (error) {
      console.error('Error using processSearchQuery with categories, falling back to standard search:', error);
      return await SearchCoordinator.processSearchQuery(inputValue, paginationState);
    }
  } catch (error) {
    console.error('Error in search query handler with NLP:', error);
    // Fall back to regular search without NLP categories
    return SearchCoordinator.processSearchQuery(inputValue, paginationState);
  }
};

/**
 * Call OpenRouter API for search queries
 */
async function callOpenRouter(query: string, categories: string[] = []): Promise<string> {
  try {
    const OPENROUTER_API_KEY = "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";
    
    const systemPrompt = `You are Vernon, a helpful AI assistant for the 'Vibe Right Now' app. 
    Your primary goal is to help users discover great places to go and things to do.
    You are knowledgeable about venues, events, restaurants, bars, attractions, and activities.
    Respond in a concise, informative, and enthusiastic tone. Be friendly and approachable.
    ${categories.length > 0 ? `Consider these relevant categories: ${categories.join(', ')}` : ''}`;
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Vibe Right Now"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-opus:beta",  // Using Claude Opus for best quality responses
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenRouter:', error);
    throw error;
  }
}
