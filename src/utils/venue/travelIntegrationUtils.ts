
import { Location } from "@/types";

// Types for price comparison data
export interface PriceComparison {
  site: "viator" | "tripadvisor" | "kayak" | "expedia" | "booking";
  price: number;
  url: string;
  discount?: number; // Optional discount percentage
}

// Function to determine if a venue is eligible for price comparisons
export const isEligibleForPriceComparison = (venue: Location): boolean => {
  // Hotels, attractions, and some events are eligible
  return (
    venue.type === "attraction" ||
    (venue.type === "event" && venue.name.toLowerCase().includes("tour")) ||
    venue.id.includes("hotel") ||
    venue.name.toLowerCase().includes("hotel") ||
    venue.name.toLowerCase().includes("resort") ||
    venue.name.toLowerCase().includes("inn")
  );
};

// Function to get price comparisons from various travel sites
export const getPriceComparisons = (venue: Location): PriceComparison[] => {
  // In a real implementation, this would make API calls to various services
  // For now, we'll generate mock data based on the venue
  
  if (!isEligibleForPriceComparison(venue)) {
    return [];
  }

  // Generate a base price that's somewhat consistent for the venue
  // Use the char codes from the venue ID to create a consistent "random" base price
  const basePrice = venue.id
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0) % 100 + 50;

  // Mock price comparisons with slight variations
  const comparisons: PriceComparison[] = [
    {
      site: "booking",
      price: Math.round(basePrice * 1.05),
      url: `https://www.booking.com/search.html?ss=${encodeURIComponent(venue.name)}`,
    },
    {
      site: "kayak",
      price: Math.round(basePrice * 0.95),
      url: `https://www.kayak.com/hotels/${venue.city.toLowerCase()}/${encodeURIComponent(venue.name.toLowerCase().replace(/\s+/g, '-'))}`,
    },
    {
      site: "tripadvisor",
      price: Math.round(basePrice),
      url: `https://www.tripadvisor.com/Search?q=${encodeURIComponent(venue.name)}`,
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 15) + 5 : undefined,
    },
    {
      site: "viator",
      price: Math.round(basePrice * 1.02),
      url: `https://www.viator.com/search/${venue.city}?q=${encodeURIComponent(venue.name)}`,
    },
    {
      site: "expedia",
      price: Math.round(basePrice * 0.98),
      url: `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(venue.city)}`,
    },
  ];
  
  return comparisons.sort((a, b) => a.price - b.price); // Sort by price, lowest first
};

// Get logo URL for travel sites
export const getTravelSiteLogo = (site: string): string => {
  switch (site) {
    case "booking":
      return "https://q-xx.bstatic.com/backend_static/common/img/logo-bdc-white.svg";
    case "kayak":
      return "https://www.kayak.com/rimg/provider-logos/airlines/v/KAYAK.png?crop=false&width=108&height=92&fallback=default2.png&_v=8c6828739f3614b6f390b635f3b264069faee5f9";
    case "tripadvisor":
      return "https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg";
    case "viator":
      return "https://cache.marriott.com/content/dam/marriott-digital/mi/global-property-wide/en_us/max-1440/assets/externalsites/viator.png";
    case "expedia":
      return "https://a.travel-assets.com/globalcontrols-service/content/f285fb631b0a976202ef57611c7050e9ef5ca51a/images/EG_TPID_5024_Primary_Logo_Reversed.svg";
    default:
      return `https://placehold.co/200x80/4a4a4a/white?text=${site}`;
  }
};
