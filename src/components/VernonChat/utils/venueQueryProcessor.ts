
import { 
  generateTrafficInsights, 
  generateRevenueInsights,
  generateMarketingInsights,
  generateEngagementInsights,
  generateDemographicsInsights,
  generateReceiptInsights,
  generateGeneralVenueInsights
} from './venueInsights';

/**
 * Process venue-specific queries
 */
export const processVenueQuery = async (query: string, isProPlan: boolean): Promise<string> => {
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
