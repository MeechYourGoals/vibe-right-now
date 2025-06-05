import { Post } from "@/types";
import { mockUsers } from "./users";
import { mockLocations } from "./locations";

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    content: "Amazing sunset views at this rooftop bar! The cocktails are incredible and the atmosphere is perfect for a date night.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes: 127,
    location: mockLocations[0],
    vibeTags: ["Romantic", "Trendy", "Date Night"],
    saved: false
  },
  {
    id: "2",
    user: mockUsers[1],
    content: "Best coffee in the city! The baristas here are true artists and the atmosphere is perfect for working or catching up with friends.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    likes: 89,
    location: mockLocations[1],
    vibeTags: ["Chill", "Foodie", "Social"],
    saved: true
  },
  {
    id: "3",
    user: mockUsers[2],
    content: "The live music here is absolutely incredible! Great vibes, amazing crowd, and the sound quality is top-notch.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    likes: 203,
    location: mockLocations[2],
    vibeTags: ["Energetic", "Cultural", "Social"],
    saved: false
  },
  {
    id: "4",
    user: mockUsers[3],
    content: "This art museum is a hidden gem! The collection is diverse and thought-provoking, and the building itself is a work of art.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1556139831-a9e835433c06?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    likes: 156,
    location: mockLocations[3],
    vibeTags: ["Artsy", "Cultural", "Chill"],
    saved: false
  },
  {
    id: "5",
    user: mockUsers[4],
    content: "The views from this rooftop bar are simply breathtaking! Perfect spot for a special occasion or just a night out with friends.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    likes: 321,
    location: mockLocations[4],
    vibeTags: ["Trendy", "Nightlife", "Romantic"],
    saved: false
  },
  {
    id: "6",
    user: mockUsers[5],
    content: "Just saw an amazing game at this stadium! The energy was electric and the crowd was wild.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    likes: 456,
    location: mockLocations[5],
    vibeTags: ["Sporty", "Energetic", "Social"],
    saved: false
  },
  {
    id: "7",
    user: mockUsers[6],
    content: "This beach club is the ultimate party destination! The music is pumping, the drinks are flowing, and the people are beautiful.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1502685106916-85c6e3629f14?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    likes: 567,
    location: mockLocations[7],
    vibeTags: ["Nightlife", "Trendy", "Social"],
    saved: false
  },
  {
    id: "8",
    user: mockUsers[7],
    content: "Visited this iconic landmark today and was blown away! The architecture is stunning and the history is fascinating.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506929562872-bb42a483ffc3?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    likes: 678,
    location: mockLocations[8],
    vibeTags: ["Tourist", "Cultural", "Chill"],
    saved: false
  },
  {
    id: "9",
    user: mockUsers[8],
    content: "Had an amazing time skiing at this mountain resort! The slopes were perfectly groomed and the views were breathtaking.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1485239637109-f199bd55c201?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(),
    likes: 789,
    location: mockLocations[9],
    vibeTags: ["Adventure", "Sporty", "Chill"],
    saved: false
  },
  {
    id: "10",
    user: mockUsers[9],
    content: "This stadium is a must-visit for any sports fan! The atmosphere is electric and the facilities are top-notch.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1544984495-112754e1c69a?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(),
    likes: 890,
    location: mockLocations[10],
    vibeTags: ["Sporty", "Energetic", "Social"],
    saved: false
  },
  {
    id: "11",
    user: mockUsers[0],
    content: "Just tried the most amazing tacos at this food truck! The flavors were incredible and the prices were unbeatable.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1552566626-526ca078b89a?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 192).toISOString(),
    likes: 901,
    location: mockLocations[11],
    vibeTags: ["Foodie", "Trendy", "Local"],
    saved: false
  },
  {
    id: "12",
    user: mockUsers[1],
    content: "This comedy club is the perfect place to unwind and have a good laugh! The comedians are hilarious and the drinks are strong.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1519682337058-a94d51a92b34?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 216).toISOString(),
    likes: 123,
    location: mockLocations[12],
    vibeTags: ["Nightlife", "Social", "Chill"],
    saved: false
  },
  {
    id: "13",
    user: mockUsers[2],
    content: "Had an amazing time at this music festival! The lineup was incredible and the energy was contagious.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1493225454514-3a97c9238fa0?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 240).toISOString(),
    likes: 234,
    location: mockLocations[13],
    vibeTags: ["Energetic", "Social", "Trendy"],
    saved: false
  },
  {
    id: "14",
    user: mockUsers[3],
    content: "This park is a hidden oasis in the middle of the city! Perfect spot for a picnic or just a relaxing stroll.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 264).toISOString(),
    likes: 345,
    location: mockLocations[14],
    vibeTags: ["Chill", "Relaxing", "Local"],
    saved: false
  },
  {
    id: "15",
    user: mockUsers[4],
    content: "This museum is a treasure trove of history and culture! The exhibits are fascinating and the building itself is a masterpiece.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1505773534599-8382c6517312?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 288).toISOString(),
    likes: 456,
    location: mockLocations[15],
    vibeTags: ["Cultural", "Tourist", "Artsy"],
    saved: false
  },
  {
    id: "16",
    user: mockUsers[5],
    content: "This restaurant is a culinary delight! The food is exquisite and the service is impeccable.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1467002542946-6ca4d32a4b49?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 312).toISOString(),
    likes: 567,
    location: mockLocations[16],
    vibeTags: ["Foodie", "Romantic", "Trendy"],
    saved: false
  },
  {
    id: "17",
    user: mockUsers[6],
    content: "This bar is a hidden gem! The cocktails are creative and the atmosphere is cozy and inviting.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1543007318-454d94d59c3b?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 336).toISOString(),
    likes: 678,
    location: mockLocations[17],
    vibeTags: ["Nightlife", "Chill", "Local"],
    saved: false
  },
  {
    id: "18",
    user: mockUsers[7],
    content: "This landmark is a must-see for any visitor! The architecture is stunning and the views are breathtaking.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506929562872-bb42a483ffc3?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 360).toISOString(),
    likes: 789,
    location: mockLocations[18],
    vibeTags: ["Tourist", "Cultural", "Artsy"],
    saved: false
  },
  {
    id: "19",
    user: mockUsers[8],
    content: "This event was an unforgettable experience! The music was incredible and the crowd was electric.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1459749411175-04bf52392f46?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 384).toISOString(),
    likes: 890,
    location: mockLocations[19],
    vibeTags: ["Energetic", "Social", "Trendy"],
    saved: false
  },
  {
    id: "20",
    user: mockUsers[9],
    content: "This festival is a celebration of music, art, and culture! The atmosphere is vibrant and the people are friendly.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1464226184884-fdca40b1296e?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 408).toISOString(),
    likes: 901,
    location: mockLocations[20],
    vibeTags: ["Social", "Trendy", "Artsy"],
    saved: false
  }
];

// Update all remaining posts in the array to include saved: false
export const updatedMockPosts = mockPosts.map(post => ({
  ...post,
  saved: post.saved ?? false
}));
