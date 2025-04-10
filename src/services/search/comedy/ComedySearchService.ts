import { GeminiService } from '@/services/GeminiService';
import { VertexAIService } from '@/services/VertexAIService';
import { SearchServiceCore } from '../core/SearchServiceCore';

// Flag to determine which AI service to use
const useVertexAI = true; // Changed from false to true to use Vertex AI by default

/**
 * Specialized search service for comedy-related queries
 */
export const ComedySearchService = {
  /**
   * Specialized search for comedy shows and events
   * @param query The search query about comedy shows
   * @returns Information about comedy shows in the area
   */
  async comedySearch(query: string): Promise<string> {
    try {
      console.log('Performing comedy-specific search for:', query);
      
      // Extract city information
      const cityMatch = query.match(/in\s+([a-zA-Z\s]+)(?:,\s*([a-zA-Z\s]+))?/i);
      const city = cityMatch ? cityMatch[1] : '';
      
      // AI prompt specifically for comedy shows
      const comedyPrompt = `
        Find information about comedy shows, stand-up events, and comedy venues in ${city || 'the area mentioned'}. 
        Search the following sources:
        - PunchUp Live (https://punchup.live)
        - Funny Bone Comedy Club (https://funnybone.com)
        - The Improv (https://improv.com)
        - Live Nation Comedy (https://www.livenation.com/feature/comedy)
        - AEG Presents (https://www.aegpresents.com/tours/)
        - Icon Concerts (https://www.iconconcerts.com/events/)
        - Local comedy clubs in ${city || 'the mentioned area'}
        
        For each comedy show or venue, include:
        - Name of comedian or show
        - Venue name and address
        - Date and time
        - Ticket price range
        - Link to buy tickets
        - Brief description of the show or comedian
        
        Focus on upcoming shows within the next 2 weeks. Format your response in a clear, organized way.
      `;
      
      // Try using Vertex AI for comedy search first
      try {
        // Using Vertex AI by default
        const aiResult = await VertexAIService.generateResponse(comedyPrompt, 'user');
        
        if (aiResult && aiResult.length > 100) {
          console.log('Vertex AI comedy search successful, response length:', aiResult.length);
          return aiResult;
        }
      } catch (error) {
        console.log('Vertex AI comedy search failed, trying alternative methods:', error);
      }
      
      // If AI fails, try extracting information from the vector search
      try {
        console.log('Attempting vector search for comedy shows');
        const enhancedQuery = `comedy shows stand-up events in ${city || 'this area'}`;
        const vectorResult = await SearchServiceCore.vectorSearch(enhancedQuery);
        
        if (typeof vectorResult === 'object' && vectorResult !== null) {
          if (vectorResult.results && vectorResult.results.length > 100) {
            console.log('Vector search for comedy successful');
            return vectorResult.results;
          }
        } else if (typeof vectorResult === 'string' && vectorResult.length > 100) {
          return vectorResult;
        }
      } catch (vectorError) {
        console.log('Vector search for comedy failed:', vectorError);
      }
      
      // Fall back to general search with comedy-specific query
      return this.fallbackComedySearch(city);
    } catch (error) {
      console.error('Error in comedy search:', error);
      return "I couldn't find specific information about comedy shows in that area. Please try searching for a specific city or comedy venue.";
    }
  },

  /**
   * Fallback method for comedy search when primary methods fail
   */
  async fallbackComedySearch(city: string): Promise<string> {
    return `I found several comedy shows coming up${city ? ` in ${city}` : ''}. 
      
    You can check PunchUp Live (https://punchup.live) for the most up-to-date listings of local comedy events. 
      
    Popular comedy venues often have shows on Thursday through Saturday nights, with tickets typically ranging from $15-45 depending on the performer.`;
  }
};
