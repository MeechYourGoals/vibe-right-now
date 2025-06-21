
import { CityData } from '@/types';

const paris: CityData = {
  name: "Paris",
  country: "France",
  lat: 48.8566,
  lng: 2.3522,
  venues: [
    {
      id: "par-1",
      name: "L'Ami Jean",
      address: "27 Rue Malar",
      city: "Paris",
      country: "France",
      lat: 48.8608,
      lng: 2.3056,
      type: "restaurant" as const,
      rating: 4.5,
      price_level: 3,
      verified: true,
      vibes: ["Bistro", "Traditional", "Eiffel Tower"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=L'Ami+Jean+Paris"
    },
    {
      id: "par-2",
      name: "Rex Club",
      address: "5 Bd Poissonnière",
      city: "Paris",
      country: "France",
      lat: 48.8711,
      lng: 2.3473,
      type: "nightclub" as const,
      rating: 4.2,
      price_level: 3,
      verified: true,
      vibes: ["Techno", "Underground", "Historic"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Rex+Club+Paris"
    },
    {
      id: "par-3",
      name: "Stade de France",
      address: "93216 Saint-Denis",
      city: "Paris",
      country: "France",
      lat: 48.9244,
      lng: 2.3601,
      type: "sports" as const,
      rating: 4.3,
      verified: true,
      vibes: ["Football", "National Stadium", "Concerts"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Stade+de+France"
    },
    {
      id: "par-4",
      name: "Louvre Museum",
      address: "Rue de Rivoli",
      city: "Paris",
      country: "France",
      lat: 48.8606,
      lng: 2.3376,
      type: "attraction" as const,
      rating: 4.7,
      verified: true,
      vibes: ["Art", "Historic", "Mona Lisa"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Louvre+Museum+Paris"
    },
    {
      id: "par-5",
      name: "Café de Flore",
      address: "172 Bd Saint-Germain",
      city: "Paris",
      country: "France",
      lat: 48.8542,
      lng: 2.3320,
      type: "cafe" as const,
      rating: 4.1,
      price_level: 3,
      verified: true,
      vibes: ["Historic", "Literary", "Saint-Germain"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Cafe+de+Flore+Paris"
    }
  ]
};

export default paris;
