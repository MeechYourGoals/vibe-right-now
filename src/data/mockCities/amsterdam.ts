
import { CityData } from "@/types";

const currentDate = new Date().toISOString();

const amsterdamData: CityData = {
  name: "Amsterdam",
  country: "Netherlands",
  lat: 52.3676,
  lng: 4.9041,
  venues: [
    {
      id: "amsterdam-1",
      name: "Paradiso",
      address: "Weteringschans 6-8",
      city: "Amsterdam",
      country: "Netherlands",
      lat: 52.3623,
      lng: 4.8834,
      type: "nightclub",
      rating: 4.3,
      price_level: 3,
      verified: true,
      vibes: ["Energetic", "Live Music", "Dancing"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/?cid=1234567890",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "amsterdam-2",
      name: "Anne Frank House",
      address: "Prinsengracht 263-267",
      city: "Amsterdam", 
      country: "Netherlands",
      lat: 52.3752,
      lng: 4.8840,
      type: "attraction",
      rating: 4.5,
      verified: true,
      vibes: ["Historical", "Educational", "Moving"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/?cid=1234567891",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "amsterdam-3",
      name: "Café de Reiger",
      address: "Nieuwe Leliestraat 34",
      city: "Amsterdam",
      country: "Netherlands", 
      lat: 52.3725,
      lng: 4.8824,
      type: "cafe",
      rating: 4.2,
      price_level: 2,
      verified: true,
      vibes: ["Cozy", "Local", "Traditional"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/?cid=1234567892",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default amsterdamData;
