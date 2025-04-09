
import { useState } from 'react';
import { Message } from '../types';
import { HuggingChatService } from '@/services/HuggingChatService';
import { getLocationsByCity, getTrendingLocationsForCity } from '@/mock/cityLocations';
import { updateTrendingLocations } from '@/utils/trendingLocationsUpdater';
import { createUserMessage, createAIMessage, createErrorMessage } from '../utils/messageFactory';
import { 
  generateLocationResponse, 
  detectCityInQuery, 
  isLocationOrEventQuery 
} from '../utils/locationResponseGenerator';
import { PerplexityService } from '@/services/PerplexityService';

export const useMessageProcessor = (isProPlan: boolean = false, isVenueMode: boolean = false) => {
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const processMessage = async (
    inputValue: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ) => {
    // Add user message
    const userMessage = createUserMessage(inputValue);
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    setIsSearching(true);
    
    try {
      let responseText = '';
      
      if (isVenueMode) {
        // Process venue-specific queries
        responseText = await processVenueQuery(inputValue, isProPlan);
      } else {
        // Try to get response from our search service
        try {
          responseText = await PerplexityService.searchPerplexity(inputValue);
        } catch (error) {
          console.error('Error with search service, falling back to HuggingChat:', error);
          // Get response from HuggingChat as fallback
          responseText = await HuggingChatService.searchHuggingChat(inputValue);
        }
        
        // Parse city if the query was about events or places in a specific city
        const detectedCity = detectCityInQuery(inputValue);
        
        // If city was detected and the query seems to be about locations or events
        if (detectedCity && isLocationOrEventQuery(inputValue)) {
          // Get locations for the detected city
          const cityInfo = cityCoordinates[detectedCity];
          const cityLocations = getLocationsByCity(cityInfo.name);
          
          if (cityLocations.length > 0) {
            // Update trending locations with these events
            updateTrendingLocations(cityInfo.name, getTrendingLocationsForCity(cityInfo.name));
            
            // Create a personable response
            let combinedResponse = responseText;
            
            // If the response already includes venue information, don't add duplicate data
            if (!responseText.includes("**Nightlife**") && !responseText.includes("**Restaurants**")) {
              combinedResponse = `${responseText}\n\n${generateLocationResponse(cityInfo.name, cityLocations)}`;
            }
            
            // Clean the response to remove formatting markers
            combinedResponse = cleanResponseText(combinedResponse);
            
            const aiMessage = createAIMessage(combinedResponse);
            setMessages(prev => [...prev, aiMessage]);
          } else {
            // Fall back to just the search response
            const aiMessage = createAIMessage(cleanResponseText(responseText));
            setMessages(prev => [...prev, aiMessage]);
          }
          
          // End processing here since we've already set messages
          setIsTyping(false);
          setIsSearching(false);
          return;
        }
      }
      
      // Standard response if not a city/venue query or is a venue mode query
      const aiMessage = createAIMessage(cleanResponseText(responseText));
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = createErrorMessage();
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsSearching(false);
    }
  };

  // Clean response text to remove markdown formatting
  const cleanResponseText = (text: string): string => {
    // Remove category headers like "<strong>Category</strong>: " or "**Category**: "
    const categories = ['Live Entertainment', 'Nightlife', 'Food', 'Restaurants', 'Events', 'Attractions'];
    let cleanedText = text;
    
    categories.forEach(category => {
      // Remove patterns like "<strong>Category</strong>: " or "**Category**: "
      const patternWithHtmlTags = new RegExp(`<strong>${category}<\/strong>:\\s*`, 'gi');
      const patternWithMarkdown = new RegExp(`\\*\\*${category}\\*\\*:\\s*`, 'gi');
      
      cleanedText = cleanedText.replace(patternWithHtmlTags, '');
      cleanedText = cleanedText.replace(patternWithMarkdown, '');
    });
    
    return cleanedText;
  };

  // Process venue-specific queries
  const processVenueQuery = async (query: string, isProPlan: boolean): Promise<string> => {
    // Convert query to lowercase for easier matching
    const lowercaseQuery = query.toLowerCase();
    
    // Check for different types of queries related to venue insights
    if (lowercaseQuery.includes('traffic') || 
        lowercaseQuery.includes('visitors') || 
        lowercaseQuery.includes('attendance')) {
      return generateTrafficInsights(isProPlan);
    } 
    else if (lowercaseQuery.includes('revenue') || 
             lowercaseQuery.includes('sales') || 
             lowercaseQuery.includes('earnings')) {
      return generateRevenueInsights(isProPlan);
    }
    else if (lowercaseQuery.includes('marketing') || 
             lowercaseQuery.includes('advertising') || 
             lowercaseQuery.includes('promotion')) {
      return generateMarketingInsights(isProPlan);
    }
    else if (lowercaseQuery.includes('engagement') || 
             lowercaseQuery.includes('interaction') ||
             lowercaseQuery.includes('social media')) {
      return generateEngagementInsights(isProPlan);
    }
    else if (lowercaseQuery.includes('demographics') || 
             lowercaseQuery.includes('customers') || 
             lowercaseQuery.includes('audience')) {
      return generateDemographicsInsights(isProPlan);
    }
    else if (lowercaseQuery.includes('receipts') || 
             lowercaseQuery.includes('discount') || 
             lowercaseQuery.includes('promo')) {
      return generateReceiptInsights(isProPlan);
    }
    else {
      // General venue performance overview or unrecognized query
      return generateGeneralVenueInsights(isProPlan);
    }
  };

  // Generate insights based on query type and plan level
  const generateTrafficInsights = (isProPlan: boolean): string => {
    const basicInsight = "Your venue has seen a 15% increase in visitor traffic over the past month. Weekends continue to be your busiest times with peak hours between 8-10PM.";
    
    if (!isProPlan) return basicInsight;
    
    return `${basicInsight}\n\nWith your Pro Plan insights, I can tell you that you've had 1,850 total visitors this month, which is up from 1,610 last month. Your busiest day was Saturday the 15th with 230 visitors. We've detected a pattern where visitor numbers increase by approximately 35% when you host live events, particularly music performances. Would you like me to analyze which days might be best for scheduling your next event series?`;
  };

  const generateRevenueInsights = (isProPlan: boolean): string => {
    const basicInsight = "Your revenue has increased by 12% compared to the previous month. Food and beverage orders make up the majority of your sales at approximately 68%.";
    
    if (!isProPlan) return basicInsight;
    
    return `${basicInsight}\n\nYour Pro Plan analytics show that your average customer spend has increased to $42.75 (up 8% from last month). Your highest revenue category is specialty cocktails at 32% of total sales. We've identified that customers who check in on the app spend on average 22% more than non-app users. Your revenue per square foot is $335 monthly, which is 15% above industry average for your venue category.`;
  };

  const generateMarketingInsights = (isProPlan: boolean): string => {
    const basicInsight = "Your marketing efforts have driven 25% of your customer visits this month. Social media shares of your venue have increased by 30% since your last promotion.";
    
    if (!isProPlan) return basicInsight;
    
    return `${basicInsight}\n\nThe Pro Plan analysis shows that your Instagram promotion reached 12,500 people and converted to 285 visits (2.3% conversion rate). Your "Happy Hour Tuesday" campaign has been your most successful discount code with 175 redemptions and an average ticket size of $68 (versus your normal $42 average). We've also noticed that user-generated content mentioning your venue has increased 45% when you've hosted themed events. Based on current engagement metrics, I recommend focusing your next marketing push on Instagram Reels and Stories as they're generating 3.2x more engagement than standard posts.`;
  };

  const generateEngagementInsights = (isProPlan: boolean): string => {
    const basicInsight = "Your social media engagement has grown by 18% month-over-month. Photos taken at your venue have been shared approximately 230 times in the past 30 days.";
    
    if (!isProPlan) return basicInsight;
    
    return `${basicInsight}\n\nWith Pro Plan insights, I can tell you that your venue has been tagged in 378 posts across platforms, with Instagram being the leader (65% of shares). Your venue's distinctive wall mural is your most photographed feature, appearing in 42% of shared images. Posts with your venue's official hashtag receive 68% more engagement than those without. Your engagement rate on Vibe Right Now is 4.2%, which is 1.8x the industry average. The most popular time for customers to post about your venue is between 9-11PM on weekend nights. Would you like me to suggest some engagement-focused features you could add to increase shares even further?`;
  };

  const generateDemographicsInsights = (isProPlan: boolean): string => {
    const basicInsight = "Your primary customer base is aged 25-34, making up about 45% of your visitors. You have a relatively even gender distribution with slightly more female customers (55%).";
    
    if (!isProPlan) return basicInsight;
    
    return `${basicInsight}\n\nYour Pro Plan analytics reveal that 32% of your customers are returning visitors, with an average of 2.3 visits per month. Your most loyal customer segment is young professionals aged 28-32 who typically visit in groups of 3-5 people. You've seen a recent growth in the 35-42 demographic (up 12% this quarter), likely due to your new craft cocktail menu. Approximately 38% of your customers discover your venue through direct recommendations from friends, while 26% find you through the Vibe Right Now app. Customers who come for your weekend brunch offerings typically spend 35 minutes longer at your venue than weeknight visitors. Would you like me to analyze which demographics respond best to different types of promotions?`;
  };

  const generateReceiptInsights = (isProPlan: boolean): string => {
    const basicInsight = "Your discount codes have been redeemed 125 times this month, resulting in approximately $3,750 in attributed sales.";
    
    if (!isProPlan) return basicInsight;
    
    return `${basicInsight}\n\nWith your Pro Plan, I can see that your "VIBE20" discount code has the highest redemption rate at 14.2%, but your "SUNDAYFUNDAY" code drives the highest average ticket value at $82 per party. Customers who redeem receipts for points return to your venue 2.8x more frequently than non-program users. Your highest receipt upload days are Fridays and Saturdays, accounting for 65% of all uploads. The average time between visit and receipt upload is 2.3 hours. Based on your data, offering a time-limited bonus (like double points for uploads within 1 hour) could increase your receipt capture rate by an estimated 25%.`;
  };

  const generateGeneralVenueInsights = (isProPlan: boolean): string => {
    const basicInsight = "Your venue is performing well with steady growth in visitors and engagement. Overall, you've seen positive trends across key metrics this month.";
    
    if (!isProPlan) return basicInsight;
    
    return `${basicInsight}\n\nYour Pro Plan dashboard shows several interesting trends: You're currently in the top 15% of venues in your category for customer retention. Your peak operating hours (8PM-11PM) are generating 65% of your daily revenue. The addition of your new seasonal menu items has increased average order value by 18%. Your venue's popularity score on Vibe Right Now has increased 3.2 points this month to 8.7/10. Based on current data, I recommend optimizing your staffing on Thursday evenings as you're seeing a 30% increase in traffic but your service ratings are 0.8 points lower than other nights. Would you like me to provide more specific insights about a particular aspect of your business performance?`;
  };

  return {
    isTyping,
    isSearching,
    processMessage
  };
};

// Import cityCoordinates locally since it's also used in the imported locationResponseGenerator
import { cityCoordinates } from '@/utils/locations';
