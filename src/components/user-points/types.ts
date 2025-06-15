
import { mockLocations } from "@/mock/locations";

export interface Reward {
  id: string;
  venueName: string;
  venueId: string;
  points: number;
  description: string;
  image: string;
}

// Export the mock rewards data for reuse
export const mockRewards: Reward[] = [
  {
    id: "reward1",
    venueName: "Skyline Lounge",
    venueId: mockLocations[0].id,
    points: 100,
    description: "Free Cocktail",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
  },
  {
    id: "reward2",
    venueName: "Cosmic Cafe",
    venueId: mockLocations[1].id,
    points: 250,
    description: "50% Off Brunch",
    image: "https://images.unsplash.com/photo-1484659619207-9165d119dafe?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
  },
  {
    id: "reward3",
    venueName: "Neon Nightclub",
    venueId: mockLocations[2].id,
    points: 500,
    description: "VIP Entry (Skip the Line)",
    image: "https://images.unsplash.com/photo-1545128485-c400ce7b6892?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
  },
  {
    id: "reward4",
    venueName: "Long Beach Terrace Theater",
    venueId: "venue4",
    points: 750,
    description: "Comps to Trevor Noah Comedy Show",
    image: "https://images.unsplash.com/photo-1622220835869-b8662503e0f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
  },
  {
    id: "reward5",
    venueName: "Waikiki Beach Hilton",
    venueId: "venue5",
    points: 600,
    description: "Free Resort Day Pass",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
  },
  {
    id: "reward6",
    venueName: "Dodger Stadium",
    venueId: "venue6",
    points: 450,
    description: "30% Off Dodgers Game Tickets",
    image: "https://images.unsplash.com/photo-1562771379-eafdca7a02f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
  },
  {
    id: "reward7",
    venueName: "Punch Club Boxing & Fitness",
    venueId: "venue7",
    points: 350,
    description: "1st Class Free Coupon",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
  },
  {
    id: "reward8",
    venueName: "SoFi Stadium",
    venueId: "venue8",
    points: 800,
    description: "15% Off Beyoncé Cowboy Carter Tour",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
  }
];
