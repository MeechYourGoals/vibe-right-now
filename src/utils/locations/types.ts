export interface MockUserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  isVerified?: boolean;
  bio?: string;
  followers?: string | number;
  following?: string | number;
  posts?: string | number;
  isPrivate?: boolean;
  vibeTags?: string[];
}

export interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  hours?: any;
  coords: {
    lat: number;
    lng: number;
  };
  tags?: string[];
  description?: string;
  vibes?: string[];
  amenities?: string[];
  menu?: MenuItem[];
  events?: Event[];
  offers?: Offer[];
  isFeatured?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  isSponsored?: boolean;
  isVerified?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  isLocalFavorite?: boolean;
  isHiddenGem?: boolean;
  isWorthTheHype?: boolean;
  isPetFriendly?: boolean;
  isFamilyFriendly?: boolean;
  isGoodForGroups?: boolean;
  isGoodForDates?: boolean;
  isGoodForSingles?: boolean;
  isGoodForTourists?: boolean;
  isGoodForBusinessMeetings?: boolean;
  isGoodForSpecialOccasions?: boolean;
  isOutdoorSeating?: boolean;
  isLiveMusic?: boolean;
  isDancing?: boolean;
  isSmokingAllowed?: boolean;
  isWheelchairAccessible?: boolean;
  isFreeWifi?: boolean;
  acceptsReservations?: boolean;
  acceptsCreditCards?: boolean;
  parkingOptions?: string[];
  paymentOptions?: string[];
  cuisines?: string[];
  dressCode?: string;
  noiseLevel?: string;
  alcohol?: string;
  happyHour?: boolean;
  delivery?: boolean;
  takeout?: boolean;
  outdoorSeating?: boolean;
  liveMusic?: boolean;
  dancing?: boolean;
  smokingAllowed?: boolean;
  wheelchairAccessible?: boolean;
  freeWifi?: boolean;
  allowsDogs?: boolean;
  allowsKids?: boolean;
  allowsGroups?: boolean;
  allowsDates?: boolean;
  allowsSingles?: boolean;
  allowsTourists?: boolean;
  allowsBusinessMeetings?: boolean;
  allowsSpecialOccasions?: boolean;
  allowsOutdoorSeating?: boolean;
  allowsLiveMusic?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  calories: number;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: Location;
  price: number;
  category: string;
  tags: string[];
  isFeatured: boolean;
  isFree: boolean;
  isOnline: boolean;
  isRecurring: boolean;
  isSponsored: boolean;
  isVerified: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  isLocalFavorite: boolean;
  isHiddenGem: boolean;
  isWorthTheHype: boolean;
  isPetFriendly: boolean;
  isFamilyFriendly: boolean;
  isGoodForGroups: boolean;
  isGoodForDates: boolean;
  isGoodForSingles: boolean;
  isGoodForTourists: boolean;
  isGoodForBusinessMeetings: boolean;
  isGoodForSpecialOccasions: boolean;
}

export interface Offer {
  id: string;
  name: string;
  description: string;
  image: string;
  discount: number;
  location: Location;
  startDate: string;
  endDate: string;
  terms: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  isTrending: boolean;
  isSponsored: boolean;
  isVerified: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  isLocalFavorite: boolean;
  isHiddenGem: boolean;
  isWorthTheHype: boolean;
  isPetFriendly: boolean;
  isFamilyFriendly: boolean;
  isGoodForGroups: boolean;
  isGoodForDates: boolean;
}

export interface VenueSentimentAnalysis {
  venue_id: string;
  platform: string;
  overall_sentiment: string;
  sentiment_summary: string;
  themes: Record<string, number>;
  review_count: number;
  last_analyzed_at: string;
}

export interface PlatformSentimentSummary {
  platform: string;
  overallSentiment: string;
  summary: string;
  themes: SentimentTheme[];
  reviewCount: number;
  lastUpdated: string;
}

export interface SentimentTheme {
  name: string;
  score: number;
  mentions: number;
  examples: string[];
}
