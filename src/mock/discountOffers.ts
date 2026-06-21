
import { VenueWithDiscount, DiscountOffer } from "@/components/venue/events/types";
import { mockPosts } from "./posts";

const createDiscountVenue = (postId: string, discount: DiscountOffer): VenueWithDiscount => {
  const post = mockPosts.find(p => p.id === postId);
  if (!post) throw new Error(`Post ${postId} not found`);
  
  return {
    id: (post.location as any).id,
    name: (post.location as any).name,
    type: (post.location as any).type,
    address: (post.location as any).address,
    city: (post.location as any).city,
    state: (post.location as any).state,
    country: (post.location as any).country,
    zip: (post.location as any).zip || "10001", // Ensure zip is always provided
    lat: (post.location as any).lat,
    lng: (post.location as any).lng,
    verified: (post.location as any).verified || false,
    discount
  };
};

export const discountOffers: VenueWithDiscount[] = [
  createDiscountVenue("1", {
    id: "disc1",
    type: "freeEntry",
    description: "Free Entry before 11PM",
    expiresAt: "2025-05-01",
    conditions: "Valid with RSVP",
    code: "VRNFREE"
  }),
  createDiscountVenue("2", {
    id: "disc2",
    type: "freeItem",
    description: "Free welcome drink",
    expiresAt: "2025-05-15",
    conditions: "One per customer",
    code: "VRNDRINK"
  }),
  createDiscountVenue("3", {
    id: "disc3",
    type: "percentOff",
    description: "25% off your entire bill",
    value: 25,
    expiresAt: "2025-05-10",
    code: "VRN25"
  }),
  createDiscountVenue("4", {
    id: "disc4",
    type: "vipAccess",
    description: "VIP Table Access",
    originalPrice: "$500",
    value: 50,
    expiresAt: "2025-05-20",
    conditions: "Minimum spend applies",
    code: "VRNVIP"
  })
];
