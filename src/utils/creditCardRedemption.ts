import { Location } from "@/types";
import { mockLocations } from "@/mock/data";

// Credit card types that might have points programs
export type CreditCardType = 
  | "amex" 
  | "visa" 
  | "mastercard" 
  | "discover" 
  | "chase" 
  | "citi" 
  | "capital_one";

// Venue redemption opportunity information
export interface RedemptionOpportunity {
  location: Location;
  creditCard: CreditCardType;
  pointsRequired: number;
  cashValue: number;
  valueRatio: number; // Higher is better (cents per point)
  expiryDate?: Date;
  specialOffer?: string;
}

// Get mock redemption opportunities based on location and card type
export const getRedemptionOpportunities = (
  userCreditCards: CreditCardType[] = []
): RedemptionOpportunity[] => {
  // If no credit cards specified, return no opportunities
  if (userCreditCards.length === 0) return [];
  
  // Helper function to check if a location is likely to accept points redemption
  const isEligibleForRedemption = (location: Location): boolean => {
    // Hotels, attractions, and some events are typically eligible
    return (
      location.type === "attraction" ||
      location.type === "event" ||
      location.id.includes("hotel") ||
      location.name.toLowerCase().includes("hotel") ||
      location.name.toLowerCase().includes("resort")
    );
  };
  
  // Generate mock redemption opportunities
  const opportunities: RedemptionOpportunity[] = [];
  
  mockLocations.forEach(location => {
    if (!isEligibleForRedemption(location)) return;
    
    // Determine which cards can be used for this location (mock logic)
    const eligibleCards = determineEligibleCards(location, userCreditCards);
    
    eligibleCards.forEach(card => {
      // Generate consistent mock data based on location ID and card type
      const idSum = location.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const cardFactor = getCardFactor(card);
      
      // Calculate points required (higher for premium locations)
      const pointsRequired = Math.round((idSum * 100 + 5000) * cardFactor);
      
      // Calculate cash value (what you'd pay without points)
      const cashValue = Math.round(pointsRequired / 100) * 10;
      
      // Value ratio in cents per point (higher is better)
      const valueRatio = parseFloat(((cashValue * 100) / pointsRequired).toFixed(2));
      
      // Some opportunities have special offers
      const hasSpecialOffer = idSum % 5 === 0;
      
      opportunities.push({
        location,
        creditCard: card,
        pointsRequired,
        cashValue,
        valueRatio,
        specialOffer: hasSpecialOffer ? generateSpecialOffer(card, location) : undefined,
        expiryDate: hasSpecialOffer ? getRandomFutureDate() : undefined
      });
    });
  });
  
  // Sort by value ratio (best redemption value first)
  return opportunities.sort((a, b) => b.valueRatio - a.valueRatio);
};

// Helper functions for mock data generation

const determineEligibleCards = (
  location: Location, 
  userCards: CreditCardType[]
): CreditCardType[] => {
  // In a real app, this would check actual partnerships
  // For mock data, we'll use location properties to determine eligibility
  const idSum = location.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  return userCards.filter(card => {
    // Different cards have different acceptance patterns
    switch (card) {
      case "amex":
        // AMEX tends to be accepted at higher-end venues
        return location.verified || location.type === "attraction" || idSum % 3 === 0;
      case "chase":
        // Chase has broad hotel partnerships
        return location.name.toLowerCase().includes("hotel") || idSum % 4 === 0;
      case "capital_one":
        // Capital One has many travel partnerships
        return location.type === "event" || location.type === "attraction" || idSum % 5 === 0;
      default:
        // Other cards have more random partnerships
        return idSum % 2 === 0;
    }
  });
};

const getCardFactor = (card: CreditCardType): number => {
  // Different cards have different point valuations
  switch (card) {
    case "amex": return 1.2;
    case "chase": return 1.5;
    case "capital_one": return 1.1;
    case "citi": return 1.0;
    default: return 1.0;
  }
};

const generateSpecialOffer = (card: CreditCardType, location: Location): string => {
  const offers = [
    `Limited-time 20% point discount with your ${formatCardName(card)} card`,
    `Book by Friday for a complimentary upgrade when using ${formatCardName(card)} points`,
    `${formatCardName(card)} members get a free night when booking 2+ nights with points`,
    `Use your ${formatCardName(card)} to get 5,000 bonus points back after redemption`,
    `Exclusive ${formatCardName(card)} event access included with this redemption`
  ];
  
  // Use location ID to select a consistent offer
  const idSum = location.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return offers[idSum % offers.length];
};

const formatCardName = (card: CreditCardType): string => {
  switch (card) {
    case "amex": return "American Express";
    case "capital_one": return "Capital One";
    default: return card.charAt(0).toUpperCase() + card.slice(1);
  }
};

const getRandomFutureDate = (): Date => {
  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(now.getDate() + Math.floor(Math.random() * 60) + 10);
  return futureDate;
};

// AI recommendation function
export const getAiRecommendation = (
  opportunities: RedemptionOpportunity[],
  preferences: {
    destination?: string;
    pointBudget?: number;
    valueOriented?: boolean;
    venueType?: string;
  }
): RedemptionOpportunity[] => {
  // Filter opportunities based on user preferences
  let filtered = [...opportunities];
  
  // Filter by destination if specified
  if (preferences.destination) {
    const dest = preferences.destination.toLowerCase();
    filtered = filtered.filter(
      opp => opp.location.city.toLowerCase().includes(dest) || 
             opp.location.state.toLowerCase().includes(dest)
    );
  }
  
  // Filter by point budget if specified
  if (preferences.pointBudget) {
    filtered = filtered.filter(
      opp => opp.pointsRequired <= preferences.pointBudget!
    );
  }
  
  // Filter by venue type if specified
  if (preferences.venueType) {
    const type = preferences.venueType.toLowerCase();
    filtered = filtered.filter(
      opp => opp.location.type.toLowerCase().includes(type)
    );
  }
  
  // Sort based on preferences
  if (preferences.valueOriented) {
    // Prioritize value ratio if user is value-oriented
    filtered.sort((a, b) => b.valueRatio - a.valueRatio);
  } else {
    // Otherwise prioritize special offers and premium venues
    filtered.sort((a, b) => {
      // Special offers first
      if (a.specialOffer && !b.specialOffer) return -1;
      if (!a.specialOffer && b.specialOffer) return 1;
      
      // Then verified venues
      if (a.location.verified && !b.location.verified) return -1;
      if (!a.location.verified && b.location.verified) return 1;
      
      // Then by value ratio
      return b.valueRatio - a.valueRatio;
    });
  }
  
  return filtered;
};
