
import { CityData } from "@/types";

const currentDate = new Date().toISOString();

const bangkokData: CityData = {
  name: "Bangkok",
  country: "Thailand",
  lat: 13.7563,
  lng: 100.5018,
  venues: [
    {
      id: "bangkok-1",
      name: "Wat Pho",
      address: "2 Sanamchai Road, Grand Palace Subdistrict",
      city: "Bangkok",
      country: "Thailand",
      lat: 13.7465,
      lng: 100.4927,
      type: "attraction",
      rating: 4.6,
      verified: true,
      vibes: ["Spiritual", "Historical", "Peaceful"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/?cid=2234567890",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "bangkok-2", 
      name: "Gaggan Anand",
      address: "68/1 Soi Langsuan, Ploenchit Road",
      city: "Bangkok",
      country: "Thailand",
      lat: 13.7440,
      lng: 100.5416,
      type: "restaurant",
      rating: 4.8,
      price_level: 4,
      verified: true,
      vibes: ["Fine Dining", "Innovative", "Upscale"],
      business_status: "OPERATIONAL", 
      google_maps_url: "https://maps.google.com/?cid=2234567891",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default bangkokData;
