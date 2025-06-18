
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const vegas: CityData = {
  name: "Las Vegas",
  state: "NV",
  country: "USA",
  lat: 36.1699,
  lng: -115.1398,
  venues: [
    {
      id: "vegas-1",
      name: "Gordon Ramsay Hell's Kitchen",
      address: "3570 Las Vegas Blvd S",
      city: "Las Vegas",
      state: "NV",
      country: "USA",
      lat: 36.1147,
      lng: -115.1728,
      type: "restaurant" as const,
      rating: 4.3,
      price_level: 4,
      verified: true,
      vibes: ["Celebrity Chef", "Strip", "Fine Dining"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Hell's+Kitchen+Las+Vegas",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "vegas-2",
      name: "XS Nightclub",
      address: "3131 Las Vegas Blvd S",
      city: "Las Vegas",
      state: "NV",
      country: "USA",
      lat: 36.1215,
      lng: -115.1739,
      type: "nightclub" as const,
      rating: 4.0,
      price_level: 4,
      verified: true,
      vibes: ["Pool Party", "EDM", "Luxury"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=XS+Nightclub+Las+Vegas",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "vegas-3",
      name: "T-Mobile Arena",
      address: "3780 Las Vegas Blvd S",
      city: "Las Vegas",
      state: "NV",
      country: "USA",
      lat: 36.1028,
      lng: -115.1784,
      type: "sports" as const,
      rating: 4.4,
      verified: true,
      vibes: ["Golden Knights", "Concerts", "New Arena"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=T-Mobile+Arena+Las+Vegas",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "vegas-4",
      name: "Bellagio Fountains",
      address: "3600 Las Vegas Blvd S",
      city: "Las Vegas",
      state: "NV",
      country: "USA",
      lat: 36.1126,
      lng: -115.1767,
      type: "attraction" as const,
      rating: 4.6,
      verified: true,
      vibes: ["Iconic", "Free Show", "Romance"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Bellagio+Fountains+Las+Vegas",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "vegas-5",
      name: "Forum Shops",
      address: "3500 Las Vegas Blvd S",
      city: "Las Vegas",
      state: "NV",
      country: "USA",
      lat: 36.1180,
      lng: -115.1751,
      type: "other" as const,
      rating: 4.2,
      verified: true,
      vibes: ["Luxury Shopping", "Roman Theme", "Strip"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Forum+Shops+Las+Vegas",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default vegas;
