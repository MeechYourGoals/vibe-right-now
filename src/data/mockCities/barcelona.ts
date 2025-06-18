
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const barcelona: CityData = {
  name: "Barcelona",
  country: "Spain",
  lat: 41.3851,
  lng: 2.1734,
  venues: [
    {
      id: "bcn-1",
      name: "Sagrada Familia",
      address: "Carrer de Mallorca 401",
      city: "Barcelona",
      country: "Spain",
      lat: 41.4036,
      lng: 2.1744,
      type: "attraction" as const,
      rating: 4.7,
      verified: true,
      vibes: ["Gaudi", "Architecture", "Iconic"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Sagrada+Familia+Barcelona",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "bcn-2",
      name: "Disfrutar",
      address: "Carrer de Villarroel 163",
      city: "Barcelona",
      country: "Spain",
      lat: 41.3851,
      lng: 2.1590,
      type: "restaurant" as const,
      rating: 4.8,
      price_level: 4,
      verified: true,
      vibes: ["Michelin Star", "Creative", "Molecular"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Disfrutar+Barcelona",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "bcn-3",
      name: "Razzmatazz",
      address: "Carrer dels Almogàvers 122",
      city: "Barcelona",
      country: "Spain",
      lat: 41.4009,
      lng: 2.1965,
      type: "nightclub" as const,
      rating: 4.2,
      price_level: 3,
      verified: true,
      vibes: ["Multi-room", "Electronic", "Live Music"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Razzmatazz+Barcelona",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default barcelona;
