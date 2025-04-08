
import { Location } from "@/types";
import { TripPlace } from "../TripPlace";
import { mockLocations } from "@/mock/data";
import { generatePlaceId, getRandomPastDate } from "./tripPlacesUtils";

/**
 * Create a trip place item from a location, user, and notes
 */
export const createTripPlaceItem = (
  location: Location,
  user: { id: string; name: string; avatar: string },
  userColor: string,
  notes?: string
): TripPlace => {
  return {
    id: generatePlaceId(),
    place: location,
    addedBy: {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      colorCode: userColor
    },
    notes: notes || `Added by ${user.name}`,
    addedAt: new Date()
  };
};

/**
 * Generate trip places for Paris (Trip ID 1)
 */
export const generateParisTripPlaces = (
  collaborators: Array<{ id: string; name: string; avatar: string }>,
  userColors: Array<{ id: string; color: string }>
): TripPlace[] => {
  return [
    {
      id: "place_paris_1",
      place: {
        id: "19", // Eiffel Tower
        name: "Eiffel Tower",
        address: "Champ de Mars",
        city: "Paris",
        state: "",
        country: "France",
        lat: 48.8584,
        lng: 2.2945,
        type: "attraction",
        verified: true,
      },
      addedBy: {
        id: collaborators[0].id,
        name: collaborators[0].name,
        avatar: collaborators[0].avatar,
        colorCode: userColors[0].color
      },
      notes: "We have to visit this iconic landmark!",
      addedAt: new Date(Date.now() - 86400000 * 3)
    },
    {
      id: "place_paris_2",
      place: {
        id: "paris_louvre",
        name: "Louvre Museum",
        address: "Rue de Rivoli",
        city: "Paris",
        state: "",
        country: "France",
        lat: 48.8606,
        lng: 2.3376,
        type: "attraction",
        verified: true,
      },
      addedBy: {
        id: collaborators[1].id,
        name: collaborators[1].name,
        avatar: collaborators[1].avatar,
        colorCode: userColors[1].color
      },
      notes: "Let's see the Mona Lisa and other masterpieces",
      addedAt: new Date(Date.now() - 86400000 * 2)
    },
    {
      id: "place_paris_3",
      place: {
        id: "paris_cafe",
        name: "Café de Flore",
        address: "172 Boulevard Saint-Germain",
        city: "Paris",
        state: "",
        country: "France",
        lat: 48.8539,
        lng: 2.3336,
        type: "restaurant",
        verified: true,
      },
      addedBy: {
        id: collaborators[2].id,
        name: collaborators[2].name,
        avatar: collaborators[2].avatar,
        colorCode: userColors[2].color
      },
      notes: "Historic café where famous writers used to gather",
      addedAt: new Date(Date.now() - 86400000 * 1)
    }
  ];
};

/**
 * Generate trip places for Tokyo (Trip ID 2)
 */
export const generateTokyoTripPlaces = (
  collaborators: Array<{ id: string; name: string; avatar: string }>,
  userColors: Array<{ id: string; color: string }>
): TripPlace[] => {
  return [
    {
      id: "place_tokyo_1",
      place: {
        id: "tokyo_skytree",
        name: "Tokyo Skytree",
        address: "1 Chome-1-2 Oshiage",
        city: "Tokyo",
        state: "",
        country: "Japan",
        lat: 35.7101,
        lng: 139.8107,
        type: "attraction",
        verified: true,
      },
      addedBy: {
        id: collaborators[0].id,
        name: collaborators[0].name,
        avatar: collaborators[0].avatar,
        colorCode: userColors[0].color
      },
      notes: "Tallest tower in Japan with amazing views",
      addedAt: new Date(Date.now() - 86400000 * 2)
    },
    {
      id: "place_tokyo_2",
      place: {
        id: "tokyo_sushi",
        name: "Sushi Dai",
        address: "5 Chome-2-1 Tsukiji",
        city: "Tokyo",
        state: "",
        country: "Japan",
        lat: 35.6654,
        lng: 139.7707,
        type: "restaurant",
        verified: true,
      },
      addedBy: {
        id: collaborators[1].id,
        name: collaborators[1].name,
        avatar: collaborators[1].avatar,
        colorCode: userColors[1].color
      },
      notes: "Famous sushi restaurant near the fish market",
      addedAt: new Date(Date.now() - 86400000 * 1)
    },
    {
      id: "place_tokyo_3",
      place: {
        id: "12", // Barry's Bootcamp
        name: "Barry's Bootcamp Tokyo",
        address: "1-19-18 Jingumae",
        city: "Tokyo",
        state: "",
        country: "Japan",
        lat: 35.6735,
        lng: 139.7054,
        type: "other",
        verified: true,
      },
      addedBy: {
        id: collaborators[2].id,
        name: collaborators[2].name,
        avatar: collaborators[2].avatar,
        colorCode: userColors[2].color
      },
      notes: "Let's stay fit even on vacation!",
      addedAt: new Date(Date.now() - 86400000 * 0.5)
    }
  ];
};

/**
 * Generate trip places for Bali (Trip ID 3)
 */
export const generateBaliTripPlaces = (
  collaborators: Array<{ id: string; name: string; avatar: string }>,
  userColors: Array<{ id: string; color: string }>
): TripPlace[] => {
  return [
    {
      id: "place_bali_1",
      place: {
        id: "bali_beach",
        name: "Kuta Beach",
        address: "Kuta",
        city: "Bali",
        state: "",
        country: "Indonesia",
        lat: -8.7195,
        lng: 115.1686,
        type: "attraction",
        verified: true,
      },
      addedBy: {
        id: collaborators[0].id,
        name: collaborators[0].name,
        avatar: collaborators[0].avatar,
        colorCode: userColors[0].color
      },
      notes: "Best surfing spot for beginners",
      addedAt: new Date(Date.now() - 86400000 * 3)
    },
    {
      id: "place_bali_2",
      place: {
        id: "bali_temple",
        name: "Uluwatu Temple",
        address: "Pecatu",
        city: "Bali",
        state: "",
        country: "Indonesia",
        lat: -8.8291,
        lng: 115.0849,
        type: "attraction",
        verified: true,
      },
      addedBy: {
        id: collaborators[1].id,
        name: collaborators[1].name,
        avatar: collaborators[1].avatar,
        colorCode: userColors[1].color
      },
      notes: "Amazing cliff temple with traditional Kecak dance at sunset",
      addedAt: new Date(Date.now() - 86400000 * 2)
    },
    {
      id: "place_bali_3",
      place: {
        id: "bali_yoga",
        name: "Yoga Barn",
        address: "Jl. Raya Pengosekan",
        city: "Ubud, Bali",
        state: "",
        country: "Indonesia",
        lat: -8.5159,
        lng: 115.2642,
        type: "other",
        verified: true,
      },
      addedBy: {
        id: collaborators[2].id,
        name: collaborators[2].name,
        avatar: collaborators[2].avatar,
        colorCode: userColors[2].color
      },
      notes: "World-famous yoga retreat center",
      addedAt: new Date(Date.now() - 86400000 * 1)
    }
  ];
};

/**
 * Generate random trip places for other trips
 */
export const generateRandomTripPlaces = (
  collaborators: Array<{ id: string; name: string; avatar: string }>,
  userColors: Array<{ id: string; color: string }>
): TripPlace[] => {
  return collaborators.flatMap((user: any, index: number) => {
    const numPlaces = Math.floor(Math.random() * 2) + 1;
    return Array(numPlaces).fill(0).map((_, i) => {
      const randomLocationIndex = Math.floor(Math.random() * mockLocations.length);
      return {
        id: `place_${user.id}_${i}`,
        place: mockLocations[randomLocationIndex],
        addedBy: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          colorCode: userColors[index % userColors.length].color
        },
        notes: `Added by ${user.name}`,
        addedAt: getRandomPastDate(5)
      };
    });
  });
};

/**
 * Generate mock places based on trip ID
 */
export const generateMockPlacesForTrip = (
  tripId: string,
  collaborators: Array<{ id: string; name: string; avatar: string }>,
  userColors: Array<{ id: string; color: string }>
): TripPlace[] => {
  // Generate different mock data based on trip ID
  switch (tripId) {
    case "1":
      return generateParisTripPlaces(collaborators, userColors);
    case "2":
      return generateTokyoTripPlaces(collaborators, userColors);
    case "3":
      return generateBaliTripPlaces(collaborators, userColors);
    default:
      return generateRandomTripPlaces(collaborators, userColors);
  }
};
